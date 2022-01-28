<script lang="ts">
  import { backlog_in_progress } from "../../miner";
  import { submitBacklog } from "../../miner_invoke";
  import { onMount } from "svelte";

  let inProgress = false;
  onMount(async () => {
    backlog_in_progress.subscribe(b => inProgress = b);
  });
</script>

<main class="uk-margin" >
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Sync Tower Proofs
  </h4>
  <div class="uk-margin uk-grid">
    <div>
      {#if inProgress}
        <button class="uk-button" disabled>Backlog in Progress</button>
      {:else}
        <button class="uk-button uk-button-default" on:click={() => submitBacklog()}>
          Submit Local Proof Backlog
        </button>
      {/if}
    </div>
    <div class="uk-margin">
      <span>
        If any local proofs are not being committed to chain, you will notice the local proof number will be higher than the on-chain count. You can manually resubmit with the button above.
      </span>
    </div>
  </div>
</main>
