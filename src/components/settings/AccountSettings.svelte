<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { removeAllAccounts } from '../../modules/accountActions'
  import { writable } from 'svelte/store'
  import { onMount } from 'svelte'
  import UIkit from 'uikit'

  let isSubmitting = writable(false)
  let modal 

  onMount(() => {
    modal = UIkit.modal("#removeAllAccountsModal")
  })

  const handleRemoveAllAccountsClick = () => {
    modal.show()
  }

  const handleConfirmRemoveAllAccounts = async () => {
    isSubmitting.set(true)
    try {
      removeAllAccounts() 
    } finally {
      modal.hide()
      isSubmitting.set(false)      
    }
  }
</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('settings.account_settings.title')}
  </h4>

  <div class="uk-margin" uk-grid>
    <div>
      <div class="uk-inline">
        <button 
          class="uk-button uk-button-danger" 
          type="button"
          on:click|preventDefault={handleRemoveAllAccountsClick}
        >
          {$_('settings.account_settings.btn_remove')}
        </button>
        <!--<div uk-dropdown="mode: click">
          <p>{$_('settings.account_settings.confirm')}</p>
          <button class="uk-button uk-button-danger" 
            on:click={removeAccounts}
            disabled={!isSubmitting}
            >
            {$_('settings.account_settings.btn_remove')}
          </button>
        
          </div>
        -->
      </div>
    </div>
    <div>
      <span>
        {$_('settings.account_settings.description')}
      </span>
    </div>
  </div>

  <!-- REMOVE ALL ACCOUNTS MODAL -->
  <div id="removeAllAccountsModal" uk-modal class="uk-modal-container">
    <div class="uk-modal-dialog uk-modal-body uk-padding-large">
      <div>
        <h2 class="uk-modal-title uk-text-uppercase uk-text-danger">
          {$_("settings.remove_all_accounts.modal.title")}
        </h2>
        <h3 class="uk-text-bold">{$_("settings.remove_all_accounts.modal.body.question")}</h3>
        <p class="uk-text-lead uk-text-warning">{$_("settings.remove_all_accounts.modal.body.review_list.title")}</p>
        <ul class="uk-list uk-list-bullet uk-text-left uk-margin-top uk-margin-large-bottom">
          <li>{@html $_("settings.remove_all_accounts.modal.body.review_list.item1")}</li>
          <li>{@html $_("settings.remove_all_accounts.modal.body.review_list.item2")}</li>
          <li>{@html $_("settings.remove_all_accounts.modal.body.review_list.item3")}</li>
          <li>{@html $_("settings.remove_all_accounts.modal.body.review_list.item4")}</li>
        </ul>
      </div>        
      <div class="uk-margin-top uk-text-right">
        <button 
          class="uk-button uk-button-default uk-margin-right uk-modal-close"
          disabled={!isSubmitting}
        >
        {$_("settings.remove_all_accounts.modal.btn_cancel")}
        </button>
        <button 
          type="button"
          class="uk-button uk-button-danger" 
          disabled={!isSubmitting}
          on:click|preventDefault={handleConfirmRemoveAllAccounts}
        >
        {$_("settings.remove_all_accounts.modal.btn_confirm")}
        </button>
      </div>
    </div>
  </div>
</main>
