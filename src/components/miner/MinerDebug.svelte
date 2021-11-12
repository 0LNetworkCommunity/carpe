<script lang="ts">
  import { killTowerListener, startTowerListener, submitProofZero, towerOnce } from "../../miner_invoke";
</script>

<main class="uk-margin" >
  <div class="uk-grid">
    <div class="margin">
      <button class="uk-button uk-button-default" on:click={towerOnce}>Start Tower</button>
    </div>

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={startTowerListener}>Start Listener</button>
    </div>

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={killTowerListener}>Kill Listener</button>
    </div>




  </div>

  <div>  
      <button class="uk-button uk-button-default" on:click={submitProofZero}>
        Resend Proof Zero
      </button>
    </div>
</main>
