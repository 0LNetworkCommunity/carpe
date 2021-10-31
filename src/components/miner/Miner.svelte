<script lang="ts">
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";
  import TowerState from "./TowerState.svelte";

</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>



  <!-- <div class="margin">
    <button class="uk-button uk-button-default" on:click={towerOnce}>Start Tower</button>
  </div>

  <div class="margin">
    <button class="uk-button uk-button-default" on:click={startTowerListener}>Start Listener</button>
  </div> -->
  <div uk-grid>
    <ToggleMiner />

    <MinerProgres />
  </div>



  <TowerState />
  <!-- <p>Lost time is never found again.</p> -->
</main>
