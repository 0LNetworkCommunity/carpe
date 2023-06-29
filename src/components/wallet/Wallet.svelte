<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import {
    isRefreshingAccounts,
    allAccounts,
    signingAccount,
    isAccountRefreshed,
  } from "../../accounts";
  import type { Profile } from "../../accounts";
  import Newbie from "./Newbie.svelte";
  import AccountsList from "./AccountsList.svelte";
  import ReminderCreate from "./ReminderCreate.svelte";
  import { minerLoopEnabled } from "../../miner";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { connected } from "../../networks";
  import ConnectionError from "../layout/ConnectionError.svelte";
  
  UIkit.use(Icons);

  let my_account: Profile;
  let accountList: Profile[];
  let pendingAccounts: Profile[];
  let isMining = false;
  let isRefreshing: boolean = false;
  let isConnected: boolean = true;
  let isLoaded: boolean = false;

  let unsubsConnected;
  let unsubsAll_accounts;
  let unsubsSigningAccount;
  let unsubsIsAccountsLoaded;
  let unsubsMinerLoopEnabled;
  let unsubsIsRefreshingAccounts;

  onMount(async () => {
    unsubsConnected = connected.subscribe((b) => (isConnected = b));
    unsubsAll_accounts = allAccounts.subscribe((all) => {
      if (all) {
        accountList = all;
        pendingAccounts = all.filter((x) => !x.on_chain);
      }
    });
    unsubsSigningAccount = signingAccount.subscribe((a) => (my_account = a));
    unsubsIsAccountsLoaded = isAccountRefreshed.subscribe(
      (boo) => (isLoaded = boo)
    );
    unsubsMinerLoopEnabled = minerLoopEnabled.subscribe(
      (boo) => (isMining = boo)
    );
    unsubsIsRefreshingAccounts = isRefreshingAccounts.subscribe(
      (boo) => (isRefreshing = boo)
    );
  });

  onDestroy(async () => {
    unsubsConnected && unsubsConnected();
    unsubsAll_accounts && unsubsAll_accounts();
    unsubsSigningAccount && unsubsSigningAccount();
    unsubsIsAccountsLoaded && unsubsIsAccountsLoaded();
    unsubsMinerLoopEnabled && unsubsMinerLoopEnabled();
    unsubsIsRefreshingAccounts && unsubsIsRefreshingAccounts();
  });
</script>

<main>
  <div>
    {#if isRefreshing}
      <div style="position:relative">
        <span uk-spinner style="position:absolute; top:0; left:0" />
      </div>
    {:else}
      <!-- TODO: let's move this logic to Newbie -->
      <!-- if we have initialized the app, but deleted all accounts -->
      {#if isLoaded && accountList && accountList.length == 0 }
        <Newbie />
      {/if}
      <!-- acount list may return error -->
      {#if !isLoaded && !accountList }
        <Newbie />
      {/if}
      <!-- may return an empty array -->
      {#if !isLoaded && accountList && accountList.length == 0}
        <Newbie />
      {/if}
    {/if}

    <!-- {isLoaded} {accountList && accountList.length} -->

    {#if isLoaded && accountList && accountList.length > 0}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_("wallet.wallet")}
        </h2>
      </div>
      <AccountsList {my_account} {accountList} {isMining} {isConnected} />

      {#if !isConnected}
        <!-- <AccountsList {my_account} {accountList} {isMining} {isConnected} /> -->

        <ConnectionError />
      {:else}
        <ReminderCreate {pendingAccounts} {isConnected} />
      {/if}
    {/if}
  </div>
</main>
