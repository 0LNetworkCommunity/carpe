<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
import { _ } from "svelte-i18n";
  import { loadAccounts } from "../../accountActions";
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
        raise_error(e, false, "removeAccounts");
      });
  };
</script>

<main class="uk-margin" >
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("settings.account_settings.title")}
  </h4>

  <div class="uk-margin" uk-grid>
    <div>

    <div class="uk-inline">
    <button class="uk-button uk-button-danger" type="button">{$_("settings.account_settings.btn_remove")}</button>
      <div uk-dropdown="mode: click">
          <p>{$_("settings.account_settings.confirm")}</p>
          <button class="uk-button uk-button-danger" on:click={removeAccounts}>
            {$_("settings.account_settings.btn_remove")}
          </button>
      </div>
    </div>

    </div>
    <div>
      <span>
        {$_("settings.account_settings.description")}
      </span>
    </div>
  </div>
</main>
