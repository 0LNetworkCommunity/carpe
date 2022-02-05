<script lang="ts">
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";

  let danger_temp_mnem: string;
  let other_address: string = "";
</script>

<main>
  <h3 class="uk-text-light uk-text-muted uk-text-uppercase">Restore Account</h3>
  <p>
    Using your recovery words (mnemonic) you can configure Carpe as a wallet to
    monitor, and send transactions
  </p>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="Recovery Mnemonic"
          bind:value={danger_temp_mnem}
        />
        <ul uk-accordion>
          <li>
            <a class="uk-accordion-title uk-width-1-6" href={"#"}>Advanced</a>
            <div class="uk-accordion-content">
              <p>
                Advanced: If your address has rotated the authkey, we won't be
                able to derive the address from the mnemonic. Input that here
              </p>
              <input
                class="uk-input"
                type="text"
                placeholder="Optional: Address in case of re-key"
                bind:value={other_address}
              />
            </div>
          </li>
        </ul>
      </div>

      <AccountFromMnemSubmit
        {danger_temp_mnem}
        {other_address}
        isNewAccount={false}
      />
    </fieldset>
  </form>

  <div />
</main>
