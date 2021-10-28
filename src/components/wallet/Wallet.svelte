<script lang="ts">
  import { get_all_accounts, all_accounts, setAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  // import AccountFromMnem from "./AccountFromMnemSubmit.svelte";
  import { onMount } from "svelte";
  import Keygen from "./Keygen.svelte";
  import { Link } from "svelte-navigator";
  import { get_balance } from "../../queries";
  import ReminderCreate from "./ReminderCreate.svelte";

  let account_list: AccountEntry[];

  all_accounts.subscribe((a) => {
    account_list = a;
  });

  async function bal(i): Promise<number> {
    let n = await get_balance(account_list[i])
    console.log(n);
    return n;
  }

  onMount(() => {
    get_all_accounts();
  });


</script>

<main class="uk-height-viewport">
  <h1>Wallet</h1>
  <div>

    <!-- <Link to="add-account">
      <button class="uk-button uk-button-primary uk-align-right"> Track Account </button>
    </Link> -->

    <!-- <Link to="account-from-mnem">
      <button class="uk-button uk-button-primary uk-align-right">
        Add Keys
      </button>
    </Link> -->
  </div>
  {#if !account_list}
    <p>loading...</p>

  {:else if account_list.length >0 }
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Address</th>
          <th>Authkey</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as a, i}
          <tr on:click={() => { setAccount(a.account);}}>
            <!-- <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a > -->

            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.authkey.slice(0,5)}...</td>

            {#await bal(i)}
              <td>...</td>
            {:then data}
              {#if data }
              <td>{data}</td>
              {:else}
                <td>
                    <button class="uk-button uk-button-default" uk-toggle="target: #modal-example" onclick={() => {setAccount(a.account)}}>Onboard</button> 
                
                </td>
              {/if}
            {:catch error}
              <td>...</td>
            {/await}
          </tr>
        {/each}
      </tbody>
    </table>
    {:else}
      <p> Looks like you don't have any accounts.</p>
  {/if}

  <div uk-grid class="uk-flex uk-flex-center">
    <Link to="keygen">
      <button class="uk-button uk-button-primary"> New Account </button>
    </Link>
    <Link to="account-from-mnem">
      <button class="uk-button uk-button-default"> Restore Account </button>
    </Link>


  </div>



    <!-- Modal -->
    <ReminderCreate/>

</main>
