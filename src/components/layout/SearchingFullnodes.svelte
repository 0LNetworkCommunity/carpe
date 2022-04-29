<script lang="ts">
  import { _ } from "svelte-i18n";
  import { scanning_fullnodes } from "../../networks";

  let scanning = true;

  scanning_fullnodes.subscribe(b => scanning = b);

</script>

<main>
  {#if scanning}

  <div class="uk-background-primary uk-light uk-text-center uk-padding">
    <span class="uk-text-uppercase"> Attempting to connect to blockchain  </span><div uk-spinner="ratio: 0.5" class="uk-padding"></div>
    <!-- <div slot="body">
      {@html $_('layout.connection_error.body')}
      <SetNetworkPlaylist />
    </div> -->
  </div>
  {/if}
</main>
