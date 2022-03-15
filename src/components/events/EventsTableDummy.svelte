<script lang="ts">
  import { _ } from "svelte-i18n";

  let received = $_("events.received_payment");

  let dummyEvents = [
    { version: 99999999, type: received, amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: received, amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: received, amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: received, amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" },
    { version: 99999999, type: received, amount: "000.00", sender: "00000000000000000000000000000000", receiver: "00000000000000000000000000000000" }
  ]
</script>

<main>
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th class="uk-text-right"><span class="dummy-container">{$_("events.version")}</span></th>
        <th class="uk-text-center"><span class="dummy-container">{$_("events.type")}</span></th>
        <th class="uk-text-right"><span class="dummy-container">{$_("events.amount")}</span></th>
        <th class="uk-text-center"><span class="dummy-container">{$_("events.sender")}</span></th>
        <th class="uk-text-center"><span class="dummy-container">{$_("events.receiver")}</span></th>
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