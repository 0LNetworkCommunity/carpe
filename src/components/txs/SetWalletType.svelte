<script lang="ts">
import { invoke } from "@tauri-apps/api/tauri";
import { responses } from "../../debug";

  function setWallet (num: number) {
    invoke("wallet_type", {typeInt: num})
      .then((res: string) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };
</script>

<main>
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Set your Account Type </h4>
  <p> Make sure you know what you are doing. This is not reversible. A slow wallet and community wallets are permanent.</p>
  <div>
    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button">Set Slow Wallet</button>
      <div uk-dropdown="mode: click">
            <p>Confirm Set Slow Wallet? This is not reversable.</p>
            <button class="uk-button uk-button-danger" on:click={() => setWallet(0)}> Set Slow </button>
      </div>
    </div>

    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button">Set Community Wallet</button>
      <div uk-dropdown="mode: click">
            <p>Confirm Set Community Wallet? This is not reversable.</p>
            <button class="uk-button uk-button-danger" on:click={() => setWallet(1)}> Set Community </button>
      </div>
    </div>


  </div>

</main>