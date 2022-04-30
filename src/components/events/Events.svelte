<script lang="ts">

  import { onMount, onDestroy } from "svelte";
  import { accountEvents, signingAccount } from "../../accounts";
  import { getAccountEvents } from "../../accountActions";
  import EventsTable from "./EventsTable.svelte";
  import EventsTableDummy from "./EventsTableDummy.svelte";
  import { _ } from "svelte-i18n";
  import EventsError from "./EventsError.svelte";

  let events = null;
  let myAccount = null;

  let unsubscribeAccount;
  let unsubscribeEvents;

  let loadingError = null;

  const errors = {
    "corrupted_db": $_("events.loading.corrupted_db"),
    "account_not_on_chain": $_("events.loading.account_off_chain"),
  }

  onMount(async () => {
    unsubscribeAccount = signingAccount.subscribe((account) => {
      if (myAccount && myAccount.account == account.account) {
        return;
      }
      loadingError = null;
      myAccount = account;
      getAccountEvents(myAccount, error => loadingError = errors[error] || error);
      unsubscribeEvents = accountEvents.subscribe((all) => { events = all[myAccount.account] });
    });
  });

  onDestroy(async () => {
    unsubscribeAccount && unsubscribeAccount();
    unsubscribeEvents && unsubscribeEvents();
  });
</script>
  
<main>
  <div style="position:relative">
    <div class="uk-flex uk-flex-center">
      <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("events.account_events")}</h2>
    </div>
    {#if loadingError}
      <EventsError {loadingError} />
    {:else if events == null} 
      <span uk-spinner style="position:absolute; top:0px; left:0px"/>
      <EventsTableDummy />
    {:else}
      <EventsTable {events} />
    {/if}
  </div>
</main>