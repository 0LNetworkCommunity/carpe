<script lang="ts">
  import DebugCard from "./DebugCard.svelte";
  import DebugActions from "./DebugActions.svelte";
  import DebugSwitchProdTest from "./DebugSwitchProdTest.svelte";
  import DebugSwitchRexMainnet from "./DebugSwitchRexMainnet.svelte";
  import DebugSwitcher from "./DebugSwitcher.svelte";
  import { _ } from "svelte-i18n";

</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="carpe-titles uk-text-light">
      {$_("wallet.account_switcher.developers")}
    </h2>
  </div>

  <div class="uk-margin uk-container uk-dark" style="margin-bottom: 280px">

    <DebugCard />

    <div class="uk-text-center carpe-card">
      <div class="uk-section developers-section">
        <DebugSwitcher />
        <p class="uk-margin-bottom"> Turn on debug actions on all screens</p>
      </div>
    </div>
    <div class="uk-text-center carpe-card">
      <div class="uk-section developers-section">
        <DebugSwitchRexMainnet />
      </div>
    </div>
    <div class="uk-text-center carpe-card">
      <div class="uk-section developers-section">
        <DebugSwitchProdTest />
      </div>
    </div> 
    <div class="uk-text-center carpe-card">
      <div class="uk-section developers-section">
        <DebugActions />
      </div>
    </div> 
    
  </div>
</main>
