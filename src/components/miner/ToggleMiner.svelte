<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { toggleMining } from '../../modules/miner_toggle'
  import { minerLoopEnabled } from '../../modules/miner'
    import { setProofPercent } from '../../modules/miner_invoke'

  let enabled: boolean
  let unsubscribe
  let looper

  onMount(async () => {
    unsubscribe = minerLoopEnabled.subscribe((boo) => (enabled = boo))
    // for safety clear the interval
    clearInterval(looper)
    looper = setInterval(() => setProofPercent(), 1000)
  })

  onDestroy(async () => {
    clearInterval(looper)
    unsubscribe && unsubscribe()
  })
</script>

<main>
  <div class="uk-text-center uk-margin" style="position: relative">
    <label class="uk-switch">
      <input type="checkbox" on:click={() => toggleMining()} checked={enabled} />
      <div class="uk-switch-slider uk-switch-on-off round" />
    </label>
  </div>
</main>
