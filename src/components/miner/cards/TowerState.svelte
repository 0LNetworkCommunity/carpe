<script lang="ts">
  import { onMount } from "svelte";
  import { isRefreshingAccounts } from "../../../accounts";
  import { tower } from "../../../miner";
  
  let towerState;
  let isRefreshing = true;

  onMount(async () => {    
    tower.subscribe(m => towerState = m);

    isRefreshingAccounts.subscribe((r) => (isRefreshing = r));

  });

</script>

<main>
  {#if towerState && towerState.on_chain && towerState.on_chain.previous_proof_hash}
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
            {#if towerState.on_chain.actual_count_proofs_in_epoch >= 72}
              <span class="uk-text-success" uk-icon="icon: check" uk-tooltip="Your account is eligible for rewards at the end of the epoch and can submit up to 72 proofs per epoch."></span>
            {:else if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
              <span class="uk-text-success" uk-icon="icon: check" uk-tooltip="In the current epoch, your account has submitted more than 7 proofs and is eligible for rewards at the end of the epoch."></span>
            {:else}
              <span uk-icon="icon: minus-circle; ratio: 0.7" uk-tooltip="Your account needs to submit at least 8 proofs in the current epoch to receive rewards at the end of this epoch."></span>
            {/if}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- <SyncProofs /> -->
    
  {:else if !isRefreshing && !towerState }
    <div>
      <h3 class="uk-text-muted">You haven't submitted any mining proofs</h3>
      <p>
        When you successfully submit your first proof, you will see some stats
        here.
      </p>
    </div>
  {/if}
</main>
