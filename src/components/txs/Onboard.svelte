<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { Link } from "svelte-navigator";
  import { raise_error } from "../../carpeError";
  import type { CarpeError } from "../../carpeError";
  import { responses } from "../../debug";
  import { routes } from "../../routes";
  import { notify_success } from "../../carpeNotify";
  import { onMount } from "svelte";
  import CardError from "../layout/CardError.svelte";
  import { displayInsufficientBalance } from "../../carpeErrorUI";
import { _ } from "svelte-i18n";

  let onboard_key;
  let noBalance = false;
  let waiting = false;

  function createUser() {
    waiting = true;
    // submit
    invoke("create_user_account", { authkey: onboard_key })
      .then((res) => {
        responses.set(JSON.stringify(res));

        // TODO move to an account controller
        // init_account_balance(alice_authkey);
        notify_success("Account Added");
        waiting = false;
      })
      .catch((error: CarpeError) => {
        raise_error(error, true, "createUser")
        waiting = false;
      });
  }

  onMount(async () => {
    displayInsufficientBalance.subscribe((e) =>
      e.category ? (noBalance = true) : (noBalance = false)
    );
  });
</script>

<main>
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("txs.onboard.title")}
  </h4>
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

      <div>
        {#if waiting}
          <span class="uk-button uk-align-right" disabled>{$_("txs.onboard.await")}</span>
        {:else}
          <span
          on:click={createUser}
          class="uk-button uk-button-primary uk-align-right" id="create-acc" 
          >{$_("txs.onboard.btn_onboard")}</span>
        {/if}

        <Link to={routes.home}>
          <span class="uk-button uk-button-default uk-align-right">{$_("txs.onboard.btn_cancel")}</span>
        </Link>
      </div>
    </fieldset>
  </form>

  {#if waiting} 
    <div class="uk-flex uk-flex-center">
      <span uk-spinner />
    </div>
  {/if}

  {#if noBalance}
    <CardError>
      <span slot="title">{$_("txs.onboard.no_balance_title")}</span>
      <div slot="body">
        <p>
          {$_("txs.onboard.no_balance_body1", {values: {onboard_key}})}
        </p>
        <p>
          {$_("txs.onboard.no_balance_body2")}
        </p>
      </div>
    </CardError>
  {/if}
</main>
