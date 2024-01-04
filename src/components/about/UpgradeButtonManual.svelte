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
        {$_('upgrade.uptodate')}
      {:else}
        {$_('upgrade.available')}
      {/if}
    </p>
    <button class="uk-button uk-button-default" on:click={tryUpdate} disabled={checking}>{$_('upgrade.check_again')}</button>
  </div>
</main>
