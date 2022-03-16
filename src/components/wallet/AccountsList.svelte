<script lang="ts">
  import { get_locale, setAccount } from "../../accountActions";
  import type { AccountEntry } from "../../accounts";
  import IconMining from "../icons/IconMining.svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { carpeTick } from "../../tick";
  import { _ } from "svelte-i18n";

  UIkit.use(Icons);

  export let my_account: AccountEntry;
  export let account_list: AccountEntry[];
  export let isMining: boolean;
  export let isConnected: boolean;

  console.log(account_list);

  // TODO: move to tauri commands
  function formatBalance(balance) {
    const balanceScaled = balance / 1000000;

    return balanceScaled.toLocaleString(get_locale(), {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }   
</script>

<main>
  {#if account_list == null}
    <span uk-spinner />
  {:else if account_list.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>{$_("wallet.account_list.nickname")}</th>
          <th>{$_("wallet.account_list.address")}</th>
          <th>{$_("wallet.account_list.authkey")}</th>
          <th>{$_("wallet.account_list.balance")}</th>
          <th>Wallet type</th>
        </tr>
      </thead>
      <tbody>
        {#each account_list as a, i}
          <!-- svelte-ignore missing-declaration -->
          <tr
            class={isMining && a.account == my_account.account
              ? "uk-text-primary"
              : ""}
            on:click={() => {
              setAccount(a.account);
              carpeTick();
            }}
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
              {#if !a.on_chain}
                {$_("wallet.account_list.offline")}...
              {:else if a.on_chain}
                <div class="uk-inline">
                  
                  {#if Number(formatBalance(a.balance)) < 1}
                    <!-- TODO: make this icon align verical middle. -->
                    <span
                      class="uk-margin uk-text-warning"
                      uk-icon="icon: minus-circle"
                    />
                    <div uk-dropdown>
                      {$_("wallet.account_list.message")}
                    </div>
                  {/if}

                  {formatBalance(a.balance)}
                </div>
              {:else if a.balance == null}
                {$_("wallet.account_list.loading")}...
              {:else if !isConnected}
                {$_("wallet.account_list.offline")}...
              {:else}
                {$_("wallet.account_list.account_on_chain")}
              {/if}
            </td>
            <td>
              {#if a.wallet_type === "None"}
                Normal
              {:else}
                {a.wallet_type}
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
