<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { tower } from '../../modules/miner'

  function formatPercent(decimal) {
    if (decimal > 1.01) decimal = 1.01;
    return (decimal * 100).toFixed(0) + '%'
  }
</script>

<main>
  {#if $tower && $tower.progress}
    <div class="uk-inline">
      <!-- tower: {JSON.stringify($tower.progress)} -->
      <span class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
        {#if $tower.progress && $tower.progress.complete}
          {$_('miner.miner_process.status_complete')}
        {:else}
          {$_('miner.miner_process.status_in_process')}
          {formatPercent($tower.progress.pct_complete)}
        {/if}
      </span>
      <div uk-dropdown class="uk-text-light uk-text-muted uk-text-thin">
        {@html $_('miner.miner_process.notes')}
      </div>
    </div>

    <progress
      id="mining-progressbar"
      class="uk-progress"
      value={$tower.progress.pct_complete}
      max="1"
    />

    <span class="uk-text-light uk-text-muted uk-text-thin">
      {#if $tower.progress.pct_complete > 1.01}
        <span> {$_('miner.miner_process.notes2')} </span>
      {/if}
    </span>
  {/if}
</main>
