<script lang="ts">
  import "uikit/dist/css/uikit.min.css";
  import { Router, Link, Route } from "svelte-navigator";
  import Wallet from "./components/wallet/Wallet.svelte";
  import Miner from "./components/miner/Miner.svelte";
  import Settings from "./components/settings/Settings.svelte";
  import DevMode from "./components/dev/DevMode.svelte";
  import AccountFromMnemForm from "./components/wallet/AccountFromMnemForm.svelte";
  import Swarm from "./components/dev/Swarm.svelte";
  import Keygen from "./components/wallet/Keygen.svelte";
  import Transactions from "./components/txs/Transactions.svelte";
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import {
    miner_loop_enabled,
    disableMining,
    proofComplete,
    proofError,
    towerOnce,
    backlog_in_progress,
    tower,
  } from "./miner";
  import { success } from "./carpeNotify";
  import { raise_error } from "./carpeError";
  import { debugMode, responses } from "./debug";
  import { get } from "svelte/store";
  import Nav from "./components/Nav.svelte";
import DebugCard from "./components/dev/DebugCard.svelte";

  let debug = false;
  debugMode.subscribe((d) => {
    debug = d;
  })

  let enabled;
  miner_loop_enabled.subscribe((e) => (enabled = e));
  // Todo: Should this listener only be started in the miner view?
  onMount(() => {
    listen("tower-event", (event) => {
      proofComplete();
      // is a type VDFProof
      console.log(event.payload);
      let height = event.payload.height;
      if (height) {
        success(`Proof ${height} mined`);
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

    listen("tower-error", (event) => {
      proofError();
      // is a type CarpeError
      console.log(event);
      raise_error(event.payload, false);
      // also disable the mining loop.
      disableMining();
    });

    ///// Backlog ////
    listen("backlog-success", (event) => {
      window.alert(event.payload);
      responses.set(event.payload as string);
      backlog_in_progress.set(false);
    });

    listen("backlog-error", (event) => {
      window.alert(event.payload);
      raise_error(event.payload, false);
      backlog_in_progress.set(false);
    });
  });
</script>

<main class="uk-background-muted">
  <div class="uk-container">
    <Router>
       <Nav />

      <div class="uk-background-muted uk-margin-large">
        <Route path="/" component={Wallet} primary={false} />
        <!-- <Route path="/add-account" component={AddAccount} primary={false} /> -->
        <Route
          path="/account-from-mnem"
          component={AccountFromMnemForm}
          primary={false}
        />
        <Route path="/keygen" component={Keygen} primary={false} />
        <Route path="/miner" component={Miner} primary={false} />
        <Route path="/txs" component={Transactions} primary={false} />
        <Route path="/settings" component={Settings} primary={false} />

        <!-- DEV -->
        <Route path="/dev" component={DevMode} primary={false} />
        <Route path="/swarm" component={Swarm} primary={false} />
        {#if debug}
          <DebugCard/>
        {/if}
      </div>

    </Router>
  </div>


  
</main>
