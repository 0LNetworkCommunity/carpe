<script>
  import { signingAccount } from '../../modules/accounts';
  import Info from './Info.svelte';
  import AccountNote from './AccountNote.svelte';
  import SetWalletType from '../txs/SetWalletType.svelte';
  import GetPrivateKey from './GetPrivateKey.svelte';
  import { removeAccount } from '../../modules/accountActions';
  import { navigate } from 'svelte-navigator'
  import UIkit from 'uikit'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  //import { _ } from 'svelte-i18n';

  /*
  function handleKeyRotation() {
    // Implement key rotation logic
  }
  */

  let modal

  onMount(() => {
    modal = UIkit.modal("#removeAccountModal")
  })

  function handleRemoveAccount() {
    if ($signingAccount.watch_only) {
      removeAccount($signingAccount.account) 
      navigate('/wallet')
    } else {
      modal.show()      
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
      modal.hide()
      navigate('/wallet')
    }
  }

</script>

<main class="uk-container uk-margin-large-top">
  <div class="uk-position-relative uk-margin-bottom">
    <div class="uk-flex uk-flex-center">
      <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Account Details</h2>
    </div>
  </div>

  {#if $signingAccount}
    <section>
      <div class="uk-container">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-1">
            <Info {signingAccount} />
          </div>
          <div class="uk-width-1-2@m">
            <AccountNote {signingAccount} />
          </div>
          {#if $signingAccount.on_chain && !$signingAccount.watch_only}
            <div class="uk-width-1-2@m">
              <GetPrivateKey />
            </div>
          {/if}          
          <div class="uk-width-1-1">
            <SetWalletType {signingAccount} />
          </div>          
        </div>
        <div class="uk-margin-top uk-flex uk-flex-left uk-flex-wrap">
          <button 
            class="uk-button uk-button-danger uk-margin-small-right" 
            on:click|preventDefault={handleRemoveAccount}
            >Remove Account</button>
        </div>
      </div>
    </section>  

  {/if}

   <!-- REMOVE ACCOUNT MODAL -->
   <div id="removeAccountModal" uk-modal class="uk-modal-container">
    <div class="uk-modal-dialog uk-modal-body uk-padding-large">
      <div>
        <h2 class="uk-modal-title uk-text-uppercase uk-text-danger">
          Remove Account - {$signingAccount && $signingAccount.nickname}
        </h2>
        <h3 class="uk-text-bold">Are you sure you want to remove this account?</h3>
        <p class="uk-text-lead uk-text-warning">Please review the following before proceeding:</p>
        <ul class="uk-list uk-list-bullet uk-text-left uk-margin-top uk-margin-large-bottom">
          <li>After removing your account from this wallet, you won't be able to recover its private key.</li>
          <li>Ensure you have a <strong>backup of your private key</strong> before proceeding.</li>
          <li>This action will only remove the account from this wallet, not from the blockchain.</li>
        </ul>
      </div>        
      <div class="uk-margin-top uk-text-right">
        <button 
          class="uk-button uk-button-default uk-margin-right uk-modal-close"
          disabled={!isRemoving}
        >
          Cancel
        </button>
        <button 
          id="confirmRemoveAccountBtn"
          type="button"
          class="uk-button uk-button-danger" 
          disabled={!isRemoving}
          on:click|preventDefault={handleConfirmRemoveAccount}
        >
          Confirm Remove Account
        </button>
      </div>
    </div>
  </div>
</main>

<style>
  .uk-container {
    max-width: 800px;
    margin: auto;
  }
  button {
    margin-right: 10px;
  }
  section {
    margin-top: 20px;
  }
</style>
