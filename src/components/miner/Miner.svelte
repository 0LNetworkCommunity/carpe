<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgress from "./MinerProgress.svelte";
  import TowerState from "./cards/TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import FirstProof from "./cards/FirstProof.svelte";
  import { backlog_in_progress, tower } from "../../miner";
  import { refreshStats } from "../../miner_health";
  import { killBacklogListener } from "../../miner_invoke";
import SyncProofs from "./cards/SyncProofs.svelte";

  let newbie = null;
  let loading = true;
  let backlogInProgress = false;
  let account: AccountEntry;
  let healthTick;

  onMount(async () => {
    refreshStats();
    healthTick = setInterval(refreshStats, 30000); // do a healthcheck, this is async

    tower.subscribe((towerState) => {
      loading = false;
      console.log(towerState);
      if (towerState.on_chain) {
        newbie = towerState.on_chain.verified_tower_height == null;
      }
    });

    backlog_in_progress.subscribe(b => backlogInProgress = b);
    
    signingAccount.subscribe(a => account = a);
  });

  onDestroy(() => {
    clearInterval(healthTick);
    // stop backlog submission listener service
    killBacklogListener();
  });
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>
  {#if loading}
    <div class="uk-flex uk-flex-center">
      <span uk-spinner />
    </div>
  {:else}
    <div class="uk-grid uk-margin-small">
      {#if account && !account.on_chain}
        <CantStart />
      {:else}
        <div class="uk-width-1-1 uk-align-center">
          <ToggleMiner />

          <!-- <p>Lost time is never found again.</p> -->
          <!-- <Oops/> -->
        </div>

        <div class="uk-width-1-1">
          {#if newbie}
            <FirstProof />
          {:else}
            <TowerState {account} />
          {/if}
        </div>
        <div class="uk-width-expand uk-margin-small">
          <MinerProgress />
        </div>
      {/if}
    </div>
  {/if}

  {#if backlogInProgress }
    <SyncProofs />
  {/if}

  <MinerDebug />
</main>
