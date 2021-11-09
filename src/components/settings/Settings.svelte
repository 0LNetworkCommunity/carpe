<script lang="ts">
  import { Link } from "svelte-navigator";
import { debugMode } from "../../debug";
import DevMode from "../dev/DevMode.svelte";
import MinerBacklog from "../miner/MinerBacklog.svelte";
import AccountSettings from "./AccountSettings.svelte";
import UpdateNetwork from "./UpdateNetwork.svelte";

const setDebug = () => {
  debugMode.set(true);
}
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Settings</h2>
  </div>
  

  <UpdateNetwork />

  <AccountSettings />
  
  <MinerBacklog />

  <div>
    <button class="uk-button uk-button-default" on:click={setDebug}> Debug Mode</button>
  </div>

</main>
