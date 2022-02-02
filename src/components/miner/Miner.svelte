<script lang="ts">
  import { onMount } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgress from "./MinerProgress.svelte";
  import TowerState from "./cards/TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import FirstProof from "./cards/FirstProof.svelte";
  import { backlogInProgress, tower } from "../../miner";
  import { nodeEnv } from "../../debug";
  import { get } from "svelte/store";
  import { refreshStats } from "../../miner_health";
  import SyncProofs from "./cards/SyncProofs.svelte";
  import CommonErrors from "./CommonErrors.svelte";

  let newbie = false;
  let loading = true;
  let account: AccountEntry;
  let isDevTest = false;
  let isSendInProgress = false;

  
  onMount(async () => {
    refreshStats();

    tower.subscribe((towerState) => {
      loading = false; 
      if (towerState.on_chain && towerState.on_chain.verified_tower_height) {
        // strange behavior with null here, doing a double negative
        // newbie = towerState.on_chain.verified_tower_height == null;
        newbie = !(towerState.on_chain.verified_tower_height >= 0);
      }
    });

    backlogInProgress.subscribe((b) =>  isSendInProgress = b);

    signingAccount.subscribe((a) => (account = a));

    isDevTest = get(nodeEnv) == "test";
  });
</script>

 
<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  {#if isDevTest}
    <div class="uk-flex uk-flex-center">
      <p class="uk-text-light uk-text-muted uk-text-uppercase">
        DEV MODE, RUNNING IN TEST DIFFICULTY
      </p>
    </div>
  {/if}

  {#if loading}
    <div class="uk-flex uk-flex-center">
      <span uk-spinner />
    </div>
  {:else}
    <div class="uk-grid uk-margin-small">
      {#if account && account.on_chain}

        <div class="uk-width-1-1 uk-align-center">
          <ToggleMiner />
          
          
          <MinerProgress />
          <!-- <p>Lost time is never found again.</p> -->
          <!-- <Oops/> -->
        </div>

        <!-- {#if tower} -->
        <div class="uk-width-1-1">
          {#if newbie}
            <FirstProof />
          {:else}
            <TowerState />
          {/if}
        </div>
      {:else if account }
        <CantStart />
      {/if}
    </div>

              
    {#if isSendInProgress}
      <SyncProofs />
    {/if}
  {/if}
  <CommonErrors />

  <MinerDebug />
</main>
