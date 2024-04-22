<script lang="ts">
  import { _ } from 'svelte-i18n'
  import AccountFromMnemSubmit from './AccountFromMnemSubmit.svelte'
  import { onDestroy } from 'svelte'

  let formDangerMnem: string
  let isLegacy = false
  function toggle() {
    isLegacy = !isLegacy
  }
  
  onDestroy(() => (formDangerMnem = null))
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
      <div class="uk-margin-bottom uk-inline-block uk-width-1-1">
        <label
          ><input class="uk-checkbox" type="checkbox" on:click={toggle} checked={isLegacy} />&nbsp; {$_('wallet.legacy_account_opt')}</label
        >
      </div>
      <AccountFromMnemSubmit {formDangerMnem} isNewAccount={false} {isLegacy} />
    </fieldset>
  </form>
</main>
