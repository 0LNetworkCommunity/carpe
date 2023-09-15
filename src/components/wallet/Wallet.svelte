<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import Icons from 'uikit/dist/js/uikit-icons'
  import { allAccounts, signingAccount } from '../../modules/accounts'
  import { minerLoopEnabled } from '../../modules/miner'
  import { connected } from '../../modules/networks'

  // views
  import Newbie from './Newbie.svelte'
  import AccountsList from './AccountsList.svelte'
  import ReminderCreate from './ReminderCreate.svelte'

  UIkit.use(Icons)

  let pendingAccounts = $allAccounts.filter((x) => !x.on_chain)
</script>

<main>
  <div>
    {#if !$allAccounts || ($allAccounts && $allAccounts.length == 0)}
      <Newbie />
    {:else}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          {$_('wallet.wallet')}
        </h2>
      </div>

      <AccountsList
        selectedAccount={$signingAccount}
        accountList={$allAccounts}
        isMining={$minerLoopEnabled}
        isConnected={$connected}
      />
    {/if}

    {#if $connected && pendingAccounts.length > 0}
      <ReminderCreate {pendingAccounts} isConnected={$connected} />
    {/if}
  </div>
</main>
