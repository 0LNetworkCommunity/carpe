<script lang="ts">
  import { _ } from 'svelte-i18n'
  import TowerStateSkeleton from './TowerStateSkeleton.svelte'
  import type { ClientTowerStatus } from '../../modules/miner'

  export let minerTower: ClientTowerStatus
</script>

<main>
  {#if minerTower && minerTower.on_chain && minerTower.on_chain.previous_proof_hash}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-center">{$_('miner.tower_state.local_height')}</th>
          <th class="uk-text-center">{$_('miner.tower_state.on_chain_height')}</th>
          <th class="uk-text-center">{$_('miner.tower_state.mined_in_last_epoch')}</th>
          <th class="uk-text-center">{$_('miner.tower_state.sent_in_this_epoch')}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="uk-text-center">
          <!-- <td>{account.nickname}</td> -->
          <td>
            {#if minerTower.local_height >= 0}
              {minerTower.local_height}
            {:else if minerTower.on_chain}
              <div class="uk-inline">
                <span uk-icon="icon: minus-circle" />
                <div uk-dropdown>
                  {$_('miner.tower_state.empty')}
                </div>
              </div>
            {/if}
          </td>
          <td>{minerTower.on_chain.verified_tower_height}</td>
          <td>{minerTower.on_chain.latest_epoch_mining}</td>
          <td>
            <div class="uk-inline">
              {#if minerTower.on_chain.count_proofs_in_epoch >= 8}
                <span class="uk-text-muted uk-margin" uk-icon="icon: check" />
              {:else}
                <span class="uk-text-warning uk-margin" uk-icon="icon: minus-circle" />
              {/if}
              {minerTower.on_chain.count_proofs_in_epoch}
              <div uk-dropdown>
                {#if minerTower.on_chain.count_proofs_in_epoch >= 72}
                  {$_('miner.tower_state.proof_more')}
                {:else if minerTower.on_chain.count_proofs_in_epoch >= 8}
                  {$_('miner.tower_state.proof_ok')}
                {:else}
                  {$_('miner.tower_state.proof_less')}
                {/if}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>


  <!-- {:else if minerTower && !minerTower.on_chain }
    <!-- <div class="uk-align-center">
      <span uk-spinner />
    </div> -->
    <!-- <SyncProofs loading={false} minerTower/> -->
  {:else}
    <TowerStateSkeleton />
  {/if}
</main>
