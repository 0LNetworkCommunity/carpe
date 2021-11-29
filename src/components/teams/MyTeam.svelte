<script lang="ts">
  import { mockTeam } from "../../teams";
  import type {TeamEntry} from "../../teams";



  let myTeam:TeamEntry = mockTeam;
</script>
<main>
  My team is {myTeam.name}
</main>