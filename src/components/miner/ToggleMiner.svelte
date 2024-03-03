<script lang="ts">
  import { minerLoopEnabled } from '../../modules/miner'
  import { toggleMining } from '../../modules/miner_toggle'
  import { signingAccount } from '../../modules/accounts';
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
        <input type="checkbox" on:click={toggle} checked={$minerLoopEnabled}  disabled={$signingAccount.watch_only}/>
        <div class="uk-switch-slider uk-switch-on-off round" />
      </label>
    {:else}
      <div uk-spinner></div>
    {/if}
  </div>
</main>
