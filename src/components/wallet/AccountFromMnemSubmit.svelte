<script lang="ts">
  import { Link, navigate } from "svelte-navigator";
  import UIkit from "uikit";
  import { responses } from "../../debug";
  import { signingAccount, mnem, addNewAccount, addRestoredAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { invoke } from "@tauri-apps/api/tauri";

  export let danger_temp_mnem: string;
  export let isNewAccount: boolean = true;

  mnem.subscribe((m) => danger_temp_mnem = m);

  const re = /[0-9A-Fa-f]{32}/g;

  function openConfirmationModal() {
    UIkit.modal("#submit-confirmation-modal").show() 
  }

  let isSubmitting  = false;
  function handleAdd() {
    isSubmitting = true;

    // submit
    invoke("init_from_mnem", { mnem: danger_temp_mnem })
    .then((res: AccountEntry) => {
        if (isNewAccount) { 
          // UIkit.modal("#submit-confirmation-modal").hide() 
          UIkit.modal('#submit-confirmation-modal').$destroy(true); // known bug https://github.com/uikit/uikit/issues/1370
          addNewAccount(res);
        } else {
          addRestoredAccount(res);
        }
        responses.set(JSON.stringify(res));
        signingAccount.set(res);       
        isSubmitting = false;

        UIkit.notification({
          message: `<span uk-icon='icon: check'></span>Account Added: ${res.nickname}`,
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
        
        navigate("/");
      })
      .catch((error) => {
        if (isNewAccount) { 
          UIkit.modal("#submit-confirmation-modal").hide() 
        };
        isSubmitting  = false;
        raise_error(error)
      });
  }
</script>

{#if isNewAccount}   
  <button class="uk-button uk-button-default uk-margin-small-right" disabled={isSubmitting} type="button" on:click|preventDefault={openConfirmationModal}>Submit</button>

  <div id="submit-confirmation-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Heads Up!</h2>
      <p>Are you sure you wrote down your mnemonic key?</p>
      <p>Remember that you won't be able to recover your account without it. No one can help you if loose it.</p>
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
