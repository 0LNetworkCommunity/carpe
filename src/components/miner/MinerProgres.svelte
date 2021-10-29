<script>
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { proofState } from "../../miner";

  onMount(() => {
    var bar = document.getElementById("js-progressbar");

    var animate = setInterval(function () {
      let ps = get(proofState);
      if (ps.time_start > 0) {
        let duration = 5 * 1000; // ps.previous_duration
        let since_start = Date.now() - ps.time_start;
        console.log(since_start);
        bar.value = since_start / duration;
      } else {
        bar.value = 0;
      }
      

      if (bar.value >= bar.max) {
        clearInterval(animate);
      }
    }, 1000);
  });
</script>

<main>
  <progress id="js-progressbar" class="uk-progress" value="0" max="1" />
</main>
