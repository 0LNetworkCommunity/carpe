<script lang="ts">
  import { onMount } from "svelte";
  import { backlogListenerReady, backlogInProgress, tower } from "../../../miner";

  import CardAlert from "../../layout/CardAlert.svelte";
  import MinerBacklog from "../MinerBacklog.svelte";
  import CardError from "../../layout/CardError.svelte";
  import { isRefreshingAccounts } from "../../../accounts";
  
  let listenerReady = false;
  let inProgress = false;
  let isRefreshing = true;
  let delta: number;


  onMount(() => {
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
    <span slot="title">Syncing your proofs </span>
    <div slot="body">
      <p>Carpe is submitting any new and backlogged transactions to chain.</p>
      <div class="uk-flex uk-flex-center">
        <span uk-spinner />
      </div>
      {#if delta > 0 }
      <p class="uk-text-muted uk-text-uppercase"> 
        Proofs awaiting transaction: {delta} 
      </p>
      {:else if delta < 0}
      <p class="uk-text-muted uk-text-uppercase"> 
        Something is wrong, you have more proofs on-chain, than on this device. You may be missing proofs locally.
      </p> 
      {/if}
    </div>
  </CardAlert>
  {:else if !isRefreshing && delta && delta > 0}
    
    <CardError>
      <span slot="title">Looks like you have {delta} proofs not yet on chain </span>
      <div slot="body"> <MinerBacklog/> </div>
    </CardError>    
  {/if} 
</main>