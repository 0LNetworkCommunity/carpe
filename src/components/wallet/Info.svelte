<script lang="ts">
  import { _ } from 'svelte-i18n'
    import { signingAccount } from '../../modules/accounts'
</script>

<main>
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('wallet.account_list.info_title')}
  </h4>
  <p>{$_('wallet.account_list.address')}: {$signingAccount.account}</p>
  <p>{$_('wallet.account_list.authkey')}: {$signingAccount.auth_key}</p>
</main>
