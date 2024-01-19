<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { backlogInProgress } from '../../modules/miner'
  import { submitBacklog } from '../../modules/submitBacklog'

</script>

<main class="uk-margin">
    <div>
      {#if $backlogInProgress}
        <button class="uk-button" disabled>{$_('miner.miner_backlog.in_process')}</button>
      {:else}
        <button class="uk-button uk-button-default" on:click={() => submitBacklog()}>
          {$_('miner.miner_backlog.subtitle')}
        </button>
      {/if}
    </div>

</main>
