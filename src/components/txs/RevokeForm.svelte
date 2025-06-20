<script lang="ts">
  import { _ } from 'svelte-i18n'
  import type { CarpeProfile } from '../../modules/accounts'
  
  export let account: CarpeProfile
  export let watchOnly: boolean
  
  // This is a placeholder component for the Revoke Vouch functionality
  // It will need to be implemented fully later
</script>

<div class="uk-text-center uk-margin-large-top uk-margin-large-bottom">
  <span uk-icon="icon: cog; ratio: 3"></span>
  <h3 class="uk-margin-medium-top uk-text-muted">{$_('txs.type_selector.revoke')}</h3>
  <p class="uk-text-muted">This transaction type will be implemented in a future update.</p>
  <p class="uk-text-muted">Please check back later.</p>
  <!-- Invisible element to use props and avoid linting errors -->
  {#if false}
    <div class="hidden">
      {account.account} {watchOnly}
    </div>
  {/if}
</div>
