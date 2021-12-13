<script>
  import { onMount } from "svelte";
  import { toggleMining } from "../../miner_toggle";
  import { miner_loop_enabled } from "../../miner";

  let enabled; 
  onMount(async () => {
    miner_loop_enabled.subscribe(e => enabled = e);
  });

</script>

<main>
  <div class="uk-text-center" style="position: relative">
    <label class="uk-switch">
      <input
        type="checkbox"
        on:click={() => toggleMining()}
        checked={enabled}
      />
      <div class="uk-switch-slider uk-switch-on-off round" />     
    </label>
  </div>
</main>
