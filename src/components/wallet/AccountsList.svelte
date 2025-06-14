<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, formatAccount, signingAccount } from '../../modules/accounts'
  import { printCoins } from '../../modules/coinHelpers'
  import { connected } from '../../modules/networks'
  import { setAccount } from '../../modules/accountActions'
  import Copy from '../../components/layout/Copy.svelte'
  import { preferences, setAccountsListPreference } from '../../modules/user_preferences'
  import AccountRowSkeleton from './AccountRowSkeleton.svelte'
  import { navigate } from 'svelte-navigator'; // Adjust based on your routing library
  import MigrationStatus from './MigrationStatus.svelte'
  import VouchScoreStatus from './VouchScoreStatus.svelte'
  import { invoke } from '@tauri-apps/api/tauri';
  import { notify_success } from '../../modules/carpeNotify';
  import { raise_error } from '../../modules/carpeError';
  
  UIkit.use(Icons)

  let showNoteColumn = false
  $: showNoteColumn = $allAccounts.some(
    (account) => account.note !== null && account.note.trim() !== '',
  )
  function selectAddress(address) {
    setAccount(address)
  }

  // Subscribe to the preferences store
  let sortOrder = 'asc'
  let sortColumn = null
  $: if ($preferences.accounts_list_sort_column && $preferences.accounts_list_sort_order) {
    sortColumn = $preferences.accounts_list_sort_column
    sortOrder = $preferences.accounts_list_sort_order
  }

  // Update preferences when user clicks to sort
  function sortAccounts(column) {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc'

    // Set sortColumn and sortOrder immediately for local update
    sortColumn = column
    sortOrder = newSortOrder

    privateSortAccounts(column)
    setAccountsListPreference(column, sortOrder)
  }

  // Private function to sort accounts
  function privateSortAccounts(column) {
    $allAccounts = $allAccounts.slice().sort((a, b) => {
      let valA =
        column === 'balance'
          ? a.balance.total
          : column === 'unlocked'
            ? a.balance.unlocked
            : column === 'note'
              ? a.note || ''
              : formatAccount(a.account)
      let valB =
        column === 'balance'
          ? b.balance.total
          : column === 'unlocked'
            ? b.balance.unlocked
            : column === 'note'
              ? b.note || ''
              : formatAccount(b.account)

      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()

      if (valA === valB) {
        // Desempate usando formatAccount
        let secondaryValA = formatAccount(a.account).toLowerCase()
        let secondaryValB = formatAccount(b.account).toLowerCase()
        return sortOrder === 'asc'
          ? secondaryValA > secondaryValB
            ? 1
            : -1
          : secondaryValA < secondaryValB
            ? 1
            : -1
      }

      // Ordenação principal
      return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1
    })
  }

  // Re-sort when preferences change
  $: sortColumn && $allAccounts.length > 0 && privateSortAccounts(sortColumn)

  const printAmount = (account, balance, isConnected) => {
    const balanceFormatted = printCoins(balance);
    if (!isConnected) {
      return (balance > 0)
        ? `${balanceFormatted} <span uk-icon="icon: warning" style="color:red" title="${$_('wallet.account_list.offline')}"></span>`
        : `<span uk-icon="icon: warning" style="color:red" title="${$_('wallet.account_list.offline')}"></span>`;
    }
    if (account.on_chain != null && account.on_chain == false) {
      return $_('wallet.account_list.account_on_chain');
    }
    if (account.on_chain) {
      return balanceFormatted;
    }
    return $_('wallet.account_list.account_on_chain');
  }

  // Function to refresh account data
  async function refreshAccounts() {
    try {
      // Refresh the accounts data
      await invoke('refresh_accounts');
    } catch (e) {
      console.error("Failed to refresh accounts:", e);
    }
  }
  
  // Handle rejoin functionality when triggered by MigrationStatus component
  async function handleRejoin(event) {
    const { success, error } = event.detail;
    
    if (success) {
      // Show success notification
      notify_success($_('wallet.account_list.rejoin_success'));
      
      // Refresh accounts list after operation completes
      await refreshAccounts();
    } else {
      // Handle error
      console.error("Rejoin failed:", error);
      raise_error(error, true, "rejoin_transaction");
    }
  }

</script>

