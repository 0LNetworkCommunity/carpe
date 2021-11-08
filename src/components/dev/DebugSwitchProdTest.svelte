<script lang="ts">
import { onMount } from "svelte";

import { getEnv, nodeEnv, setDebugProdTest } from "../../miner";

let current_env;

nodeEnv.subscribe((env) => {
  current_env = env;
})

onMount(()=> {
  current_env = getEnv(); // TODO: this should be async and awaited
})

</script>

<main>
  <h3>Miner Difficulty</h3>
  <div>
    <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
      <label
        ><input
          class="uk-radio"
          type="radio"
          name="radio2"
          checked={current_env == "prod"}
          on:click={() => setDebugProdTest("prod")}
        /> Prod
      </label>
      <label
        ><input
          class="uk-radio"
          type="radio"
          name="radio2"
          checked={current_env == "test"}
          on:click={() => setDebugProdTest("test")}
        /> Test
      </label>
    </div>
  </div>
</main>
