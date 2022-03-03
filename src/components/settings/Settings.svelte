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
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("settings.title")}</h2>
  </div>

  <LangAppearanceSettings />
  <UpdateNetwork />
  <AccountSettings />
  <MinerBacklog />
  <SetWalletType />
</main>
