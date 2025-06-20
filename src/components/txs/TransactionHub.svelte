<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { signingAccount } from '../../modules/accounts'
  import type { CarpeProfile } from '../../modules/accounts'
  import CantStart from '../miner/cards/CantStart.svelte'
  import VouchForm from './VouchForm.svelte'
  import RevokeForm from './RevokeForm.svelte'
  import CwReauthForm from './CwReauthForm.svelte'
  import { navigate } from 'svelte-navigator'
  import { routes } from '../../modules/routes'
  
  // Got up in the morning
  // Felt the need to build something.. 
  // Here i am here i am building for 0L
  // We have a transaction hub now.. 
  // I am so happy no more command line for us :) 
  // Define available transaction types
  const txTypes = [
    { id: 'vouch', label: $_('txs.type_selector.vouch'), icon: 'users' },
    { id: 'revoke', label: $_('txs.type_selector.revoke'), icon: 'ban' },
    { id: 'cwreauth', label: $_('txs.type_selector.cwreauth'), icon: 'refresh' },
  ]
  
  let selectedType = 'vouch'
  let account: CarpeProfile
  let unsubs
  let watchOnly = false
  
  onMount(async () => {
    unsubs = signingAccount.subscribe((obj) => {
      account = obj
      watchOnly = obj?.watch_only
    })
    
    // Get selected type from URL query params if available
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    if (type && txTypes.some(t => t.id === type)) {
      selectedType = type
    }
  })
  
  onDestroy(async () => {
    unsubs && unsubs()
  })
  
  function selectTxType(type: string) {
    if (type === 'transfer') {
      // For transfer, navigate to the existing transfer page
      navigate(routes.transfer)
      return
    }
    
    selectedType = type
    // Update URL query parameter
    const url = new URL(window.location.href)
    url.searchParams.set('type', type)
    window.history.replaceState({}, '', url)
  }
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_('txs.transactions')}
    </h2>
  </div>
  
  <!-- Transaction Type Selector -->
  <div class="uk-margin-medium-bottom uk-card uk-card-default uk-card-body uk-padding-small">
    <div class="uk-flex uk-flex-between uk-flex-middle">
      <h3 class="uk-card-title uk-margin-remove">{$_('txs.select_transaction_type')}</h3>
    </div>
    
    <div class="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m uk-margin-small-top" uk-grid>
      {#each txTypes as type}
        <div>
          <button 
            class="uk-button uk-button-default uk-width-1-1 uk-flex uk-flex-middle uk-flex-center {selectedType === type.id ? 'uk-button-primary' : ''}"
            on:click={() => selectTxType(type.id)}
            aria-pressed={selectedType === type.id}
          >
            <span uk-icon="icon: {type.icon}" class="uk-margin-small-right"></span>
            {type.label}
          </button>
        </div>
      {/each}
    </div>
  </div>
  
  {#if !$signingAccount.on_chain}
    <CantStart />
  {:else if account}
    <!-- Transaction Form Container -->
    <div class="uk-card uk-card-default uk-card-body">
      {#if selectedType === 'vouch'}
        <VouchForm account={account} watchOnly={watchOnly} />
      {:else if selectedType === 'revoke'}
        <RevokeForm account={account} watchOnly={watchOnly} />
      {:else if selectedType === 'cwreauth'}
        <CwReauthForm account={account} watchOnly={watchOnly} />
      {/if}
    </div>
  {/if}
</main>

<style>
  /* Style for selected transaction type button */
  button[aria-pressed="true"] {
    font-weight: bold;
  }
</style>
