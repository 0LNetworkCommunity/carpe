<script lang="ts">
  import { signingAccount, all_accounts, setAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { Link } from "svelte-navigator";
  import UIkit from "uikit";

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
  {#if account_list.length > 0}
  <div>
    <button class="uk-button uk-button-default" type="button">
      {#if my_account}
      <span uk-icon="icon: user" class="uk-margin-small-right"/> {my_account.nickname}
      {:else}
        Select Account
      {/if}
    </button>

    <div uk-dropdown>
      <ul class="uk-nav uk-dropdown-nav">
        <li class="uk-text-muted">Switch Account</li>
        <li class="uk-nav-divider" />
        {#if !account_list}
          <p>loading...</p>
        {:else}
          {#each account_list as acc}
            <li>
              <a
                href={"#"}
                class="{my_account.account == acc.account ? 'uk-text-primary' : ''}"
                on:click={() => {
                  setAccount(acc.account);
                  // TODO: add notification as callback function
                  UIkit.notification({
                    message: "<span uk-icon='icon: check'></span>Account switched to " + acc.nickname,
                    pos: "bottom-center",
                    status: "success",
                    timeout: 3000,
                  });
                }}
              >
                {acc.nickname}
              </a>
            </li>
          {/each}
          <li class="uk-nav-divider" />

          <li>
            <a href={"#"}>
              <Link to="settings" class="uk-text-muted">Go to Settings</Link></a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
  {/if}
</main>
