<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { InitType, addAccount } from '../../modules/accountActions'

  let danger_temp_private_key: string
  let isLegacy = false
  function toggle() {
    isLegacy = !isLegacy
  }
  const initAccount = (pri_key: string) => {
    addAccount(InitType.PriKey, pri_key.trim(), isLegacy)
  }
</script>

<main>
  <div class="uk-margin">
    <p>{$_('wallet.account_from_private.description')}</p>
    <form id="account-form" on:submit|preventDefault={() => {}}>
      <fieldset class="uk-fieldset">
        <div class="uk-margin uk-inline-block uk-width-1-1">
          <input
            class="uk-input"
            type="text"
            placeholder={$_('wallet.account_from_private.placeholder')}
            bind:value={danger_temp_private_key}
          />
        </div>
        <div class="uk-margin-bottom uk-inline-block uk-width-1-1">
          <label
            ><input class="uk-checkbox" type="checkbox" on:click={toggle} checked={isLegacy} />&nbsp; {$_('wallet.legacy_account_opt')}</label
          >
        </div>
      </fieldset>
    </form>

    <button
      class="uk-button uk-button-primary"
      type="button"
      on:click|preventDefault={initAccount(danger_temp_private_key)}
    >
      {$_('wallet.account_from_mnem_submit.btn_submit')}
    </button>
  </div>
</main>
