<script lang="ts">
  import { backlog_in_progress, killTowerListener, startTowerListener, submitBacklog, towerOnce } from "../../miner";
</script>

<main>
  <div class="uk-card uk-card-body uk-flex">
    <div class="margin">
      <button class="uk-button uk-button-default" on:click={towerOnce}>Start Tower</button>
    </div>

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={startTowerListener}>Start Listener</button>
    </div>

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={killTowerListener}>Kill Listener</button>
    </div>

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={submitBacklog}>Submit Backlog</button>
    </div>
  </div>
</main>
