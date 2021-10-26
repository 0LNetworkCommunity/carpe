<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses, errors } from "../../debug";
  import UpdateNetwork from "./UpdateNetwork.svelte";

  const removeAccounts = async () => {
    invoke("remove_accounts", {
      debugErr: false,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => {
        errors.set(e);
        // error_string = e; //This is a string
        console.error(e);
      });
  };

</script>

<main>
  Settings
  <UpdateNetwork />
  <button class="uk-button uk-button-default" on:click={removeAccounts}> Remove Accounts </button>
</main>
