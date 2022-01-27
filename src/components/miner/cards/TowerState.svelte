<script lang="ts">
  import { onMount } from "svelte";
  import { tower } from "../../../miner";

  export let account;
  let towerState;

  onMount(async () => {    
    tower.subscribe(m => towerState = m);
  });

</script>

<main>
  {#if towerState && towerState.on_chain && towerState.on_chain.previous_proof_hash}
    {#if account }
      <div class="uk-flex uk-flex-center">
        <p class="uk-text-muted uk-text-uppercase"> account - {account.nickname} </p> 
      </div>
    {/if}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-center">Local Tower Height</th>
          <th class="uk-text-center">On-chain Tower Height</th>
          <th class="uk-text-center">Last Epoch Mined</th>
          <th class="uk-text-center">Proofs Sent this Epoch</th>
        </tr>
      </thead>
      <tbody>
        <tr class="uk-text-center">
          <!-- <td>{account.nickname}</td> -->
          <td>
            {#if towerState.local_height >= 0}
              {towerState.local_height}
            {:else}
              <span uk-icon="icon: minus-circle" uk-tooltip="title: No proofs on device"></span>
            {/if}
          </td>
          <td>{towerState.on_chain.verified_tower_height}</td>
          <td>{towerState.on_chain.latest_epoch_mining}</td>
          <td>
            {towerState.on_chain.actual_count_proofs_in_epoch}
           {#if towerState.on_chain.actual_count_proofs_in_epoch > 7};
            <span uk-icon="icon: check"></span>
           {/if}
          </td>
        </tr>
      </tbody>
    </table>
  {:else if !towerState }
    <div>
      <h3 class="uk-text-muted">You haven't submitted any mining proofs</h3>
      <p>
        When you successfully submit your first proof, you will see some stats
        here.
      </p>
    </div>
  {/if}
</main>
