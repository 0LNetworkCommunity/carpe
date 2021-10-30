<script lang="ts">
  import { onMount } from "svelte";
  import { getTowerChainView, tower } from "../../miner";
  import type { ClientTowerStatus } from "../../miner";
  import { towerOnce } from "../../miner";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";

  let towerState: ClientTowerStatus;

  tower.subscribe((m) => {
    console.log(m);
    towerState = m;
  });

  onMount(() => {
    getTowerChainView();
  });
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  {#if towerState.on_chain}
    <div class="margin">
      <span>
        count_proofs_in_epoch: {towerState.on_chain.previous_proof_hash}
      </span>
    </div>
  {/if}

  <div class="margin">
    <button class="uk-button uk-button-default" on:click={towerOnce}>Start Tower</button>
  </div>

  <ToggleMiner />

  <MinerProgres />
  <!-- <p>Lost time is never found again.</p> -->
</main>
