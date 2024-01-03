<script lang="ts">
  import { tryUpdate, updateStatus } from '../../modules/updater'
  import { _ } from 'svelte-i18n'

  let checking = $updateStatus.refreshing ?? false

  let upToDate = $updateStatus.status == 'UPTODATE'
</script>

<main class="uk-margin">
  <div>
    <p>
      {#if upToDate}
        {$_('about.upgrade_uptodate')}
      {:else}
        {$_('about.upgrade_available')}
      {/if}
    </p>
    <button class="uk-button uk-button-default" on:click={tryUpdate} disabled={checking}>{$_('about.upgrade_checkagain')}</button>
  </div>
</main>
