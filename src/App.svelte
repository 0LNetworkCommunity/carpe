<script lang="ts">
  import { listen } from "@tauri-apps/api/event";
  import type { Event } from "@tauri-apps/api/event";
  import { onDestroy, onMount } from "svelte";
  import { Router, Route } from "svelte-navigator";
  import Nav from "./components/Nav.svelte";
  import DebugCard from "./components/dev/DebugCard.svelte";
  import Wallet from "./components/wallet/Wallet.svelte";
  import Miner from "./components/miner/Miner.svelte";
  import Settings from "./components/settings/Settings.svelte";
  import DevMode from "./components/dev/DevMode.svelte";
  import AccountFromMnemForm from "./components/wallet/AccountFromMnemForm.svelte";
  import Swarm from "./components/dev/Swarm.svelte";
  import Keygen from "./components/wallet/Keygen.svelte";
  import Transactions from "./components/txs/Transactions.svelte";
  import Events from "./components/events/Events.svelte";
  import About from "./components/about/About.svelte";
  import { backlogInProgress, backlogSubmitted, minerEventReceived } from "./miner";
  import { raise_error, logger, Level } from "./carpeError";
  import type { CarpeError } from "./carpeError";
  import { getEnv, responses, debugMode } from "./debug";
  import { routes } from "./routes";
  import "uikit/dist/css/uikit.min.css";
  import { getDefaultProfile, isCarpeInit, migrate, refreshAccounts, updateMakeWhole } from "./accountActions";
  import { getVersion } from "./version";
  import { carpeTick } from "./tick";
  import { init_preferences } from "./preferences";
  import SearchingFullnodes from "./components/layout/SearchingFullnodes.svelte";
  import RecoveryMode from "./components/layout/RecoveryMode.svelte";
  import MakeWhole from "./components/make-whole/MakeWhole.svelte";
  import { getMetadata, getNetwork, refreshUpstreamPeerStats } from "./networks";

  
  // Init i18n and preferences
  // TODO: why is this duplicated in Nav.svelte?
  init_preferences();
 
  let unlistenProofStart;
  let unlistenAck;
  let unlistenBacklogSuccess;
  let unlistenBacklogError;
  let healthTick;
  let debug = false;

  onMount(async () => {
    logger(Level.Warn, "Webview is starting");

    getEnv(); // load env var
    getVersion(); // git commit and version
    
    // try to migrate carpe files from v5-6 to v7
    migrate();

    // try to connect to a chain eagerly.
    // if not we will be scanning for peers below
    isCarpeInit()
    .then(getDefaultProfile)
    .then(getNetwork)
    .then(getMetadata) // try to connect to a chain eagerly.
    .then(refreshAccounts) // should only try to refresh accounts if we are connected to a chain
    .then(updateMakeWhole) // check for make whole only once on startup
    .finally(refreshUpstreamPeerStats) // if not we will be scanning for peers
    healthTick = setInterval(carpeTick, 30000); // do a healthcheck, this is async

    debugMode.subscribe(b => debug = b);
    
    ///// Backlog /////
    // Todo: Should this listener only be started in the miner view?

    // submitted tower txs, which happens with backlog, requires a private key.
    // so that the user does not need to keep authorizing the key,
    // there is a listener service which loads the key once, and then waits for a specific
    // event to trigger the backlog submission.

    unlistenProofStart = await listen("proof-start", (event: any) => {
      responses.set(event.payload);
      //update the tower stats after we show the backlog being up to date.
      minerEventReceived.set(true);
      backlogInProgress.set(false);
      backlogSubmitted.set(false);
    });
    

    unlistenAck = await listen ("ack-backlog-request", (event: any) => {
      backlogInProgress.set(true);
    });

    

    unlistenBacklogSuccess = await listen("backlog-success", (event: any) => {
      responses.set(event.payload);
      //update the tower stats after we show the backlog being up to date.
      backlogInProgress.set(false);
      backlogSubmitted.set(true);
      carpeTick();
    });

    unlistenBacklogError = await listen("backlog-error", (event: Event<CarpeError>) => {
      // TODO: show an UX in the miner view for this type of error
      
      raise_error(event.payload, true, "listen(backlog-error)");
      
      backlogInProgress.set(false);
      backlogSubmitted.set(false);
    });
  });

  onDestroy(() => {
    unlistenProofStart();
    unlistenAck();
    unlistenBacklogSuccess();
    unlistenBacklogError();
    clearInterval(healthTick);
  })
</script>

<main class="uk-background-muted uk-height-viewport">
  <SearchingFullnodes />
  <RecoveryMode/>
  
  <div class="uk-container">
    <Router>
      <Nav />
      <div class="uk-background-muted uk-margin-large">
        <Route path={routes.home} component={Wallet} primary={false} />
        <!-- <Route path="/add-account" component={AddAccount} primary={false} /> -->
        <Route
          path={routes.accountFromMnem}
          component={AccountFromMnemForm}
          primary={false}
        />
        <Route path={routes.keygen} component={Keygen} primary={false} />
        <Route path={routes.miner} component={Miner} primary={false} />
        <Route path={routes.transactions} component={Transactions} primary={false} />
        <Route path={routes.events} component={Events} primary={false} />
        <Route path={routes.settings} component={Settings} primary={false} />
        <Route path={routes.about} component={About} primary={false} />
        <Route path={routes.makeWhole} component={MakeWhole} primary={false} />

        <!-- DEV -->
        <Route path={routes.developer} component={DevMode} primary={false} />
        <Route path={routes.swarm} component={Swarm} primary={false} />

        <!-- Show Debug Card Below -->
        {#if debug }
          <DebugCard/>
        {/if}


      </div>
    </Router>
  </div>  
</main>
