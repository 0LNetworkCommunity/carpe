<script>
  import { onDestroy, onMount } from 'svelte'
  import { NamedChain, network_profile, pickChainIdFromNetworkPlaylist } from '../../modules/networks'

  let isTestNet = false
  let unsubs

  onMount(async () => {
    unsubs = network_profile.subscribe((network) => {
      if (network) {
        const chain_id = pickChainIdFromNetworkPlaylist(network)
        isTestNet = chain_id == NamedChain.TESTNET
      }
    })
  })

  onDestroy(async () => {
    unsubs && unsubs()
  })
</script>

{#if !isTestNet}
  <span uk-icon="icon: user" />
{:else}
  <!-- <img alt="test network icon" src="/images/crash-test.jpg"/> -->
  <span uk-icon="icon: warning" />
  <span> TESTNET </span>
{/if}
