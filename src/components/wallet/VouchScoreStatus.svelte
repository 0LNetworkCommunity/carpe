<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  
  let isMigrated = null;
  let isValidVouchScore = null;
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
      
      // If account is a founder, check vouch score
      if (isFounder) {
        await checkVouchScoreStatus();
      } else {
        console.log("Account is not a founder, skipping vouch score check");
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

  async function checkVouchScoreStatus() {
    try {
      console.log("Checking vouch score validity for founder account:", account);
      
      isValidVouchScore = await invoke('is_not_valid_vouch_score', { account });
      console.log("Vouch score validity result:", isValidVouchScore);
    } catch (e) {
      // Check if this is the expected error for insufficient vouch score
      if (e && e.trace && e.trace.includes("196609")) {
        console.log("Got specific abort code, treating as invalid vouch score");
        isValidVouchScore = false;
      } else {
        // For other unexpected errors
        error = "Failed to check vouch score";
        errorDetails = JSON.stringify(e, null, 2);
        console.error("Error checking vouch score:", e);
      }
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    if (account) {
      checkMigrationStatus();
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
{:else if !isMigrated && !isFounder}
  <!-- Don't show anything if not a founder -->
{:else if isValidVouchScore}
  <span 
    class="heart-icon filled" 
    uk-tooltip="Valid vouch score"
    title="Valid vouch score">♥</span>
{:else}
  <span 
    class="heart-icon empty" 
    uk-tooltip="Insufficient vouch score"
    title="Insufficient vouch score">♡</span>
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
  
  .heart-icon {
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    cursor: default;
  }
  
  .filled {
    color: #e91e63;
    font-weight: bold;
  }
  
  .empty {
    color: #9e9e9e;
  }
</style>