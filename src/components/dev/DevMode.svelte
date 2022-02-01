<script lang="ts">
  import DebugCard from "./DebugCard.svelte";
  import DebugActions from "./DebugActions.svelte";
  import { Link } from "svelte-navigator";
  import DebugSwitchProdTest from "./DebugSwitchProdTest.svelte";
  import DebugSwitchRexMainnet from "./DebugSwitchRexMainnet.svelte";
  import { routes } from "../../routes";
  // import Swarm from "./Swarm.svelte";

</script>

<main class="uk-height-viewport">
  <div class="uk-margin uk-container uk-dark">
    <DebugCard />
    <DebugActions />
    <DebugSwitchRexMainnet />
    <DebugSwitchProdTest />
    
  </div>
</main>
