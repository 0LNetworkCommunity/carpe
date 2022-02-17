<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { signingAccount, all_accounts } from "../../accounts";
  import { setAccount } from "../../accountActions";
  import type { AccountEntry } from "../../accounts";
  import { Link } from "svelte-navigator";
  import NetworkIcon from "./NetworkIcon.svelte";
  import AboutLink from "../about/AboutLink.svelte";
  import { carpeTick } from "../../tick";
  import { invoke } from "@tauri-apps/api/tauri";
  import { raise_error } from "../../carpeError";
  import { _ } from "svelte-i18n";

  let my_account: AccountEntry;
  let account_list: AccountEntry[];
  let wallet_type;

  let unsubsSigningAccount;
  let unsubsAll_accounts;

  onMount(async () => {
    unsubsSigningAccount = signingAccount.subscribe(value => my_account = value);
    unsubsAll_accounts = all_accounts.subscribe(all => account_list = all);
	signingAccount.subscribe(value => {
      if (JSON.stringify(my_account) == JSON.stringify(value))
        return
      my_account = value
      query_wallet_type()
    })
    all_accounts.subscribe(all => account_list = all);
    isWalletTypeChanged.subscribe(_ => query_wallet_type())
  });

  onDestroy(() => {
    unsubsSigningAccount && unsubsSigningAccount();
    unsubsAll_accounts && unsubsAll_accounts();
  });

  function query_wallet_type() {
    if (!my_account || !my_account.account) return
    invoke("query_wallet_type", { account: my_account.account })
            .then(res => {
              if (res == "None") {
                res = "Normal"
              }
              wallet_type = "Wallet type - " + res
            })
            .catch((error) => {
              raise_error(error, false, "query_wallet_type")
            })
  }

</script>

<main>
  <div>
    <button class="uk-button uk-button-default" type="button">
      <NetworkIcon /> 
      {#if account_list && account_list.length > 0}
        <span class="uk-margin-small-left">
          {#if my_account}
            {my_account.nickname}
          {:else}
          {$_("wallet.account_switcher.select_account")}
          {/if}
        </span>
      {/if}
    </button>

    <div uk-dropdown>
      <ul class="uk-nav uk-dropdown-nav">
        {#if account_list && account_list.length > 0}
          <li class="uk-text-muted">
            {$_("wallet.account_switcher.switch_account")}</li>
          <li class="uk-nav-divider" />
          {#if !account_list} <!-- TODO: move up --> 
            <p>loading...</p>
          {:else}
            {#each account_list as acc}
              <li>
                <a
                  href={"#"}
                  class="{my_account.account == acc.account ? 'uk-text-primary' : ''}"
                  on:click={() => { setAccount(acc.account); carpeTick(); query_wallet_type(); }}
                >
                  {acc.nickname}
                </a>
              </li>
            {/each}
            <li class="uk-nav-divider" />
          {/if}
        {/if}
        <li>
            {wallet_type}
        </li>
        <li class="uk-nav-divider" />
        <li>
          <a href={"#"}>
            <Link to="settings" class="uk-text-muted">
              {$_("wallet.account_switcher.setting")}</Link></a>
        </li>
        <li>
          <a href={"#"}>
            <Link to="dev" class="uk-text-muted">
              {$_("wallet.account_switcher.developers")}</Link></a>
        </li>
        <li class="uk-text-muted">
          <AboutLink />
        </li>
      </ul>
    </div>
  </div>
</main>
