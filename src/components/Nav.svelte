<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import { signingAccount, isInit } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";
  import { routes } from "../routes";
  import { _ } from "../lang/i18n";
  import { init_preferences } from "../preferences";
  function q(incoming){ return document.querySelector(incoming); };

  // import MakeWholeLink from "./make-whole/MakeWholeLink.svelte";
  
  init_preferences();

  const secondaryRoutes = [
    routes.settings,
    routes.about,
    routes.developer,
    routes.keygen,
    routes.accountFromMnem,
  ]
  
  // Global function to add loading spinner to logo. This is called in the following functions:
  // Wallet.svelte
  window.add_spin_loading_to_logo = add_spin_loading_to_logo;
  window.remove_spin_loading_to_logo = remove_spin_loading_to_logo;

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
  
  function add_spin_loading_to_logo(){
    q(".carpe-nav-container img").classList.add("loading-rotation");
  };
  function remove_spin_loading_to_logo(){
    q(".carpe-nav-container img").classList.remove("loading-rotation");
  };
</script>

<main class="carpe-nav-container" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <div class="cursor uk-navbar-item uk-logo"><img data-typeid="bridge" src="/ol_logo.png" style="width:30px" alt="0L Logo"/><span class="uk-visible@s">0L Carpe Wallet</span></div>
    </div>

    {#if secondaryRoutes.includes($location.pathname)}
      <Link to={routes.home} class="carpe-arrows"><span class="uk-text-muted" uk-icon="icon:arrow-left; ratio: 2" /></Link>
    {/if}

    <div class="uk-navbar-right">
      <ul class="uk-visible@m" uk-tab="active:0;"> <!--{ init && myAccountIsOnChain ? "" : "uk-invisible"}-->
        <li><Link to={routes.home}> {$_("nav.wallet")} </Link></li>
        <li><Link to={routes.miner}>{$_("nav.miner")}</Link></li>
        <li><Link to={routes.transactions}>{$_("nav.transactions")}</Link></li>
        <li><Link to={routes.bridge}>{$_("nav.bridge")}</Link></li>
        <!-- Remove Events tab till we get a fullnode set able to respond to these queries -->
        <!-- <li><Link to={routes.events}>{$_("nav.events")}</Link></li> -->
        <!-- Postpone MakeWhole release -->
        <!--<li><MakeWholeLink /></li>-->
      </ul>
      {#if init }
      <ul class="uk-navbar-nav">
        <li>
          <AccountSwitcher/>
        </li>
      </ul>
      {/if }
    </div>

  </nav>
</main>