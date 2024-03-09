<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, pendingAccounts } from '../../modules/accounts'

  // views
  import Newbie from './Newbie.svelte'
  import AccountsList from './AccountsList.svelte'
  import CreateAccountLinks from './CreateAccountLinks.svelte'
  import ReminderCreate from './ReminderCreate.svelte'
  import { connected } from '../../modules/networks'

  UIkit.use(Icons)

</script>

<main>
  <div>
    {#if !$allAccounts || ($allAccounts && $allAccounts.length == 0)}
      <Newbie />
    {:else if $allAccounts && $allAccounts.length > 0}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_('wallet.wallet')}
        </h2>
      </div>

      <AccountsList />
      <CreateAccountLinks />

      {#if $connected && $pendingAccounts.length > 0}
        <ReminderCreate pendingAccounts={$pendingAccounts} isConnected={$connected} />
      {/if}
    {/if}
  </div>
</main>
