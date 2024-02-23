<script lang="ts">
  import { _ } from 'svelte-i18n'
    import { tower } from '../../../modules/miner'
  export let isTowerNewbie;
</script>

<main>
  <div class="uk-card uk-card-default uk-card-body">
    {#if $tower.on_chain && $tower.on_chain.count_proofs_in_epoch >= 72}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.exceed_title')}
      </h3>
      <p class="uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.exceed_body')}
      </p>
    {:else if $tower.on_chain && $tower.on_chain.count_proofs_in_epoch >= 8}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.complete_title')}
      </h3>
      <p class="uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.complete_body')}
      </p>
    {:else if isTowerNewbie}
      <!-- I don't think this view is ever accessible -->
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.empty_title')}
      </h3>
      <p class="uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.empty_body')}
      </p>
    {:else}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.in_process_title')}
      </h3>
      <p class="uk-text-light uk-text-muted">
        {$_('miner.cards.epoch_status.in_process_body')}
      </p>
    {/if}
  </div>
</main>
