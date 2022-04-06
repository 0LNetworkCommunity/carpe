<script lang="ts">
  export let number: number;
  export let index: number;
</script>

<a id={"pageIndex" + number} class="uk-align-left page-index-link" on:click="{() => index = number}">
  <div class="uk-text-center page-index {number == index ? 'page-index-selected' : 'page-index-not-selected' }" >
    <span class="page-index-number">{number}</span>
  </div>  
</a>

<style>
  .page-index-link {
    display: grid;
    margin: 0px;
  }
  .page-index-number {
    vertical-align: middle;
    line-height: normal;
  }
  .page-index {
    display: table;
    line-height: 20px !important;
    min-width: 20px; 
    height: 20px; 
    border-radius: 3px; 
    padding: 5px; 
    margin: 0px;
    vertical-align: middle;
  }
  .page-index-selected {
    background-color: #39f; 
    color: white;
  }
  .page-index-not-selected {
    background-color: #F0F0F0; 
    color: grey;
  }
</style>
