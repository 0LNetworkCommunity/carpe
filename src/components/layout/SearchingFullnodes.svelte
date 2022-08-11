<script lang="ts">
  import { _ } from "svelte-i18n";
  import { scanning_fullnodes } from "../../networks";
  import { isAccountsLoaded } from "../../accounts";

  let scanning = true;
  let isLoaded = false;
  
  isAccountsLoaded.subscribe(boo => isLoaded = boo);
  scanning_fullnodes.subscribe(b => scanning = b);

</script>

<main>
  {#if isLoaded && scanning}
    <div class="uk-background-primary uk-light uk-text-center uk-padding">
      <span class="uk-text-uppercase"> Attempting to connect to blockchain  </span><div uk-spinner="ratio: 0.5" class="uk-padding"></div>
      <!-- <div slot="body">
        {@html $_('layout.connection_error.body')}
        <SetNetworkPlaylist />
      </div> -->
    </div>
  {/if}
</main>
