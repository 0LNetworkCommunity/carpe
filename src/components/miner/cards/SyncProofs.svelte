<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy, onMount, afterUpdate } from "svelte";
  import { backlogListenerReady } from "../../../miner";
  import CardAlert from "../../layout/CardAlert.svelte";
  import SyncProofsError from "./SyncProofsError.svelte";
    
  export let minerTower;
  export let loading = true;

  let delta = null;
  let listenerReady = false; 
  let unsubsListener;

  afterUpdate(() => {
    delta = minerTower.local_height - minerTower.on_chain.verified_tower_height;
  });

  onMount(async () => {
    unsubsListener = backlogListenerReady.subscribe((b) => listenerReady = b);
  });

  onDestroy(async () => {
    unsubsListener && unsubsListener();
  });
</script>

<main>
  {#if listenerReady}
    <CardAlert>
      <span slot="title" class="uk-text-uppercase">
        {$_("miner.cards.sync_proof.title")} 
        <span class="uk-margin" uk-spinner="ratio: 0.5" />
      </span>
      <div slot="body">
        <!-- Carpe is submitting your proofs to chain. -->
        {#if delta > 0 }
          <p class="uk-text-muted uk-text-uppercase"> 
            {$_("miner.cards.sync_proof.body", {values: {delta}})} 
          </p>
        {:else if delta < 0}
          <p class="uk-text-muted uk-text-uppercase"> 
            {$_("miner.cards.sync_proof.body_0")} 
          </p> 
        {/if}
      </div>
    </CardAlert>
  {:else if !loading && delta && delta > 0}
    <SyncProofsError {minerTower}/> 
  {/if} 
</main>