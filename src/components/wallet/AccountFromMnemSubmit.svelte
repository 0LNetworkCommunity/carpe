<script lang="ts">
  import { _ } from "svelte-i18n";
  import { navigate } from "svelte-navigator";
  import { responses } from "../../debug";
  import { signingAccount, mnem, isInit } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { invoke } from "@tauri-apps/api/tauri";
  import { notify_success } from "../../carpeNotify";
  import { onDestroy, onMount } from "svelte";
  import { connected, scanning_fullnodes } from "../../networks";
  import { addNewAccount, loadAccounts } from "../../accountActions";
  import UIkit from "uikit";
  import { carpeTick } from "../../tick";

  export let danger_temp_mnem: string;
  export let isNewAccount: boolean = true;

  let unsubs;

  onMount(async () => {
    unsubs = mnem.subscribe((m) => (danger_temp_mnem = m));
  });

  onDestroy(async () => {
    unsubs && unsubs();
  });

  // const re = /[0-9A-Fa-f]{32}/g;

  function openConfirmationModal() {
    UIkit.modal("#submit-confirmation-modal").show();
  }

  let isSubmitting = false;
  function handleAdd() {
    isSubmitting = true;

    // submit
    invoke("init_from_mnem", { mnem: danger_temp_mnem.trim() })
      .then((res: AccountEntry) => {
        if (isNewAccount) {
          UIkit.modal("#submit-confirmation-modal").$destroy(true); // known bug https://github.com/uikit/uikit/issues/1370
          addNewAccount(res);
        }
        responses.set(JSON.stringify(res));
        signingAccount.set(res);
        isSubmitting = false;
        notify_success(`Account Added: ${res.nickname}`);

        // load the account restored localy right away. Balance may takes few seconds to be fetched from the chain.
        loadAccounts();

        // set as init so we don't get sent back to Newbie account creation.
        isInit.set(true);
        connected.set(true); // provisionally set to true so we don't get flashed an error page.
        scanning_fullnodes.set(false);
        carpeTick()
          .then(() => {
            navigate("/");
          })
          .catch((e) => {
            raise_error(e, true, "carpeTick");
          });

        // navigate("/");
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
  >
    {$_("wallet.keygen.btn_create_account")}
  </button>

  <div id="submit-confirmation-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title uk-text-uppercase uk-text-alert">
        {$_("wallet.account_from_mnem_submit.title")}
      </h2>
      <p>{@html $_("wallet.account_from_mnem_submit.body")}</p>
      <p class="uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
          disabled={isSubmitting}
        >
          {$_("wallet.account_from_mnem_submit.btn_cancel")}
        </button>
        <button
          class="uk-button uk-button-primary"
          type="button"
          disabled={isSubmitting}
          on:click|preventDefault={handleAdd}
        >
          {#if isSubmitting}
            {$_("wallet.account_from_mnem_submit.btn_submiting")}
          {:else}
            {$_("wallet.account_from_mnem_submit.btn_submit")}
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
      {$_("wallet.account_from_mnem_submit.btn_submiting")}...
    {:else}
      {$_("wallet.account_from_mnem_submit.btn_submit")}
    {/if}
  </button>
{/if}
