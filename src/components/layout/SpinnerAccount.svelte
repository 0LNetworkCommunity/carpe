<script lang="ts">
    import { isRefreshingAccounts } from "../../modules/accounts"
    import { connected } from "../../modules/networks"
</script>

  <main class="uk-padding">
    {#if $isRefreshingAccounts && $connected}
      <div style="position:relative">
        <span uk-spinner style="position:absolute; top:0; left:0" />
      </div>
    {/if}
  </main>