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
  import Copy from '../../components/layout/Copy.svelte'
  UIkit.use(Icons)

  let showOptions = false

  const toggleOptions = () => {
    showOptions ? (showOptions = false) : (showOptions = true)
  }

  signingAccount.subscribe(() => {
    showOptions = false
  })

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
          <th class="uk-width-small uk-text-right">{$_('wallet.account_list.unlocked')}</th>

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
            <td >
              <span>
                {#if a.account == $signingAccount.account}
                {#if $minerLoopEnabled}
                  <IconMining />
                {:else}
                  <span uk-icon="user" />
                {/if}
                <button
                  uk-icon="settings"
                  class="uk-margin-left"
                  on:click={toggleOptions}
                />
              {/if}
              </span>
              
              {#if a.watch_only}
                <span class="uk-align-right" style="margin-top: 3px;" uk-icon="eye"></span>
              {/if}
            </td>
            <!-- <td
              on:click={() => setAccount(a.account)}
              style="cursor:
            grab">{a.nickname}</td
            > -->

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
