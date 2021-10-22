<script lang="ts">
  import { Link, useNavigate } from "svelte-navigator";
  import UIkit from "uikit";
  const invoke = window.__TAURI__.invoke;
  const navigate = useNavigate();

  let ip_address = "1.1.1.1";
  let title = "";
  let address = "";
  let helpTitle = "";
  let helpAddress = "";

  function handleAdd() {
    // check input data
    // submit
    invoke("add_account", { title: title, address: address })
      .then((_) => {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Account added",
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
      })
      .catch((error) => window.alert(error));
    navigate("/", { replace: true });
  }
</script>

<main>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1"> 
        <span> URL of upstream node</span>
        <input
          class="uk-input"
          type="text"
          placeholder={ip_address}
          bind:value={title}
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
