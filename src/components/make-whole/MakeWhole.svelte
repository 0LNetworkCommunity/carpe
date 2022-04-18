<script lang="ts">
  import { _ } from 'svelte-i18n';
  import UIkit from 'uikit';
  import { printCoins } from '../../coinHelpers';

  let isProcessing = false;
  let selected = null;

  let claims = [
    { address: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", amount: "1500000000", status: "claimed" },
    { address: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", amount: "2300000000", status: "available" },
    { address: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", amount: "700000000", status: "available" }
  ]

  const claimCoins = (claim) => {
    isProcessing = true;
    selected = claim;
    setTimeout(() => {
      isProcessing = false;
      // open modal
      UIkit.modal('#claimedWithSuccess').show();
    }, 1000);
  }

</script>

<main>
  <div id="claimedWithSuccess" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-text-center" style="background-image: url('/images/confetti.gif')">
      <div class="uk-section">
        <h2 class="uk-modal-title"><span class="success-icon" uk-icon="icon: check; ratio: 2"></span></h2> 
        <p class="uk-text-small">Transation confirmed!</p>
        <p>You have claimed <span class="uk-text-bold">{selected ? printCoins(selected.amount) : ""} coins</span> for account <br>{selected ? selected.address : ""}.</p>
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

  <div class="uk-container">
    <div class="uk-card uk-card-default uk-card-body">
      <h3 class="uk-card-title">Claim Your Missing Coins</h3>
      <p>Oops. Occasionally blockchains make math mistakes. 0L tries to fix them as quickly as possible.</p>
      <p>Miner Identity Subsidy Incident: From Epoch 0 to epoch 52, the payouts to miners was lower than expected. Below you can claim your missing coins from that period.</p>
      <p>Click <a href="">here</a> to learn more.</p>
    </div>
    <div>
      
    </div>
  
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-left">Account</th>
          <th class="uk-text-right">Amount</th>
          <th class="uk-text-center">Claim</th>
        </tr>
      </thead>
      <tbody>
        {#each claims as claim}
          <tr>
            <td class="uk-text-left">{claim.address}</td>
            <td class="uk-text-right">{printCoins(claim.amount)}</td>
            <td class="uk-text-center">
              {#if claim.status == "claimed"}
                <span uk-icon="icon: check; ratio: 1; color: green"></span>
              {:else if claim.status == "available"}
                <button 
                  on:click={() => claimCoins(claim)}
                  disabled={isProcessing}
                  class="uk-button uk-button-primary"
                >{isProcessing ? "Await..." : "Claim Now"}</button>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
.success-icon{
  color: #4eb02e;
  font-weight: 900;
  border-radius: 100%;
  background-color: #dbf0d4;
  padding: 20px;
}
</style>