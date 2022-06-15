<script lang="ts">
  import { _ } from "svelte-i18n";
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";
  
  let danger_temp_mnem: string;
</script>

<main>  
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light carpe-titles">{$_("wallet.account_from_mnem_from.title")}</h2>
  </div>

  <div class="carpe-card uk-card uk-card-primary uk-card-hover uk-card-body">
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
  </div>
</main>
