<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { connected, scanningForFullnodes } from '../../modules/networks'
  import { isAccountRefreshed } from '../../modules/accounts'
</script>

<main>
  {#if $isAccountRefreshed && !$connected && $scanningForFullnodes}
    <div class="uk-background-primary uk-light uk-text-center uk-padding">
      <span class="uk-text-uppercase"> {$_('layout.attempting_to_connect')} </span>
      <div uk-spinner="ratio: 0.5" class="uk-padding" />
    </div>
  {/if}
</main>
