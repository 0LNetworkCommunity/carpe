<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { invoke } from '@tauri-apps/api/tauri'
  import { formatAccount } from '../../modules/accounts'
  import { notify_success } from '../../modules/carpeNotify'
  import { raise_error } from '../../modules/carpeError'
  import { refreshAccounts } from '../../modules/accountActions'
  import type { CarpeProfile } from '../../modules/accounts'
  import { onMount } from 'svelte'
  
  export let account: CarpeProfile
  export let watchOnly: boolean
  
  let errorMessage = ''
  let waitingTxs = false
  
  // Selected wallet for reauthorization
  let selectedWallet = account?.account || ''
  
  // Handle CW reauthorization transaction
  onMount(() => {
    if (account) {
      selectedWallet = account.account
    }
  })
  
  async function submitCwReauth() {
    if (!account || !selectedWallet) {
      errorMessage = $_('txs.cwreauth.error_invalid_address')
      return
    }
    
    waitingTxs = true
    errorMessage = ''
    
    try {
      console.log(`Submitting Community Wallet reauthorization for ${selectedWallet}`)
      
      await invoke("cw_reauth_transaction", {
        sender: account.account,
        walletAddress: selectedWallet // Pass the selected wallet address to reauthorize
      })
      
      notify_success($_('txs.cwreauth.success'))
      
      // Refresh account data
      refreshAccounts()
    } catch (e) {
      console.error("CW Reauth failed:", e)
      errorMessage = $_('txs.cwreauth.error_reauth_failed')
      raise_error(e, true, "cw_reauth_transaction")
    } finally {
      waitingTxs = false
    }
  }
</script>

<h3 class="uk-card-title">{$_('txs.type_selector.cwreauth')}</h3>

<!-- Sender Info -->
<div class="uk-margin">
    <label class="uk-form-label" for="cw-sender">{$_('txs.cwreauth.sender')}</label>
    <div class="uk-form-controls uk-form-controls-text">
      <div class="sender-address">
        {#if account?.account}
          <span id="cw-sender">{formatAccount(account.account)}</span>
        {/if}
      </div>
    </div>
  </div>

  <!-- Wallet to reauthorize -->
  <div class="uk-margin">
    <label class="uk-form-label" for="wallet-to-reauth">{$_('txs.cwreauth.wallet_address')}</label>
    <div class="uk-form-controls">
      <input
        id="wallet-to-reauth"
        class="uk-input"
        type="text"
        bind:value={selectedWallet}
        placeholder={$_('txs.cwreauth.wallet_placeholder')}
        disabled={watchOnly || waitingTxs}
      />
      <p class="uk-text-meta uk-margin-small-top">
        {$_('txs.cwreauth.wallet_description')}
      </p>
    </div>
  </div>

  <div class="uk-margin uk-text-meta">
    <h4>{$_('txs.cwreauth.about_title')}</h4>
    <p>{$_('txs.cwreauth.about_description')}</p>
  </div>

  <div class="uk-margin">
    <button
      class="uk-button uk-button-primary uk-width-1-1"
      on:click={submitCwReauth}
      disabled={!selectedWallet || watchOnly || waitingTxs}
    >
      {#if waitingTxs}
        <span uk-spinner="ratio: 0.6"></span> {$_('txs.cwreauth.await')}
      {:else}
        {$_('txs.cwreauth.btn_reauth')}
      {/if}
    </button>
  </div>

{#if errorMessage}
  <div class="uk-alert uk-alert-danger">
    <p>{errorMessage}</p>
  </div>
{/if}
