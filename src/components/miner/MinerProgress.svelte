<script>
  import { onDestroy, onMount } from "svelte";
  import {
    getProgess,
    backlogInProgress,
    minerLoopEnabled,
    tower,
  } from "../../miner";

  let percent = 0;
  let looper;
  let proofDone = false;
  let backlogDone = false;
  let bar;

  // Progress bar only starts when Rust confirms it is starting the miner.
  // Progress bar ends when:
  // - Rust side sends event with a proof completed
  // - Rust side send event with a failure

  function animate(bar) {
    let ps = getProgess();

    if (ps && ps.time_start > 0) {
      let duration = ps.previous_duration;
      let since_start = Date.now() - ps.time_start;
      percent = since_start / duration;

      percent = percent >= 1 ? 0.9999 : percent; // never 100%
      if (proofDone) percent = 1;
      if (proofDone && backlogDone) percent = 0;
      bar.value = percent;
    } else {
      // we are starting over
      bar.value = 0;
    }
  }

  let enable = false;
  onMount(async () => {
    bar = document.getElementById("mining-progressbar");

    animate(bar);
    looper = setInterval(() => animate(bar), 1000);

    tower.subscribe((t) => {
      console.log("tower subscribe");
      console.log(t.progress);

      

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
      // if (enable) {
      //   // create the bar if not yet started.
      //   animate(bar);
      // }
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
    <p class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      Mining progress:
      {#if !proofDone}
        <span uk-spinner class="uk-margin-left" />
      {/if}

      <span class="uk-margin-left">{formatPercent(percent)}</span>
    </p>

    <progress id="mining-progressbar" class="uk-progress" value="0" max="1" />
  </div>
</main>
