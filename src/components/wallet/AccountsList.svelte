<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, formatAccount, signingAccount } from '../../modules/accounts'
  import { printCoins, unscaledCoins } from '../../modules/coinHelpers'
  import IconMining from '../icons/IconMining.svelte'
  import { minerLoopEnabled } from '../../modules/miner'
  import { connected } from '../../modules/networks'
  import { setAccount } from '../../modules/accountActions'
  import Actions from './Actions.svelte'

  UIkit.use(Icons)

  let showOptions = false

  const toggleOptions = () => {
    showOptions ? (showOptions = false) : (showOptions = true)
  }
</script>

<main>
  {#if $signingAccount && $allAccounts && $allAccounts.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-width-small"  />
          <!-- <th>{$_('wallet.account_list.nickname')}</th> -->
          <th>{$_('wallet.account_list.address')}</th>
          <!-- <th>{$_('wallet.account_list.authkey')}</th> -->
          <th class="uk-width-small">{$_('wallet.account_list.unlocked')}</th>

          <th class="uk-text-right">{$_('wallet.account_list.balance')}</th>
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
            <!-- <tr
            class={isMining && a.account == selectedAccount.account
              ? "uk-text-primary"
              : ""}
            on:click={() => setAccount(a.account)}
          > -->
            <td class="uk-transition-toggle">
              {#if a.account == $signingAccount.account}
                {#if $minerLoopEnabled}
                  <IconMining />
                {:else}
                  <span uk-icon="user" />
                {/if}
                <button
                  uk-icon="settings"
                  class="uk-margin-left uk-transition-fade"
                  on:click={toggleOptions}
                />
              {/if}
            </td>
            <!-- <td
              on:click={() => setAccount(a.account)}
              style="cursor:
            grab">{a.nickname}</td
            > -->

            <td on:click={() => setAccount(a.account)} class="uk-text-truncate" style="cursor:
            grab" >{formatAccount(a.account)}</td>
            <!-- <td>{a.auth_key.slice(0, 5)}...</td> -->
            <td>{printCoins(a.balance.unlocked)}</td>
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
