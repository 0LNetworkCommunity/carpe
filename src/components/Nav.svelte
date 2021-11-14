<script lang="ts">
  import { Link } from "svelte-navigator";
  import { debugMode } from "../debug";
  import { signingAccount, all_accounts } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";

  let debug = false;
  debugMode.subscribe((d) => {
    debug = d;
  })

  let myAccountIsOnChain = false;
  signingAccount.subscribe((myAccount) => {
    myAccountIsOnChain = myAccount != null && myAccount.balance != null
  });

  let has_account = false;
  all_accounts.subscribe((list) => {
    has_account = list.length > 0;
  }); 

</script>
<!--
{#if has_account}
        <Nav />
      {:else}
        {#if current.pathname != "/"}
          <p> back </p>
        {/if}
      {/if}
-->

<main class="uk-margin-top">
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav">
        {#if myAccountIsOnChain && has_account}
          <li><Link to="/">Wallet</Link></li>        
          <li><Link to="miner">Miner</Link></li>
          <li><Link to="txs">Transactions</Link></li>
        {/if}

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
