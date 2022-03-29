<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { isTowerNewbie, tower } from "../../../miner";

  let actual_proofs: number;
  let newbie = false;
  onMount(() => {
    tower.subscribe((t) => {
      if (t && t.on_chain) {
        actual_proofs = t.on_chain.actual_count_proofs_in_epoch;
      }
      isTowerNewbie.subscribe((n) => {
        newbie = n;
      })
    });
  });
</script>

<main>
  <div class="uk-card uk-card-default uk-card-body">
    {#if actual_proofs >= 72}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">{$_("miner.cards.epoch_status.exceed_title")}</h3>
      <p class="uk-text-light uk-text-muted">
        {$_("miner.cards.epoch_status.exceed_body")}
      </p>
    {:else if actual_proofs >= 8}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">{$_("miner.cards.epoch_status.complete_title")}</h3>
      <p class="uk-text-light uk-text-muted">
        {$_("miner.cards.epoch_status.complete_body")}
      </p>

      {:else if newbie}
      <!-- I don't think this view is ever accessible -->
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">{$_("miner.cards.epoch_status.empty_title")}</h3>
      <p class="uk-text-light uk-text-muted">
        {$_("miner.cards.epoch_status.empty_body")}
      </p>
      {:else}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">{$_("miner.cards.epoch_status.in_process_title")}</h3>
      <p class="uk-text-light uk-text-muted">
        {$_("miner.cards.epoch_status.in_process_body")}
      </p>
    {/if}
  </div>
</main>
