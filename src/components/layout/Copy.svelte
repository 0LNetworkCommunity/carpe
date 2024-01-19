<script lang="ts">
  import { copyToClipboard } from '@svelte-put/copy'

  export let text: string

  let icon = 'copy'
  const copyThis = () => {
    icon = 'check'
    copyToClipboard(text)
    setTimeout(() => {
      icon = 'copy'
    }, 3000)
  }
</script>

<button class="uk-icon-link uk-margin-small-right" uk-icon={icon} on:click={copyThis} />
