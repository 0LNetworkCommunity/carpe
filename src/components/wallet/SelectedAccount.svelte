<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { Profile } from "../../accounts";
  
  export let selectedAccount: Profile;

</script>

<main>
  {#if selectedAccount }
    <div class="uk-margin-large">
      <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
        <div class="uk-flex uk-flex-center">
          <div class="uk-text-lead"> {selectedAccount.balance} </div>
          <div class="uk-text-lead"> {selectedAccount.nickname} </div>
          <!-- <div> Item 1 </div> -->

      </div>
      <p class="uk-text-meta">{selectedAccount.account}</p>
      </div>
    </div>
  {/if}
</main>
