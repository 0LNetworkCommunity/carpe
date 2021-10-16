<script lang="ts">
  import { Link } from "svelte-navigator";
  // import AccountFromMnem from "./AccountFromMnem.svelte";
  // const invoke = window.__TAURI__.invoke;
  import {get_all_accounts, all_accounts} from "../../accounts"
  
  // TODO: consolidate in accounts.ts
  let account_list;
  // invoke('get_all_accounts')
  //   .then((result) => accounts = result.accounts)
  //   .catch((error) => window.alert(error));
  get_all_accounts();
  all_accounts.subscribe(a => {
    account_list = a;
  })

</script>

<main>
  <h1>Wallet</h1>
  <div>
    <!-- <Link to="add-account">
      <button class="uk-button uk-button-primary uk-align-right"> Track Account </button>
    </Link> -->

    <Link to="account-from-mnem">
      <button class="uk-button uk-button-primary uk-align-right"> Add Keys </button>
    </Link>

  </div>
  {#if !account_list}
    <p>loading...</p>
  {:else if account_list.length == 0}
    <p>Add your first account</p>
  {:else}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Title</th>
          <th>Address</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as account}
          <tr>
            <td>{account.title}</td>
            <td>{account.address}</td>
            <td>{account.balance}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
