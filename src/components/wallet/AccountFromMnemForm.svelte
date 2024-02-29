<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AccountFromMnemSubmit from './AccountFromMnemSubmit.svelte'
  import { onDestroy } from 'svelte'

  let formDangerMnem: string

  onDestroy(() => formDangerMnem=null)
</script>

<main>
  <h3 class="uk-text-light uk-text-muted uk-text-uppercase">
    {$_('wallet.account_from_mnem_from.title')}
  </h3>
  <p>{$_('wallet.account_from_mnem_from.description')}</p>
  <form id="account-form" on:submit|preventDefault={() => {}}>
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder={$_('wallet.account_from_mnem_from.placeholder')}
          bind:value={formDangerMnem}
        />
      </div>

      <AccountFromMnemSubmit {formDangerMnem} isNewAccount={false} />
    </fieldset>
  </form>
</main>
