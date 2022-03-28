<script lang="ts">
  import { _ } from "svelte-i18n";
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
          <th class="uk-text-center">{$_("miner.tower_state.local_height")}</th>
          <th class="uk-text-center">{$_("miner.tower_state.on_chain_height")}</th>
          <th class="uk-text-center">{$_("miner.tower_state.mined_in_last_epoch")}</th>
          <th class="uk-text-center">{$_("miner.tower_state.sent_in_this_epoch")}</th>
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
                {$_("miner.tower_state.empty")}
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
                  {$_("miner.tower_state.proof_more")}
                {:else if towerState.on_chain.actual_count_proofs_in_epoch >= 8}
                  {$_("miner.tower_state.proof_ok")}
                {:else}
                  {$_("miner.tower_state.proof_less")}
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
