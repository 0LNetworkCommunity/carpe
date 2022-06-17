<script>
  import { _ } from "svelte-i18n";
  export let current_tab_focus;
</script>

<div class="uk-text-center carpe-card {current_tab_focus=="nfts" ? "" : "hide"}">
  <div class="uk-section">
    <h4 class="uk-text-muted">
      <span>{$_("bridge.nfts")}</span>
    </h4>
  </div>
</div>