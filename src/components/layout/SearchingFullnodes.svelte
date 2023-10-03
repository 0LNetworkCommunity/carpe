<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { connected, scanningForFullnodes } from '../../modules/networks'
  import ConnectionError from './ConnectionError.svelte'

  let toggle = false
  const setToggle = () => {
    toggle = !toggle
  }
</script>

<main>
  {#if !$connected}
    <div class="uk-background-primary uk-light uk-text-center">
      {#if $scanningForFullnodes}
        <span class="uk-text-uppercase"> {$_('layout.attempting_to_connect')} </span>
        <div uk-spinner="ratio: 0.5" class="uk-padding" />
      {:else}
        <span class="uk-text-uppercase"> {$_('layout.not_connected_to_chain')} </span>
        <button uk-icon="icon: settings" on:click={setToggle} class="uk-padding" />
      {/if}
    </div>
  {/if}
  {#if toggle}
    <ConnectionError />
  {/if}
</main>
