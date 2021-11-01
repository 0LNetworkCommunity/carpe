<script lang="ts">
  import { backlog_in_progress} from "../../miner";

  let backlog;
  backlog_in_progress.subscribe(b => backlog = b);

</script>

<main>
  <div>
    <span>Backlog In Progress: {backlog} </span> 
  </div>
</main>
