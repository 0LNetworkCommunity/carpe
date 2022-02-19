<script>
  import { onMount } from "svelte";
  import { getVersion, app_version } from "../../version";
	import { isDarkMode } from '../../themes';

	let isDark;
  	isDarkMode.subscribe(value => {
  		isDark = value;
    });

  let release = {};
  onMount(async () => {
    getVersion();
    app_version.subscribe(v => release = v)
  });

</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">About</h2>
  </div>
  <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m {isDark ? 'uk-background-secondary' : 'uk-background-muted'}">
    <h3 class="uk-card-title uk-text-muted">Release</h3>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Version: </span>v{release.version}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Branch: </span>{release.head}
    </p>
    <p class="uk-text-muted">
      <span class="uk-text-bold">Commit: </span>{release.hash}
    </p>
  </div>
</main>
