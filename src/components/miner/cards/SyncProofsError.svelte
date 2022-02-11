<script lang="ts">
  import { onMount } from "svelte";
  import { tower } from "../../../miner";
  import MinerBacklog from "../MinerBacklog.svelte";
  import CardError from "../../layout/CardError.svelte";

  let delta: number;

  onMount(async () => {
    delta = null;
    tower.subscribe(t => {
      delta = t.local_height - t.on_chain.verified_tower_height
    });

  })
</script>

<main>
  <CardError>
    <span slot="title"> {delta} proofs missing </span>
    <div slot="body"> <MinerBacklog/> </div>
  </CardError>    
</main>