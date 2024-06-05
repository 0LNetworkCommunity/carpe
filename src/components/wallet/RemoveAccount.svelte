<script>
  import { removeAccount } from '../../modules/accountActions';
  import { navigate } from 'svelte-navigator'
  import UIkit from 'uikit'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { _ } from 'svelte-i18n';

  export let signingAccount;

  let modal

  onMount(() => {
    modal = UIkit.modal("#removeAccountModal")
  })

  function handleRemoveAccount() {
    if ($signingAccount.watch_only) {
      removeAccount($signingAccount.account) 
      navigate('/wallet')
    } else {
      modal && modal.show()      
    }
  }

  let isRemoving = writable(false)
  function handleConfirmRemoveAccount() {
    isRemoving.set(true)
    try {
      removeAccount($signingAccount.account) 
    }
    finally {
      isRemoving.set(false)
      modal && modal.hide()
      navigate('/wallet')
    }
  }
</script>

<button 
  class="uk-button uk-button-danger uk-margin-small-right" 
  on:click|preventDefault={handleRemoveAccount}
>
  {$_("wallet.remove_account.btn")}
</button>

<!-- REMOVE ACCOUNT MODAL -->
<div id="removeAccountModal" uk-modal class="uk-modal-container">
  <div class="uk-modal-dialog uk-modal-body uk-padding-large">
    <div>
      <h2 class="uk-modal-title uk-text-uppercase uk-text-danger">
        {$_("wallet.remove_account.modal.title")}
      </h2>
      <h3 class="uk-text-bold">{$_("wallet.remove_account.modal.body.question")}</h3>
      <code class="uk-text-light">{$signingAccount.account}</code>
      <p class="uk-text-lead uk-text-warning">{$_("wallet.remove_account.modal.body.review_list.title")}</p>
      <ul class="uk-list uk-list-bullet uk-text-left uk-margin-top uk-margin-large-bottom">
        <li>{@html $_("wallet.remove_account.modal.body.review_list.item1")}</li>
        <li>{@html $_("wallet.remove_account.modal.body.review_list.item2")}</li>
        <li>{@html $_("wallet.remove_account.modal.body.review_list.item3")}</li>
        <li>{@html $_("wallet.remove_account.modal.body.review_list.item4")}</li>
      </ul>
    </div>        
    <div class="uk-margin-top uk-text-right">
      <button 
        class="uk-button uk-button-default uk-margin-right uk-modal-close"
        disabled={!isRemoving}
      >
      {$_("wallet.remove_account.modal.btn_cancel")}
      </button>
      <button 
        id="confirmRemoveAccountBtn"
        type="button"
        class="uk-button uk-button-danger" 
        disabled={!isRemoving}
        on:click|preventDefault={handleConfirmRemoveAccount}
      >
      {$_("wallet.remove_account.modal.btn_confirm")}
      </button>
    </div>
  </div>
</div>