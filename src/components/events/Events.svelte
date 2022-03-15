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

  onMount(async () => {
    unsubscribeAccount = signingAccount.subscribe((account) => {
      myAccount = account;
      getAccountEvents(account);
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
    {#if events == null} <!-- every account has at least 1 onboarding transaction -->
      <span uk-spinner style="position:absolute; top:0px; left:0px"/>
      <EventsTableDummy />
    {:else}
      <EventsTable {events} />
    {/if}
  </div>
</main>