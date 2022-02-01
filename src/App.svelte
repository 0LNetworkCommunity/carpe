<script lang="ts">
  import { listen } from "@tauri-apps/api/event";
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
  import About from "./components/about/About.svelte";
  import { backlog_in_progress } from "./miner";
  import { raise_error } from "./carpeError";
  import { getEnv, nodeEnvIsTest, responses } from "./debug";
  import { routes } from "./routes";
  import "uikit/dist/css/uikit.min.css";
  import { refreshStats } from "./miner_health";
  import { loadAccounts } from "./accounts";

  let unlistenBacklogSuccess;
  let unlistenBacklogError;
  let isTest = false;
  let healthTick;

  onMount(async () => {
    getEnv();

    loadAccounts();

    refreshStats();

    healthTick = setInterval(refreshStats, 30000); // do a healthcheck, this is async

    nodeEnvIsTest.subscribe(b => isTest = b);

    ///// Backlog /////
    // Todo: Should this listener only be started in the miner view?

    // submitted tower txs, which happens with backlog, requires a private key.
    // so that the user does not need to keep authorizing the key,
    // there is a listener service which loads the key once, and then waits for a specific
    // event to trigger the backlog submission.

    unlistenBacklogSuccess = await listen("backlog-success", (event: any) => {
      responses.set(event.payload);
      //update the tower stats after we show the backlog being up to date.
      refreshStats();
      backlog_in_progress.set(false);
    });

    unlistenBacklogError = await listen("backlog-error", (event) => {
      // TODO: show an UX in the miner view for this type of error

      raise_error(event.payload, false);
      backlog_in_progress.set(false);
    });
  });

  onDestroy(() => {
    unlistenBacklogSuccess();
    unlistenBacklogError();
    clearInterval(healthTick);
  })
</script>

<main class="uk-background-muted uk-height-viewport">
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
        <Route path={routes.settings} component={Settings} primary={false} />
        <Route path={routes.about} component={About} primary={false} />

        <!-- DEV -->
        <Route path={routes.developer} component={DevMode} primary={false} />
        <Route path={routes.swarm} component={Swarm} primary={false} />

        <!-- Show Debug Card Below -->
        <DebugCard/>


      </div>
    </Router>
  </div>  
</main>
