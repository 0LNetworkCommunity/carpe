<script lang="ts">
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";
  import TowerState from "./cards/TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";
  import { debugMode } from "../../debug";
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import Status from "./cards/Status.svelte";
  import FirstProof from "./cards/FirstProof.svelte";
  import Oops from "./cards/Oops.svelte";
  import { tower } from "../../miner";
  
  tower.subscribe((s) => {

  });

  let debug: boolean;
  debugMode.subscribe((d) => {
    debug = d;
  });
  let account: AccountEntry;
  signingAccount.subscribe((a) => {
    account = a;
  });

  let info = true;
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>
  <div class="uk-grid uk-margin-small">
    {#if !account.on_chain}
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
        {#if info}
          <TowerState />
        {:else}
          <FirstProof />
        {/if}
      </div>
      <div class="uk-width-expand uk-margin-small">
        <MinerProgres />
      </div>
    {/if}
  </div>

  {#if debug}
    <MinerDebug />
  {/if}
</main>
