<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { _ } from "svelte-i18n";
  import {
    minerProofComplete,
    minerLoopEnabled,
  } from "../../miner";
  import { setProofProgres } from "../../miner_invoke";

  export let tower;

  let percent = 0;
  let looper;
  let proofDone = false;
  let enable = false;

  let unsubsProofComplete;
  let unsubsLoopEnabled;

  afterUpdate(() => {
    // Progress bar only starts when Rust confirms it is starting the miner.
    // Progress bar ends when:
    // - Rust side sends event with a proof completed
    // - Rust side send event with a failure
    if (tower.progress && tower.progress.pct_complete) {
      let bar = document.getElementById("mining-progressbar");
      bar.value = percent = tower.progress.pct_complete;
    }
  });
  
  onMount(async () => {
    unsubsProofComplete = minerProofComplete.subscribe(b => {
      proofDone = b;
      if (b) {
        percent = 1;
      }
    })

    unsubsLoopEnabled = minerLoopEnabled.subscribe((b) => {
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
    unsubsProofComplete && unsubsProofComplete();
    unsubsLoopEnabled && unsubsLoopEnabled();
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
