<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import {
    allAccounts,
    signingAccount,
    isAccountRefreshed,
  } from '../../modules/accounts'
  import { minerLoopEnabled } from '../../modules/miner'
  import { connected } from '../../modules/networks'

  // types
  import type { CarpeProfile } from '../../modules/accounts'

  // views
  import ConnectionError from '../layout/ConnectionError.svelte'
  import Newbie from './Newbie.svelte'
  import AccountsList from './AccountsList.svelte'
  import ReminderCreate from './ReminderCreate.svelte'

  UIkit.use(Icons)

  // let selectedAccount: CarpeProfile
  let accountList: CarpeProfile[]
  let pendingAccounts = $allAccounts.filter((x) => !x.on_chain)
  // let isMining = false
  // let isRefreshing = false
  // let isConnected = true
  // let isLoaded = false

  // let unsubsConnected
  // let unsubsAll_accounts
  // let unsubsSigningAccount
  // let unsubsIsAccountsLoaded
  // let unsubsMinerLoopEnabled
  // let unsubsIsRefreshingAccounts

  // onMount(async () => {
  //   unsubsConnected = connected.subscribe((b) => (isConnected = b))
  //   unsubsAll_accounts = allAccounts.subscribe((all) => {
  //     if (all) {
  //       accountList = all
  //       pendingAccounts = all.filter((x) => !x.on_chain)
  //     }
  //   })
  //   unsubsSigningAccount = signingAccount.subscribe((a) => (selectedAccount = a))
  //   unsubsIsAccountsLoaded = isAccountRefreshed.subscribe((boo) => (isLoaded = boo))
  //   unsubsMinerLoopEnabled = minerLoopEnabled.subscribe((boo) => (isMining = boo))
  //   unsubsIsRefreshingAccounts = isRefreshingAccounts.subscribe((boo) => (isRefreshing = boo))
  // })

  // onDestroy(async () => {
  //   unsubsConnected && unsubsConnected()
  //   unsubsAll_accounts && unsubsAll_accounts()
  //   unsubsSigningAccount && unsubsSigningAccount()
  //   unsubsIsAccountsLoaded && unsubsIsAccountsLoaded()
  //   unsubsMinerLoopEnabled && unsubsMinerLoopEnabled()
  //   unsubsIsRefreshingAccounts && unsubsIsRefreshingAccounts()
  // })
</script>

<main>
  <div>
    <!-- {#if $isRefreshingAccounts} -->
      <!-- <div style="position:relative">
        <span uk-spinner style="position:absolute; top:0; left:0" />
      </div>
    {:else} -->
      <!-- TODO: let's move this logic to Newbie -->
      <!-- if we have initialized the app, but deleted all accounts -->
      {#if $isAccountRefreshed && accountList && accountList.length == 0}
        <Newbie />
      {/if}
      <!-- acount list may return error -->
      {#if !$isAccountRefreshed && !accountList}
        <Newbie />
      {/if}
      <!-- may return an empty array -->
      {#if !$isAccountRefreshed && accountList && accountList.length == 0}
        <Newbie />
      {/if}
    <!-- {/if} -->

    <!-- {isLoaded} {accountList && accountList.length} -->

    {#if $isAccountRefreshed && accountList && accountList.length > 0}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_('wallet.wallet')}
        </h2>
      </div>

      <!-- <SelectedAccount {selectedAccount}/> -->
      <AccountsList selectedAccount={$signingAccount} {accountList} isMining={$minerLoopEnabled} isConnected={$connected} />

      {#if !$connected}
        <!-- <AccountsList {my_account} {accountList} {isMining} {isConnected} /> -->

        <ConnectionError />
      {:else}
        <ReminderCreate {pendingAccounts} isConnected={$connected} />
      {/if}
    {/if}
  </div>
</main>
