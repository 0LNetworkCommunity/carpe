<script>
  import { onMount } from "svelte";
  import CardAlert from "../../layout/CardAlert.svelte";
  import { minerLoopEnabled } from "../../../miner";

  let enabled = false; 
  onMount(async () => {
    minerLoopEnabled.subscribe(boo => enabled = boo);
  });

</script>

<CardAlert>
  <span slot="title">Let's mine your first proof </span>
  <div slot="body">
    {#if enabled}
      <p> Hang tight! This will take at least 30mins, maybe up to 1hr</p>
      <p> You will see your balance go down while you mine proofs. If you reach the minimum per day, you will receive a reward, on the next day (epoch).</p>
      <p> Check your computer settings so that the computer doesn't sleep when the screen shuts off. You want the miner running while you're not here.</p>
    {:else}
      <p> Turn the switch on to start mining! </p>
    {/if}
  </div>
</CardAlert>
