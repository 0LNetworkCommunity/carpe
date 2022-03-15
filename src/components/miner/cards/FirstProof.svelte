<script lang="ts">
  import { onMount } from "svelte";
  import CardAlert from "../../layout/CardAlert.svelte";
  import { minerLoopEnabled } from "../../../miner";
import { _ } from "svelte-i18n";

  let enabled = false; 
  onMount(async () => {
    minerLoopEnabled.subscribe(boo => enabled = boo);
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
