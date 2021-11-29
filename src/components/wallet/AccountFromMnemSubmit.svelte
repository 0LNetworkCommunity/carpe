<script lang="ts">
  import { Link, navigate } from "svelte-navigator";
  import UIkit from "uikit";
  import { responses } from "../../debug";
  import { signingAccount, mnem } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { invoke } from "@tauri-apps/api/tauri";

  export let danger_temp_mnem: string;
  export let action: string = "none";

  mnem.subscribe((m) => danger_temp_mnem = m);

  const re = /[0-9A-Fa-f]{32}/g;

  let isSubmitting  = false;
  function handleAdd() {
    isSubmitting = true;

    // submit
    invoke("init_from_mnem", { mnem: danger_temp_mnem })
      .then((res: AccountEntry) => {
        if (action == "open modal") { 
          UIkit.modal("#submit-confirmation-modal").hide() 
        };
        isSubmitting  = false;
        responses.set(JSON.stringify(res));
        signingAccount.set(res);

        UIkit.notification({
          message: `Account Added: ${res.account}`,
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
        navigate("/");
      })
      .catch((error) => {
        if (action == "open modal") { 
          UIkit.modal("#submit-confirmation-modal").hide() 
        };
        isSubmitting  = false;
        raise_error(error)
      });
  }
</script>

{#if action == "open modal"}   
  <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #submit-confirmation-modal">Submit</button>

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



  