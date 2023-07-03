<script lang="ts">
  import { onMount } from 'svelte'

export let text: string;
export let color: string = "";
export let cbAction: AsyncFunction;

let button_class = "uk-button-default";
let is_disabled = false;
let is_spinner = false;

  switch (color) {
    case "blue": {
      button_class = "uk-button-primary";
      break;
    }
      
    case "black": {
      button_class = "uk-button-secondary";
      break;
    }
      
    case "red": {
      button_class = "uk-button-danger";
      break;
    }
    default: {
      button_class = "uk-button-default";
    }
  }

const click_it = () => {
  is_spinner = true
  is_disabled = true;

  cbAction()
    .finally(() => {
      is_disabled = false;
      is_spinner = false;
    })
}

</script>

<main>
  <button class="uk-button {color ? button_class : "uk-button-default"}" 
  disabled={is_disabled}
  on:click|preventDefault={click_it}
  >
  {text}
  {#if is_spinner}
    <p uk-spinner="ratio:.5"/>
  {/if}
  </button>
</main>