<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'

  import { _ } from 'svelte-i18n'
  import CardAlert from '../layout/CardAlert.svelte'
  import { raise_error } from '../../modules/carpeError'

  let is_recovery = false
  let epoch_recovery_ends = null
  invoke('get_recovery_mode', {})
    .then((ends: number) => {
      if (ends > 0) {
        is_recovery = true
        epoch_recovery_ends = ends
      }
    })
    .catch((e) => {
      raise_error(e, true, "get_recovery_mode")
    })
</script>

<main>
  {#if is_recovery}
    <CardAlert>
      <span slot="title">{$_('layout.recovery_mode.title')} </span>

      <div slot="body">
        {$_('layout.recovery_mode.body', {
          values: {
            epoch_recovery_ends,
            epoch_recovery_ends_after: epoch_recovery_ends + 1,
          },
        })}
      </div>
    </CardAlert>
  {/if}
</main>
