<script lang="ts">
  import { get_locale, setAccount } from "../../accountActions";
  import type { AccountEntry } from "../../accounts";
  import IconMining from '../icons/IconMining.svelte';
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { carpeTick } from "../../tick"
import { to_number } from "svelte/internal";

  UIkit.use(Icons);
  
  export let my_account: AccountEntry;
  export let account_list: AccountEntry[];
  export let isMining: boolean; 
  export let isConnected: boolean;

  // TODO: move to tauri commands
  function formatBalance(balance) {
    const balanceScaled = balance / 1000000

    return balanceScaled.toLocaleString(get_locale(), {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }


</script>

<main>

  {#if account_list == null}
    <span uk-spinner></span>
  {:else if account_list.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>Nickname</th>
          <th>Address</th>
          <th>Authkey</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as a, i}
          <!-- svelte-ignore missing-declaration -->
          <tr
            class="{
              isMining && a.account == my_account.account
                ? 'uk-text-primary'
                : ''
              }"
            on:click={() => { setAccount(a.account); carpeTick(); } }
          >
            <!-- <a href="#" on:click={() => { setAccount(acc.account); }}> {acc.nickname} </a > -->
            <td>
              {#if a.account == my_account.account}
                {#if isMining} 
                  <IconMining />
                {:else}
                  <span uk-icon="user" />
                {/if}
              {/if}
            </td>
            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.authkey.slice(0, 5)}...</td>
            <td>
            {#if a.on_chain == null}
              offline... 
            {:else if a.on_chain}
              {formatBalance(a.balance)}
              
              
              <div class="uk-inline">
                {#if Number(formatBalance(a.balance)) < 1} 
                <!-- TODO: make this icon align verical middle. -->
                  <span class="uk-margin-bottom uk-text-warning" uk-icon="icon: minus-circle" />
                  <div uk-dropdown>
                    Your balance will go down for every transaction you send, including mining.
                  </div>
                  {/if}
              </div>
              

            {:else if a.on_chain == undefined}
              loading...
            {:else if !isConnected}
              offline..
            {:else}
              Account Not On Chain
            {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>    
  {/if}
</main>
