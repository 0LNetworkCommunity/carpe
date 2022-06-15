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
    <h2 class="carpe-titles">{$_("about.about")}</h2>
  </div>
  <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-light">
    <h3>{$_("about.release")}</h3>
    <p>
      <span class="uk-text-bold">{$_("about.version")}: </span>v{release.version}
    </p>
    <p>
      <span class="uk-text-bold">{$_("about.branch")}: </span>{release.head}
    </p>
    <p>
      <span class="uk-text-bold">{$_("about.commit")}: </span>{release.hash}
    </p>
  </div>
</main>