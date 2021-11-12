<script lang="ts">
  import type { AccountEntry } from "../../accounts";
  export let pendingAccounts: AccountEntry[];
</script>

<main>
  {#if pendingAccounts}
  <div class="uk-margin-large">
    <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
      <h3 class="uk-card-title">Onboarding</h3>
      <!-- <h2 class=""></h2> -->
      <p>
        You have generated keys for an account, but it does not yet exist on chain.
      </p>
      
      <span>
        Have a friend send an onboarding transaction using the authkey for each account that needs to be created.
      </span>
      
      <span>
            {#each pendingAccounts as a}
            <br/>
             <!-- <p> ACCOUNT: {a.nickname} </p> -->
             <p> AUTH KEY: {a.authkey} </p>
            {/each}
        </span>
    </div>
  </div>
  {/if}
</main>
