<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { Link } from 'svelte-navigator'
  import { routes } from '../../modules/routes'
</script>

<main class="uk-margin uk-flex uk-flex-center" uk-grid>
    <div uk-grid class="uk-margin uk-flex uk-flex-center">
      <Link to={routes.keygen}>
        <button class="uk-button uk-button-secondary">{$_('wallet.btn_new_account')}</button>
      </Link>
      <Link to={routes.accountFromMnem}>
        <button class="uk-button uk-button-default">{$_('wallet.btn_restore_account')}</button>
      </Link>
      <Link to={routes.addWatchAccount}>
        <button class="uk-button uk-button-default">{$_('wallet.btn_add_watch_account')}</button>
      </Link>

    </div>
</main>
