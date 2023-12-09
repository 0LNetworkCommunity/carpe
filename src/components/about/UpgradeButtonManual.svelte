<script lang="ts">
  import { tryUpdate } from '../../modules/updater'
</script>

<main>
  <button class="uk-button uk-button-default" on:click={tryUpdate}>Check For
  Update</button>
</main>
