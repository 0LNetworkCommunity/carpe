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
  <h3> Set Your Wallet Type</h3>
  <p> This is not reversible. A slow wallet and community wallets are permanent.</p>
  <div>
    <button class="uk-button uk-button-default" on:click={() => setWallet(0)}> Set Slow Wallet</button>
    <button class="uk-button uk-button-default" on:click={() => setWallet(1)}> Set Community Wallet</button>
  </div>

</main>