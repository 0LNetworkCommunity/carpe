<script lang="ts">
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";

  export let pendingAccounts: AccountEntry[];

  let authkey;
  signingAccount.subscribe((a) => (authkey = a.authkey));
</script>

<main>
  <div class="uk-margin-large">
    <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
      <h3 class="uk-card-title">Onboarding</h3>
      <!-- <h2 class=""></h2> -->
      <p>
        You have generated keys for an account, but it does not yet exist on chain.
      </p>
      
      <span>
        {authkey}
        Have a friend send an onboarding transaction using the authkey for each account that needs to be created.
        <span>
          {#if pendingAccounts}
            {#each pendingAccounts as a}
            <br/>
             <!-- <p> ACCOUNT: {a.nickname} </p> -->
             <p> AUTH KEY: {a.authkey} </p>
            {/each}
          {/if}
        </span></span
      >
    </div>
  </div>

  <!-- <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
            </p> -->
  <!-- </div> -->
  <!-- </div> -->
</main>
