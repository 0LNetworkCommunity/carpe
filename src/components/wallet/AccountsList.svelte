<script lang="ts">
  import { _ } from "svelte-i18n";
  import { setAccount } from "../../accountActions";
  import type { Profile } from "../../accounts";
  import IconMining from "../icons/IconMining.svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import { printCoins, unscaledCoins } from "../../coinHelpers";  
  import { Link } from "svelte-navigator";
  import { routes } from "../../routes";

  UIkit.use(Icons);

  export let selectedAccount: Profile;
  export let accountList: Profile[];
  export let isMining: boolean;
  export let isConnected: boolean;

</script>

<main>
  {#if accountList.length > 0}
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
        {#each accountList as a}
          <!-- svelte-ignore missing-declaration -->
          <tr
            class={isMining && a.account == selectedAccount.account
              ? "uk-text-primary"
              : ""}
            on:click={() => setAccount(a.account)}
          >
            <td>
              {#if a.account == selectedAccount.account}
                {#if isMining}
                  <IconMining />
                {:else}
                  <span uk-icon="user" />
                {/if}
              {/if}
            </td>
            <td>{a.nickname}</td>
            <td>{a.account}</td>
            <td>{a.auth_key.slice(0, 5)}...</td>
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
    <div uk-grid class="uk-margin uk-flex uk-flex-center">
      <Link to={routes.keygen}>
        <button class="uk-button uk-button-secondary"
          >{$_("wallet.btn_new_account")}</button
        >
      </Link>
      <Link to={routes.accountFromMnem}>
        <button class="uk-button uk-button-default"
          >{$_("wallet.btn_restore_account")}
        </button>
      </Link>
    </div>
</main>
