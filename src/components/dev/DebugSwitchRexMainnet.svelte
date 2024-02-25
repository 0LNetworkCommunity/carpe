<script lang="ts">
  import { onMount } from 'svelte'
  import { setNetwork, getNetwork, network_profile, NamedChain, pickChainIdFromNetworkPlaylist } from '../../modules/networks'

  let current_chain_id

  onMount(async () => {
    getNetwork()
    network_profile.subscribe((n) => {
      if (n) {
        current_chain_id = pickChainIdFromNetworkPlaylist(n)
      }
    })
  })
</script>

<div class="uk-margin-medium-bottom">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Network Connection</h4>
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    <label
      ><input
        class="uk-radio"
        type="radio"
        name="networkCb"
        checked={current_chain_id == NamedChain.MAINNET}
        on:click={() => setNetwork(NamedChain.MAINNET)}
      /> Mainnet
    </label>
    <label
      ><input
        class="uk-radio"
        type="radio"
        name="networkCb"
        checked={current_chain_id == NamedChain.TESTNET}
        on:click={() => setNetwork(NamedChain.TESTNET)}
      /> Testnet (Rex)
    </label>
    <label
      ><input
        class="uk-radio"
        type="radio"
        name="networkCb"
        checked={current_chain_id == NamedChain.TESTING}
        on:click={() => setNetwork(NamedChain.TESTING)}
      /> Local Node
    </label>
  </div>
</div>
