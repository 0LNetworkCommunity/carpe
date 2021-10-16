<script lang="ts">
  import { account, all_accounts } from "../../accounts";

  let my_account = "";

  let account_list;
  account.subscribe((value) => {
    my_account = value;
  });

  all_accounts.subscribe(a => {
    account_list = a;
  })

  function setAccount(an_address) {
    console.log("set account");
    console.log(an_address);
    account.set(an_address);
  }

</script>

<main>
  <button class="uk-button uk-button-default" type="button"
    >{my_account}
  </button>
  <div uk-dropdown>
    <ul class="uk-nav uk-dropdown-nav">
        {#if !account_list}
          <p>loading...</p>
        {:else if account_list.length == 0}
          <p>Add your first account</p>
        {:else}

        {#each account_list as acc }
          <li><a href="#" on:click={() => { setAccount(acc.address) }} >{acc.address}</a></li>
        {/each}

      <!-- <li class="uk-active"><a href="#">Active</a></li>
      <li><a href="#">Item</a></li>

      <li><a href="#">Item</a></li> -->
      {/if}
    </ul>
  </div>
</main>
