<script>
import { onMount } from "svelte";

  import { getNetwork, Networks, network_profile } from "../../networks";

  let isMainnet = true;
  onMount(async () => {
    getNetwork();
    network_profile.subscribe((network) => {
      isMainnet = network.chain_id == Networks.Mainnet;
    });
  })
</script>

{#if isMainnet}
  <span uk-icon="icon: user"/>  
{:else}
  <img alt="test network icon" src="/images/crash-test.jpg"/>
{/if}
