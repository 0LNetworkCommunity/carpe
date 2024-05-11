<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AccountFromPrivateKey from './AccountFromPrivateKey.svelte'
  import AccountFromMnemForm from './AccountFromMnemForm.svelte'

</script>

<main>
  <AccountFromMnemForm />

  <ul uk-accordion class="uk-box-shadow-small uk-padding-small">
    <li>
      <a class="uk-accordion-title uk-text-uppercase uk-text-muted uk-text-small" href={'#'}
        >{$_('wallet.account_from_private.accordion_title')}</a
      >
      <div class="uk-accordion-content">
        <AccountFromPrivateKey />
      </div>
    </li>
  </ul>
</main>
