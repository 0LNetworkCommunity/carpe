<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import { debugMode } from "../debug";
  import { signingAccount, all_accounts, isInit } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";
  import { routes } from "../routes";

  const secondaryRoutes = [
    routes.settings,
    routes.about,
    routes.developer
  ]

  const location = useLocation();
  
  let debug = false;
  let myAccountIsOnChain = false;
  let has_account = false;
  let init = true; // assume initialized until not

  onMount(async () => {
    debugMode.subscribe(d => debug = d);
    
    isInit.subscribe(i => init  = i);

    all_accounts.subscribe(list => has_account = list.length > 0);

    signingAccount.subscribe(myAccount => {
      myAccountIsOnChain = myAccount != null && myAccount.balance != null
    });
  });

</script>

<main class="uk-margin-top">
  <nav class="uk-navbar-container" uk-navbar>
    {#if secondaryRoutes.includes($location.pathname)}
      <Link to={routes.home}><span class="uk-text-muted" uk-icon="icon: arrow-left; ratio: 2" /></Link>
    {/if}

    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav">
        {#if myAccountIsOnChain && has_account}
          <li><Link to={routes.home}>Wallet</Link></li>        
          <li><Link to={routes.miner}>Miner</Link></li>
          <li><Link to={routes.transactions}>Transactions</Link></li>
        {/if}

        {#if debug}
          <li><Link to={routes.developer}>Debug</Link></li>
        {/if}
      </ul>
    </div>

    {#if init }
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <AccountSwitcher/>
        </li>
      </ul>
    </div>
    {/if }
  </nav>
</main>
