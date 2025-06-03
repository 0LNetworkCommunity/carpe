<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/tauri';
  
  export let account;
  
  let isValidVouchScore = null;
  let isLoading = true;
  let error = null;
  let errorDetails = null;

  async function checkVouchScoreStatus() {
    if (!account) return;
    
    try {
      isLoading = true;
      error = null;
      errorDetails = null;
      console.log("Checking vouch score validity for:", account);
      
      // Call the Rust function
      isValidVouchScore = await invoke('is_not_valid_vouch_score', { account });
      console.log("Vouch score validity result:", isValidVouchScore);
    } catch (e) {
      error = "Failed to check vouch score";
      errorDetails = JSON.stringify(e, null, 2);
      console.error("Error checking vouch score:", e);
      // Log the full error object
      console.log("Full error object:", e);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    if (account) {
      checkVouchScoreStatus();
    }
  });
</script>

{#if isLoading}
  <span uk-spinner="ratio: 0.5" class="vouch-score-spinner"></span>
{:else if error}
  <!-- Show a clickable icon that displays error details when clicked -->
  <span 
    uk-icon="icon: question" 
    style="color: grey; cursor: pointer;" 
    uk-tooltip="Click for details"
    on:click={() => {
      console.log("Error details:", errorDetails);
      alert(`Error: ${error}\n\nDetails: ${errorDetails}`);
    }}>
  </span>
{:else if isValidVouchScore}
  <span 
    uk-icon="icon: heart" 
    style="color: #e91e63;" 
    uk-tooltip="Valid vouch score"
    title="Valid vouch score">
  </span>
{:else}
  <span 
    uk-icon="icon: heart" 
    style="color: #9e9e9e;" 
    uk-tooltip="Invalid vouch score"
    title="Invalid vouch score">
  </span>
{/if}

<style>
  .vouch-score-spinner {
    width: 12px;
    height: 12px;
  }
</style>