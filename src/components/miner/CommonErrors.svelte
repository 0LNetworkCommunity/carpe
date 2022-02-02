<script lang="ts">
import { onMount } from "svelte";
import { isCarpeInit } from "../../accounts";
import { carpeErrorLog } from "../../carpeError";
import { displayWrongDifficulty } from "../../miner";

import WrongDifficulty from "./cards/WrongDifficulty.svelte";

let isDiffErr = false;

onMount(async () => {
  displayWrongDifficulty.subscribe(ce => {
    if (ce.category) isDiffErr = true
  });
})

</script>

<main class="uk-margin">

  <div class="uk-grid uk-child-width-expand">
    {#if isDiffErr }
    <div>

      <WrongDifficulty/>
    </div>
    {/if}
    <div>
      <WrongDifficulty/>
    </div>
    <div>
      <WrongDifficulty/>
    </div>
  </div>
</main>