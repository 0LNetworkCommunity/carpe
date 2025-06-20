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
    routes.accountDetails,
    routes.vouch
  ]

  const location_store = useLocation()

  $: watchOnly = $signingAccount?.watch_only
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
          <li class="uk-padding {$location_store.pathname.includes('transfer') ? 'uk-active' : ''}">
            <Link to={watchOnly ? routes.wallet : routes.transfer}>{$_('nav.transactions')}</Link>
          </li>
          <li class="uk-padding {$location_store.pathname.includes('transactions') ? 'uk-active' : ''}">
            <Link to={watchOnly ? routes.wallet : routes.txHub + '?type=vouch'}>{$_('nav.vouch')}</Link>
          </li>
        </ul>
      </div>
    {/if}
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li>
          <AccountSwitcher />
        </li>
      </ul>
    </div>
  </nav>
</main>
