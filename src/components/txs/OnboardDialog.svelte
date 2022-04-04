<script lang="ts">
  import { _ } from "svelte-i18n";
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import { notify_success } from "../../carpeNotify";
  import type { AccountEntry } from "../../accounts";
  import { onMount } from "svelte";
  import UIkit from 'uikit';

  export let account: AccountEntry;
  export let onSuccess = (_) => {};

  let errorMessage = "";
  let onboard_key;
  let waiting = false;

  onMount(() => {
    errorMessage = account && account.balance < 2000000 
      ? "Insuficient balance to onboard another account."
      : "";
  });
  
  function createUser() {
    waiting = true;
    // submit
    invoke("create_user_account", { authkey: onboard_key })
      .then((res) => {
        responses.set(JSON.stringify(res));
        notify_success("Account Added");
        waiting = false;
        onboard_key = null;
        onSuccess(account);
        UIkit.modal("#onboardDialog").hide();
      })
      .catch((error) => {
        errorMessage = error.msg;
        waiting = false;
      });
  }
</script>

<main>
  <div id="onboardDialog" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">{$_("txs.onboard.title")}</h2>
    
      <form id="account-form">
        <fieldset class="uk-fieldset">
          <div class="uk-margin uk-inline-block uk-width-1-1">
            <input
              class="uk-input"
              type="text"
              placeholder="Onboard Key"
              bind:value={onboard_key}
            />
          </div>
          <p class="uk-text-warning">{errorMessage}</p>
          <div class="uk-align-right">
            {#if waiting}
              <span uk-spinner="ratio: 0.8" style="margin: 0px 10px 0px 0px"/>
            {/if}
            <button class="uk-button uk-button-default uk-modal-close uk-margin-right">
              {$_("txs.onboard.btn_cancel")}
            </button>
            <button
              on:click={createUser}
              disabled={waiting || !onboard_key || account.balance < 2000000}
              class="uk-button uk-button-primary" id="create-acc" 
            >
              {waiting ? $_("txs.onboard.await") : $_("txs.onboard.btn_onboard")}
            </button>
          </div>
        </fieldset>
      </form>
  
      
    </div>
  </div>
</main>
