<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { accountEvents, signingAccount } from "../../accounts";
  import { getAccountEvents } from "../../accountActions";
  import EventsTable from "./EventsTable.svelte";
  import EventsTableDummy from "./EventsTableDummy.svelte";
  import { _ } from "svelte-i18n";

  let events = null;
  let myAccount = null;

  let unsubscribeAccount;
  let unsubscribeEvents;

  let loadingError = null;

  onMount(async () => {
    unsubscribeAccount = signingAccount.subscribe((account) => {
      if (myAccount && myAccount.account == account.account) {
        return;
      }
      myAccount = account;
      getAccountEvents(myAccount, (error) => { loadingError = error });
      unsubscribeEvents = accountEvents.subscribe((all) => { events = all[myAccount.account] });
    });
  });

  onDestroy(async () => {
    unsubscribeAccount && unsubscribeAccount();
    unsubscribeEvents && unsubscribeEvents();
  });
</script>
  
<main class="uk-height-viewport">
  <div style="position:relative">
    <div class="uk-flex uk-flex-center">
      <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("events.account_events")}</h2>
    </div>
    {#if loadingError}
      <div class="uk-text-center">
        <p>Carpe was not able to fetch data from the chain. Error:</p>
        <p class="uk-text-warning">{loadingError.msg}</p>
        <button class="uk-button uk-button-default">Retry</button>
      </div>
    {:else if events == null} <!-- every account has at least 1 onboarding transaction -->
      <span uk-spinner style="position:absolute; top:0px; left:0px"/>
      <EventsTableDummy />
    {:else if events.length == 0}
      <p class="uk-text-center uk-text-warning">No events found for this account. Connected node DB is probably corrupted but your data is safe in the chain.</p>
    {:else}
      <EventsTable {events} />
    {/if}
  </div>
</main>