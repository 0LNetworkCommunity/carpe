<script lang="ts">
  import { _ } from 'svelte-i18n'
  import SetNetworkPlaylist from '../settings/SetNetworkPlaylist.svelte'
  import CardError from './CardError.svelte'
    import CardAlert from './CardAlert.svelte'
</script>

<main>
    <CardAlert>
      <!-- <span slot="title">{$_('layout.connection_error.title')}</span> -->
      <div slot="body">

        <h4> {$_('layout.connection_error.dont_worry')} </h4>

        <p> {$_('layout.connection_error.refresh_instructions')} </p>

        <SetNetworkPlaylist />
      </div>
    </CardAlert>
</main>
