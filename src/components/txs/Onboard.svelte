<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { Link } from "svelte-navigator";
  import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";
  import { routes } from "../../routes";
  import { init_account_balance } from '../../accounts';
  import { notify_success } from "../../carpeNotify";

  let alice_authkey;
  function createUser() {
    // submit
    invoke("create_user_account", { authkey: alice_authkey })
      .then((res) => {
        responses.set(JSON.stringify(res));

        // TODO move to an account controller
        init_account_balance(alice_authkey);
        notify_success("Account Added");
      })
      .catch((error) => raise_error(error));
  }
</script>

<main>
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Onboard an Account</h4>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="Auth Key"
          bind:value={alice_authkey}
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
</main>
