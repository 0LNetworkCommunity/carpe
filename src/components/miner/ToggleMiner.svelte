<script lang="ts">
  import { minerLoopEnabled } from '../../modules/miner'
  import { toggleMining } from '../../modules/miner_toggle'
</script>

<main>
  <div class="uk-text-center uk-margin" style="position: relative">
    <label class="uk-switch">
      <input type="checkbox" on:click={() => toggleMining()} checked={$minerLoopEnabled} />
      <div class="uk-switch-slider uk-switch-on-off round" />
    </label>
  </div>
</main>
