<style>
    .bridge-form {
        display: flex;
        flex-direction: column-reverse;
        margin-top:25px;
        border:2px solid #f5f0f0;
        width:600px;
        border-radius:30px;
      }
      .connect-title {
        text-align:center;
        color:black;
        font-size:22px;
        padding:20px 0 20px 0px;
      }
      .divider {
        width:100%;
        background-color:#f5f0f0;
        height:2px;
      }
      .chain-token-container {
        margin:10px 20px 10px 20px;
        display:flex;
        align-items:center;
        justify-content: flex-start;
        border:1px solid #f5f0f0;
        border-radius: 20px;
        cursor:pointer;
        padding-left:20px;
      }
      .chain-token-container:hover {
          background-color:#e7f9ff;
      }
      .chain-token-container img {
          width:25px;
      }
      .token-type {
        padding: 20px 10px 20px 10px;
        font-size: 18px;
        font-weight: 300;
        color: black;
      }

      .token-select-container {
        display: flex;
        flex-direction: column;
        margin-top:25px;
        border:2px solid #f5f0f0;
        width:600px;
        border-radius:30px;
      }
      .token-select-container.hide {
        display:none;
      }
      @media screen and (max-width:700px) {
        .token-select-container {
          width:100%;
        }
      }
    </style>
    
    <div class="token-select-container {incoming_token_type_container} hide">
      <div class="connect-title">Select {incoming_token_type} Token</div>
      <div class="token-divider divider"></div>
    
      <div class="selections ">
        
        {#each incoming_token_select_items as item}
          <div on:click={incoming_token_select_process} class="chain-token-container" data-type_id={item.value}>
            {@html item.icon}
            <div class="token-type" data-type_id={item.value}>{item.label}</div>
        </div>
        {/each}
    
      </div>
    </div>
    
    <script>
      export let incoming_token_type;
      export let incoming_token_type_container;
      export let incoming_token_select_items;
      export let incoming_token_select_process;
    
    </script>