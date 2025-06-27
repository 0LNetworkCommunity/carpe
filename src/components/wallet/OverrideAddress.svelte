<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri';
  import { _ } from 'svelte-i18n';
  import { notify_success, notify_error } from '../../modules/carpeNotify';
  import { overrideAccountAddress } from '../../modules/accountActions';

  export let signingAccount;
  
  let newAddress = '';
  let loading = false;
  let showConfirmation = false;
  
  const validateAddress = (address: string): boolean => {
    // Basic validation - address should be 32 bytes hex (64 characters) with 0x prefix
    const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
    return /^[a-fA-F0-9]{64}$/.test(cleanAddress);
  };

  const formatAddress = (address: string): string => {
    const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
    return '0x' + cleanAddress.toLowerCase();
  };

  const handleOverrideAddress = async () => {
    if (!newAddress.trim()) {
      notify_error('Please enter a new address');
      return;
    }

    if (!validateAddress(newAddress)) {
      notify_error('Invalid address format. Address should be 64 hex characters.');
      return;
    }

    const formattedAddress = formatAddress(newAddress);
    
    if (formattedAddress.toLowerCase() === signingAccount.account.toLowerCase()) {
      notify_error('New address is the same as current address');
      return;
    }

    showConfirmation = true;
  };

  const confirmOverride = async () => {
    loading = true;
    showConfirmation = false;

    try {
      const formattedAddress = formatAddress(newAddress);
      
      await overrideAccountAddress(
        signingAccount.account, 
        formattedAddress, 
        signingAccount.auth_key
      );
      
      newAddress = '';
      
    } catch (error) {
      console.error('Error overriding address:', error);
      // Error handling is done in the overrideAccountAddress function
    } finally {
      loading = false;
    }
  };

  const cancelOverride = () => {
    showConfirmation = false;
  };

  const clearInput = () => {
    newAddress = '';
  };
</script>

<main class="uk-card uk-card-default uk-card-body uk-height-1-1" style="height: 280px;">
  <div class="uk-flex uk-flex-column uk-height-1-1">
    <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      {$_('wallet.override_address.title')}
    </h5>
    <p style="margin:0px; margin-bottom: 10px;">
      {$_('wallet.override_address.description')}
    </p>
    
    <div class="uk-flex-1 uk-flex uk-flex-column">
      <div class="uk-margin-small">
        <div class="uk-text-small uk-text-muted">Current Address:</div>
        <div class="uk-text-small uk-text-break">
          <code>{signingAccount?.account || 'N/A'}</code>
        </div>
      </div>
      
      <div class="uk-margin-small">
        <label for="new-address-input" class="uk-form-label uk-text-small uk-text-muted">New Address:</label>
        <div class="uk-flex">
          <input
            id="new-address-input"
            class="uk-input uk-form-small"
            type="text"
            placeholder="0x..."
            bind:value={newAddress}
            disabled={loading}
            style="font-family: monospace; font-size: 12px;"
          />
          {#if newAddress}
            <button
              class="uk-button uk-button-link uk-margin-small-left"
              on:click={clearInput}
              disabled={loading}
            >
              ✕
            </button>
          {/if}
        </div>
      </div>
    </div>
    
    <div class="uk-flex uk-flex-bottom uk-flex-right">
      <button
        class="uk-button uk-button-primary uk-button-small"
        on:click={handleOverrideAddress}
        disabled={loading || !newAddress.trim()}
      >
        {#if loading}
          <div uk-spinner="ratio: 0.5"></div>
        {:else}
          {$_('wallet.override_address.button')}
        {/if}
      </button>
    </div>
  </div>
</main>

<!-- Confirmation Modal -->
{#if showConfirmation}
  <div class="uk-modal uk-open" style="display: block;">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Confirm Address Override</h2>
      <p>Are you sure you want to override the address for this account?</p>
      <p><strong>Current:</strong> <code>{signingAccount?.account}</code></p>
      <p><strong>New:</strong> <code>{formatAddress(newAddress)}</code></p>
      <p class="uk-text-warning">
        <strong>Warning:</strong> This action will update the profile's address. Make sure the new address is correct.
      </p>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-margin-small-right" on:click={cancelOverride}>
          Cancel
        </button>
        <button class="uk-button uk-button-primary" on:click={confirmOverride} disabled={loading}>
          {#if loading}
            <div uk-spinner="ratio: 0.5"></div>
          {:else}
            Confirm Override
          {/if}
        </button>
      </p>
    </div>
  </div>
  <div class="uk-modal-backdrop uk-open"></div>
{/if}

<style>
  .uk-modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
  
  code {
    word-break: break-all;
    font-size: 11px;
  }
  
  .uk-text-break {
    word-break: break-all;
  }
</style>
