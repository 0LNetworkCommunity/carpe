<script src="ts">
import AboutTeam from "./AboutTeam.svelte";
import MyTeam from "./MyTeam.svelte";
import TeamsTable from "./TeamsTable.svelte";

</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Teams</h2>
  </div>
  <div class="uk-flex uk-flex-center">
    <MyTeam />
  </div>

  <div class="uk-grid">
    <TeamsTable />
    <AboutTeam />
  </div>
</main>