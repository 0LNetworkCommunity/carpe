<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { responses } from "../../debug";
    import UIkit from "uikit";
    import { notify_success } from "../../carpeNotify";
    import { raise_error } from "../../carpeError";

    let destinationAddress = ""
    let transferAmount
    let isWaiting = false
    let isTransferInputValid

    $: isTransferInputValid = (destinationAddress.length == 32) && (Number(transferAmount) > 0)

    function balanceTransfer() {
        isWaiting = true
        invoke("balance_transfer", {
            address: destinationAddress,
            coins: transferAmount
        })
            .then((res: string) => {
                responses.set(res);
                notify_success("Tx successfully");
                isWaiting = false
            })
            .catch(e => {
                raise_error(e, false, "balanceTransfer");
                isWaiting = false
            })
    }
    function openTransferForm() {
        UIkit.modal("#balance-transfer-modal").show()
    }
</script>

<main>
    <div>
        <button class="uk-button uk-button-default" on:click={openTransferForm}> BALANCE TRANSFER </button>
    </div>
    <div id="balance-transfer-modal">
        <div class="uk-modal-dialog uk-modal-body">
            <form id="transfer-form">
                <fieldset class="uk-fieldset">
                    <div class="uk-margin uk-inline-block uk-width-1-1">
                        <span> Destination address</span>
                        <input
                                class="uk-input"
                                type="text"
                                bind:value={destinationAddress}
                        />
                    </div>
                    <div class="uk-margin uk-inline-block uk-width-1-1">
                        <span> Amount </span>
                        <input
                                class="uk-input"
                                type="number"
                                bind:value={transferAmount}
                        />
                    </div>
                    <div>
                        <button
                                class="uk-button uk-button-primary uk-align-right"
                                type="button"
                                disabled={isWaiting || !isTransferInputValid}
                                on:click|preventDefault={balanceTransfer}
                        >
                            {#if isWaiting}
                                Awaiting Tx
                            {:else}
                                Transfer
                            {/if}
                        </button>
                        <button
                                class="uk-button uk-button-default uk-align-right uk-modal-close"
                                type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</main>