<main>
  {#if $signingAccount && $allAccounts && $allAccounts.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-width-small uk-text-nowrap" style="min-width: 126px" />
          {#if showNoteColumn}
            <th
              class="sortable uk-width-medium uk-text-left uk-text-nowrap"
              on:click={() => sortAccounts('note')}
            >
              {$_('wallet.account_list.note')}
              {#if sortColumn === 'note'}
                <span
                  uk-icon={`icon: triangle-${sortOrder === 'asc' ? 'up' : 'down'}`}
                  class="uk-margin-small-left"
                />
              {/if}
            </th>
          {/if}
          <th
            class="sortable uk-width-medium uk-text-left uk-text-nowrap"
            on:click={() => sortAccounts('account')}
          >
            {$_('wallet.account_list.address')}
            {#if sortColumn === 'account'}
              <span
                uk-icon={`icon: triangle-${sortOrder === 'asc' ? 'up' : 'down'}`}
                class="uk-margin-small-left"
              />
            {/if}
          </th>
          <th
            class="sortable uk-width-small uk-text-right uk-text-nowrap"
            on:click={() => sortAccounts('unlocked')}
          >
            {$_('wallet.account_list.unlocked')}
            {#if sortColumn === 'unlocked'}
              <span
                uk-icon={`icon: triangle-${sortOrder === 'asc' ? 'up' : 'down'}`}
                class="uk-margin-small-left"
              />
            {/if}
          </th>
          <th
            class="sortable uk-text-right uk-text-nowrap"
            on:click={() => sortAccounts('balance')}
          >
            {$_('wallet.account_list.balance')}
            {#if sortColumn === 'balance'}
              <span
                uk-icon={`icon: triangle-${sortOrder === 'asc' ? 'up' : 'down'}`}
                class="uk-margin-small-left"
              />
            {/if}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each $allAccounts as a}
          {#if a.account == 'loading...'}
            <AccountRowSkeleton {showNoteColumn} />
          {:else}
            <tr>
              <td>
                <span>
                  {#if a.account == $signingAccount.account}
                    <span uk-icon="user" />
                    <button uk-icon="settings" class="uk-margin-left" on:click={() => navigate('/account-details')} />
                  {/if}
                  {#if a.watch_only}
                    <span class="uk-align-right" style="margin: 4px;" uk-icon="eye"></span>
                  {/if}
                </span>
                <div class="status-indicators">
                    <span class="migration-status-wrapper">
                      <MigrationStatus 
                        account={a.account} 
                        on:rejoin={handleRejoin}
                      />
                    </span>
                    <span class="vouch-score-wrapper">
                      <VouchScoreStatus account={a.account} />
                    </span>
                </div>
              </td>
              {#if showNoteColumn}
                <td class="uk-text-left uk-transition-toggle uk-table-shrink note-column"
                  >{a.note ? a.note : ''}</td
                >
              {/if}
              <td
                on:click={() => selectAddress(a.account)}
                class="uk-transition-toggle uk-table-shrink"
                style="cursor: grab"
              >
                <div class="uk-flex-inline">
                  <span
                    class="uk-text-truncate"
                    style={showNoteColumn
                      ? 'width: 26vw; display: inline-block'
                      : 'width: 32vw; display: inline-block'}>{formatAccount(a.account)}</span
                  >
                  <span class="uk-transition-fade"><Copy text={a.account}></Copy></span>
                </div>
              </td>
              <td class="uk-text-right uk-text-nowrap">
                {@html printAmount(a, a.balance.unlocked, $connected)}
              </td>
              <td class="uk-text-right uk-text-nowrap" style="width: 150px">
                {@html printAmount(a, a.balance.total, $connected)}
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  {/if}
</main>

<style>
  .sortable {
    cursor: pointer;
    user-select: none;
  }
  .uk-margin-small-left {
    margin-left: 5px;
  }
  .note-column {
    width: fit-content;
    max-width: 120px;
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Use an ellipsis to indicate clipped text */
    /* white-space: nowrap; /* Prevent text from wrapping to the next line */
  }
  .status-indicators {
    display: inline-flex;
    margin-left: 5px;
    vertical-align: middle;
  }
  
  .migration-status-wrapper,
  .vouch-score-wrapper {
    margin-right: 3px;
  }
</style>
