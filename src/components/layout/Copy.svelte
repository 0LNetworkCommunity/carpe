<script lang="ts">
  import { copyToClipboard } from '@svelte-put/copy'
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher();
  export let text: string

  let icon = 'copy'
  const copyThis = () => {
    icon = 'check'
    copyToClipboard(text).then(() => {
      dispatch('copy')
    })
    setTimeout(() => {
      icon = 'copy'
    }, 3000)
  }
</script>

<button class="uk-icon-link uk-margin-small-right" uk-icon={icon} on:click|stopPropagation={copyThis} />
