<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { updateStatus } from '../../modules/updater'
  import { debugMode } from '../../modules/debug'
  import UpgradeButtonManual from './UpgradeButtonManual.svelte'
  import CardAlert from '../layout/CardAlert.svelte'
  import { onUpdaterEvent } from '@tauri-apps/api/updater'

  let unlisten

  onMount(async () => {
    unlisten = await onUpdaterEvent(({ error, status }) => {
      // This will log all updater events, including status updates and errors.
      updateStatus.update((u) => {
        u.error = error ?? null
        u.status = status
        return u
      })
      console.log('Updater event', error, status)
    })
  })

  onDestroy(() => {
    // don't duplicate listener next time we navigate here
    unlisten()
  })
</script>

<main class="uk-padding">
  {#if $updateStatus?.manifest}
    <CardAlert>
      <div slot="title">
        {#if $updateStatus.refreshing}
          <div class="uk-text-center">
            <span class="uk-text-muted">Checking for upgrade</span>
            <span class="uk-padding" uk-spinner="ratio: 0.66"></span>
          </div>
        {:else}
          <span class="uk-text-uppercase uk-margin">
            {$updateStatus.manifest.version} Update Available</span
          >
        {/if}
      </div>

      <div slot="body">
        {#if !$updateStatus?.refreshing}
          <div class="uk-padding uk-flex uk-grid">
            <div class="uk-margin">
              <!-- <h4>Update Available {$updateStatus?.manifest.version}</h4> -->
              <h5 class="uk-text-uppercase">Update Notes</h5>
              <p>{$updateStatus?.manifest.body}</p>
            </div>
            {#if $updateStatus?.error}
              <div class="uk-margin">
                <h5 class="uk-text-uppercase">Update Error</h5>
                <p>{$updateStatus?.error}: {$updateStatus?.msg}</p>
              </div>
              <UpgradeButtonManual />
            {/if}
          </div>
          {#if $debugMode}
            <div>
              <p>{$updateStatus?.msg}</p>
              <p>{$updateStatus?.error}</p>
              <p>{JSON.stringify($updateStatus?.status)}</p>
            </div>
          {/if}
        {/if}
      </div>
    </CardAlert>
  {/if}
</main>
