<script lang="ts">
  import { onMount } from 'svelte';
  import { getTowerChainView, tower } from '../../miner';
  import type { ClientTowerStatus } from '../../miner';
import { invoke } from '@tauri-apps/api/tauri';

  let towerState: ClientTowerStatus;

  tower.subscribe(m => {
    console.log(m);
    towerState = m
  });

  const buildTower = async () => {
    invoke("build_tower", {mock: true})
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };

  onMount(()=>{
    getTowerChainView();
  })
  
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  {#if towerState.on_chain }
  <div class="margin">
    <span> count_proofs_in_epoch: { towerState.on_chain.previous_proof_hash } </span>
  </div>
  {/if}

    <div class="margin">
      <button class="uk-button uk-button-default" on:click={buildTower}>Start Tower</button>
    </div>
  
  <progress id="js-progressbar" class="uk-progress" value="10" max="100"></progress>

  


  <!-- <p>Lost time is never found again.</p> -->
</main>
