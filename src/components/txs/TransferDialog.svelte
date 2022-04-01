<script lang="ts">
  import { _ } from "svelte-i18n";
  import { responses } from "../../debug";
  import { notify_success } from "../../carpeNotify";
  import { invoke } from "@tauri-apps/api/tauri";
  import UIkit from 'uikit';
  import { printScaledCoins } from "../../coinHelpers";

  export let account;
  export let onSuccess = () => {};

  let receiver;
  let amount = null;
  let errorMessage = "";
  let waitingTxs = false;
  let waitingConfirmation = false;

  const re = /[0-9A-Fa-f]{32}/g;
  $: isReceiverValid = receiver && re.test(receiver.trim());
  $: isValidAmount = amount > 0;

  const transferCoins = () => {
    waitingTxs = true;

    invoke("coin_transfer", { receiver: receiver.trim(), amount })
      .then((res) => {
        responses.set(JSON.stringify(res));
        notify_success("Coin transfer executed");
        waitingTxs = false;
        amount = null;
        receiver = null;
        // callback
        onSuccess();
        // close modal
        let dialog = document.getElementById("coinTransferDialog");
        UIkit.modal(dialog).hide();
      })
      .catch((error) => {
        console.log(">>> error: " + error);
        errorMessage = error.msg;
        waitingTxs = false;
      });
  }
  
  const cancelClick = () => {
    waitingConfirmation = false;
  }

  const confirmClick = () => {
    waitingConfirmation = false;
    transferCoins();
  }

</script>

<main>
  <div id="coinTransferDialog" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      {#if waitingConfirmation}
        <h2 class="uk-modal-title">Heads up</h2>
        <p>Please confirm your transfer information:</p>
        <p>SENDER: <span class="uk-text-bold">{account.account}</span></p>
        <p>RECEIVER: <span class="uk-text-bold">{receiver}</span></p>
        <p>AMOUNT: <span class="uk-text-bold">{printScaledCoins(amount)}</span></p>
    
        <p class="uk-text-right">
            <button on:click={cancelClick} class="uk-button uk-button-default uk-margin-right" type="button">Cancel</button>
            <button on:click={confirmClick} class="uk-button uk-button-primary" type="button">Confirm</button>
        </p>
      {:else}
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
                  disabled={waitingTxs}
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
                  disabled={waitingTxs}
                  class="uk-input"
                  type="number"
                  placeholder={$_("txs.transfer.amount_placeholder")}
                  bind:value={amount}
                />
              </div>
            </div>
            <p class="uk-text-warning">{errorMessage}</p>
            <div class="uk-align-right">
              {#if waitingTxs}
                <span uk-spinner="ratio: 0.8" style="margin: 0px 10px 0px 0px"/>
              {/if}
              <button class="uk-button uk-button-default uk-modal-close uk-margin-right">
                {$_("txs.transfer.btn_cancel")}
              </button>
              <button
                on:click={() => waitingConfirmation = true}
                disabled={waitingTxs || !isValidAmount || !isReceiverValid}
                class="uk-button uk-button-primary"
              >
                {waitingTxs ? $_("txs.transfer.await") : $_("txs.transfer.btn_transfer")}
              </button>
            </div>
          </fieldset>
        </form>
      {/if}
    </div>
  </div>
</main>
