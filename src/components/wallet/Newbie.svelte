<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { Link } from 'svelte-navigator'
  import { routes } from '../../modules/routes'
  import { invoke } from '@tauri-apps/api/tauri'
  import { raise_error } from '../../modules/carpeError'
  import { type CarpeError } from '../../modules/carpeError'

  let canMigrate = false

  invoke('has_legacy_configs', {})
    .then((b: boolean) => (canMigrate = b))
    .catch((e: CarpeError) => raise_error(e, true, 'has_legacy_configs'))
</script>

<main style="position:absolute" class="uk-position-center uk-margin-large">

  <div> CAN MIGRATE  {canMigrate} </div>
  <div class="uk-container uk-align-center">
    <h1 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.carpe')}
    </h1>
    <h5 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.newbie_message')}
    </h5>
  </div>

  <div uk-grid class="uk-margin uk-flex uk-flex-center">
    <Link to={routes.keygen}>
      <button class="uk-button uk-button-secondary">{$_('wallet.btn_new_account')}</button>
    </Link>
    <Link to={routes.accountFromMnem}>
      <button class="uk-button uk-button-default">{$_('wallet.btn_restore_account')}</button>
    </Link>
  </div>
</main>
