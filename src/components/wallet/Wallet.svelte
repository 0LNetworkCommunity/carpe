<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { onDestroy, onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import {
    isRefreshingAccounts,
    all_accounts,
    signingAccount,
    isAccountsLoaded,
  } from "../../accounts";
  import { routes } from "../../routes";
  import type { AccountEntry } from "../../accounts";
  import Newbie from "./Newbie.svelte";
  import AccountsList from "./AccountsList.svelte";
  import ReminderCreate from "./ReminderCreate.svelte";
  import { minerLoopEnabled } from "../../miner";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { connected } from "../../networks";
  import ConnectionError from "../layout/ConnectionError.svelte";
  import AccountsListSkeleton from './AccountsListSkeleton.svelte';
  UIkit.use(Icons);

  let my_account: AccountEntry;
  let accountList: AccountEntry[] = null;
  let pendingAccounts: AccountEntry[] = [];
  let isMining = false;
  let isRefreshing: boolean = true;
  let isConnected: boolean = true;
  let isLoaded: boolean = false;
  
  let unsubsConnected;
  let unsubsAll_accounts;
  let unsubsSigningAccount;
  let unsubsIsAccountsLoaded;
  let unsubsMinerLoopEnabled;
  let unsubsIsRefreshingAccounts;

  onMount(async () => {
    
    unsubsConnected = connected.subscribe(b => isConnected = b);
    unsubsAll_accounts = all_accounts.subscribe(all => {
      accountList = all;
      pendingAccounts = all.filter(x => !x.on_chain);
    });
    unsubsSigningAccount = signingAccount.subscribe(a => my_account = a);
    unsubsIsAccountsLoaded = isAccountsLoaded.subscribe(boo => isLoaded = boo);
    unsubsMinerLoopEnabled = minerLoopEnabled.subscribe(boo => isMining = boo);
    unsubsIsRefreshingAccounts = isRefreshingAccounts.subscribe(boo => isRefreshing = boo);   
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
    <!--{#if isRefreshing}
      <div style="position:relative">
        <span uk-spinner style="position:absolute; top:0px; left:0px"/>
      </div>
    {/if}-->
    {#if isRefreshing}
      <div style="position:relative;display:none;">
        {window.add_spin_loading_to_logo()}
        <!--<span style="position:absolute; left:0px; top:0px;" uk-spinner />-->
      </div>
    {:else}
      <div style="position:relative;display:none;">
        {window.remove_spin_loading_to_logo()}
      </div>
    {/if}
    
    {#if !isLoaded}
      <AccountsListSkeleton />
    {:else if accountList.length > 0}

      {#if !isConnected}
        <ConnectionError />
      {:else}
        <div class="uk-flex uk-flex-center">
          <h2 class="carpe-titles">{$_("wallet.wallet")}</h2>
        </div>
        
        <AccountsList {my_account} {accountList} {isMining} {isConnected} />

        <ReminderCreate {pendingAccounts} {isConnected} />

        <div uk-grid class="carpe-tabs uk-flex uk-flex-center">
          <Link to={routes.keygen}>
            <button class="uk-button uk-button-secondary">{$_("wallet.btn_new_account")}</button>
          </Link>
          <Link to={routes.accountFromMnem}>
            <button class="uk-button uk-button-default">{$_("wallet.btn_restore_account")} </button>
          </Link>
        </div>
      {/if}
      {:else if accountList.length == 0 && !isRefreshing}
        <Newbie />
      {/if}
  </div>
</main>
