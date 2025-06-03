<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  
  let isMigrated = null;
  let isLoading = true;
  let error = null;
  let errorDetails = null;

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
      errorDetails = e.toString();
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
  <span uk-spinner="ratio: 0.5" class="migration-spinner"></span>
{:else if error}
  <span 
    uk-icon="icon: warning" 
    style="color: grey;" 
    uk-tooltip={errorDetails || error}
    title={errorDetails || error}>
  </span>
{:else if isMigrated}
  <span uk-icon="icon: check" style="color: green;" title="Account migrated to v8"></span>
{:else}
  <span uk-icon="icon: info" style="color: orange;" title="Account not migrated to v8"></span>
{/if}

<style>
  .migration-spinner {
    width: 12px;
    height: 12px;
  }
</style>