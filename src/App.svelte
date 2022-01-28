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
  import {
    miner_loop_enabled,
    backlog_in_progress,
    // tower,
  } from "./miner";
  // import { notify_success } from "./carpeNotify";
  import { raise_error } from "./carpeError";
  import { getEnv, nodeEnvIsTest, responses } from "./debug";
  // import { proofComplete, proofError, towerOnce } from "./miner_invoke";
  // import { disableMining } from "./miner_toggle";
  import { routes } from "./routes";
  import "uikit/dist/css/uikit.min.css";
import { get } from "svelte/store";

  // let enabled;
  let unlistenTowerEvent;
  let unlistenTowerError;
  let unlistenBacklogSuccess;
  let unlistenBacklogError;
  let isTest = false;

  onMount(async () => {
    getEnv();
    nodeEnvIsTest.subscribe(b => isTest = b);

    ///// Backlog ////
    // Todo: Should this listener only be started in the miner view?

    // submitted tower txs, which happens with backlog, requires a private key.
    // so that the user does not need to keep authorizing the key,
    // there is a listener service which loads the key once, and then waits for a specific
    // event to trigger the backlog submission.

    unlistenBacklogSuccess = await listen("backlog-success", (event) => {
      window.alert("backlog success");
      // responses.set(event.payload as string);
      backlog_in_progress.set(false);
      // console.log()
    });

    unlistenBacklogError = await listen("backlog-error", (event) => {
      window.alert(event.payload);
      raise_error(event.payload, false);
      backlog_in_progress.set(false);
    });
  });

  onDestroy(() => {
    unlistenTowerEvent();
    unlistenTowerError();
    unlistenBacklogSuccess();
    unlistenBacklogError();
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
        {#if isTest}
        <!-- TODO: why does this not show when in test mode? Only if debug mode is set? -->
        <Route path={routes.developer} component={DevMode} primary={false} />
        <Route path={routes.swarm} component={Swarm} primary={false} />
        {/if}

        <!-- Show Debug Card Below -->
        <DebugCard/>


      </div>
    </Router>
  </div>  
</main>
