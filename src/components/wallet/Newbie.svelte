<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { Link } from 'svelte-navigator'
  import { routes } from '../../modules/routes'
  import Migrate from './Migrate.svelte'
  import { canMigrate } from '../../modules/accounts'
</script>

<main style="position:absolute" class="uk-position-center uk-margin-large">
  <div class="uk-container uk-align-center">
    <h1 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.carpe')}
    </h1>

  </div>

  {#if $canMigrate}
    <Migrate />
  {:else}
    <h5 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.newbie_message')}
    </h5>
    <div uk-grid class="uk-margin uk-flex uk-flex-center">
      <Link to={routes.keygen}>
        <button class="uk-button uk-button-secondary">{$_('wallet.btn_new_account')}</button>
      </Link>
      <Link to={routes.accountFromMnem}>
        <button class="uk-button uk-button-default">{$_('wallet.btn_restore_account')}</button>
      </Link>
    </div>
  {/if}
</main>
