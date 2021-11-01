<script lang="ts">

  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";
  import TowerState from "./TowerState.svelte";
  import { backlog_in_progress, killTowerListener, startTowerListener, submitBacklog, towerOnce } from "../../miner";
import MinerBacklog from "./MinerBacklog.svelte";
import MinerDebug from "./MinerDebug.svelte";


</script>

<main class="uk-height-viewport">

  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  <div class="uk-flex uk-flex-center">
    <ToggleMiner />

    <MinerProgres />
  </div>

  <MinerBacklog />


  <TowerState />
  <!-- <p>Lost time is never found again.</p> -->

  <MinerDebug />

</main>
