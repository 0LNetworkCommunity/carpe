<script lang="ts">
  import { backlogInProgress } from "../../miner";
  import { submitBacklog } from "../../miner_invoke";
  import { onMount } from "svelte";

  let inProgress = false;
  onMount(async () => {
    backlogInProgress.subscribe(b => inProgress = b);
  });
</script>

<main class="uk-margin" >
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Sync Tower Proofs
  </h4>
  <div class="uk-margin uk-grid">
    <div>
      <p>
        Manually resubmit local proofs
      </p>
      {#if inProgress}
        <button class="uk-button" disabled>Backlog in Progress</button>
      {:else}
        <button class="uk-button uk-button-default" on:click={() => submitBacklog()}>
          Submit Local Backlog
        </button>
      {/if}
    </div>
  </div>
</main>
