<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  export let isMigrated = null;
  export let isFounder = false;
  
  const dispatch = createEventDispatcher();
  
  let isLoading = true;
  let error = null;
  let previousAccount = null;
  
  // Watch for changes to the account prop and refresh status when it changes
  $: if (account && account !== previousAccount) {
    previousAccount = account;
    refreshStatus();
  }
  
  // Function to refresh both statuses
  async function refreshStatus() {
    if (account) {
      isLoading = true;
      error = null;
      try {
        await Promise.all([
          checkMigrationStatus(),
          checkFounderStatus()
        ]);
      } catch (e) {
        console.error("Error refreshing status:", e);
      } finally {
        // Make sure loading state is reset regardless of success or failure
        isLoading = false;
      }
    }
  }
  
  // Function to directly call the rejoin_transaction function and notify parent
  async function handleRejoin(event) {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      // Show loading state while processing
      isLoading = true;
      
      // Call the rejoin_transaction Tauri function directly
      await invoke('rejoin_transaction', { sender: account });
      
      // Wait a moment for the blockchain to process the transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Refresh status checks after successful rejoin
      await checkMigrationStatus();
      await checkFounderStatus();
      
      // Notify parent component of successful rejoin
      dispatch('rejoin', { 
        account,
        success: true 
      });
      
      // Ensure loading state is explicitly reset after successful operation
      isLoading = false;
    } catch (e) {
      console.error("Rejoin failed:", e);
      // Ensure loading state is reset even on error
      isLoading = false;
      
      // Notify parent component of failed rejoin
      dispatch('rejoin', { 
        account,
        success: false,
        error: e 
      });
    }
  }

  async function checkFounderStatus() {
    if (!account) return;
    
    try {
      isLoading = true;
      error = null;
      console.log("Checking if account is founder:", account);
      
      isFounder = await invoke('is_founder', { account });
      console.log("Is founder result:", isFounder);
    } catch (e) {
      // When there's an error checking founder status, assume it's a founder
      // This will show the rejoin button when there are errors
      isFounder = true;
      error = "Failed to check founder status";
      console.error("Error checking founder status:", e);
      isLoading = false;
    }
  }

  async function checkMigrationStatus() {
    try {
      console.log("Checking migration status for founder account:", account);
      
      isMigrated = await invoke('check_account_migration_status', { account });
      console.log("Migration status result:", isMigrated);
    } catch (e) {
      // When there's an error checking migration status, assume it's not migrated
      // This will show the rejoin button when there are errors
      isMigrated = false;
      error = "Failed to check migration status";
      console.error("Error checking migration status:", e);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    if (account) {
      refreshStatus();
    }
  });
</script>

{#if isLoading}
  <span uk-spinner="ratio: 0.5" class="status-spinner"></span>
{:else if error || (!isMigrated && isFounder)}
  <!-- Show rejoin button when there's an error OR for non-migrated founder accounts -->
  <button 
    class="rejoin-button" 
    on:click|stopPropagation={e => handleRejoin(e)}
    uk-tooltip="Migrate this account to v8">
    <span uk-icon="icon: refresh" class="rejoin-icon"></span>
  </button>
<!-- Removed redundant condition since it's merged with the error case above -->
{:else if isMigrated}
  <span 
    uk-icon="icon: check" 
    style="color: green;" 
    uk-tooltip="Account migrated to v8"
    title="Account migrated to v8">
  </span>
{:else}
  <!-- Don't show anything for non-founder accounts that aren't migrated -->
{/if}

<style>
  .status-spinner {
    width: 12px;
    height: 12px;
  }
  
  /* Removed unused icon-button styles */
  
  .rejoin-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .rejoin-icon {
    color: #1e87f0;
  }
  
  .rejoin-button:hover .rejoin-icon {
    color: #0f6ecd;
  }
</style>