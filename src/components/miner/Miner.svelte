<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { isAccountRefreshed, signingAccount } from '../../modules/accounts'
  import { backlogInProgress, isTowerNewbie, tower } from '../../modules/miner'
  import { nodeEnv } from '../../modules/debug'
  import { getLocalHeight, getTowerChainView } from '../../modules/miner_invoke'

  // views
  import SyncProofs from './cards/SyncProofs.svelte'
  import CommonErrors from './CommonErrors.svelte'
  import EpochStatus from './cards/EpochStatus.svelte'
  import FirstProof from './cards/FirstProof.svelte'
  import ToggleMiner from './ToggleMiner.svelte'
  import MinerProgress from './MinerProgress.svelte'
  import TowerState from './TowerState.svelte'
  import MinerDebug from './MinerDebug.svelte'
  import CantStart from './cards/CantStart.svelte'

  let isDevTest = $nodeEnv == 'test'

  onMount(async () => {
    getTowerChainView().then(getLocalHeight)
  })
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_('miner.title')}
    </h2>
  </div>
  <div class="uk-alert-warning" uk-alert>
    <a href class="uk-alert-close" uk-close> </a>
    <p>
      {$_('miner.disable_warning')}
    </p>
  </div>
  {#if isDevTest}
    <div class="uk-flex uk-flex-center">
      <p class="uk-text-light uk-text-muted uk-text-uppercase">
        DEV MODE, RUNNING IN TEST DIFFICULTY
      </p>
    </div>
  {/if}
  {#if !$signingAccount.on_chain}
    <CantStart />
  {/if}
  <div class="uk-grid uk-margin-small">
    {#if ($signingAccount && $signingAccount.on_chain) || ($tower && $tower.progress && $tower.progress.pct_complete)}
      <!-- so we don't get a flash of the error card on an intermittent local network connection if we are in fact mining -->
      <div class="uk-width-1-1 uk-align-center">
        <ToggleMiner />
        <MinerProgress />
        <!-- Lost time is never found again. -->
      </div>

      <div class="uk-width-1-1">
        {#if $isTowerNewbie && !$tower.last_local_proof}
          <FirstProof />
        {:else}
          <div class="uk-grid uk-grid-match">
            <div class="uk-width-1-3">
              {#if $backlogInProgress}
                <SyncProofs minerTower={$tower} loading={$isAccountRefreshed} />
              {:else}
                <EpochStatus isTowerNewbie={$isTowerNewbie} />
              {/if}
            </div>
            <div class="uk-width-2-3">
              <TowerState minerTower={$tower} />
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  <CommonErrors />
  <MinerDebug minerTower={$tower} />
</main>
