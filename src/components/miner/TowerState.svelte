<script lang="ts">
  import { onMount } from "svelte";
  import { tower } from "../../miner";

  let towerState;

  onMount(async () => {
    tower.subscribe((m) => (towerState = m));

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

            <div class="uk-inline">
              <span uk-icon="icon: minus-circle"/>
              <div uk-dropdown>
                  No proofs found on device
              </div>
            </div>

            {/if}
          </td>
          <td>{towerState.on_chain.verified_tower_height}</td>
          <td>{towerState.on_chain.latest_epoch_mining}</td>
          <td>
            <div class="uk-inline">
              {#if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
                <span class="uk-text-muted uk-margin" uk-icon="icon: check" />
              {:else}
                <span class="uk-text-warning uk-margin" uk-icon="icon: minus-circle" />
              {/if}
              {towerState.on_chain.actual_count_proofs_in_epoch}
              <div uk-dropdown>
                {#if towerState.on_chain.actual_count_proofs_in_epoch >= 72}
                  You have submitted max proofs today (max 72)
                {:else if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
                  Your account has submitted enough proofs today (min 8)
                {:else}
                  Insufficient proofs to receive a reward today (min 8)
                {/if}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- <EpochStatus actual_proofs={towerState.on_chain.actual_count_proofs_in_epoch} /> -->
  {/if}
</main>
