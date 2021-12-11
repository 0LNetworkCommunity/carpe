<script>
  import { onDestroy, onMount } from "svelte";
  import { getProgess, miner_loop_enabled } from "../../miner";

  let percent = 0;
  let looper;

  function animate(bar) { 
    let ps = getProgess();      
    if (ps && ps.time_start > 0) {
      let duration = ps.previous_duration;
      let since_start = Date.now() - ps.time_start;
      percent = since_start / duration;
      
      percent = percent >= 1 ? 0.99 : percent; // never 100%
      bar.value = percent;
    } 
    else {
      // we are starting over
      bar.value = 0;
    }    
  }
  
  let enable = false;
  onMount(async () =>{   
    miner_loop_enabled.subscribe(boo => {
      enable = boo;
      if (enable) {
        percent = 0;
        let bar = document.getElementById("mining-progressbar");
        animate(bar);
        looper = setInterval(() => animate(bar), 10000);
      } else {
        clearInterval(looper);
      }
    })      
  });

  onDestroy(() => {
    clearInterval(looper)
  });

  function formatPercent(decimal) {
    return (decimal * 100).toFixed(2) + "%"
  }

</script>

<main class="{enable ? "" : "uk-invisible"} uk-margin-top">
  <p class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Mining progress: 
    <span uk-spinner class="uk-margin-left"></span>
    <span class="uk-margin-left">{formatPercent(percent)}</span>
  </p>
  <progress id="mining-progressbar" class="uk-progress" value="0" max="1" />
</main>

