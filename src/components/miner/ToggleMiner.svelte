<script>
  import { toggleMining } from "../../miner_toggle";
  import { miner_loop_enabled } from "../../miner";

  let enabled; 
  miner_loop_enabled.subscribe(e => enabled = e);

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
      {#if enabled}
        <span style="position:absolute; left: 8px; top: 10px; bottom: 0px; color: white; font-size: 10px">ON</span>  
      {:else}
        <span style="position:absolute; right: 6px; top: 10px; bottom: 0px; color: white; font-size: 10px">OFF</span>
      {/if}
    </label>
  </div>
</main>
