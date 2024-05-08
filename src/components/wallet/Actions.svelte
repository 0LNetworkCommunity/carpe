<script lang="ts">
  import Card from '../layout/Card.svelte'
  import SetWalletType from '../txs/SetWalletType.svelte'
  import AccountNote from './AccountNote.svelte'
  import Info from './Info.svelte'

  export let signingAccount
</script>

<main>
  <Card>
    <div slot="body">
      <Info {signingAccount} />
      <AccountNote account={$signingAccount.account} note={$signingAccount.note} />
      <SetWalletType {signingAccount} />
    </div>
  </Card>
</main>
