<script lang="ts">
  import { account, all_accounts } from "../../accounts";
  import type { AccountEntry } from "../../accounts";

  let my_account;
  let account_list: AccountEntry[];

  account.subscribe((value) => {
    my_account = value;
  });

  all_accounts.subscribe((a) => {
    console.log(a);
    account_list = a;
  });

  function setAccount(an_address) {
    account.set(an_address);
  }
  
</script>

<main>
      <button class="uk-button uk-button-default" type="button">
        {#if my_account}
          {my_account}
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
            <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a >
          </li>
        {/each}

        <!-- <li class="uk-active"><a href="#">Active</a></li>
      <li><a href="#">Item</a></li>

      <li><a href="#">Item</a></li> -->
      {/if}
    </ul>
  </div>
</main>
