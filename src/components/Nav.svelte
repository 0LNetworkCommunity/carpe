<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator'
  import { _ } from '../lang/i18n'
  import { routes } from '../modules/routes'

  // views
  import AccountSwitcher from './wallet/AccountSwitcher.svelte'
    import { signingAccount } from '../modules/accounts'

  // import MakeWholeLink from "./make-whole/MakeWholeLink.svelte";
  // init_preferences()

  const secondaryRoutes = [
    routes.settings,
    routes.about,
    routes.developer,
    routes.keygen,
    routes.accountFromMnem,
    routes.addWatchAccount,
  ]

  const location_store = useLocation()

</script>

<main class="uk-margin-top">
  <nav class="uk-navbar-container" uk-navbar>
    {#if secondaryRoutes.includes($location_store.pathname)}
      <Link to={routes.wallet}
        ><span class="uk-text-muted" uk-icon="icon: arrow-left; ratio: 2" /></Link
      >
    {/if}

    {#if $signingAccount}
    <div class="uk-navbar-center">
      <ul class="uk-navbar-nav uk-flex">
        <li class="uk-padding {$location_store.pathname.includes('wallet') ? 'uk-active' : ''}">
          <Link to={routes.wallet}>{$_('nav.wallet')}</Link>
        </li>
        <!-- <li class="uk-padding {$location_store.pathname.includes('miner') ? 'uk-active' : ''}">
          <Link to={routes.miner}>{$_('nav.miner')}</Link>
        </li> -->
        <li class="uk-padding {$location_store.pathname.includes('transfer') ? 'uk-active' : ''}">
          <Link to={routes.transfer}>{$_('nav.transactions')}</Link>
        </li>
        <!-- Remove Events tab till we get a fullnode set able to respond to these queries -->
        <!-- <li><Link to={routes.events}>{$_("nav.events")}</Link></li> -->
        <!-- Postpone MakeWhole release -->
        <!--<li><MakeWholeLink /></li>-->
      </ul>
    </div>
    {/if}
    <!-- {#if $isInit} -->
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <AccountSwitcher />
        </li>
      </ul>
    </div>
    <!-- {/if} -->
  </nav>
</main>
