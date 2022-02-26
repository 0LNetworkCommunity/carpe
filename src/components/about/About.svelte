<script>
  import { onMount } from "svelte";
  import { getVersion, app_version } from "../../version";
  import { _ } from "svelte-i18n";
  
  let release = {};
  onMount(async () => {
    getVersion();
    app_version.subscribe(v => release = v)
  });

</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("about.about")}</h2>
  </div>
  <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
    <h3 class="uk-card-title uk-text-muted">{$_("about.release")}</h3>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.version")}: </span>v{release.version}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.branch")}: </span>{release.head}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">{$_("about.commit")}: </span>{release.hash}
    </p>
  </div>
</main>