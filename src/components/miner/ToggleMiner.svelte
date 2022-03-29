<script>
  import { onMount, onDestroy } from "svelte";
  import { toggleMining } from "../../miner_toggle";
  import { minerLoopEnabled } from "../../miner";

  let enabled;
  let unsubscribe; 

  onMount(async () => {
    unsubscribe = minerLoopEnabled.subscribe(boo => enabled = boo);
  });

  onDestroy(async () => {
    unsubscribe && unsubscribe();
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
