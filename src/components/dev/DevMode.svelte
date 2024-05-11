<script lang="ts">
  import { onMount } from 'svelte'

  import { debugMode } from '../../modules/debug'

  import DebugCard from './DebugCard.svelte'
  // import DebugActions from './DebugActions.svelte'
  // import DebugSwitchProdTest from './DebugSwitchProdTest.svelte'
  import DebugSwitchRexMainnet from './DebugSwitchRexMainnet.svelte'
  import DebugSwitcher from './DebugSwitcher.svelte'
  import DebugPaths from './DebugPaths.svelte'
  import DebugNetworkInfo from './DebugNetworkInfo.svelte'
  import DebugGetPrivateKey from './DebugGetPrivateKey.svelte'
  let debugEnabled = false
  onMount(async () => {
    debugMode.subscribe((b) => (debugEnabled = b))
  })
</script>

<main class="uk-height-viewport">
  <div class="uk-margin uk-container uk-dark" style="margin-bottom: 280px">
    <p class="uk-margin-bottom"><DebugSwitcher /> Turn on debug view on all screens</p>

    <DebugNetworkInfo />
    <DebugPaths />
    <DebugSwitchRexMainnet />
    <!-- <DebugSwitchProdTest /> -->
    <!-- <DebugActions /> -->
    <DebugGetPrivateKey />
    {#if !debugEnabled}
      <DebugCard />
    {/if}
  </div>
</main>
