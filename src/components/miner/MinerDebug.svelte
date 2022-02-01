<script lang="ts">
  import {
    killBacklogListener,
    startBacklogListener,
    submitProofZero,
    towerOnce,
  } from "../../miner_invoke";
  import { debugMode } from "../../debug";
  import { onMount } from "svelte";
  import { tower } from "../../miner";
  import type { ClientTowerStatus } from "../../miner";
  import MinerPhases from "./MinerPhases.svelte";

  let towerState: ClientTowerStatus;
  let debug: boolean;

  onMount(async () => {
    debugMode.subscribe((d) => (debug = d));
    tower.subscribe((r) => (towerState = r));
  });
</script>

{#if debug}
  <main class="uk-margin">
    <div class="uk-grid">
      <div class="uk-width-1-2">
        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={towerOnce}
            >Start Tower</button
          >
        </div>

        <div class="uk-margin">
          <button
            class="uk-button uk-button-default uk-width-1-1"
            on:click={startBacklogListener}>Start Backlog Listener</button
          >
        </div>

        <div class="uk-margin">
          <button
            class="uk-button uk-button-default uk-width-1-1"
            on:click={killBacklogListener}>Kill Listener</button
          >
        </div>

        <div class="uk-margin">
          <button
            class="uk-button uk-button-default uk-width-1-1"
            on:click={submitProofZero}
          >
            Resend Proof Zero
          </button>
        </div>
      </div>

      <div class="uk-width-1-2">
        <MinerPhases />
      </div>
    </div>

    {#if towerState}
      <p>Latest on-chain proof hash: {towerState.on_chain.previous_proof_hash}</p>
    {/if}
  </main>
{/if}
