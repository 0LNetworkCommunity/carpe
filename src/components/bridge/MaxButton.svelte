<style>
    .select-maximum-type {
        display: flex;
        align-items: center;
        justify-content: center;
        color:white;
        background-color:#ff5958;
        padding:7px;
        border-radius: 10px;
        width:60px;
        position: absolute;
        left: calc(100% - 250px);
        top:30px;
        z-index: 1;
        cursor: pointer;
      }
    
      .select-maximum-type:hover {
        opacity: 0.8;
      }
    
      @media screen and (max-width:960px) {
    
      }
      
    </style>
    
    <script>
        export let current_type;
        export let this_max_button_process;
    </script>
    
    <div on:click={this_max_button_process} class="select-maximum-type {current_type}">Max</div>
    