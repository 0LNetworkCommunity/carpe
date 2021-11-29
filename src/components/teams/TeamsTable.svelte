<script src="ts">

let teamsList = [];

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
              a.account == myTeam
                ? 'uk-text-primary'
                : ''
              }"
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