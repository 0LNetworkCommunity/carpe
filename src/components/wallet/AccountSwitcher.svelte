<script lang="ts">
  import { signingAccount, all_accounts, setAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";

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
  <button class="uk-button uk-button-default" type="button">
    {#if my_account}
      {my_account.nickname}
    {:else}
      Select Account
    {/if}
  </button>

  <div uk-dropdown>
    <ul class="uk-nav uk-dropdown-nav">
      {#if !account_list}
        <p>loading...</p>
      {:else}
        {#each account_list as acc}
          <li>
            <a
              href={"#"}
              on:click={() => {
                setAccount(acc.account);
              }}
            >
              {acc.nickname}
            </a>
          </li>
        {/each}

        <!-- <li class="uk-active"><a href="#">Active</a></li>
      <li><a href="#">Item</a></li>

      <li><a href="#">Item</a></li> -->
      {/if}
    </ul>
  </div>
</main>
