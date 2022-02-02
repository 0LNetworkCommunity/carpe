<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import { signingAccount, isInit } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";
  import { routes } from "../routes";

  const secondaryRoutes = [
    routes.settings,
    routes.about,
    routes.developer,
    routes.keygen,
    routes.accountFromMnem,
  ]

  const location = useLocation();
  
  let myAccountIsOnChain = true;  // assume initialized until not
  let init = true;  // assume initialized until not

  onMount(async () => {    
    isInit.subscribe(i => init  = i);

    signingAccount.subscribe(myAccount => {
      if (myAccount) {
        myAccountIsOnChain = myAccount.balance != null
      };
    });
  });

</script>

<main class="uk-margin-top">
  <nav class="uk-navbar-container" uk-navbar>
    {#if secondaryRoutes.includes($location.pathname)}
      <Link to={routes.home}><span class="uk-text-muted" uk-icon="icon: arrow-left; ratio: 2" /></Link>
    {/if}
    
    <div class="uk-navbar-center { init && myAccountIsOnChain ? "" : "uk-invisible"}">
      <ul class="uk-navbar-nav">
          <li><Link to={routes.home}>Wallet</Link></li>        
          <li><Link to={routes.miner}>Miner</Link></li>
          <li><Link to={routes.transactions}>Transactions</Link></li>
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
