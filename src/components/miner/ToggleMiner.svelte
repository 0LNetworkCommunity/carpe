<script>
  import { onMount } from "svelte";
  import { toggleMining } from "../../miner_toggle";
  import { minerLoopEnabled } from "../../miner";

  let enabled; 
  onMount(async () => {
    minerLoopEnabled.subscribe(e => enabled = e);
  });

</script>

<main>
  <div class="uk-text-center uk-margin" style="position: relative">
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
