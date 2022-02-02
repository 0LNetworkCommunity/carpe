<script lang="ts">
  import type { AccountEntry } from "../../accounts";
  export let pendingAccounts: AccountEntry[];
  export let isConnected: boolean;

</script>

<main>
  {#if pendingAccounts.length > 0 && isConnected }
    <div class="uk-margin-large">
      <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
        <h3 class="uk-card-title">Onboarding</h3>
        <p> You have generated keys for an account, but it does not yet exist on chain. </p>
        <p> Have a friend send an onboarding transaction using the Onboard Key for each account that needs to be created. </p>
        {#each pendingAccounts as a}
          <p> 
            {a.nickname} - ONBOARD KEY: <span class="uk-text-uppercase"> {a.authkey} </span>  
          </p>
        {/each}
      </div>
    </div>
  {/if}
</main>
