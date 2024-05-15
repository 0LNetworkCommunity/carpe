<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, pendingAccounts, totalBalance } from '../../modules/accounts'
  import { printCoins } from '../../modules/coinHelpers'

  // views
  import Newbie from './Newbie.svelte'
  import AccountsList from './AccountsList.svelte'
  import CreateAccountLinks from './CreateAccountLinks.svelte'
  import ReminderCreate from './ReminderCreate.svelte'
  import { connected } from '../../modules/networks'

  UIkit.use(Icons)
</script>

<main>
  {#if !$allAccounts || ($allAccounts && $allAccounts.length == 0)}
    <div>
      <Newbie />
    </div>
  {:else if $allAccounts && $allAccounts.length > 0}
    <div class="uk-position-relative">
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_('wallet.wallet')}
        </h2>
      </div>
      {#if $allAccounts.length > 1}
        <div
          class="uk-position-right uk-text-light uk-text-uppercase uk-flex-inline uk-flex-column max-height-fit-content"
        >
          <span class="uk-margin-small-bottom">
            {$_('wallet.account_list.balance')}: {printCoins($totalBalance.total)}
          </span>
          <span>
            {$_('wallet.account_list.unlocked')}: {printCoins($totalBalance.unlocked)}
          </span>
        </div>
      {/if}
      <AccountsList />
      <CreateAccountLinks />

      {#if $connected && $pendingAccounts.length > 0}
        <ReminderCreate pendingAccounts={$pendingAccounts} isConnected={$connected} />
      {/if}
    </div>
  {/if}
</main>

<style>
  .max-height-fit-content {
    max-height: -webkit-fit-content;
    max-height: fit-content; /* Standard syntax for other browsers */
  }
</style>
