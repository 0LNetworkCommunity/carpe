<script lang="ts">
  import { onMount } from "svelte";
  import { isRefreshingAccounts } from "../../../accounts";
  import { tower } from "../../../miner";
import EpochStatus from "./EpochStatus.svelte";

  let towerState;
  let isRefreshing = true;

  onMount(async () => {
    tower.subscribe((m) => (towerState = m));

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
              <span
                uk-icon="icon: minus-circle"
                uk-tooltip="title: No proofs on device"
              />
            {/if}
          </td>
          <td>{towerState.on_chain.verified_tower_height}</td>
          <td>{towerState.on_chain.latest_epoch_mining}</td>
          <td>
            <div class="uk-inline">
              {#if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
                <span class="uk-text-muted" uk-icon="icon: check" />
              {:else}
                <span class="uk-text-warning" uk-icon="icon: minus-circle" />
              {/if}
              {towerState.on_chain.actual_count_proofs_in_epoch}
              <div uk-dropdown>
                {#if towerState.on_chain.actual_count_proofs_in_epoch >= 72}
                  You have mined 72 proofs, the max proofs per day.
                {:else if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
                  Your account has submitted enough proofs today (minimum 8
                  proofs per epoch).
                {:else}
                  Your account needs to submit at least 8 proofs per day (epoch) to receive a reward.
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
