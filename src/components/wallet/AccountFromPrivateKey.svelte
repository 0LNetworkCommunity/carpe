<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { _ } from "svelte-i18n";
    import { responses } from "../../debug";
    import { AccountEntry, signingAccount } from "../../accounts";
    import { notify_success } from "../../carpeNotify";
    import { addNewAccount, loadAccounts } from "../../accountActions";
    import { raise_error } from "../../carpeError";
    import { scanning_fullnodes } from "../../networks";
    import { carpeTick } from "../../tick";
    import { navigate } from "svelte-navigator";
  
  let danger_temp_private_key: string;

  const submit_private_key = async (priKeyString: string) => {
    invoke("init_from_private_key", { priKeyString })
      .then((res: AccountEntry) => {
        responses.set(JSON.stringify(res));
        signingAccount.set(res);
        // isSubmitting = false;
        notify_success(`Account Added: ${res.nickname}`);

        addNewAccount(res);

        // load the account restored localy right away. Balance may takes few seconds to be fetched from the chain.
        loadAccounts();
        
        scanning_fullnodes.set(false);
        carpeTick()
          .then(() => {
            navigate("/");
          })
          .catch((e) => {
            raise_error(e, true, "carpeTick");
          });

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
  > Submit Now </button>
</main>
