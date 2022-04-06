<script lang="ts">
  import { _ } from "svelte-i18n";

  const dummyList = [
    { isSelected: true, nick: "999", account: "00000000000000000000000000000000", authkey: "00000", balance: 100 },
    { isSelected: false, nick: "999", account: "00000000000000000000000000000000", authkey: "00000", balance: 100 },
    { isSelected: false, nick: "999", account: "00000000000000000000000000000000", authkey: "00000", balance: 100 }
  ]
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("wallet.wallet")}</h2>
  </div>
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th></th>
        <th><span class="dummy-container">{$_("wallet.account_list.nickname")}</span></th>
        <th><span class="dummy-container">{$_("wallet.account_list.address")}</span></th>
        <th><span class="dummy-container">{$_("wallet.account_list.authkey")}</span></th>
        <th class="uk-text-right"><span class="dummy-container">{$_("wallet.account_list.balance")}</span></th>
      </tr>
    </thead>
    <tbody>
      {#each dummyList as obj}
        <tr>
          <td><span class="dummy-container">{#if obj.isSelected}XX{/if}</span></td>
          <td><span class="dummy-container">{obj.nick}</span></td>
          <td><span class="dummy-container">{obj.account}</span></td>
          <td><span class="dummy-container">{obj.authkey}...</span></td>
          <td class="uk-text-right"><span class="dummy-container">{obj.balance}</span></td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  .dummy-container {
    background-color: #F0F0F0;
    color: #F0F0F0;
  }
</style>