<script lang="ts">
  import "uikit/dist/css/uikit.min.css";
  import { Router, Link, Route } from "svelte-navigator";
  // import Layout from "./components/Layout.svelte";
  import Wallet from "./components/wallet/Wallet.svelte";
  import Miner from "./components/Miner.svelte";
  import Settings from "./components/Settings.svelte";
  import DevMode from "./components/DevMode.svelte";
  import AddAccount from "./components/wallet/AccountFromMnem.svelte";
  import AccountFromMnem from "./components/wallet/AddAccount.svelte";

  // TODO: need this?
  // window.__TAURI__.path.homeDir().then((dir) => {
  //   home = dir;
  // });

</script>



  <Router>
      <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav">
            <li><Link to="/">Wallet</Link></li>
            <li><Link to="miner">Miner</Link></li>
            <li><Link to="settings">Settings</Link></li>
            <li><Link to="dev">Dev Mode</Link></li>
          </ul>
        </div>        
      </nav>		   
      <div class="uk-container">
        <Route path="/" component={Wallet}/>
        <Route path="/add-account" component={AddAccount}/>
        <Route path="/account-from-mnem" component={AccountFromMnem}/>
        <Route path="/miner" component={Miner}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/dev" component={DevMode}/>
      </div>
  </Router>