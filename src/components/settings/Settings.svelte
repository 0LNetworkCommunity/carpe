<script lang="ts">
  import MinerBacklog from "../miner/MinerBacklog.svelte";
  import AccountSettings from "./AccountSettings.svelte";
  import UpdateNetwork from "./UpdateNetwork.svelte";
  import LangAppearanceSettings from "./LangAppearanceSettings.svelte";
  import SetWalletType from "../txs/SetWalletType.svelte";
  import { _ } from "svelte-i18n";

</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="carpe-titles uk-text-light">
      {$_("settings.title")}
    </h2>
  </div>
  <div class="uk-text-center carpe-card">
    <div class="uk-section carpe-settings-section">
      <LangAppearanceSettings />
    </div>
  </div>
  <div class="uk-text-center carpe-card">
    <div class="uk-section carpe-settings-section">
      <UpdateNetwork />
    </div>
  </div>
  <div class="uk-text-center carpe-card">
    <div class="uk-section carpe-settings-section">
      <AccountSettings />
    </div>
  </div>
  <div class="uk-text-center carpe-card">
    <div class="uk-section carpe-settings-section">
      <MinerBacklog />
    </div>
  </div>
  <div class="uk-text-center carpe-card">
    <div class="uk-section carpe-settings-section">
      <SetWalletType />
    </div>
  </div>
</main>
