<script lang="ts">
  import { onMount } from "svelte";
  import { backlogListenerReady, backlogInProgress, tower } from "../../../miner";

  import CardAlert from "../../layout/CardAlert.svelte";
  import MinerBacklog from "../MinerBacklog.svelte";
  import CardError from "../../layout/CardError.svelte";
  import { isRefreshingAccounts } from "../../../accounts";
import SyncProofsError from "./SyncProofsError.svelte";
import { _ } from "svelte-i18n";
  
  let listenerReady = false;
  let inProgress = false;
  let isRefreshing = true;
  let delta: number;


  onMount(async () => {
    delta = null;
    tower.subscribe(t => {
      delta = t.local_height - t.on_chain.verified_tower_height
    });

    isRefreshingAccounts.subscribe((r) => (isRefreshing = r));

    backlogInProgress.subscribe((b) => (inProgress = b));

    backlogListenerReady.subscribe((b) => listenerReady = b);

  })
</script>

<main>
  {#if listenerReady && inProgress}
  <CardAlert>
    <span slot="title" class="uk-text-uppercase">
      {$_("miner.cards.sync_proof.title")} 
      <span class="uk-margin" uk-spinner="ratio: 0.5" />
    </span>
    <div slot="body">
      <!-- <p>Carpe is submitting your proofs to chain.</p> -->
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
  {:else if !isRefreshing && delta && delta > 0}
    
    <SyncProofsError/> 
  {/if} 
</main>