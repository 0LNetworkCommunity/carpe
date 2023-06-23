<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import {
    isRefreshingAccounts,
    all_accounts,
    signingAccount,
    isAccountsLoaded,
  } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import Newbie from "./Newbie.svelte";
  import AccountsList from "./AccountsList.svelte";
  import ReminderCreate from "./ReminderCreate.svelte";
  import { minerLoopEnabled } from "../../miner";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { connected } from "../../networks";
  import ConnectionError from "../layout/ConnectionError.svelte";
  
  UIkit.use(Icons);

  let my_account: AccountEntry;
  let accountList: AccountEntry[] = null;
  let pendingAccounts: AccountEntry[] = [];
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
    unsubsAll_accounts = all_accounts.subscribe((all) => {
      accountList = all;
      pendingAccounts = all.filter((x) => !x.on_chain);
    });
    unsubsSigningAccount = signingAccount.subscribe((a) => (my_account = a));
    unsubsIsAccountsLoaded = isAccountsLoaded.subscribe(
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
      {#if !isLoaded && accountList && accountList.length == 0}
        <Newbie />
      {/if}
    {/if}
    


    <!-- {#if !isLoaded && accountList && accountList.length == 0}
      <Newbie />
    {/if} -->

    {#if isLoaded && accountList && accountList.length > 0}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_("wallet.wallet")}
        </h2>
      </div>
      {#if !isConnected}
        <AccountsList {my_account} {accountList} {isMining} {isConnected} />

        <ConnectionError />
      {:else}

        <AccountsList {my_account} {accountList} {isMining} {isConnected} />

        <ReminderCreate {pendingAccounts} {isConnected} />
      {/if}
    {/if}
  </div>
</main>
