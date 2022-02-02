<script lang="ts">
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import {
    isRefreshingAccounts,
    all_accounts,
    signingAccount,
  } from "../../accounts";
  import { routes } from "../../routes";
  import type { AccountEntry } from "../../accounts";
  import Newbie from "./Newbie.svelte";
  import AccountsList from "./AccountsList.svelte";
  import ReminderCreate from "./ReminderCreate.svelte";
  import { minerLoopEnabled } from "../../miner";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { connected, refreshWaypoint } from "../../networks";
  import ConnectionError from "../layout/ConnectionError.svelte";
  UIkit.use(Icons);

  let my_account: AccountEntry;
  let account_list: AccountEntry[] = null;
  let pendingAccounts: AccountEntry[] = [];
  let isMining = false;
  let isRefreshing: boolean = true;
  let isConnected: boolean = true;
  // let init = true; // assume true until not.

  onMount(async () => {
    // isInit.subscribe(i => init = i);

    connected.subscribe((b) => (isConnected = b));

    all_accounts.subscribe((all) => {
      account_list = all;
      pendingAccounts = all.filter((x) => !x.on_chain);
    });
    signingAccount.subscribe((a) => (my_account = a));

    minerLoopEnabled.subscribe((boo) => (isMining = boo));

    isRefreshingAccounts.subscribe((boo) => (isRefreshing = boo));
    
  });
</script>

<main>
  <div>
    {#if account_list == null}
      <div class="uk-align-center">
        <span uk-spinner class="uk-margin-left uk-position-absolute" />
      </div>
    {:else if account_list.length > 0}

      {#if !isConnected}
        <ConnectionError />
      {:else}
        <div class="uk-flex uk-flex-center">
          <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Wallet</h2>
        </div>

        {#if isRefreshing}
          <div class="uk-flex uk-flex-center">
            <span uk-spinner />
          </div>
        {/if}
        <AccountsList {my_account} {account_list} {isMining} {isConnected} />

        <ReminderCreate {pendingAccounts} {isConnected} />

        <div uk-grid class="uk-flex uk-flex-center">
          <Link to={routes.keygen}>
            <button class="uk-button uk-button-secondary"> New Account </button>
          </Link>
          <Link to={routes.accountFromMnem}>
            <button class="uk-button uk-button-default">Restore Account </button>
          </Link>
        </div>
      {/if}
    {:else if account_list.length == 0 && !isRefreshing}
      <Newbie />
    {/if}
  </div>
</main>
