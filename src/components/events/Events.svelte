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
      <p class="uk-text-center uk-text-warning">{loadingError.msg}</p>
      <p class="uk-text-center uk-text-warning">Don't worry. Your wallet and coins are safe on the chain.</p>
      <p class="uk-text-center uk-text-warning">Try connecting to another upstream node.</p>
    {:else if events == null} 
      <span uk-spinner style="position:absolute; top:0px; left:0px"/>
      <EventsTableDummy />
    {:else if events.length == 0} <!-- every account has at least 1 onboarding transaction -->
      <p class="uk-text-center uk-text-warning">No events found because connected node database is probably corrupted.</p>
      <p class="uk-text-center uk-text-warning">Don't worry. Your wallet and coins are safe on the chain.</p>
      <p class="uk-text-center uk-text-warning">Try connecting to another upstream node.</p>
    {:else}
      <EventsTable {events} />
    {/if}
  </div>
</main>