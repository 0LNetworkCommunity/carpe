<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import AccountAdd from './AccountAdd.svelte';
  
  // const invoke = window.__TAURI__.invoke
  // invoke('first_fun').then((message) => console.log(message))

  function handleAddClick() {
    console.log('click');
    invoke('hello').then((message) => console.log(message))

  }
</script>

<main>
  <AccountAdd></AccountAdd>
  <h1>Wallet
    <a on:click={handleAddClick} id="#modal-account-add" class="uk-button uk-button-default" uk-toggle>Add Account</a>
  </h1>
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th>Title</th>
        <th>Address</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Save the World</td>
        <td>44444444444444444444444444444444</td>
        <td>36,522</td>
      </tr>
      <tr>
        <td>Build a chain</td>
        <td>55555555555555555555555555555555</td>
        <td>42,000</td>
      </tr>
    </tbody>
  </table>
</main>
