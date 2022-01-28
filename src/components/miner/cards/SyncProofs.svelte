<script lang="ts">
  import { onMount } from "svelte";
  import { tower } from "../../../miner";
  import type { ClientTowerStatus } from "../../../miner";

  import CardAlert from "../../layout/CardAlert.svelte";

  let delta: number;

  onMount(() => {
    tower.subscribe(t => {
      delta = t.local_height - t.on_chain.verified_tower_height
    });
  })
</script>

<main>
  <CardAlert>
    <span slot="title">Syncing your proofs </span>
    <div slot="body">
      <p>Carpe is submitting any new and backlogged transactions to chain.</p>
      <div class="uk-flex uk-flex-center">
        <span uk-spinner />
      </div>
      {#if delta >= 0 }
      <p class="uk-text-muted uk-text-uppercase"> 
        Proofs waiting to submit: {delta} 
      </p> 
      {:else}
      <p class="uk-text-muted uk-text-uppercase"> 
        Something is wrong, you have more proofs on tower, than locally. You may be missing proofs locally.
      </p> 
      {/if}
    </div>
  </CardAlert>
</main>