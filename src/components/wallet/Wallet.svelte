<script lang="ts">

  import {
    signingAccount,
    getAllAccounts,
    all_accounts,
    setAccount,
    is_initialized,
    isInit,
  } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { get_balance } from "../../queries";
  import ReminderCreate from "./ReminderCreate.svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import Newbie from "./Newbie.svelte";
  import List from "./List.svelte";
  UIkit.use(Icons);

  let init: boolean;
  let account_list: AccountEntry[];
  let my_account: AccountEntry;

  isInit.subscribe(i => init = i);

  // all_accounts.subscribe((a) => {
  //   account_list = a;
  // });

  // signingAccount.subscribe((a) => {
  //   my_account = a;
  // });

  // async function bal(i): Promise<number> {
  //   let n = await get_balance(account_list[i]);
  //   console.log(n);
  //   return n / 1000000; // NOTE: divide by scaling factor. 
  //   // TODO: Rust should have already returned the scaled value.
  // }

  onMount(() => {
    is_initialized();
    // getAllAccounts();
  });
</script>

<main class="uk-height-viewport">
  <div>
    {#if !init}
     <Newbie />
     {:else}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Wallet</h2>
      </div>
     <List />
     {/if}
  </div>
</main>
