<script>
  import AnnounceTeams from "./AnnounceTeams.svelte";

  let inTeam = false;
</script>

<main>
  {#if !inTeam}
    <AnnounceTeams />
  {/if}
</main>