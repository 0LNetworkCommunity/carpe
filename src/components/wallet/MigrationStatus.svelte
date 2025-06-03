<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  
  let isMigrated = null;
  let isLoading = true;
  let error = null;
  let errorDetails = null;

  function showErrorDetails() {
    console.log("Error details:", errorDetails);
    alert(`Error: ${error}\n\nDetails: ${errorDetails}`);
  }

  async function checkMigrationStatus() {
    if (!account) return;
    
    try {
      isLoading = true;
      error = null;
      errorDetails = null;
      console.log("Checking migration status for:", account);
      
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
      checkMigrationStatus();
    }
  });
</script>

{#if isLoading}
  <span uk-spinner="ratio: 0.5" class="status-spinner"></span>
{:else if error}
  <!-- Use button instead of span for better accessibility -->
  <button 
    class="icon-button" 
    aria-label="Show error details" 
    uk-tooltip="Click for details"
    on:click={showErrorDetails}>
    <span uk-icon="icon: question" style="color: grey;"></span>
  </button>
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