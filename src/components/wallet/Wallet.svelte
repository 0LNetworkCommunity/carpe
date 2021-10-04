<script lang="ts">
  import { Link } from "svelte-navigator";
  const invoke = window.__TAURI__.invoke;
  
  let accounts;
  invoke('get_all_accounts')
    .then((result) => accounts = result.accounts)
    .catch((error) => window.alert(error));

</script>

<main>
  <h1>Wallet
    <Link to="add-account">
      <button class="uk-button uk-button-primary uk-align-right">Add Account</button>
    </Link>
  </h1>
  {#if !accounts}
    <p>loading...</p>
  {:else if accounts.length == 0}
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
        {#each accounts as account}
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
