<script lang="ts">
  import { _ } from "svelte-i18n";
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";
  
  let danger_temp_mnem: string;
</script>

<main>  
  <h3 class="uk-text-light uk-text-muted uk-text-uppercase">
    {$_("wallet.account_from_mnem_from.title")}</h3>
  <p> {$_("wallet.account_from_mnem_from.description")}</p>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="{$_("wallet.account_from_mnem_from.placeholder")}"
          bind:value={danger_temp_mnem}
        />
      </div>
      
      <AccountFromMnemSubmit danger_temp_mnem={danger_temp_mnem} isNewAccount={false} />
    </fieldset>
  </form>
</main>
