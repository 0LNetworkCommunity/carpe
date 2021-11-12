<script lang="ts">
  import { tower } from "../../../miner";
  import { onDestroy, onMount } from "svelte";
  import { signingAccount } from "../../../accounts";
  import { getTowerChainView } from "../../../miner_invoke";
import { healthCheck } from "../../../miner_health";

  let towerState;
  let my_account; // Todo change to be a template Prop

  tower.subscribe((m) => {
    console.log(m);
    towerState = m;
  });

  signingAccount.subscribe((m) => {
    console.log(m);
    my_account = m;
    // getTowerChainView();
  });

  let healthTick = setInterval(() => {
    healthCheck();
  }, 10000)    // do a healthcheck this is async
  
  onMount(() => {
    healthCheck();
  })

  onDestroy(() => {
    clearInterval(healthTick);
  });
</script>

<main>
  {#if towerState.on_chain && towerState.on_chain.previous_proof_hash}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>Tower Height</th>
          <th>Last Epoch Mined</th>
          <th>Proofs This Epoch</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{my_account.nickname}</td>
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
