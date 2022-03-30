<script lang="ts">
  import { afterUpdate } from "svelte";
  import MinerBacklog from "../MinerBacklog.svelte";
  import CardError from "../../layout/CardError.svelte";

  export let minerTower;
  let delta: number;

  afterUpdate(() => {
    delta = minerTower.local_height - minerTower.on_chain.verified_tower_height;
  });
</script>

<main>
  <CardError>
    <span slot="title"> {delta} proofs missing </span>
    <div slot="body"> <MinerBacklog/> </div>
  </CardError>    
</main>