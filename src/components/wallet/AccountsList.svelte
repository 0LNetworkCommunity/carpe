<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, formatAccount, signingAccount } from '../../modules/accounts'
  import { printCoins, unscaledCoins } from '../../modules/coinHelpers'
  import { minerLoopEnabled } from '../../modules/miner'
  import { connected } from '../../modules/networks'
  import { setAccount } from '../../modules/accountActions'
  import Actions from './Actions.svelte'
  import Copy from '../../components/layout/Copy.svelte'
  UIkit.use(Icons)

  let showOptions = false

  let showNoteColumn = false
  $: showNoteColumn = $allAccounts.some(
    (account) => account.note !== null && account.note.trim() !== '',
  )

  const toggleOptions = () => {
    showOptions ? (showOptions = false) : (showOptions = true)
  }

  signingAccount.subscribe(() => {
    showOptions = false
  })

  let sortOrder = 'asc' // Initial sort order ('asc' for ascending, 'desc' for descending)
  let sortColumn = null // Default column for initial sorting

  // Function to sort accounts based on the column header clicked
  function sortAccounts(column) {
    if (sortColumn === column) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn = column
      sortOrder = 'desc'
    }

    privateSortAccounts(column)
  }

  function privateSortAccounts(column) {
    $allAccounts = $allAccounts.slice().sort((a, b) => {
      // Access nested properties for 'unlocked' and 'balance'
      let valA =
        column === 'balance'
          ? a.balance.total
          : column === 'unlocked'
            ? a.balance.unlocked
            : column === 'note'
              ? a.note
                ? a.note
                : ''
              : formatAccount(a.account)
      let valB =
        column === 'balance'
          ? b.balance.total
          : column === 'unlocked'
            ? b.balance.unlocked
            : column === 'note'
              ? b.note
                ? b.note
                : ''
              : formatAccount(b.account)

      // Handle case-insensitive sorting for string types
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1
      } else {
        return valA < valB ? 1 : -1
      }
    })
  }

  $: if (sortColumn && $allAccounts.length > 0) {
    privateSortAccounts(sortColumn)
  }
</script>

<main>
  {#if $signingAccount && $allAccounts && $allAccounts.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-width-small" />
          {#if showNoteColumn}
            <th class="sortable uk-width-medium uk-text-left" on:click={() => sortAccounts('note')}>
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
            class="sortable uk-width-medium uk-text-left"
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
            class="sortable uk-width-small uk-text-right"
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
          <th class="sortable uk-text-right" on:click={() => sortAccounts('balance')}>
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
          <!-- svelte-ignore missing-declaration -->
          <tr
            class={$minerLoopEnabled && a.account == $signingAccount.account
              ? 'uk-text-primary'
              : ''}
          >
            <td>
              <span>
                {#if a.account == $signingAccount.account}
                  <span uk-icon="user" />
                  <button uk-icon="settings" class="uk-margin-left" on:click={toggleOptions} />
                {/if}
              </span>

              {#if a.watch_only}
                <span class="uk-align-right" style="margin-top: 3px;" uk-icon="eye"></span>
              {/if}
            </td>
            {#if showNoteColumn}
              <td class="uk-text-left">{a.note ? a.note : ''}</td>
            {/if}
            <td
              on:click={() => setAccount(a.account)}
              class="uk-transition-toggle uk-table-shrink"
              style="cursor:grab"
            >
              <div class="uk-flex-inline">
                <span class="uk-text-truncate" style="width: 32vw; display:inline-block"
                  >{formatAccount(a.account)}</span
                >
                <span class="uk-transition-fade"><Copy text={a.account}></Copy></span>
              </div>
            </td>
            <!-- <td>{a.auth_key.slice(0, 5)}...</td> -->
            <td class="uk-text-right">{printCoins(a.balance.unlocked)}</td>
            <td class="uk-text-right">
              {#if a.on_chain != null && a.on_chain == false}
                {$_('wallet.account_list.account_on_chain')}
              {:else if a.on_chain}
                <div class="uk-inline">
                  {#if unscaledCoins(a.balance) < 1}
                    <!-- TODO: make this icon align vertical middle. -->
                    <span class="uk-margin uk-text-warning" uk-icon="icon: info" />
                    <div uk-dropdown>
                      {$_('wallet.account_list.message')}
                    </div>
                  {/if}

                  {printCoins(a.balance.total)}
                </div>
              {:else if a.balance == null}
                {$_('wallet.account_list.loading')}...
              {:else if !$connected}
                {$_('wallet.account_list.offline')}...
              {:else}
                {$_('wallet.account_list.account_on_chain')}
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  {#if showOptions}
    <Actions />
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
</style>
