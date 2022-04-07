<script lang="ts">
  import { _ } from 'svelte-i18n';
  import UIkit from 'uikit';
  import { onDestroy, onMount } from "svelte";
  import { Link } from "svelte-navigator";
import About from '../about/About.svelte';
import AboutLink from '../about/AboutLink.svelte';

  let isProcessing = false;

  const claim = () => {
    isProcessing = true;
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
        <p>You have claimed <span class="uk-text-bold">7,500 coins</span>.</p>
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


  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Claim Your Coins</h2>
  </div>

  <div class="uk-grid-small" uk-grid>
    <div class="uk-child-width-1-1">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer venenatis turpis tortor, ac facilisis eros viverra ut. Maecenas et scelerisque est. Morbi cursus sagittis semper.</p>
    </div>
  
    <div class="uk-child-width-1-2">
      <div>
        <div class="uk-card uk-card-hover uk-card-primary uk-card-body">
          <p>You have <span class="uk-text-bold">7,500</span> coins to claim for account <span class="uk-text-bold">9fe84c81d3a9f204ccbf3958896ee2e6</span></p>
          <button 
            on:click={claim}
            disabled={isProcessing}
            class="uk-button uk-button-default"
          >{isProcessing ? "Await..." : "Claim Now"}</button>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
.success-icon{
  color: green;
  font-weight: 900;
  border-radius: 100%;
  background-color: aqua;
  padding: 10px;
}
</style>