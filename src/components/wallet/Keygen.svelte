<script lang="ts">
  import { onMount } from "svelte";
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

  onMount(async () => {
    mnem.subscribe((m) => (display_mnem = m));
    signingAccount.subscribe((a) => {
      address = a.account;
      authkey = a.authkey;
    });
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
      .catch((e) => raise_error(e, true));
  };
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
      Create New Account
    </h2>
  </div>

  <div class="uk-flex uk-flex-center">
    <h3 class="uk-text-light uk-text-muted uk-text-center">
      After you generate an account and secret phrase, you'll need someone to send one 0L coin to that account for it to be created on chain.
    </h3>
  </div>

  {#if address && !hide}

    <div class="uk-margin uk-card uk-card-default uk-card-body uk-text-muted">
      <h5 class="uk-text-muted uk-text-uppercase">ACCOUNT ADDRESS</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{address}</p>
      <h5 class="uk-text-muted uk-text-uppercase">ONBOARDING KEY</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{authkey}</p>
      <p>This also known as an Auth Key. For now you'll need this to be able to create the account on chain.</p>

      <h5 class="uk-text-muted uk-text-uppercase uk-text-danger">
        SECRET RECOVERY PHRASE
      </h5>
      <p class="uk-text-danger">
        This is your secret account password (mnemonic), if you lose it no one can help you. Write it down now.
      </p>
      <div class="uk-margin">
        <textarea class="uk-textarea" rows="3" readonly>{display_mnem}</textarea>
      </div>
    </div>

    <div>
      <p>
        Your account does not exist yet on chain. You'll need to give someone
        your Onboarding Key (above) so that they can add your account on the
        0L chain.
      </p>
    </div>

    <div>
      <AccountFromMnemSubmit danger_temp_mnem={""} action="open modal" />

      <button
        class="uk-button uk-button-default uk-align-right"
        on:click={keygen}
      >
        Generate Different Keys
      </button>
    </div>

  {:else}

    <div class="uk-position-center">
      <button
        class="uk-button uk-button-secondary uk-align-right"
        on:click={keygen}
      >
        Generate Keys
      </button>
    </div>
  {/if}
</main>
