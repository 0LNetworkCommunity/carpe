<script lang="ts">
  import { setAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import IconMining from '../icons/IconMining.svelte';
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";

  UIkit.use(Icons);
  
  export let my_account: AccountEntry;
  export let account_list: AccountEntry[];
  export let isMining: boolean; 
  export let isConnected: boolean;

  // TODO: move to tauri commands
  function formatBalance(balance) {
    const balanceScaled = balance / 1000000
    return balanceScaled.toLocaleString('en-ES', {
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
          <tr
            class="{
              isMining && a.account == my_account.account
                ? 'uk-text-primary'
                : ''
              }"
            on:click={() => setAccount(a.account) }
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
            {#if a.on_chain == null}
              offline... 
            {:else if a.on_chain}
              <td>{formatBalance(a.balance)}</td>
            {:else if a.on_chain == undefined}
              loading...
            {:else if !isConnected}
              <td>offline...</td>
            {:else}
              <td>Account Not On Chain</td>
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>    
  {/if}
</main>
