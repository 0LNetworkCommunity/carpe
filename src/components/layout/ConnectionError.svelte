<script lang="ts">
import { _ } from "svelte-i18n";

import SetNetworkPlaylist from "../settings/SetNetworkPlaylist.svelte";

import CardError from "./CardError.svelte";


</script>

<main>

  <CardError>
    <span slot="title">{$_("layout.connection_error.title")}</span>
    <div slot="body">
      {@html $_('layout.connection_error.body')}
      <SetNetworkPlaylist />
    </div>
  </CardError>
</main>
