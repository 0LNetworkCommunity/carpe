<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Card from '../layout/Card.svelte'
  import SetWalletType from '../txs/SetWalletType.svelte'
    import Info from './Info.svelte'

</script>

<main>
  <Card>
    <span slot="title">{$_('wallet.settings.title')}</span>

    <div slot="body">
      <Info />
      <SetWalletType />
    </div>
  </Card>
</main>
