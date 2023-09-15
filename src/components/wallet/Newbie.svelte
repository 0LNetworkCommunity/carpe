<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { Link } from 'svelte-navigator'
  import { routes } from '../../modules/routes'
    import Migrate from './Migrate.svelte'
    import { canMigrate } from '../../modules/accounts'
    import CreateAccountLinks from './CreateAccountLinks.svelte'
</script>

<main style="position:absolute" class="uk-position-center uk-margin-large">
  <div class="uk-container uk-align-center">
    <h1 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.carpe')}
    </h1>
  </div>
  <CreateAccountLinks />

  {#if $canMigrate}
    <Migrate />
  {/if}
</main>
