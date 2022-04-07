<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { signingAccount, mnem } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";

  interface NewKeygen {
    entry: AccountEntry;
    mnem: string;
  }

  let display_mnem: string;
  let address: string;
  let authkey: string;

  let unsubsMnem;
  let unsubsSigningAccount;

  onMount(async () => {
    unsubsMnem = mnem.subscribe((m) => (display_mnem = m));
    unsubsSigningAccount = signingAccount.subscribe((a) => {
      address = a.account;
      authkey = a.authkey;
    });
  });

  onDestroy(async () => {
    unsubsMnem && unsubsMnem();
    unsubsSigningAccount && unsubsSigningAccount();
  });

  let hide = true;
  const keygen = async () => {
    invoke("keygen", {})
      .then((res: NewKeygen) => {
        console.log(res);
        responses.set(JSON.stringify(res));
        signingAccount.set(res.entry);
        mnem.set(res.mnem);
        hide = false;
      })
      .catch((e) => raise_error(e, true, "keygen"));
  };
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h3 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_("wallet.keygen.title")}
    </h3>
  </div>

  {#if address && !hide}

    <div class="uk-margin uk-card uk-card-default uk-card-body uk-text-muted">
      <h5 class="uk-text-muted uk-text-uppercase">{$_("wallet.keygen.account_address")}</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{address}</p>
      <h5 class="uk-text-muted uk-text-uppercase">{$_("wallet.keygen.onboard_key")}</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{authkey}</p>
      <p>{$_("wallet.keygen.onboard_key_description")}</p>

      <h5 class="uk-text-muted uk-text-uppercase uk-text-danger">
        {$_("wallet.keygen.securite_recovery_phrase")}
      </h5>
      <p class="uk-text-danger">
        {$_("wallet.keygen.securite_note")}
      </p>
      <div class="uk-margin">
        <textarea class="uk-textarea" rows="3" readonly>{display_mnem}</textarea>
      </div>
    </div>

    <div>
      <p>
        {$_("wallet.keygen.account_tips")}
      </p>
    </div>

    <div>
      <AccountFromMnemSubmit danger_temp_mnem={""} />

      <button
        class="uk-button uk-button-default uk-align-right"
        on:click={keygen}
      >
      {$_("wallet.keygen.btn_generate_keys_2")}
      </button>
    </div>

  {:else}

    <div class="uk-flex uk-flex-center">
      <h3 class="uk-text-light uk-text-muted uk-text-center">
        {$_("wallet.keygen.description")}
      </h3>
    </div>

    <div class="uk-position-center">
      <button
        class="uk-button uk-button-secondary uk-align-right"
        on:click={keygen}
      >
      {$_("wallet.keygen.btn_generate_keys")}
      </button>

    </div>
  {/if}
</main>
