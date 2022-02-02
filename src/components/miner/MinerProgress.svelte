<script>
  import { onDestroy, onMount } from "svelte";
  import {
    getProgess,
    backlogInProgress,
    minerLoopEnabled,
    tower,
  } from "../../miner";
import { setProofProgres } from "../../miner_invoke";

  let percent = 0;
  let looper;
  let proofDone = false;
  let backlogDone = false;
  let bar;

  // function animate(bar) {
  //   let ps = getProgess();

  //   if (ps && ps.time_start > 0) {
  //     let duration = ps.previous_duration;
  //     let since_start = Date.now() - ps.time_start;
  //     percent = since_start / duration;

  //     percent = percent >= 1 ? 0.9999 : percent; // never 100%
  //     if (proofDone) percent = 1;
  //     if (proofDone && backlogDone) percent = 0;
  //     bar.value = percent;
  //   } else {
  //     // we are starting over
  //     bar.value = 0;
  //   }
  // }

  let enable = false;
  onMount(async () => {
    bar = document.getElementById("mining-progressbar");

    // animate(bar);
    

    tower.subscribe((t) => {
      // console.log("tower subscribe");
      // console.log(t.progress);

      // Progress bar only starts when Rust confirms it is starting the miner.
      // Progress bar ends when:
      // - Rust side sends event with a proof completed
      // - Rust side send event with a failure
      if (t.progress && t.progress.pct_complete) {
        bar.value = percent = t.progress.pct_complete;
      }
      
      if (t.progress && t.progress.complete) {
        proofDone = t.progress.complete;
        clearInterval(looper);
      }
    });

    backlogInProgress.subscribe((b) => {
      backlogDone = b;
    });

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
        Proof Complete
      {:else}
        Mining In Progress - {formatPercent(percent)}     
        {#if percent > 1 }
          <span> Taking longer than expected... </span>
        {/if}
      {/if}
      
    </span>
      <!-- <span class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
        </span> -->
        <div uk-dropdown class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> 
          The percentage is an estimate. 
          <br> It is based on your previous proof's elapsed time.
        </div> 
    </div>

    <progress id="mining-progressbar" class="uk-progress" value="0" max="1" />





    
  </div>
</main>
