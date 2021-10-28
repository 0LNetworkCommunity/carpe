<script lang="ts">
  import { onMount } from 'svelte';
  import { getTowerChainView, tower } from '../../miner';
  import type { ClientTowerStatus } from '../../miner';

  let towerState: ClientTowerStatus;
  tower.subscribe(m => towerState = m);

  onMount(()=>{
    getTowerChainView();
  })
  
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  <div class="margin">
    <span> count_proofs_in_epoch: { towerState.count_proofs_in_epoch } </span>
  </div>

    <div class="margin">
    <span> { JSON.stringify(towerState) } </span>
  </div>
  
  <progress id="js-progressbar" class="uk-progress" value="10" max="100"></progress>


  <!-- <p>Lost time is never found again.</p> -->
</main>
