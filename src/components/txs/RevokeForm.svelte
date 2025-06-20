<script lang="ts">
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { invoke } from '@tauri-apps/api/tauri'
  import { formatAccount } from '../../modules/accounts'
  import { notify_success } from '../../modules/carpeNotify'
  import { raise_error } from '../../modules/carpeError'
  import { refreshAccounts } from '../../modules/accountActions'
  import type { CarpeProfile } from '../../modules/accounts'
  
  export let account: CarpeProfile
  export let watchOnly: boolean
  
  let receiver: string = ''
  let errorMessage = ''
  let waitingTxs = false
  const re = /[a-fA-F0-9]{32}/i

  let vouchedAccounts: string[] = []
  let isLoadingVouchedAccounts = false
  
  // Validation for the receiver address
  $: isReceiverValid = account && receiver && re.test(receiver) && receiver != account.account

  onMount(async () => {
    if (account) {
      fetchVouchedAccounts()
    }
  })

  // Fetch the list of vouched accounts
  async function fetchVouchedAccounts() {
    if (!account) return
    
    isLoadingVouchedAccounts = true
    try {
      vouchedAccounts = await invoke('get_given_vouches', {
        account: account.account
      })
    } catch (error) {
      console.error('Error fetching vouched accounts:', error)
    } finally {
      isLoadingVouchedAccounts = false
    }
  }
  
  // Handle revoke vouch transaction
  async function submitRevoke() {
    if (!account || !receiver || !isReceiverValid) {
      errorMessage = $_('txs.vouch.invalid_address') // Reusing vouch text for now
      return
    }
    
    waitingTxs = true
    errorMessage = ''
    
    try {
      console.log(`Submitting revoke vouch transaction from ${account.account} to ${receiver}`)
      
      await invoke("revoke_vouch_transaction", {
        sender: account.account,
        receiver: receiver
      })
      
      notify_success("Successfully revoked vouch for the account!")
      receiver = ''
      
      // Refresh vouched accounts after successful transaction
      await fetchVouchedAccounts()
      refreshAccounts()
    } catch (e) {
      console.error("Revoke vouch failed:", e)
      errorMessage = "Failed to revoke vouch. Please make sure you have previously vouched for this account."
      raise_error(e, true, "revoke_vouch_transaction")
    } finally {
      waitingTxs = false
    }
  }
</script>

<h3 class="uk-card-title">{$_('txs.revoke.title')}</h3>

<!-- Sender Info -->
<div class="uk-margin">
  <label class="uk-form-label" for="revoke-sender">{$_('txs.revoke.sender')}</label>
  <div class="uk-form-controls uk-form-controls-text">
    <div class="sender-address">
      {#if account?.account}
        <span id="revoke-sender">{formatAccount(account.account)}</span>
      {/if}
    </div>
  </div>
</div>

<!-- Vouched accounts section -->
<div class="uk-margin">
  <h4 class="uk-form-label" id="vouched-accounts-heading">Your Vouched Accounts</h4>
  <div class="uk-card uk-card-default uk-card-body uk-padding-small" aria-labelledby="vouched-accounts-heading">
    {#if isLoadingVouchedAccounts}
      <div class="uk-flex uk-flex-center uk-margin">
        <div uk-spinner="ratio: 0.8"></div>
        <span class="uk-margin-small-left">{$_('txs.vouch.loading_vouched_accounts')}</span>
      </div>
    {:else if vouchedAccounts.length === 0}
      <p class="uk-text-center uk-text-muted">{$_('txs.vouch.no_vouched_accounts')}</p>
    {:else}
      <div class="uk-flex uk-flex-between uk-margin-small-bottom">
        <span>{$_('txs.vouch.accounts_vouched_for')}</span>
        <button 
          class="uk-button uk-button-small uk-button-text"
          uk-tooltip="Refresh vouched accounts" 
          on:click={fetchVouchedAccounts}
          disabled={isLoadingVouchedAccounts}>
          <span uk-icon="icon: refresh; ratio: 0.7"></span>
        </button>
      </div>
      
      <div class="uk-height-small uk-overflow-auto">
        <ul class="uk-list uk-list-divider uk-margin-remove">
          {#each vouchedAccounts as address}
            <li class="uk-padding-small uk-padding-remove-horizontal">
              <button 
                class="uk-button uk-button-text"
                on:click={() => receiver = address}
              >
                {address}
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>

<!-- Receiver input -->
<div class="uk-margin">
  <label class="uk-form-label" for="revoke-receiver">{$_('txs.revoke.receiver')}</label>
  <div class="uk-form-controls">
    <input
      id="revoke-receiver"
      class="uk-input {!isReceiverValid && receiver ? 'uk-form-danger' : ''}"
      type="text"
      bind:value={receiver}
      placeholder={$_('txs.revoke.receiver_placeholder')}
      disabled={watchOnly || waitingTxs}
    />
    {#if !isReceiverValid && receiver}
      <p class="uk-text-danger uk-text-small">{$_('txs.revoke.invalid_address')}</p>
    {/if}
  </div>
</div>

<div class="uk-margin">
  <button
    class="uk-button uk-button-primary uk-width-1-1"
    on:click={submitRevoke}
    disabled={!isReceiverValid || !receiver || watchOnly || waitingTxs}
  >
    {#if waitingTxs}
      <span uk-spinner="ratio: 0.6"></span> {$_('txs.revoke.await')}
    {:else}
      {$_('txs.revoke.btn_revoke')}
    {/if}
  </button>
</div>

{#if errorMessage}
  <div class="uk-alert uk-alert-danger">
    <p>{errorMessage}</p>
  </div>
{/if}

<div class="uk-margin-top uk-text-meta">
  <h4>{$_('txs.revoke.important_info')}</h4>
  <ul class="uk-list uk-list-bullet">
    <li>{$_('txs.revoke.info_relationship')}</li>
    <li>{$_('txs.revoke.info_selective')}</li>
    <li>{$_('txs.revoke.info_irreversible')}</li>
  </ul>
</div>
