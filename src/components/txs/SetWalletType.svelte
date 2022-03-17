<script lang="ts">
import { invoke } from "@tauri-apps/api/tauri";
import { raise_error } from "../../carpeError";
import type { CarpeError } from "../../carpeError";
import { notify_success } from "../../carpeNotify";
import { responses } from "../../debug";
import UIkit from "uikit";
import { _ } from "svelte-i18n";

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

    UIkit.dropdown(document.getElementsByClassName("send-drop")).hide(500);

    
  };
</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> {$_("txs.set_wallet_type.title")} </h4>
  
  <p> {$_("txs.set_wallet_type.subtitle")}</p>
  <div>
    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button" disabled={loading? true : false}>{$_("txs.set_wallet_type.btn_slow")}</button>
      <div class="send-drop" uk-dropdown="mode: click">
            <p>{$_("txs.set_wallet_type.confirm_slow")}</p>
            <button 
            class="uk-button uk-button-danger"
            on:click={() => setWallet(0)}
            > {$_("txs.set_wallet_type.btn_confirm_slow")} </button>
      </div>
    </div>

    <div class="uk-inline">
    <button class="uk-button uk-button-default" type="button" disabled={loading? true : false}>{$_("txs.set_wallet_type.btn_community")}</button>
      <div class="send-drop" uk-dropdown="mode: click">
            <p>{$_("txs.set_wallet_type.confirm_community")}</p>
            <button 
            class="uk-button uk-button-danger"
            on:click={() => setWallet(1)}
            > {$_("txs.set_wallet_type.btn_confirm_community")} </button>
      </div>
    </div>

      {#if loading} 
        <div class="uk-flex uk-flex-center">
          <span uk-spinner />
        </div>
      {/if}



  </div>

</main>