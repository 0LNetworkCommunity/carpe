<script lang="ts">
  import {
    emitBacklog,
    killBacklogListener,
    startBacklogListener,
    submitProofZero,
    maybeTowerOnce,
  } from '../../modules/miner_invoke'
  import { debugMode } from '../../modules/debug'
  import type { ClientTowerStatus } from '../../modules/miner'
  import MinerPhases from './MinerPhases.svelte'
  import { _ } from 'svelte-i18n'
  import { submitBacklog } from '../../modules/submitBacklog'

  export let minerTower: ClientTowerStatus
</script>

{#if $debugMode}
  <main class="uk-margin">
    <div class="uk-grid">
      <div class="uk-width-1-2">
        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={submitBacklog}
            >{$_('miner.miner_backlog.subtitle')}</button
          >
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={maybeTowerOnce}
            >Start Tower</button
          >
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={startBacklogListener}
            >Start Backlog Listener</button
          >
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={killBacklogListener}
            >Kill Listener</button
          >
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={emitBacklog}
            >Emit Backlog Event</button
          >
        </div>

        <div class="uk-margin">
          <button class="uk-button uk-button-default uk-width-1-1" on:click={submitProofZero}>
            Resend Proof Zero
          </button>
        </div>
      </div>

      <div class="uk-width-1-2">
        <MinerPhases />
      </div>
    </div>

    {#if minerTower.on_chain}
      <p class="uk-text-break">
        <span>minerTower:</span>
        {JSON.stringify(minerTower, null, 2)}
      </p>
    {/if}
  </main>
{/if}
