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
  import UIkit from 'uikit';
  import {miner_loop_enabled, mockTowerOnce} from "./miner"
  import { get } from "svelte/store";

  // Todo: Should this listener only be started in the miner view?
  onMount(() => {
    let listener_handle = listen('tower-event', event => {
      
      console.log(event);
      UIkit.notification({
        message: `<span uk-icon=\'icon: check\'></span> Proof Mined #${event.payload.height}`,
        pos: 'bottom-center',
        status: 'success',
        timeout: 3000
      });

      if (get(miner_loop_enabled)) {
        mockTowerOnce();
      }
    });

     listen('tower-error', event => {
      
      console.log(event);
      UIkit.notification({
        message: `<span uk-icon=\'icon: check\'></span> Proof Mined #${event.payload.height}`,
        pos: 'bottom-center',
        status: 'error',
        timeout: 3000
      });
      // window.alert(event.payload.message);
      // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
      // event.payload is the payload object
    });
  })

</script>

<main class="uk-height-viewport uk-text-muted">
  <Router>
    <nav class="uk-navbar-container" uk-navbar>
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
      <Route path="/account-from-mnem" component={AccountFromMnemForm} primary={false} />
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
