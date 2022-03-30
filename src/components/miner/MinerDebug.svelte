<script lang="ts">
  import {
    emitBacklog,
    killBacklogListener,
    startBacklogListener,
    submitProofZero,
    towerOnce,
  } from "../../miner_invoke";
  import { debugMode } from "../../debug";
  import { onMount, onDestroy } from "svelte";
  import type { ClientTowerStatus } from "../../miner";
  import MinerPhases from "./MinerPhases.svelte";

  export let minerTower: ClientTowerStatus;
  let debug: boolean;
  let unsubsDebug;

  onMount(async () => {
    unsubsDebug = debugMode.subscribe(boo => debug = boo);
  });

  onDestroy(async () => {
    unsubsDebug && unsubsDebug();
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
            on:click={emitBacklog}>Emit Backlog Event</button
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

    {#if minerTower}
      <p>Latest on-chain proof hash: {minerTower.on_chain.previous_proof_hash}</p>
    {/if}
  </main>
{/if}
