<script lang="ts">
  import { onDestroy, onMount } from "svelte";
import { _ } from "svelte-i18n";
  import {
    minerProofComplete,
    minerLoopEnabled,
    tower,
  } from "../../miner";
  import { setProofProgres } from "../../miner_invoke";

  let percent = 0;
  let looper;
  let proofDone = false;
  let bar;
  let enable = false;
  
  onMount(async () => {
    bar = document.getElementById("mining-progressbar");


    tower.subscribe((t) => {
      // Progress bar only starts when Rust confirms it is starting the miner.
      // Progress bar ends when:
      // - Rust side sends event with a proof completed
      // - Rust side send event with a failure
      if (t.progress && t.progress.pct_complete) {
        bar.value = percent = t.progress.pct_complete;
      }
    });

    minerProofComplete.subscribe(b => {
      proofDone = b;
      if (b) {
        percent = 1;
      }
    })

    minerLoopEnabled.subscribe((b) => {
      enable = b;
      if (enable) {
        // create the bar if not yet started.
        // for safety clear the interval
        clearInterval(looper);
        looper = setInterval(() => setProofProgres(), 1000);
      }
    });
  });

  onDestroy(() => {
    clearInterval(looper);
  });

  function formatPercent(decimal) {
    return (decimal * 100).toFixed(0) + "%";
  }
</script>

<main>
  <div class="{enable ? '' : 'uk-invisible'} uk-margin-top">

    <div class="uk-inline">
    <span class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      {#if proofDone }
        {$_("miner.miner_process.status_complete")}
      {:else}
      {$_("miner.miner_process.status_in_process")} {formatPercent(percent)}
      {/if}
      
    </span>
      <!-- <span class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
        </span> -->
        <div uk-dropdown class="uk-text-light uk-text-muted uk-text-thin"> 
          {@html $_("miner.miner_process.notes")}
        </div> 
    </div>

    <progress id="mining-progressbar" class="uk-progress" value="0" max="1" />
    
    <span class="uk-text-light uk-text-muted uk-text-thin">
      {#if percent > 1.01 }
        <span> {$_("miner.miner_process.notes2")} </span>
      {/if}
    </span>
  </div>
</main>
