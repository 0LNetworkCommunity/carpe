<script lang="ts">
  let dummyEvents = [
    { version: 99999999, type: "RRRRRRR RRRRRRRR", amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: "RRRRRRR RRRRRRRR", amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: "RRRRRRR RRRRRRRR", amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: "RRRRRRR RRRRRRRR", amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
  ]
</script>

<main>
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th class="uk-text-right"><span class="dummy-container">Version</span></th>
        <th class="uk-text-center"><span class="dummy-container">Type</span></th>
        <th class="uk-text-right"><span class="dummy-container">Amount</span></th>
        <th class="uk-text-center"><span class="dummy-container">Sender</span></th>
        <th class="uk-text-center"><span class="dummy-container">Receiver</span></th>
      </tr>
    </thead>
    <tbody>
      {#each dummyEvents as event}
        <tr>
          <td class="uk-text-right"><span class="dummy-container">{event.version}</span></td>
          <td class="uk-text-center"><span class="dummy-container">{event.type}</span></td>
          <td class="uk-text-right"><span class="dummy-container">{event.amount}</span></td>
          <td class="uk-text-center"><span class="dummy-container">{event.sender}</span></td>
          <td class="uk-text-center"><span class="dummy-container">{event.receiver}</span></td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
  .dummy-container {
    background-color: #F0F0F0;
    color: #F0F0F0;
  }
</style>