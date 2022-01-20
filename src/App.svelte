<script lang="ts">
  import { listen } from "@tauri-apps/api/event";
  import { onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
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
    tower,
  } from "./miner";
  import { notify_success } from "./carpeNotify";
  import { raise_error } from "./carpeError";
  import { debugMode, responses } from "./debug";
  import { proofComplete, proofError, towerOnce } from "./miner_invoke";
  import { disableMining } from "./miner_toggle";
  import { routes } from "./routes";
  import "uikit/dist/css/uikit.min.css";

  let enabled;
  let unlistenTowerEvent;
  let unlistenTowerError;
  let unlistenBacklogSuccess;
  let unlistenBacklogError;

  // Todo: Should this listener only be started in the miner view?
  onMount(async () => {    
    miner_loop_enabled.subscribe(e => enabled = e);

    unlistenTowerEvent = await listen("tower-event", (event) => {
      proofComplete();
      // is a type VDFProof
      console.log(event.payload);
      let height = event.payload.height;
      if (height) {
        notify_success(`Proof ${height} mined`);
      }
      let t = get(tower);
      t.latest_proof = event.payload;
      tower.set(t);

      // This section triggers the next block to start
      // it sends a listener event to the Rust side.
      if (enabled) {
        towerOnce();
      }
    });

    unlistenTowerError = await listen("tower-error", (event) => {
      proofError();
      // is a type CarpeError
      console.log(event);
      raise_error(event.payload, false);
      // also disable the mining loop.
      disableMining();
    });

    ///// Backlog ////
    unlistenBacklogSuccess = await listen("backlog-success", (event) => {
      window.alert(event.payload);
      responses.set(event.payload as string);
      backlog_in_progress.set(false);
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

<main class="uk-background-muted">
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
