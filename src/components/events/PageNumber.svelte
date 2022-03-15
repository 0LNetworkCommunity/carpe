<script lang="ts">
  export let number: number;
  export let current: number;
</script>


<a 
  id={"pageNumber" + number}
  on:click="{() => current = number}"
>
  <div 
    class="uk-text-center uk-align-left" 
    style="width: 20px; height: 20px; border-radius: 3px; border-radius: 3px; padding: 5px; margin: 5px; {number == current ? 'background-color: #39f; color: white;' : 'background-color: #F0F0F0;' }"
  >
    {number}
  </div>  
</a>

