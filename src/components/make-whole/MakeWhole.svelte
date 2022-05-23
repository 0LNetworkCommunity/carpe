<script lang="ts">
  import UIkit from 'uikit';
  import { printCoins } from '../../coinHelpers';
  import { makeWhole } from "../../accounts";
  import { onDestroy, onMount } from 'svelte';
  import { claimMakeWhole } from '../../accountActions';
  import { _ } from "svelte-i18n";
    
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
        <p class="uk-text-small">{$_("make_whole.modal_success.title")}</p>
        {@html $_("make_whole.modal_success.amount_for_account", { values: { coins: selected && printCoins(selected.coins.value), account: selected ? selected.account : '' } })}
        <p>{$_("make_whole.modal_success.check_balance")}</p>
      </div>

      <p class="uk-text-center">
        <button 
          class="uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close" 
          type="button"
        >{$_("make_whole.modal_success.ok_btn")}</button>
      </p>
    </div>
  </div>

  <div id="claimError" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-text-center">
      <div class="uk-section">
        <h2 class="uk-modal-title"> {$_("make_whole.modal_error.title")}</h2> 
        <p>{errorMsg}</p>
      </div>

      <p class="uk-text-center">
        <button 
          class="uk-button uk-button-large uk-button-primary uk-margin-right uk-modal-close" 
          type="button"
        >{$_("make_whole.modal_error.ok_btn")}</button>
      </p>
    </div>
  </div>

  <div class="uk-container">
    <div class="uk-card uk-card-default uk-card-body">
      <h3 class="uk-card-title uk-text-muted uk-text-uppercase">{$_("make_whole.card.title")}</h3>
      {@html $_("make_whole.card.body")}
    </div>
    <div>
      
    </div>
    {#if credits}
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th class="uk-text-left">{$_("make_whole.table.account")}</th>
            <th class="uk-text-right">{$_("make_whole.table.amount")}</th>
            <th class="uk-text-center">{$_("make_whole.table.claim")}</th>
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
                  >{isProcessing ? $_("make_whole.claim_btn.await") : $_("make_whole.claim_btn.claim")}</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <span uk-spinner style="position:absolute; top:0px; left:0px"/>
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