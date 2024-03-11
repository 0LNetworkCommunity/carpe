<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Card from '../layout/Card.svelte'
  import SetWalletType from '../txs/SetWalletType.svelte'
  import Info from './Info.svelte'
  import { is_slow_wallet } from '../../modules/accountActions'
  import { signingAccount } from '../../modules/accounts'
</script>

<main>
  <Card>

    <!-- <span slot="title">{$_('wallet.settings.title')} </span> -->

    <div slot="body">
      <Info />
      {#await is_slow_wallet($signingAccount.account) then res}
        {#if res}
          <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">{$_('wallet.settings.slow_label')}</h4>
          <p>{$_('wallet.settings.slow_info')}</p>
        {:else if !$signingAccount.watch_only && $signingAccount.on_chain }
          <SetWalletType />
        {/if}
      {/await}
    </div>
  </Card>
</main>
