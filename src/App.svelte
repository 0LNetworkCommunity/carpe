<script lang="ts">
  import "uikit/dist/css/uikit.min.css";
  import { Router, Link, Route } from "svelte-navigator";
  import Wallet from "./components/wallet/Wallet.svelte";
  import Miner from "./components/miner/Miner.svelte";
  import Settings from "./components/settings/Settings.svelte";
  import DevMode from "./components/dev/DevMode.svelte";
  import AccountFromMnemForm from "./components/wallet/AccountFromMnemForm.svelte";
  import AddAccount from "./components/wallet/AddAccount.svelte";
  import Swarm from "./components/dev/Swarm.svelte";
  import Keygen from "./components/wallet/Keygen.svelte";
  import Transactions from "./components/txs/Transactions.svelte";
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { miner_loop_enabled, proofComplete, proofError, towerOnce } from "./miner";
  import { get } from "svelte/store";
  import { success } from "./carpeNotify";
  import { raise_error } from "./carpeError";
  import AccountSwitcher from "./components/wallet/AccountSwitcher.svelte";

  // Todo: Should this listener only be started in the miner view?
  onMount(() => {
    listen("tower-event", (event) => {
      proofComplete();
      // is a type VDFProof
      console.log(event);
      let height = 1;
      success(`Proof ${height} mined`);
      // This section chains the producing of each block
      if (get(miner_loop_enabled)) {
        towerOnce();
      }
    });

    listen("tower-error", (event) => {
      proofError();
      // is a type CarpeError
      console.log(event);
      raise_error(event.payload);
      // also disable the mining loop.
      miner_loop_enabled.set(false);

    });
  });
</script>

<main class="uk-height-viewport uk-text-muted">
  
  <Router>
    
    <nav class="uk-navbar-container" uk-navbar>
      <span class="uk-align-middle"> <AccountSwitcher/></span>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <!-- TODO: show uk-active based on route selected -->

          <li><Link to="/">Wallet</Link></li>
          <li><Link to="miner">Miner</Link></li>
          <li><Link to="txs">Transactions</Link></li>
          <li><Link to="settings">Settings</Link></li>
          <li><Link to="dev">Debug</Link></li>
          <!-- <li><Link to="swarm">Swarm</Link></li> -->
        </ul>
      </div>
    </nav>

    <div class="uk-container uk-background-muted uk-background-height-1-1">
      <!-- <AccountSwitcher /> -->
      <!-- <p> account: {my_account} </p> -->

      <Route path="/" component={Wallet} primary={false} />
      <Route path="/add-account" component={AddAccount} primary={false} />
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
    </div>
  </Router>
</main>
