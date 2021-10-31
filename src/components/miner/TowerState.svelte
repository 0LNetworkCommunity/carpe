<script>
  import {tower, getTowerChainView} from "../../miner";
  import { onMount } from "svelte";
  import { signingAccount } from "../../accounts";

  let towerState;

  tower.subscribe((m) => {
    console.log(m);
    towerState = m;
  });

  signingAccount.subscribe((m) => {
    console.log(m);
    getTowerChainView();
  });

  onMount(() => {
    getTowerChainView();
  });

</script>

<main>

  {#if towerState.on_chain}
    <div class="margin">
      <span>
        previous hash: {towerState.on_chain.previous_proof_hash}
      </span>
    </div>
  {/if}

</main>