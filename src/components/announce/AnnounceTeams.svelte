<script>
  import { Link } from "svelte-navigator";
import { closeAnnounce } from "../../announce";
  import CardAlert from "../layout/CardAlert.svelte";

</script>

<main>

  <CardAlert>
    <span slot="title">Join a Team </span>
    <div slot="body">
      <p>
        You could be earning more rewards from mining if you contribute your proofs to a Team.
        <span on:click={closeAnnounce}>
          <Link to="teams">See All Teams</Link>
        </span>
      </p>
    </div>
  </CardAlert>
</main>