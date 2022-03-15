<script lang="ts">
  export let number: number;
  export let index: number;
</script>

<a id={"pageIndex" + number} on:click="{() => index = number}">
  <div class="uk-text-center uk-align-left page-index {number == index ? 'page-index-selected' : 'page-index-not-selected' }" >
    {number}
  </div>  
</a>

<style>
  .page-index {
    min-width: 20px; 
    height: 20px; 
    border-radius: 3px; 
    padding: 5px; 
    margin: 0px;
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
