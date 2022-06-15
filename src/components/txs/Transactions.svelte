<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import { signingAccount } from "../../accounts";
  import OnboardDialog from "./OnboardDialog.svelte";
  import { printCoins } from "../../coinHelpers";
  import { checkSigningAccountBalance } from "../../accountActions";
  import TransferDialog from "./TransferDialog.svelte";

  let account;
  let unsubs;

  onMount(async () => {
    unsubs = signingAccount.subscribe(obj => account = obj)
  });

  onDestroy(async () => {
    unsubs && unsubs();
  });

  const onSuccess = () => {
    checkSigningAccountBalance();
  }

</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light carpe-titles">{$_("nav.transactions")}</h2>
  </div>

  <!-- Account info -->
  {#if account}
    <div style="display:none;">
      {window.remove_spin_loading_to_logo()}
    </div>
    <div class="uk-text-center carpe-card">
      <div class="uk-section">
        <h4 class="uk-text-muted">
          <span> {$_("txs.account")}: </span>
          <span class="carpe-address-hightlight">{account.account}</span>

        </h4>
        <h4 class="uk-text-muted">
          <span>{$_("txs.balance")}: </span>
          <span class="carpe-address-hightlight">{printCoins(account.balance)}</span>
        </h4>
      </div>
    </div>
    
    <div uk-grid class="carpe-tabs uk-flex uk-flex-center">
      <button uk-toggle="target: #onboardDialog" class="uk-margin-bottom uk-button uk-button-default uk-margin-right uk-">{$_("txs.btn_onboard")}</button>
      <button uk-toggle="target: #coinTransferDialog" class="uk-margin-bottom uk-button uk-button-secondary">{$_("txs.btn_transfer")}</button>
    </div>
    <OnboardDialog {account} {onSuccess}/>
    <TransferDialog {account} {onSuccess}/>
  {:else}
  <div style="display:none;">
    {window.add_spin_loading_to_logo()}
  </div>
  {/if}
</main>