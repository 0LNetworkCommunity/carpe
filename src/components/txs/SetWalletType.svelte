<script lang="ts">
import { invoke } from "@tauri-apps/api/tauri";
import { CarpeError, raise_error } from "../../carpeError";
import { notify_success } from "../../carpeNotify";
import { responses } from "../../debug";

  let loading = false;
  function setWallet (num: number) {
    loading = true;
    invoke("wallet_type", {typeInt: num})
      .then((res: string) => {
        loading = false;
        notify_success("Account set to Slow Wallet");
        responses.set(res);
      })
      .catch((e: CarpeError) => {
        loading = false;
        raise_error(e, false, "setWallet");
      });
  };
</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Set your Account Type </h4>
  <p> Make sure you know what you are doing. This is not reversible. Slow and Community wallets are permanent.</p>
  <div>
    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button">Set Slow Wallet</button>
      <div uk-dropdown="mode: click">
            <p>Confirm Set Slow Wallet? This is not reversable.</p>
            <button 
            class="uk-button {loading? '' : 'uk-button-danger'}"
            on:click={() => setWallet(0)}
            disabled={loading? true : false}
            > Set Slow </button>
      </div>
    </div>

    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button">Set Community Wallet</button>
      <div uk-dropdown="mode: click">
            <p>Confirm Set Community Wallet? This is not reversable.</p>
            <button 
            class="uk-button {loading? '' : 'uk-button-danger'}"
            on:click={() => setWallet(1)}
            disabled={loading? true : false}
            > Set Community </button>
      </div>
    </div>

      {#if loading} 
        <div class="uk-flex uk-flex-center">
          <span uk-spinner />
        </div>
      {/if}



  </div>

</main>