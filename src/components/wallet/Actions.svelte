<script lang="ts">
  import Card from '../layout/Card.svelte'
  import Info from './Info.svelte'
  import AccountNote from './AccountNote.svelte'
  import SetWalletType from '../txs/SetWalletType.svelte'

  export let signingAccount
</script>

<main>
  <Card>
    <div slot="body">
      <Info {signingAccount} />
      <AccountNote {signingAccount} />
      <SetWalletType {signingAccount} />
    </div>
  </Card>
</main>
