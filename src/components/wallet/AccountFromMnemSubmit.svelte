<script lang="ts">
  import { navigate } from "svelte-navigator";
  import UIkit from "uikit";
  import { responses } from "../../debug";
  import {
    signingAccount,
    mnem,
    isInit,
  } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { invoke } from "@tauri-apps/api/tauri";
  import { notify_success } from "../../carpeNotify";
  import { onMount } from "svelte";
  import { connected, refreshWaypoint } from "../../networks";
  import { addNewAccount, isCarpeInit, refreshAccounts } from "../../accountActions";

  export let danger_temp_mnem: string;
  export let other_address: string;

  export let isNewAccount: boolean = true;

  onMount(async () => {
    mnem.subscribe((m) => (danger_temp_mnem = m));
  });

  // const re = /[0-9A-Fa-f]{32}/g;

  function openConfirmationModal() {
    UIkit.modal("#submit-confirmation-modal").show();
  }

  let isSubmitting = false;
  function handleAdd() {
    isSubmitting = true;
    // submit
    invoke("init_from_mnem", { mnem: danger_temp_mnem.trim(), otherAddress: other_address.trim() })
      .then((res: AccountEntry) => {
        if (isNewAccount) {
          UIkit.modal("#submit-confirmation-modal").$destroy(true); // known bug https://github.com/uikit/uikit/issues/1370
          addNewAccount(res);
        }
        responses.set(JSON.stringify(res));
        signingAccount.set(res);
        isSubmitting = false;
        notify_success(`Account Added: ${res.nickname}`);

        // get the account balance. Also so that the menu displays right a way.
        refreshAccounts();

        // set as init so we don't get sent back to Newbie account creation.
        isInit.set(true);
        isCarpeInit();

        // refresh waypoint check connection status of `connected`.
        connected.set(true); // provisionally set to true so we don't get flashed an error page.
        refreshWaypoint();

        
        navigate("/");
      })
      .catch((error) => {
        if (isNewAccount) {
          UIkit.modal("#submit-confirmation-modal").hide();
        }
        isSubmitting = false;
        raise_error(error, false, "handleAdd");
      });
  }
</script>

  {#if isNewAccount}
    <button
      class="uk-button uk-button-secondary uk-margin-small-right"
      disabled={isSubmitting}
      type="button"
      on:click|preventDefault={openConfirmationModal}
      >Create This Account</button
    >

    <div id="submit-confirmation-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title uk-text-uppercase uk-text-alert">
          Heads Up!
        </h2>
        <p>Are you sure you wrote down your mnemonic phrase?</p>
        <p>
          You won't be able to recover your account without it. No one can help
          you if lose it.
        </p>
        <p>This is the last opportunity to write it down.</p>
        <p class="uk-text-right">
          <button
            class="uk-button uk-button-default uk-modal-close"
            type="button"
            disabled={isSubmitting}
          >
            Let me check again
          </button>
          <button
            class="uk-button uk-button-primary"
            type="button"
            disabled={isSubmitting}
            on:click|preventDefault={handleAdd}
          >
            {#if isSubmitting}
              Submitting...
            {:else}
              Submit Now
            {/if}
          </button>
        </p>
      </div>
    </div>
  {:else}
    <button
      class="uk-button uk-button-primary"
      type="button"
      disabled={isSubmitting}
      on:click|preventDefault={handleAdd}
    >
      {#if isSubmitting}
        Submitting...
      {:else}
        Submit
      {/if}
    </button>
  {/if}
