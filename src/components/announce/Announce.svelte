<script>
  import { closeAnnounce } from "../../announce";
  import AnnounceTeams from "./AnnounceTeams.svelte";

  let inTeam = false;
</script>

<main>
  <div class="uk-margin-small">
    <button type="button" uk-close on:click={closeAnnounce}></button>
  </div>

  {#if !inTeam}
    <AnnounceTeams />
  {/if}
</main>