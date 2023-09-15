<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { backlogInProgress } from '../../modules/miner'
  import { submitBacklog } from '../../modules/submitBacklog'

</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('miner.miner_backlog.title')}
  </h4>
  <div class="uk-margin uk-grid">
    <div>
      <p>
        {$_('miner.miner_backlog.subtitle')}
      </p>
      {#if $backlogInProgress}
        <button class="uk-button" disabled>{$_('miner.miner_backlog.in_process')}</button>
      {:else}
        <button class="uk-button uk-button-default" on:click={() => submitBacklog()}>
          {$_('miner.miner_backlog.btn_submit')}
        </button>
      {/if}
    </div>
  </div>
</main>
