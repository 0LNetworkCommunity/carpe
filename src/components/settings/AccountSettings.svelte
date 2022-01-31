<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { loadAccounts } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import { notify_success } from "../../carpeNotify";
  import { responses } from "../../debug";
  const removeAccounts = async () => {
    invoke("remove_accounts", {})
      .then((res: any) => {
        responses.set(res);
        notify_success("accounts removed successfully");
        loadAccounts()
      })
      .catch((e) => {
        raise_error(e);
      });
  };
</script>

<main class="uk-margin" >
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Account Settings
  </h4>

  <div class="uk-margin" uk-grid>
    <div>

    <div class="uk-inline">
    <button class="uk-button uk-button-danger" type="button">Remove Accounts</button>
      <div uk-dropdown="mode: click">
          <p>Confirm remove accounts from this device? This is not reversable.</p>
          <button class="uk-button uk-button-danger" on:click={removeAccounts}>
            Remove Accounts
          </button>
      </div>
    </div>

    </div>
    <div>
      <span>
        This does not delete any accounts from the chain. It only removes the
        accounts from this device. If you do not have your recovery codes
        (mnemonic) stored somewhere, you may be locked out of this account
        permanently. NO ONE CAN HELP YOU RECOVER THE MNEMONIC.
      </span>
    </div>
  </div>
</main>
