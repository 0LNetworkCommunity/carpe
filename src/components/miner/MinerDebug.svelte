<script lang="ts">
  import { killBacklogListener, startBacklogListener, submitProofZero, towerOnce, } from "../../miner_invoke";
  import { debugMode } from "../../debug";
  import { onMount } from "svelte";
  import { tower } from "../../miner";
  import type { ClientTowerStatus } from "../../miner";

  let towerState: ClientTowerStatus;
  let debug: boolean;

  onMount(async () => {
    debugMode.subscribe(d => debug = d)
    tower.subscribe(r => towerState = r)
  });

</script>

{#if debug}
  
  <p>Latest proof hash: {towerState.on_chain.previous_proof_hash}</p>

  <main class="uk-margin" >
    <div class="uk-grid">
      <div class="margin">
        <button class="uk-button uk-button-default" on:click={towerOnce}>Start Tower</button>
      </div>

      <div class="margin">
        <button class="uk-button uk-button-default" on:click={startBacklogListener}>Start Backlog Listener</button>
      </div>

      <div class="margin">
        <button class="uk-button uk-button-default" on:click={killBacklogListener}>Kill Listener</button>
      </div>
    </div>
    <div>  
      <button class="uk-button uk-button-default" on:click={submitProofZero}>
        Resend Proof Zero
      </button>
    </div>
  </main>
{/if}
