<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";
  import UpdateNetwork from "./UpdateNetwork.svelte";

  const removeAccounts = async () => {
    invoke("remove_accounts", {
      debugErr: false,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => {
        raise_error(e);
      });
  };

</script>

<main class="uk-height-viewport">
  Settings
  <UpdateNetwork />
  <button class="uk-button uk-button-default" on:click={removeAccounts}> Remove Accounts </button>
</main>
