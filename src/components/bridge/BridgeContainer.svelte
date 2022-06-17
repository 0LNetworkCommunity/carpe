<script lang="ts">
    import { _ } from "svelte-i18n";
    import { onDestroy, onMount } from "svelte";
    import { signingAccount } from "../../accounts";
    import { bridge_tab_selected, ol_network_tokens } from "../../bridgeDetails";
    import { checkSigningAccountBalance } from "../../accountActions";
    import BridgeTabs from "./BridgeTabs.svelte";
    import BridgeNftsForm from "./BridgeNftsForm.svelte";
    import BridgeRedeemsForm from "./BridgeRedeemsForm.svelte";
    import BridgeTokenForm from "./BridgeTokenForm.svelte";
    import { printCoins } from "../../coinHelpers";

    let this_current_bridge_tab_focused;

    let account;
    let unsubs;
  
    onMount(async () => {
      unsubs = signingAccount.subscribe(obj => account = obj);

      bridge_tab_selected.subscribe(function(val){
        this_current_bridge_tab_focused = val;
      });

      ol_network_tokens.update(function(incoming){
        return {
          "ol":printCoins(account.balance),
          "eth":incoming.eth,
          "usdc":incoming.usdc
        }
      });

    });
  
    onDestroy(async () => {
      unsubs && unsubs();
    });
  
    const onSuccess = () => {
      checkSigningAccountBalance();
    }
  
  </script>
  
  <main class="carpe-bridge">
    <div class="uk-flex uk-flex-center">
      <h2 class="uk-text-light carpe-titles">{$_("bridge.title")}</h2>
    </div>
    
    <div class="uk-flex uk-flex-center">
        <p class="uk-text-muted uk-text-center">{$_("bridge.description")}</p>
    </div>

    <!-- Account info -->
    {#if account}

      <div style="display:none;">
        {window.remove_spin_loading_to_logo()}
      </div>
      
      <BridgeTabs />
      <BridgeTokenForm current_account={account} current_tab_focus={this_current_bridge_tab_focused} />
      <BridgeNftsForm current_tab_focus={this_current_bridge_tab_focused}/>
      <BridgeRedeemsForm current_tab_focus={this_current_bridge_tab_focused} />
    
    {:else}

      <div style="display:none;">
        {window.add_spin_loading_to_logo()}
      </div>

    {/if}
  </main>