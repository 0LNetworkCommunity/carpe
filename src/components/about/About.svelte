<script>
  import { app_version } from "../../version";
  
  let release = {};
  app_version.subscribe(v => release = v)
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">About</h2>
  </div>
  <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
    <h3 class="uk-card-title uk-text-muted">Release</h3>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Version: </span>v{release.version}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Branch: </span>v{release.head}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Commit: </span>v{release.hash}
    </p>
  </div>
</main>