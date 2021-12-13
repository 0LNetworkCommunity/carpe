<script lang="ts">
  import { onMount } from "svelte";
  import {
    is_initialized,
    isInit,
    isRefreshingAccounts
  } from "../../accounts";
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import Newbie from "./Newbie.svelte";
  import List from "./List.svelte";
  UIkit.use(Icons);

  let init: boolean;  
  let isRefreshing: boolean = true;
  onMount(async () => {
    isInit.subscribe(i => init = i);
    isRefreshingAccounts.subscribe(boo => isRefreshing = boo);
    is_initialized();
  });

</script>

<main class="uk-height-viewport">
  <div>
    {#if !init}
      <Newbie />
    {:else}
      <div class="uk-flex uk-flex-center">
        <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
          Wallet
          {#if isRefreshing}
            <span uk-spinner class="uk-margin-left uk-position-absolute"></span>
          {/if}
        </h2>
      </div>
      <List />
    {/if}
  </div>
</main>
