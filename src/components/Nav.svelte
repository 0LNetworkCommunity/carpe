<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import { signingAccount, isInit } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";
  import Themes from "./themes/Themes.svelte";
  import { routes } from "../routes";

  const secondaryRoutes = [
    routes.settings,
    routes.about,
    routes.developer,
    routes.keygen,
    routes.accountFromMnem,
  ]

  const location = useLocation();

  let myAccountIsOnChain = false;  // assume initialized until not
  let init = false;  // assume initialized until not
  onMount(async () => {
    isInit.subscribe(i => init = i);

    signingAccount.subscribe(myAccount => {
      if (myAccount) {
        myAccountIsOnChain =  myAccount.on_chain;
      };
    });
  });

</script>

<main class="uk-margin-top">
  <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
    {#if secondaryRoutes.includes($location.pathname)}
      <Link to={routes.home}><span class="uk-text-muted" uk-icon="icon: arrow-left; ratio: 2" /></Link>
    {/if}

    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav">
        <li>
          <Themes/>
        </li>
      </ul>
    </div>

    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav { init && myAccountIsOnChain ? "" : "uk-invisible"}">
          <li><Link to={routes.home}>  Wallet </Link></li>
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
