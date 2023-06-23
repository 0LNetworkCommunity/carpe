<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected, scanning_fullnodes } from "../../networks";
  import { isAccountRefreshed } from "../../accounts";

  let scanning = true;
  let isLoaded = false;
  
  isAccountRefreshed.subscribe(boo => isLoaded = boo);
  scanning_fullnodes.subscribe(b => scanning = b);

</script>

<main>
  {#if isLoaded && !connected && scanning}
    <div class="uk-background-primary uk-light uk-text-center uk-padding">
      <span class="uk-text-uppercase"> {$_('layout.attempting_to_connect')} </span><div uk-spinner="ratio: 0.5" class="uk-padding"></div>
      <!-- <div slot="body">
        {@html $_('layout.attempting_to_connect')}
        <SetNetworkPlaylist />
      </div> -->
    </div>
  {/if}
</main>
