<script lang="ts">
  import AccountFromMnem from "../wallet/AccountFromMnem.svelte";
  import DebugCard from "./DebugCard.svelte";
  import DebugActions from "./DebugActions.svelte";
  import Swarm from "./Swarm.svelte";

</script>

<main>
  <div class="uk-margin uk-container">
      <div class="uk-margin">

        <DebugCard />
        <DebugActions />
        <Swarm />
        <AccountFromMnem />
        

    </div>
  </div>
</main>
