<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  
  let isMigrated = null;
  let isLoading = true;
  let isFounder = false;
  let error = null;
  let errorDetails = null;

  function showErrorDetails() {
    console.log("Error details:", errorDetails);
    alert(`Error: ${error}\n\nDetails: ${errorDetails}`);
  }

  async function checkFounderStatus() {
    if (!account) return;
    
    try {
      isLoading = true;
      error = null;
      errorDetails = null;
      console.log("Checking if account is founder:", account);
      
      isFounder = await invoke('is_founder', { account });
      console.log("Is founder result:", isFounder);
      
      // If account is a founder, check migration status
      if (isFounder) {
        await checkMigrationStatus();
      } else {
        console.log("Account is not a founder, skipping migration check");
        isLoading = false;
      }
    } catch (e) {
      error = "Failed to check founder status";
      errorDetails = JSON.stringify(e, null, 2);
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
      error = "Failed to check migration status";
      errorDetails = JSON.stringify(e, null, 2);
      console.error("Error checking migration status:", e);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    if (account) {
      checkFounderStatus();
    }
  });
</script>

{#if isLoading}
  <span uk-spinner="ratio: 0.5" class="status-spinner"></span>
{:else if error}
  <button 
    class="icon-button" 
    aria-label="Show error details" 
    uk-tooltip="Click for details"
    on:click={showErrorDetails}>
    <span uk-icon="icon: question" style="color: grey;"></span>
  </button>
{:else if !isFounder}
  <!-- Don't show anything if not a founder -->
{:else if isMigrated}
  <span 
    uk-icon="icon: check" 
    style="color: green;" 
    uk-tooltip="Account migrated to v8"
    title="Account migrated to v8">
  </span>
{:else}
  <span 
    uk-icon="icon: warning" 
    style="color: orange;" 
    uk-tooltip="Account not migrated to v8"
    title="Account not migrated to v8">
  </span>
{/if}

<style>
  .status-spinner {
    width: 12px;
    height: 12px;
  }
  
  .icon-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon-button:focus {
    outline: 2px solid #007bff;
    border-radius: 4px;
  }
</style>