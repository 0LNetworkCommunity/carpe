<script lang="ts">
  import { getMyTeam, myTeam } from "../../teams";
  import type {TeamEntry} from "../../teams";
  import { onMount } from "svelte";
  import { signingAccount } from "../../accounts";
  import { get } from "svelte/store";

  let my: TeamEntry;

  myTeam.subscribe(r =>{
    my = r;
  });

  let my_account;
  onMount(() => {
    my_account = get(signingAccount).account;
    getMyTeam(my_account)
  });

</script>

<main>
  {#if my}
    My team is <span class="uk-text-primary"> {my.name} </span>
  {/if}
</main>