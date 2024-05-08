<script lang="ts">
  import { _ } from 'svelte-i18n'
  //import { signingAccount } from '../../modules/accounts'
  import Copy from '../../components/layout/Copy.svelte'

  export let signingAccount
</script>

<main>
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('wallet.account_list.info_title')}
  </h4>
  <p class="uk-text-uppercase">
    {$_('wallet.account_list.address')}:
    <code class="uk-text-light">{$signingAccount.account}</code>
    <Copy text={$signingAccount.account} />
  </p>
  <p class="uk-text-uppercase">
    {$_('wallet.account_list.authkey')}:
    <code class="uk-text-light">{$signingAccount.auth_key}</code>
    <Copy text={$signingAccount.auth_key} />
  </p>
</main>
