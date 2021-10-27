<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
import { Link } from "svelte-navigator";
  import UIkit from "uikit";
  import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";

  let alice_authkey;
  function handleAdd() {
    // submit
    invoke("create_user_account", { authkey: alice_authkey })
      .then((res) => {
        responses.set(JSON.stringify(res));
        UIkit.notification({
          message: `Account Added`,
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
      })
      .catch((error) => raise_error(error));
  }
</script>

<main>
  <h3>Onboard Someone</h3>
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
          on:click={handleAdd}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">Add</span
        >
        <Link to="/">
          <span class="uk-button uk-button-default uk-align-right">Cancel</span>
        </Link>
      </div>
    </fieldset>
  </form>
</main>
