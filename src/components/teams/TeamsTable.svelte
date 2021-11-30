<script lang="ts">
  import { allTeams, getAllTeams, getMyTeam, mockTeam, myTeam, viewThisTeam } from "../../teams";
  import type {TeamEntry} from "../../teams";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { signingAccount } from "../../accounts";


  let teamsList;
  
  allTeams.subscribe( r => {
    teamsList = r;
  });

  let mt;
  myTeam.subscribe(r =>{
    mt = r;
  });

  let my_account;
  onMount(() => {
    my_account = get(signingAccount).account;
    getMyTeam(my_account);
    getAllTeams()
  });
  
  
  
</script>

<main>
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>Team Name</th>
          <th># Members</th>
          <th>Pool % </th>
          <th>Estimated Rewards</th>
        </tr>
      </thead>
      <tbody>
        {#each teamsList as a, i}
          <tr
            class="{
              a.captain_address == mt.captain_address
                ? 'uk-text-primary'
                : ''
              }"

              on:click={() => { viewThisTeam(a) }}
          >
            <td>avatar</td>
            <td>{a.name}</td>
            <td>{a.count_members}</td>
            <td>{a.pct_pool}</td>
            <td>{a.estimated_epoch_reward}</td>

          </tr>
        {/each}
      </tbody>
    </table>
</main>