<script lang="ts">
  import { minerLoopEnabled } from '../../modules/miner'
  import { toggleMining } from '../../modules/miner_toggle'

  let checking = false

  const toggle = () => {
    checking = true
    setTimeout(() => (checking = false), 1000)
    toggleMining()
  }
</script>

<main>
  <div class="uk-text-center uk-margin" style="position: relative">
    {#if !checking}
      <label class="uk-switch">
        <input type="checkbox" on:click={toggle} checked={$minerLoopEnabled} />
        <div class="uk-switch-slider uk-switch-on-off round" />
      </label>
    {:else}
      <div uk-spinner></div>
    {/if}
  </div>
</main>
