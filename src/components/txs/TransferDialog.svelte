<script lang="ts">
  import { _ } from "svelte-i18n";
  import { responses } from "../../debug";
  import { notify_success } from "../../carpeNotify";
  import { invoke } from "@tauri-apps/api/tauri";
  import UIkit from 'uikit';
  import { unscaledCoins, printUnscaledCoins, printCoins } from "../../coinHelpers";

  export let account;
  export let onSuccess = () => {};

  const errorDic = {
    "120127": $_("txs.transfer.error_slow_wallet"),
    "1004": $_("txs.transfer.error_account_does_not_exist"),
  }

  let receiver;
  let amountInput;
  let amount = 0;
  let amountFormatted = "";
  let errorMessage = "";
  let waitingTxs = false;
  let waitingConfirmation = false;

  const re = /[a-fA-F0-9]{32}/i;

  $: isReceiverValid = receiver && re.test(receiver) && receiver != account.account;
  $: isValidAmount = amount > 0 && amount < unscaledCoins(account.balance);
  $: checkMessage = amount > unscaledCoins(account.balance)
    ? $_("txs.transfer.error_amount_greater_than_balance")
    : receiver && receiver.toUpperCase() == account.account.toUpperCase()
      ? $_("txs.transfer.error_receiver_equals_sender")
      : "";

  const transferCoins = () => {
    waitingTxs = true;

    invoke("coin_transfer", { receiver: receiver.trim(), amount })
      .then((res) => {
        responses.set(JSON.stringify(res));
        notify_success($_("txs.transfer.success"));
        waitingTxs = false;
        amount = null;
        amountFormatted = "";
        receiver = null;
        // callback
        onSuccess();
        // close modal
        UIkit.modal('#coinTransferDialog').hide();
      })
      .catch((error) => {
        errorMessage = errorDic[error.msg] 
          ? errorDic[error.msg] 
          : $_("txs.transfer.failed", { values: { code: error.msg }});
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

  const handleChange = () => {
    let cleanedInput = amountInput.value
      .replace(/\D*/gm, '') // remove non digits
      .replace(/^0+/gm, ''); // remove leading zeros 

    if (cleanedInput.length === 0 ) {
      amount = 0;
      amountFormatted = '';
    } else {
      amount = parseInt(cleanedInput);
      amountFormatted = printUnscaledCoins(amount, 0, 0);
    }
  };

</script>

<main>
  <div id="coinTransferDialog" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      {#if waitingConfirmation}
        <h2 class="uk-modal-title uk-text-muted">{$_("txs.transfer.confirm_title")}</h2>
        <p>{$_("txs.transfer.please_confirm")}</p>
        <p class="uk-text-uppercase">{$_("txs.transfer.sender")}: <span class="uk-text-bold">{account.account}</span></p>
        <p class="uk-text-uppercase">{$_("txs.transfer.receiver")}: <span class="uk-text-bold">{receiver}</span></p>
        <p class="uk-text-uppercase">{$_("txs.transfer.amount")}: <span class="uk-text-bold">{printUnscaledCoins(amount)}</span></p>
    
        <p class="uk-text-right">
            <button on:click={cancelClick} class="uk-button uk-button-default uk-margin-right" type="button">{$_("txs.transfer.btn_cancel")}</button>
            <button on:click={confirmClick} class="uk-button uk-button-primary" type="button">{$_("txs.transfer.btn_confirm")}</button>
        </p>
      {:else}
        <h2 class="uk-modal-title uk-text-muted uk-text-uppercase">{$_("txs.transfer.title")}</h2> 
        <form id="account-form">
          <fieldset class="uk-fieldset uk-grid-small" uk-grid>
            <div class="uk-width-3-4@s">
              <label class="uk-form-label" for="sender-text">{$_("txs.transfer.sender")}</label>
              <div class="uk-form-controls">
                <input
                  id="sender-text"
                  class="uk-input"
                  type="text"
                  value={account.account}
                  style="pointer-events:none"
                />
              </div>
            </div>
            <div class="uk-width-1-4@s">
              <label class="uk-form-label" for="balance-text">{$_("txs.transfer.balance")}</label>
              <div class="uk-form-controls">
                <input
                  id="balance-text"
                  class="uk-input"
                  type="text"
                  value={printCoins(account.balance)}
                  style="pointer-events:none"
                />
              </div>
            </div>
            <div class="uk-width-1-1">
              <label class="uk-form-label" for="receiver-text">{$_("txs.transfer.receiver")}</label>
              <div class="uk-form-controls">
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
            <div class="uk-width-1-1">
              <label class="uk-form-label" for="amount-text">{$_("txs.transfer.amount_label")}</label>
              <div class="uk-form-controls uk-width-1-1">
                <!-- add mask -->
                <input
                  id="amount-text"
                  disabled={waitingTxs}
                  class="uk-input"
                  type="text"
                  placeholder={$_("txs.transfer.amount_placeholder")}
                  bind:value={amountFormatted}
                  bind:this={amountInput}
                  on:input={handleChange}
                />
              </div>
            </div>
            <p class="uk-text-warning">{checkMessage || errorMessage}</p>
            <div class="uk-width-1-1">
              <div class="uk-align-right">
                {#if waitingTxs}
                  <span uk-spinner="ratio: 0.8" style="margin: 0px 10px 0px 0px"/>
                {/if}
                <button class="uk-button uk-button-default uk-modal-close uk-margin-right">
                  {waitingTxs ? $_("txs.transfer.btn_close") : $_("txs.transfer.btn_cancel")}
                </button>
                <button
                  on:click={() => waitingConfirmation = true}
                  disabled={waitingTxs || !isValidAmount || !isReceiverValid}
                  class="uk-button uk-button-primary"
                >
                  {waitingTxs ? $_("txs.transfer.await") : $_("txs.transfer.btn_next")}
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      {/if}
    </div>
  </div>
</main>
