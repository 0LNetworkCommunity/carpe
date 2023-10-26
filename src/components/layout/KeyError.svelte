<script lang="ts">
  import { _ } from 'svelte-i18n'
  import CardAlert from './CardAlert.svelte'
  import AccountFromMnemForm from '../wallet/AccountFromMnemForm.svelte'
  import { isKeyError } from '../../modules/accounts'
</script>

<main>
  {#if $isKeyError}
  <CardAlert>
    <div slot="body">
      <h4 class="uk-text-uppercase">{$_('layout.key_error.title')}</h4>

      <p>{$_('layout.key_error.body')}</p>

      <AccountFromMnemForm />
    </div>
  </CardAlert>
  {/if}
</main>
