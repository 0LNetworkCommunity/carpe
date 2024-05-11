<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import { InitType, addAccount } from '../../modules/accountActions'
  import { onDestroy } from 'svelte'

  export let formDangerMnem: string
  export let isNewAccount = true
  export let isLegacy = false;
  function openConfirmationModal() {
    UIkit.modal('#submit-confirmation-modal').show()
  }

  let isSubmitting = false
  function initAccount(mnem_string: string, isLegacy) {
    if (mnem_string.length == 0) return
    mnem_string = mnem_string.trim().split(/\s+/).join(' ')
    isSubmitting = true
    addAccount(InitType.Mnem, mnem_string.trim(), isLegacy).finally(() => {
      isSubmitting = false
      mnem_string = null
      UIkit.modal('#submit-confirmation-modal').hide()
    })
  }

  onDestroy(() => (formDangerMnem = null))
</script>

{#if isNewAccount}
  <button
    class="uk-button uk-button-secondary uk-margin-small-right"
    disabled={isSubmitting}
    type="button"
    on:click|preventDefault={openConfirmationModal}
  >
    {$_('wallet.keygen.btn_create_account')}
  </button>

  <div id="submit-confirmation-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title uk-text-uppercase uk-text-danger">
        {$_('wallet.account_from_mnem_submit.title')}
      </h2>
      <p>{@html $_('wallet.account_from_mnem_submit.body')}</p>
      <p class="uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
          disabled={isSubmitting}
        >
          {$_('wallet.account_from_mnem_submit.btn_cancel')}
        </button>
        <button
          class="uk-button uk-button-primary"
          type="button"
          disabled={isSubmitting}
          on:click|preventDefault={initAccount(formDangerMnem, isLegacy)}
        >
          {#if isSubmitting}
            {$_('wallet.account_from_mnem_submit.btn_submiting')}
          {:else}
            {$_('wallet.account_from_mnem_submit.btn_submit')}
          {/if}
        </button>
      </p>
    </div>
  </div>
{:else}
  <button
    class="uk-button uk-button-primary"
    type="button"
    disabled={isSubmitting}
    on:click|preventDefault={initAccount(formDangerMnem, isLegacy)}
  >
    {#if isSubmitting}
      {$_('wallet.account_from_mnem_submit.btn_submiting')}...
    {:else}
      {$_('wallet.account_from_mnem_submit.btn_submit')}
    {/if}
  </button>
{/if}
