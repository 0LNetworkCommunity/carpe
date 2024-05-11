<script lang="ts">
  import { _ } from '../../lang/i18n'
  // import Migrate from './Migrate.svelte'
  // import { canMigrate } from '../../modules/accounts'
  import CreateAccountLinks from './CreateAccountLinks.svelte'
</script>

<main style="position:absolute" class="uk-position-center uk-margin-large">
  <div class="uk-container uk-align-center">
    <h1 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
      {$_('wallet.carpe')}
    </h1>
  </div>
  <h5 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">
    {$_('wallet.newbie_message')}
  </h5>
  <CreateAccountLinks />

  <!-- {#if $canMigrate}
    <Migrate />
  {/if} -->
</main>
