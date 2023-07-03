<script>
  import { onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { Link } from 'svelte-navigator'

  import { app_version } from '../../modules/version'

  let appVersion = {}
  onMount(async () => {
    app_version.subscribe((v) => (appVersion = v))
  })
</script>

<Link to="about" class="uk-text-muted">{$_('about.about')} - v{appVersion.version}</Link>
