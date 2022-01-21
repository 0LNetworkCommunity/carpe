<script lang="ts">
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import {
    is_initialized,
    isRefreshingAccounts,
    loadAccounts,
    all_accounts,
    signingAccount,
  } from "../../accounts";
  import { routes } from "../../routes";
  import type { AccountEntry } from "../../accounts";
  import Newbie from "./Newbie.svelte";
  import AccountsList from "./AccountsList.svelte";
  import ReminderCreate from "./ReminderCreate.svelte";
  import { miner_loop_enabled } from "../../miner";
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

  onMount(async () => {
    loadAccounts();
    // refreshWaypoint();

    connected.subscribe((b) => (isConnected = b));

    all_accounts.subscribe((all) => {
      account_list = all;
      pendingAccounts = all.filter((x) => !x.on_chain);
    });
    signingAccount.subscribe((a) => (my_account = a));
    miner_loop_enabled.subscribe((boo) => (isMining = boo));
    isRefreshingAccounts.subscribe((boo) => (isRefreshing = boo));
    is_initialized();
  });
</script>

<main>
  {#if isConnected}
    <div>
      {#if account_list == null}
        <div class="uk-align-center">
          <span uk-spinner class="uk-margin-left uk-position-absolute" />
        </div>
      {:else if account_list.length == 0}
        <Newbie />
      {:else}
        <div class="uk-flex uk-flex-center">
          <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
            Wallet
            {#if isRefreshing}
              <span uk-spinner class="uk-margin-left uk-position-absolute" />
            {/if}
          </h2>
        </div>

        <AccountsList {my_account} {account_list} {isMining} />

        <ReminderCreate {pendingAccounts} />

        <div uk-grid class="uk-flex uk-flex-center">
          <Link to={routes.keygen}>
            <button class="uk-button uk-button-secondary"> New Account </button>
          </Link>
          <Link to={routes.accountFromMnem}>
            <button class="uk-button uk-button-default"
              >Restore Account
            </button>
          </Link>
        </div>
      {/if}
    </div>
  {:else}
    <ConnectionError />
  {/if}
</main>
