<script lang="ts">
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import UIkit from "uikit";
  import Clipboard from "svelte-clipboard";

  export let pendingAccounts: AccountEntry[];

  let authkey;
  signingAccount.subscribe((a) => (authkey = a.authkey));

</script>

<main>
  {#if pendingAccounts.length > 0}
    <div class="uk-margin-large">
      <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
        <h3 class="uk-card-title">Onboarding</h3>
        <p> You have generated keys for an account, but it does not yet exist on chain. </p>
        <p> Have a friend send an onboarding transaction using the authkey for each account that needs to be created. </p>
        {#each pendingAccounts as a}
          <p> 
            AUTH KEY: {a.authkey}  
            <Clipboard
              text="{a.authkey}"
              let:copy
              on:copy={() => {
                UIkit.notification({
                  message: "<span uk-icon='icon: check'></span>Auth key copied to clipboard",
                  pos: "bottom-center",
                  status: "success",
                  timeout: 3000,
                });
              }}>
              <a href={"#"} on:click={copy}>
                <span uk-icon="copy" />
              </a>
            </Clipboard>
          </p>
        {/each}
      </div>
    </div>
  {/if}

  <!-- <p class="uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
            </p> -->
  <!-- </div> -->
  <!-- </div> -->
</main>
