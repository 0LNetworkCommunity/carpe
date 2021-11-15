<script>
  import { onDestroy, onMount } from "svelte";
  import { getProgess, miner_loop_enabled } from "../../miner";

  let percent = 0;
  let animate;

  onMount(() =>{
    let bar = document.getElementById("js-progressbar");

    animate = setInterval(function () { 

    let ps = getProgess();
    
    console.log(ps);
    // window.alert(JSON.stringify(ps));
    if (ps && ps.time_start > 0) {
      let duration = ps.previous_duration;
      console.log(duration);
      let since_start = Date.now() - ps.time_start;
      console.log(ps.time_start);
      console.log(since_start);
      percent = since_start / duration;
      console.log(percent);
      bar.value = percent;
    } 
    else {
      // we are starting over
      bar.value = 0;
    }
  }, 10000);

  });

  let enable = false;
  miner_loop_enabled.subscribe(boo => {
    enable = boo;
    if (!enable) { // if the miner switched to be disabled.
      clearInterval(animate);
    }
  })

  onDestroy(() => {
    clearInterval(animate)
  });

</script>

{#if enable}
  <main>
      <p class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Mining progress</p>
      <progress id="js-progressbar" class="uk-progress" value="0.5" max="1" />
  </main>
{/if}
