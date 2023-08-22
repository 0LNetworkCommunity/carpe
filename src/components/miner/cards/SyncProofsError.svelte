<script lang="ts">
  import MinerBacklog from '../MinerBacklog.svelte'
  import CardError from '../../layout/CardError.svelte'

  export let delta: number;

</script>

<main>
  <CardError>
    <span slot="title"> {delta} proofs missing </span>
    <div slot="body"><MinerBacklog /></div>
  </CardError>
</main>
