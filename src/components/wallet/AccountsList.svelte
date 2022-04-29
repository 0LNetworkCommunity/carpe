<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setAccount } from "../../accountActions";
  import type { AccountEntry } from "../../accounts";
  import IconMining from "../icons/IconMining.svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { printCoins, unscaledCoins } from "../../coinHelpers";  

  UIkit.use(Icons);

  export let my_account: AccountEntry;
  export let accountList: AccountEntry[];
  export let isMining: boolean;
  export let isConnected: boolean;

</script>

<main>
  {#if accountList == null}
    <span uk-spinner />
  {:else if accountList.length > 0}
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th />
          <th>{$_("wallet.account_list.nickname")}</th>
          <th>{$_("wallet.account_list.address")}</th>
          <th>{$_("wallet.account_list.authkey")}</th>
          <th class="uk-text-right">{$_("wallet.account_list.balance")}</th>
        </tr>
      </thead>
      <tbody>
        {#each accountList as a, i}
          <!-- svelte-ignore missing-declaration -->
          <tr
            class={isMining && a.account == my_account.account
              ? "uk-text-primary"
              : ""}
            on:click={() => setAccount(a.account)}
          >
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
            <td class="uk-text-right">
              {#if (a.on_chain != null) && (a.on_chain == false)}
                {$_("wallet.account_list.account_on_chain")}
              {:else if a.on_chain}
                <div class="uk-inline">
                  
                  {#if unscaledCoins(a.balance) < 1}
                    <!-- TODO: make this icon align verical middle. -->
                    <span
                      class="uk-margin uk-text-warning"
                      uk-icon="icon: info"
                    />
                    <div uk-dropdown>
                      {$_("wallet.account_list.message")}
                    </div>
                  {/if}

                  {printCoins(a.balance)}
                </div>
              {:else if a.balance == null}
                {$_("wallet.account_list.loading")}...
              {:else if !isConnected}
                {$_("wallet.account_list.offline")}...
              {:else}
                {$_("wallet.account_list.account_on_chain")}
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
