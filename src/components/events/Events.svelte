<script lang="ts">
  import { onMount } from "svelte";
  import { accountEvents, signingAccount } from "../../accounts";
  import { get_locale, getAccountEvents } from "../../accountActions";

  let events = null;
  let myAccount = null;

  onMount(async () => {
    signingAccount.subscribe((account) => {
      myAccount = account;
      getAccountEvents(account);
            
      accountEvents.subscribe((all) => {
        console.log(">>> all");
        console.log(all);
        console.log(">>> my account: " + myAccount.account);
        events = all[myAccount.account];
        console.log(">>> my events");
        console.log(events);
      });
    });
  });

  // TODO: move to tauri commands
  function formatAmount(balance) {
    const balanceScaled = balance / 1000000;

    return balanceScaled.toLocaleString(get_locale(), {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
</script>
  
<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Account Events</h2>
  </div>
  {#if events == null}
      <span uk-spinner />
      <span class="uk-align-center">loading...</span>
  {:else}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-right">Sequence</th>
          <th class="uk-text-center">Type</th>
          <th class="uk-text-right">Amount</th>
          <th class="uk-text-center">Sender</th>
          <th class="uk-text-center">Receiver</th>
        </tr>
      </thead>
      <tbody>
        {#each events as event}
          <tr>
            <td class="uk-text-right">{event.sequence_number}</td>
            <td class="uk-text-center">{event.data.type}</td>
            <td class="uk-text-right">{formatAmount(event.data.amount.amount)}</td>
            <td class="uk-text-center">{event.data.sender}</td>
            <td class="uk-text-center">{event.data.receiver}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>