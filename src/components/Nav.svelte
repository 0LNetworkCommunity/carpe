<script lang="ts">
  import { Link } from "svelte-navigator";
  import { debugMode } from "../debug";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";

  let debug = false;
  debugMode.subscribe((d) => {
    debug = d;
  })

</script>

<main class="uk-margin-top">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <li><Link to="/">Wallet</Link></li>
          <li><Link to="miner">Miner</Link></li>
          <li><Link to="txs">Transactions</Link></li>

          <!-- <li><Link to="settings">Settings</Link></li> -->
          {#if debug}
          <li><Link to="dev">Debug</Link></li>
          {/if}
          <!-- <li><Link to="swarm">Swarm</Link></li> -->
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li>
            <AccountSwitcher/>
          </li>
        </ul>
      </div>
    </nav>
</main>
