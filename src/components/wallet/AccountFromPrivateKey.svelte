<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { _ } from "svelte-i18n";
    import { responses } from "../../debug";
    import { signingAccount } from "../../accounts";
    import { notify_success } from "../../carpeNotify";
    import { loadAccounts } from "../../accountActions";
    import { raise_error } from "../../carpeError";
  
  let danger_temp_private_key: string;

  const submit_private_key = async (private_key: string) => {
    invoke("init_from_private_key", { private_key })
      .then((res) => {
        responses.set(JSON.stringify(res));
        signingAccount.set(res);
        // isSubmitting = false;
        notify_success(`Account Added: ${res.nickname}`);

        // load the account restored localy right away. Balance may takes few seconds to be fetched from the chain.
        loadAccounts();
      })
      .catch((err) => {
        raise_error(err, false, "handleAdd");
      })
    }
</script>

<main>  
  <p> {$_("wallet.account_from_private.description")}</p>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="{$_("wallet.account_from_private.placeholder")}"
          bind:value={danger_temp_private_key}
        />
      </div>
    </fieldset>
  </form>

  <button
    class="uk-button uk-button-primary"
    type="button"
    on:click|preventDefault={submit_private_key(danger_temp_private_key)}
  >
</main>
