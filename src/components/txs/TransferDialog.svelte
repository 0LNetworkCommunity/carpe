<script lang="ts">
  import { _ } from "svelte-i18n";
  import { responses } from "../../debug";
  import { notify_success } from "../../carpeNotify";
  import { invoke } from "@tauri-apps/api/tauri";
  import UIkit from 'uikit';

  export let account;
  export let onSuccess = () => {};

  let receiver;
  let amount = 0;
  let errorMessage = "";
  let waiting = false;

  const transferCoins = (receiver, amount) => {
    waiting = true;

    invoke("transfer_coins", { receiver, amount })
      .then((res) => {
        responses.set(JSON.stringify(res));
        notify_success("Coin transfer executed");
        waiting = false;
        amount = null;
        receiver = null;
        // callback
        onSuccess();
        // close modal
        let dialog = document.getElementById("coinTransferDialog");
        UIkit.modal(dialog).hide();
      })
      .catch((error) => {
        errorMessage = error.msg;
        waiting = false;
      });
  }

</script>

<main>
  <div id="coinTransferDialog" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{$_("txs.transfer.title")}</h2>
    
      <form id="account-form">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <label class="uk-form-label" for="sender-text">{$_("txs.transfer.sender")}</label>
            <div class="uk-form-controls uk-width-1-1">
              <input
                id="sender-text"
                class="uk-input"
                type="text"
                value={account.account}
                style="pointer-events:none"
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="receiver-text">{$_("txs.transfer.receiver")}</label>
            <div class="uk-form-controls uk-width-1-1">
              <input
                id="receiver-text"
                autofocus
                class="uk-input"
                type="text"
                placeholder={$_("txs.transfer.receiver_placeholder")}
                bind:value={receiver}
              />
            </div>
          </div>
          <div class="uk-margin">
            <label class="uk-form-label" for="amount-text">Amount</label>
            <div class="uk-form-controls uk-width-1-1">
              <!-- add mask -->
              <input
                id="amount-text"
                class="uk-input"
                type="number"
                placeholder={$_("txs.transfer.amount_placeholder")}
                bind:value={amount}
              />
            </div>
          </div>
          <p class="uk-text-warning">{errorMessage}</p>
          <div class="uk-align-right">
            {#if waiting}
              <span uk-spinner="ratio: 0.8" style="margin: 0px 10px 0px 0px"/>
            {/if}
            <button class="uk-button uk-button-default uk-modal-close uk-margin-right">
              {$_("txs.transfer.btn_cancel")}
            </button>
            <button
              on:click={() => transferCoins(receiver, amount)}
              disabled={waiting || !amount || !receiver}
              class="uk-button uk-button-primary" id="create-acc" 
            >
              {waiting ? $_("txs.transfer.await") : $_("txs.transfer.btn_transfer")}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</main>
