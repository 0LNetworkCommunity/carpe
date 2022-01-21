<script lang="ts">
  import MinerBacklog from "../miner/MinerBacklog.svelte";
  import AccountSettings from "./AccountSettings.svelte";
  import UpdateNetwork from "./UpdateNetwork.svelte";
  import DebugSwitcher from "./DebugSwitcher.svelte";

</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Settings</h2>
  </div>

  <UpdateNetwork />
  <AccountSettings />
  <MinerBacklog />
  <DebugSwitcher />
</main>
