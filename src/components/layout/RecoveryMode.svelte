<script lang="ts">
import { invoke } from "@tauri-apps/api/tauri";

  import { _ } from "svelte-i18n";
  import CardAlert from "../layout/CardAlert.svelte";

  let is_recovery = false;
  let epoch_recovery_ends = null;
  invoke("get_recovery_mode", {})
  .then(ends => {
    if (ends > 0) { 
      is_recovery = true,
      epoch_recovery_ends = ends
    }
  });
  
</script>

<main>
  {#if is_recovery}
  <CardAlert>
    <span slot="title">{$_("miner.cards.cant_start.title")} </span>
    Recovery Ends: {epoch_recovery_ends}
    <div slot="body">
      <p> {$_("miner.cards.cant_start.body")} </p>
    </div>
  </CardAlert>
  {/if}
</main>