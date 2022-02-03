<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { Link } from "svelte-navigator";
  import { raise_error } from "../../carpeError";
  import type { CarpeError } from "../../carpeError";
  import { responses } from "../../debug";
  import { routes } from "../../routes";
  import { notify_success } from "../../carpeNotify";
  import { onMount } from "svelte";
  import { displayInsufficientBalance } from "../../accounts";
  import CardAlert from "../layout/CardAlert.svelte";

  let onboard_key;
  let noBalance = false;

  function createUser() {
    // submit
    invoke("create_user_account", { authkey: onboard_key })
      .then((res) => {
        responses.set(JSON.stringify(res));

        // TODO move to an account controller
        // init_account_balance(alice_authkey);
        notify_success("Account Added");
      })
      .catch((error: CarpeError) => {
        raise_error(error, true, "createUser")
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
    Onboard an Account
  </h4>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="Auth Key"
          bind:value={onboard_key}
        />
      </div>

      <div>
        <span
          on:click={createUser}
          class="uk-button uk-button-primary uk-align-right"
          id="create-acc">Onboard</span
        >
        <Link to={routes.home}>
          <span class="uk-button uk-button-default uk-align-right">Cancel</span>
        </Link>
      </div>
    </fieldset>
  </form>

  {#if noBalance}
    <CardAlert>
      <span slot="title">Low Balance</span>
      <div slot="body">
        <p>
          Onboarding {onboard_key} was not successful.
        </p>
        <p>
          Looks like you have less than 1 Coin in your account, this means you
          won't be able to onboard anyone.
        </p>
      </div>
    </CardAlert>
  {/if}
</main>
