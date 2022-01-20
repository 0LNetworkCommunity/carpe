<script lang="ts">
import CardError from "./CardError.svelte";


</script>

<main>

  <CardError>
    <span slot="title">Oops, We Can't Connect to 0L Network</span>
    <div slot="body">
      <p> This is likely because the upstream peer (server) you use is down.</p>
      <h3> Don't worry, your account and coins are safe.</h3>
    </div>
  </CardError>
</main>
