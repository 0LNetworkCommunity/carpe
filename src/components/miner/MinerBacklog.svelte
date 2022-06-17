<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount, onDestroy } from "svelte";
  import { submitBacklog } from "../../miner_invoke";
  import { backlogInProgress } from "../../miner";

  let unsubs;
  let inProgress = false;
  
  onMount(async () => {
    unsubs = backlogInProgress.subscribe(b => inProgress = b);
  });

  onDestroy(async () => {
    unsubs && unsubs();
  }); 
</script>

<main class="uk-margin">
  <h3 class="carpe-sub-titles">
    {$_("miner.miner_backlog.title")}
  </h3>
  <div class="uk-margin uk-flex uk-flex-center uk-flex-column">
    <div>
      <p>
        {$_("miner.miner_backlog.subtitle")}
      </p>
      {#if inProgress}
        <button class="uk-button" disabled>{$_("miner.miner_backlog.in_process")}</button>
      {:else}
        <button class="uk-button uk-button-default" on:click={() => submitBacklog()}>
          {$_("miner.miner_backlog.btn_submit")}
        </button>
      {/if}
    </div>
  </div>
</main>
