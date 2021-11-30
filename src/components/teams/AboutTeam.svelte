
<script lang="ts">
  import {teamView} from "../../teams";
  import type {TeamEntry} from "../../teams";
  
  let teamToView: TeamEntry;

  teamView.subscribe(t => teamToView = t);

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