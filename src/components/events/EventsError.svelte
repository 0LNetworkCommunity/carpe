<script src="ts">
  import { _ } from "svelte-i18n";

  export let loadingError;
</script>

<main>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-text-muted">
      <h3 class="uk-card-title uk-text-uppercase uk-text-muted"> {$_("events.loading.error")} </h3>
      <div>
        <p>{loadingError}</p>
        
      </div>
    </div>
</main>