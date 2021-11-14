<script lang="ts">
  import { signingAccount, all_accounts, setAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { Link } from "svelte-navigator";
  import UIkit from "uikit";
  import NetworkIcon from "./NetworkIcon.svelte";

  let my_account: AccountEntry;
  let account_list: AccountEntry[];

  signingAccount.subscribe((value) => {
    my_account = value;
  });

  all_accounts.subscribe((a) => {
    console.log(a);
    account_list = a;
  });
</script>

<main>
  <div>
    <button class="uk-button uk-button-default" type="button">
      <NetworkIcon /> 
      {#if account_list.length > 0}
        <span class="uk-margin-small-left">
          {#if my_account}
            {my_account.nickname}
          {:else}
            Select Account
          {/if}
        </span>
      {/if}
    </button>

    <div uk-dropdown>
      <ul class="uk-nav uk-dropdown-nav">
        {#if account_list.length > 0}
          <li class="uk-text-muted">Switch Account</li>
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
            <Link to="settings" class="uk-text-muted">Go to Settings</Link></a>
        </li>
      </ul>
    </div>
  </div>
</main>
