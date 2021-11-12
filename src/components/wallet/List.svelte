<script lang="ts">

  import {
    signingAccount,
    getAllAccounts,
    all_accounts,
    setAccount,
  } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { get_balance } from "../../queries";
  import ReminderCreate from "./ReminderCreate.svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  UIkit.use(Icons);

  let account_list: AccountEntry[] = [];
  let pendingAccounts: AccountEntry[] = [];

  let my_account: AccountEntry;

  all_accounts.subscribe((a) => {
    account_list = a;
    console.log(a);
    pendingAccounts = a.filter(x => !x.on_chain);
  });

  signingAccount.subscribe((a) => {
    my_account = a;
  });

  async function bal(i): Promise<number> {
    let n = await get_balance(account_list[i]);
    console.log(n);
    return n / 1000000; // NOTE: divide by scaling factor. 
    // TODO: Rust should have already returned the scaled value.
  }

  onMount(() => {
    getAllAccounts();
  });
</script>

<main>
  {#if !account_list}
   LOADING
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
            on:click={() => {
              setAccount(a.account);
            }}
          >
            <!-- <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a > -->
            <td>
              {#if a.account == my_account.account}
                <span uk-icon="user" />
              {/if}
            </td>
            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.authkey.slice(0, 5)}...</td>
            {#if a.balance }
            <td>{a.balance}</td>
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
    <Link to="keygen">
      <button class="uk-button uk-button-secondary"> New Account </button>
    </Link>
    <Link to="account-from-mnem">
      <button class="uk-button uk-button-default">Restore Account </button>
    </Link>
  </div>  
</main>
