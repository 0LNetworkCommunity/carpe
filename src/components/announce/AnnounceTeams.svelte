<script>
  import { Link } from "svelte-navigator";
  import CardAlert from "../layout/CardAlert.svelte";

</script>

<main>

  <CardAlert>
    <span slot="title">Join a Team </span>
    <div slot="body">
      <p>
        You could be earning more rewards from mining if you contribute your proofs to a Team.
        <Link to="teams">See All Teams</Link>
      </p>
    </div>
  </CardAlert>
</main>