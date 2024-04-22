<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { addWatchAccount } from '../../modules/accountActions'

  let address: string

  const initAccount = (address: string) => {
    address = address.trim()
    let isLegacy = address.length === 32 || address.startsWith('0'.padStart(32, '0'))
    addWatchAccount(address, isLegacy)
  }
</script>

<main>
  <div class="uk-margin">
    <p>{$_('wallet.add_watch_account.description')}</p>
    <form id="account-form" on:submit|preventDefault={() => {}}>
      <fieldset class="uk-fieldset">
        <div class="uk-margin uk-inline-block uk-width-1-1">
          <input
            class="uk-input"
            type="text"
            placeholder={$_('wallet.add_watch_account.placeholder')}
            bind:value={address}
          />
        </div>
      </fieldset>
    </form>

    <button
      class="uk-button uk-button-primary"
      type="button"
      on:click|preventDefault={initAccount(address)}
    >
      {$_('wallet.account_from_mnem_submit.btn_submit')}
    </button>
  </div>
</main>
