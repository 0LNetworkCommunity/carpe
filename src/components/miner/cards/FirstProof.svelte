<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  import { minerLoopEnabled } from "../../../modules/miner";

  import CardAlert from "../../layout/CardAlert.svelte";

  let enabled = false; 
  let unsubsLoopEnabled;
  
  onMount(async () => {
    unsubsLoopEnabled = minerLoopEnabled.subscribe(boo => enabled = boo);
  });

  onDestroy(async () => {
    unsubsLoopEnabled && unsubsLoopEnabled();
  });

</script>

<CardAlert>
  <span slot="title">{$_("miner.cards.first_proof.title")}</span>
  <div slot="body">
    {#if enabled}
      {@html $_("miner.cards.first_proof.body")}
    {:else}
      <p> {$_("miner.cards.first_proof.body_disabled")} </p>
    {/if}
  </div>
</CardAlert>
