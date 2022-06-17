<script>
    import { onMount } from "svelte";
    import { bridge_tab_selected } from "../../bridgeDetails";
    let type_currently_selected;

    onMount(function(){
        bridge_tab_selected.subscribe(function(bridge_tab_selected_is){
            // setting initial component value to tab_selected from ../bridgeDetails
            type_currently_selected = bridge_tab_selected_is;
        });
    });
    
    function update_bridge_tab_selected_store() { 
        bridge_tab_selected.update(function(val){
            return type_currently_selected;
        });
    };

    function check_bridge_tabs(e) { 
    // Handles tab switching and assigning current type selected
        if (!e.srcElement.classList.contains("tab-selected")) {
            let these_tabs = document.querySelectorAll("#bridge-tabs .inner-tab");
            
            for (var i = 0; i < these_tabs.length; i++) {
                these_tabs[i].classList.remove("tab-selected");
            }

            type_currently_selected = e.srcElement.getAttribute("data-typeid");
            e.srcElement.classList.add("tab-selected");
            console.log(type_currently_selected);
            
            update_bridge_tab_selected_store();
        }
    }
</script>

<div class="uk-flex uk-flex-center uk-text-center uk-first-column">
    <div id="bridge-tabs" class="bridge-tabs-container">
        <div on:click={check_bridge_tabs} data-typeid="tokens" class="inner-tab {type_currently_selected == "tokens" ? "tab-selected" : ""}">Tokens</div>
        <div on:click={check_bridge_tabs} data-typeid="nfts" class="inner-tab {type_currently_selected == "nfts" ? "tab-selected" : ""}">NFTs</div>
        <div on:click={check_bridge_tabs} data-typeid="redeems" class="inner-tab {type_currently_selected == "redeems" ? "tab-selected" : ""}">Redeems</div>
    </div>
</div>
