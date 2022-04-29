<script lang="ts">
  import { _ } from 'svelte-i18n';
  import UIkit from 'uikit';
  import { printCoins } from '../../coinHelpers';
  import { makeWhole } from "../../accounts";
  import { onDestroy, onMount } from 'svelte';
  import { claimMakeWhole } from '../../accountActions';
    
  let credits;
  let unsubs;

  onMount(async () => {
    unsubs = makeWhole.subscribe(mk => {
      credits = []
      for (const address in mk) {
        let accountCredits = mk[address];
        accountCredits.forEach(credit => {
          credits.push({
            account: address,
            coins: credit.coins,
            claimed: credit.claimed
          })
        })
      }
    })
  })

  onDestroy(async () => {
    unsubs && unsubs();
  })

  let isProcessing = false;
  let selected = null;
  let errorMsg = ""

  const claimCoins = (credit) => {
    selected = credit
    isProcessing = true;

    let callback = (error: string) => {
      isProcessing = false;
      if (error) {
        errorMsg = error;
        UIkit.modal('#claimError').show();
        return;
      }     
      UIkit.modal('#claimedWithSuccess').show();
    }
    callback.bind({isProcessing});
    claimMakeWhole(selected.account, callback);
  }

</script>

<main>
  <div id="claimedWithSuccess" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-text-center" style="background-image: url('/images/confetti.gif')">
      <div class="uk-section">
        <h2 class="uk-modal-title"><span class="success-icon" uk-icon="icon: check; ratio: 2"></span></h2> 
        <p class="uk-text-small">Transation confirmed!</p>
        <p>You have claimed <span class="uk-text-bold">{selected && printCoins(selected.coins.value)} coins</span> for account <br><span class="uk-text-bold">{selected ? selected.account : ""}</span>.</p>
        <p>You can check your balance now.</p>
      </div>

      <p class="uk-text-center">
        <button 
          class="uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close" 
          type="button"
        >OK</button>
      </p>
    </div>
  </div>

  <div id="claimError" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-text-center">
      <div class="uk-section">
        <h2 class="uk-modal-title">Claim Error</h2> 
        <p>You must turn off miner to claim this account coins.</p>
      </div>

      <p class="uk-text-center">
        <button 
          class="uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close" 
          type="button"
        >OK</button>
      </p>
    </div>
  </div>

  <div class="uk-container">
    <div class="uk-card uk-card-default uk-card-body">
      <h3 class="uk-card-title">Claim Your Missing Coins</h3>
      <p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p>
      <p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can credit your missing coins from that period.</p>
      <p>Click <a href="">here</a> to learn more.</p>
    </div>
    <div>
      
    </div>
    {#if credits}
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th class="uk-text-left">Account</th>
            <th class="uk-text-right">Amount</th>
            <th class="uk-text-center">Claim</th>
          </tr>
        </thead>
        <tbody>
          {#each credits as credit}
            <tr>
              <td class="uk-text-left">{credit.account}</td>
              <td class="uk-text-right">{printCoins(credit.coins.value)}</td>
              <td class="uk-text-center" style="width: 200px;">
                {#if credit.claimed}
                  <span class="uk-text-success" uk-icon="icon: check; ratio: 1; color: green"></span>
                {:else}
                  <button 
                    on:click={() => claimCoins(credit)}
                    disabled={isProcessing}
                    style="width: 180px;"
                    class="uk-button uk-button-primary"
                  >{isProcessing ? "Await..." : "Claim Now"}</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      loading...
    {/if}
  </div>
</main>

<style>
.success-icon {
  color: #4eb02e;
  font-weight: 900;
  border-radius: 100%;
  background-color: #dbf0d4;
  padding: 20px;
}
</style>