<script lang="ts">
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";
  
  let danger_temp_mnem: string;

</script>

<main class="uk-height-viewport">
  
  <h3 class="uk-text-light uk-text-muted uk-text-uppercase">Restore Account</h3>
  <p> Using your recovery words (mnemonic) you can configure Carpe as a wallet to monitor, and send transactions</p>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="Recovery Mnemonic"
          bind:value={danger_temp_mnem}
        />
      </div>
      
      <AccountFromMnemSubmit danger_temp_mnem={danger_temp_mnem} />
    </fieldset>
  </form>
</main>
