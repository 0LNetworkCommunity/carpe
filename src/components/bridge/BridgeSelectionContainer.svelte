<style>
    .chain-type-selection-container {
        padding-top:30px;
    }
    .chain-type-selection-container.hide {
        display: none;
    }
    .chain-type-selection-container .label-inner {
        padding-bottom:0;
    }
    .chain-type-selection-container input {
        margin-top:20px;
        padding:18px 18px 18px 18px;
        border-radius: 10px;
        border:1px solid lightgray;
        width: calc(100% - 65px);
        font-size:18px;
        color:black;
        font-weight: 600;
    }
    .label-inner {
        padding:0;
        font-size:16px;
        font-weight: 600;
        text-align: left;
      }
    
      .estimations {
        color:#888888;
        display:flex;
        align-items:center;
        justify-content: flex-start;
        font-size:14px;
        margin:12px 0 12px 0;
      }
      .chain-type-selection-container .err {
        color:rgb(255, 52, 52);
      }
      .chain-type-selection-container {
        --borderRadius: 10px;
        --itemIsActiveBG: #e7f9ff;
        --itemHoverColor: black;
        --itemHoverBG: #e7f9ff;
        --itemIsActiveColor: black;
        --background:#dadada;
        --inputFontSize: 18px;
        --height:44px;
        --hover:red;
        --border:1px solid transparent;
        --indicatorTop:13px;
        --indicatorRight:8px;
        --border:none;
        --placeholderColor:black;
        --indicatorColor:black;
      }
      .select-token-type {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#dadada;
        padding:10px 5px 10px 5px;
        border-radius: 10px;
        width:130px;
        position: absolute;
        left: calc(100% - 130px - 43px);
        top:26px;
        z-index: 1;
        cursor: pointer;
      }
      .select-token-type:hover {
        background-color:#e7f9ff;
      }
    
    </style>
    <div class="chain-type-selection-container hide {selection_container_type}">
    
        {#if is_enabled}
    
            <div class="label-inner">Asset</div>
            <div style="position:relative;">
              <input on:input={handle_this_type_input} type="text" placeholder="0.00">
              <MaxButton this_max_button_process={(e) => incoming_max_button_process(e)} current_type={select_maximum_type}/>
              <div on:click={handle_this_token_display_select} class="{select_token_title} select-token-type">Select Token <Chevron /></div>
    
              <div class="asset-estimations">
                  <div class="estimations">~$0.00</div>
                  <div class="estimations {selection_container_available_balance}">Available balance: ---</div>
              </div>
            </div>
    
        {:else}
    
            <div class="label-inner label-asset err">{is_false_message}</div>
            
        {/if}
      </div>
    
    <script>
        export let selection_container_type;
        export let select_maximum_type;
        export let is_enabled;
        export let incoming_max_button_process;
        export let handle_this_type_input;
        export let selection_container_available_balance;
        export let handle_this_token_display_select;
        export let select_token_title;
    
        export let is_false_message = "This network support is coming soon!";
        import MaxButton from './MaxButton.svelte';
        import Chevron from './ChevronAsset.svelte';    
    
    </script>