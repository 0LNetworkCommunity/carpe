<script lang="ts">
  
  import { onMount } from "svelte";
  import {
    signingAccount,
    loadAccounts,
    all_accounts,
    setAccount,
  } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { miner_loop_enabled } from "../../miner";
  import { Link } from "svelte-navigator";
  import { get_balance } from "../../queries";
  import ReminderCreate from "./ReminderCreate.svelte";
  import IconMining from '../icons/IconMining.svelte';
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { routes } from "../../routes";
  import AccountFromMnemForm from "./AccountFromMnemForm.svelte";
  
  UIkit.use(Icons);
  
  let my_account: AccountEntry;
  let account_list: AccountEntry[] = null;
  let pendingAccounts: AccountEntry[] = []; 
  let isMining = false; 

  onMount(async () => {
    loadAccounts();
    
    all_accounts.subscribe(all => {
      account_list = all;
      pendingAccounts = all.filter(x => !x.on_chain);
    });
    signingAccount.subscribe(a => my_account = a);
    miner_loop_enabled.subscribe(boo => isMining = boo);
  })

  function formatBalance(balance) {
    const balanceScaled = balance / 1000000
    return balanceScaled.toLocaleString('en-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

</script>

<main>
  {#if account_list == null}
    <span uk-spinner></span>
  {:else if account_list.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>Nickname</th>
          <th>Address</th>
          <th>Authkey</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as a, i}
          <tr
            class="{
              isMining && a.account == my_account.account
                ? 'uk-text-primary'
                : ''
              }"
            on:click={() => setAccount(a.account) }
          >
            <!-- <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a > -->
            <td>
              {#if a.account == my_account.account}
                {#if isMining} 
                  <IconMining />
                {:else}
                  <span uk-icon="user" />
                {/if}
              {/if}
            </td>
            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.authkey.slice(0, 5)}...</td>
            {#if a.on_chain == null}
              offline... 
            {:else if a.on_chain}
              <td>{formatBalance(a.balance)}</td>
            {:else if a.on_chain == undefined}
              loading...
            {:else}
              <td>Account Not On Chain</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>

    <ReminderCreate pendingAccounts={pendingAccounts}/>
  {:else}
    <!-- <Onboard /> -->
  {/if}

  <div uk-grid class="uk-flex uk-flex-center">
    <Link to={routes.keygen}>
      <button class="uk-button uk-button-secondary"> New Account </button>
    </Link>
    <Link to={routes.accountFromMnem}>
      <button class="uk-button uk-button-default">Restore Account </button>
    </Link>
  </div>  
</main>
