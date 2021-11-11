<script lang="ts">
  import {
    is_initialized,
    isInit,
  } from "../../accounts";
  import { onMount } from "svelte";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import Newbie from "./Newbie.svelte";
  import List from "./List.svelte";
  UIkit.use(Icons);

  let init: boolean;

  isInit.subscribe(i => init = i);

  onMount(() => {
    is_initialized();
  });
</script>

<main class="uk-height-viewport">
  <div>
    {#if !init}
     <Newbie />
     {:else}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Wallet</h2>
      </div>
     <List />
     {/if}
  </div>
</main>
