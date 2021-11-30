
<script lang="ts">
  import {TeamEntry, viewThisTeam} from "../../teams";

  export let teamToView: TeamEntry;

  viewThisTeam.subscribe(t => teamToView = t);

</script>

<main>
  <div class="uk-card uk-card-default uk-card-body">
      <h3 class="uk-card-title"> About team </h3>
      <div>
        {teamToView.captain_address}

        hello team
      </div>
      
    </div>
</main>