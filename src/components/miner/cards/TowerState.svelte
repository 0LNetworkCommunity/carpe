<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { healthCheck } from "../../../miner_health";
  import { tower } from "../../../miner";

  export let account;
  let towerState;
  let healthTick;
  let unlistenTowerEvent;
  
  onMount(async () => {
    healthCheck();
    
    healthTick = setInterval(() => {
      healthCheck();
    }, 10000) // do a healthcheck this is async

    tower.subscribe(m => towerState = m);

    // unlistenTowerEvent = await listen(
    //   "tower-event", 
    //   event => healthCheck
    // );
  });

  onDestroy(() => {
    clearInterval(healthTick);
    // unlistenTowerEvent();
  });
</script>

<main>
  {#if towerState && towerState.on_chain && towerState.on_chain.previous_proof_hash}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-center" />
          <th class="uk-text-center">Tower Height</th>
          <th class="uk-text-center">Last Epoch Mined</th>
          <th class="uk-text-center">Proofs This Epoch</th>
          <th class="uk-text-center">Hash</th>
        </tr>
      </thead>
      <tbody>
        <tr class="uk-text-center">
          <td>{account.nickname}</td>
          <td>{towerState.on_chain.verified_tower_height}</td>
          <td>{towerState.on_chain.latest_epoch_mining}</td>
          <td>{towerState.on_chain.count_proofs_in_epoch}</td>
          <td>{towerState.on_chain.previous_proof_hash.slice(0, 3)}</td>

          <!-- <td>Table Data</td> -->
        </tr>
      </tbody>
    </table>
  {:else}
    <div>
      <h3 class="uk-text-muted">You haven't submitted any mining proofs</h3>
      <p>
        When you successfully submit your first proof, you will see some stats
        here
      </p>
    </div>
  {/if}
</main>
