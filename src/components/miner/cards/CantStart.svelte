<script>
import CardAlert from "../../layout/CardAlert.svelte";

</script>
<main>

  <CardAlert>
    <span slot="title">Your account does not exist on chain yet </span>
    <div slot="body">
      <p> The miner can't start until the account can be found on chain. Maybe you've generated new keys locally, but no one has sent any coins to that address?</p>
    </div>
  </CardAlert>
</main>