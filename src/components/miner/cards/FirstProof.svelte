<script>
  import CardAlert from "../../layout/CardAlert.svelte";
  import { miner_loop_enabled } from "../../../miner";

  let enabled = false; 
  miner_loop_enabled.subscribe(boo => enabled = boo);

</script>

<CardAlert>
  <span slot="title">Mining your first proof </span>
  <div slot="body">
    {#if enabled}
      <p> Hang tight! This will take at least 30mins, maybe up to 1hr</p>
      <p> Meanwhile, check your computer settings so that the computer doesn't sleep when the screen shuts off, you want the miner running while you're not here.</p>
    {:else}
      <p> Turn the switch on to start mining! </p>
    {/if}
  </div>
</CardAlert>
