<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { app_version } from "../../version";
  import { _ } from "svelte-i18n";
    
  let appVersion = {};
  onMount(async () => {
    app_version.subscribe(v => appVersion = v)
  });
  
</script>

<Link to="about" class="uk-text-muted">{$_("about.about")} - v{appVersion.version}</Link>
