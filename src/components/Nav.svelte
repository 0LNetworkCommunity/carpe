<script lang="ts">
  import { onMount } from "svelte";
  import { Link, useLocation } from "svelte-navigator";
  import { signingAccount, isInit } from "../accounts";
  import AccountSwitcher from "./wallet/AccountSwitcher.svelte";
  import { routes } from "../routes";
  import { _ } from "../lang/i18n";
  import { init_preferences } from "../preferences";
  // import MakeWholeLink from "./make-whole/MakeWholeLink.svelte";
  
  init_preferences();

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
  <nav class="uk-navbar-container" uk-navbar>
    {#if secondaryRoutes.includes($location.pathname)}
      <Link to={routes.home}><span class="uk-text-muted" uk-icon="icon: arrow-left; ratio: 2" /></Link>
    {/if}
    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav { init && myAccountIsOnChain ? "" : "uk-invisible"}">
        <li><Link to={routes.home}> {$_("nav.wallet")} </Link></li>
        <li><Link to={routes.miner}>{$_("nav.miner")}</Link></li>
        <li><Link to={routes.transactions}>{$_("nav.transactions")}</Link></li>
        <!-- Remove Events tab till we get a fullnode set able to respond to these queries -->
        <!-- <li><Link to={routes.events}>{$_("nav.events")}</Link></li> -->
        <!-- Postpone MakeWhole release -->
        <!--<li><MakeWholeLink /></li>-->
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
