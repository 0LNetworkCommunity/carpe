<script lang="ts">
  import { Link } from "svelte-navigator";
  import { get_all_accounts, all_accounts, account } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import AccountFromMnem from "./AccountFromMnem.svelte";
  import { onMount } from "svelte";

  let account_list: AccountEntry[];

  all_accounts.subscribe((a) => {
    account_list = a;
  });

  function setAccount(an_address) {
    account.set(an_address);
  }

  onMount(() => {
    get_all_accounts();
  });
</script>

<main>
  <h1>Wallet</h1>
  <div>
    <!-- <Link to="add-account">
      <button class="uk-button uk-button-primary uk-align-right"> Track Account </button>
    </Link> -->

    <Link to="account-from-mnem">
      <button class="uk-button uk-button-primary uk-align-right">
        Add Keys
      </button>
    </Link>
  </div>
  {#if !account_list}
    <p>loading...</p>
  {:else if account_list.length == 0}
    <p>Add your first account</p>
    <AccountFromMnem />
  {:else}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Address</th>
          <th>Authkey</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as a}
          <tr on:click={() => { setAccount(a.account);}}>
            <!-- <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a > -->

            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.authkey}</td>
            <td>{a.balance}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
