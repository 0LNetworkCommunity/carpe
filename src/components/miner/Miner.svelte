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
import AccountFromMnemForm from "../wallet/AccountFromMnemForm.svelte";
import AccountFromMnemSubmit from "../wallet/AccountFromMnemSubmit.svelte";
import { getTowerChainView } from "../../miner_invoke";  
import { onMount } from "svelte";

  onMount(() => {
    getTowerChainView();
  })  

  let isFirstProof = null;
  tower.subscribe((towerState) => {
    isFirstProof = towerState.on_chain == null || towerState.on_chain.verified_tower_height == null
  });

  let debug: boolean;
  debugMode.subscribe((d) => debug = d);

  let account: AccountEntry;
  signingAccount.subscribe((a) => account = a);
  
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
        {#if isFirstProof == null}
          Loading...
        {:else if isFirstProof}
          <FirstProof />  
        {:else}
          <TowerState />
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
