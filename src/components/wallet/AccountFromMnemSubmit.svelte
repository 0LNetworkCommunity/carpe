<script lang="ts">
  import { _ } from 'svelte-i18n'
  import UIkit from 'uikit'
  import { InitType, addAccount } from '../../modules/accountActions'
  import { onDestroy } from 'svelte'

  export let formDangerMnem: string
  export let isNewAccount = true

  function openConfirmationModal() {
    UIkit.modal('#submit-confirmation-modal').show()
  }

  let isSubmitting = false
  function initAccount(mnem_string: string) {
    if (mnem_string.length == 0) return

    isSubmitting = true
    addAccount(InitType.Mnem, mnem_string.trim())
      .then(() => {
        if (isNewAccount) {
          // NOTE: this is for the keygen option, which shares this component
          UIkit.modal('#submit-confirmation-modal').hide() // known bug https://github.com/uikit/uikit/issues/1370
        }
      })
      .catch(() => {
        if (isNewAccount) {
          UIkit.modal('#submit-confirmation-modal').hide()
        }
        isSubmitting = false
      })
      .finally(() => {
        isSubmitting = false
        mnem_string = null
      })
  }

  onDestroy(() => formDangerMnem=null)

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
          on:click|preventDefault={initAccount(formDangerMnem)}
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
    on:click|preventDefault={initAccount(formDangerMnem)}
  >
    {#if isSubmitting}
      {$_('wallet.account_from_mnem_submit.btn_submiting')}...
    {:else}
      {$_('wallet.account_from_mnem_submit.btn_submit')}
    {/if}
  </button>
{/if}
