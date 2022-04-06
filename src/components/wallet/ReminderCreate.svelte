<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { AccountEntry } from "../../accounts";
  
  export let pendingAccounts: AccountEntry[];
  export let isConnected: boolean;

</script>

<main>
  {#if pendingAccounts.length > 0 && isConnected }
    <div class="uk-margin-large">
      <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
        <h3 class="uk-card-title">{$_("wallet.reminder_create.card_title")}</h3>
        <p>{$_("wallet.reminder_create.message_headline")}</p>
        <p>{$_("wallet.reminder_create.message_prefix")} <a href="https://discord.com/channels/833074824447655976/909866360060932127" target="_blank">Discord <span uk-icon="icon: link;ratio:0.8"></span></a> {$_("wallet.reminder_create.message_suffix")}</p>
        {#each pendingAccounts as a}
          <p> 
            {a.nickname} - {$_("wallet.reminder_create.onboard_key")} : <span class="uk-text-uppercase"> {a.authkey} </span>  
          </p>
        {/each}
      </div>
    </div>
  {/if}
</main>
