<script lang="ts">
  import { backlogInProgress } from "../../miner";
  import { submitBacklog } from "../../miner_invoke";
  import { onMount } from "svelte";
import { _ } from "svelte-i18n";

  let inProgress = false;
  onMount(async () => {
    backlogInProgress.subscribe(b => inProgress = b);
  });
</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("miner.miner_backlog.title")}
  </h4>
  <div class="uk-margin uk-grid">
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
