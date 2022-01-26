<script lang="ts">
  import { onMount } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";
  import TowerState from "./cards/TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";  
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import FirstProof from "./cards/FirstProof.svelte";
  import { tower } from "../../miner";
  import { getTowerChainView } from "../../miner_invoke";  

  let isFirstProof = null;
  let account: AccountEntry;

  onMount(async () => {
    getTowerChainView();

    tower.subscribe((towerState) => {
      if (towerState.on_chain) {
        isFirstProof = towerState.on_chain.verified_tower_height == null
      }      
    });
  
    signingAccount.subscribe((a) => account = a);
  })
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>
  <div class="uk-grid uk-margin-small">
    {#if account == null}
      Loading...
    {:else if !account.on_chain}
      <CantStart />
    {:else}
      <div class="uk-width-1-1 uk-align-center">
        <ToggleMiner />
      
      <!-- <p>Lost time is never found again.</p> -->
      <!-- <Oops/> -->

      </div>
      <!--
      <div class="uk-width-1-3">
        <div class="uk-card uk-card-default uk-card-body">
          <Status />
        </div>
      </div>
    -->
      <div class="uk-width-1-1">
        {#if isFirstProof == null}

          <div class="uk-flex uk-flex-center">
            <span uk-spinner />
          </div>
        {:else if isFirstProof}
          <FirstProof />  
        {:else}
          <TowerState account={account} />
        {/if}
      </div>
      <div class="uk-width-expand uk-margin-small">
        <MinerProgres />
      </div>
    {/if}
  </div>
 
  <MinerDebug />
</main>
