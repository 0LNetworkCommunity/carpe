<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { signingAccount, all_accounts } from "../../accounts";
  import { setAccount } from "../../accountActions";
  import type { AccountEntry } from "../../accounts";
  import { Link } from "svelte-navigator";
  import NetworkIcon from "./NetworkIcon.svelte";
  import AboutLink from "../about/AboutLink.svelte";
  import { _ } from "svelte-i18n";

  let my_account: AccountEntry;
  let account_list: AccountEntry[];

  let unsubsSigningAccount;
  let unsubsAll_accounts;

  onMount(async () => {
    unsubsSigningAccount = signingAccount.subscribe(value => my_account = value);
    unsubsAll_accounts = all_accounts.subscribe(all => account_list = all);
  });

  onDestroy(() => {
    unsubsSigningAccount && unsubsSigningAccount();
    unsubsAll_accounts && unsubsAll_accounts();
  });

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
                  on:click={() => setAccount(acc.account)}
                >
                  {acc.nickname}
                </a>
              </li>
            {/each}
            <li class="uk-nav-divider" />
          {/if}
        {/if}
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
