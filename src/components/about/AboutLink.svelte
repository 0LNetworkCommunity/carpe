<script>
  import { Link } from "svelte-navigator";
  import { app_version } from "../../version";
    
  let appVersion = {};
  app_version.subscribe(v => appVersion = v)
</script>

<Link to="about" class="uk-text-muted">About - v{appVersion.version}</Link>
