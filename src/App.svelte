<script lang="ts">
  import "uikit/dist/css/uikit.min.css";
  import { Router, Link, Route } from "svelte-navigator";
  // import Layout from "./components/Layout.svelte";
  import Wallet from "./components/wallet/Wallet.svelte";
  import Miner from "./components/miner/Miner.svelte";
  import Settings from "./components/settings/Settings.svelte";
  import DevMode from "./components/dev/DevMode.svelte";
  import AccountFromMnem from "./components/wallet/AccountFromMnem.svelte";
  import AddAccount from "./components/wallet/AddAccount.svelte";
  import Swarm from "./components/dev/Swarm.svelte";
  import AccountSwitcher from "./components/wallet/AccountSwitcher.svelte";
  import Keygen from "./components/wallet/Keygen.svelte";
  import Transactions from "./components/txs/Transactions.svelte";
</script>

<main class="uk-height-viewport">
  <Router>
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <li><Link to="/">Wallet</Link></li>
          <li><Link to="miner">Miner</Link></li>
          <li><Link to="txs">Transactions</Link></li>
          <li><Link to="settings">Settings</Link></li>
          <li><Link to="dev">Debug</Link></li>
          <li><Link to="swarm">Swarm</Link></li>
          
        </ul>
      </div>
    </nav>

    <div class="uk-container uk-background-muted uk-background-height-1-1">
      
      <!-- <AccountSwitcher /> -->
      <!-- <p> account: {my_account} </p> -->

      <Route path="/" component={Wallet} primary={false} />
      <Route path="/add-account" component={AddAccount} primary={false} />
      <Route path="/account-from-mnem" component={AccountFromMnem} primary={false} />
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
