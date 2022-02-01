<script>
import { onMount } from "svelte";

  import { getNetwork, Networks, network_profile } from "../../networks";

  let isTestNet = false;
  onMount(async () => {
    getNetwork();
    network_profile.subscribe((network) => {
      isTestNet = network.chain_id == Networks.Rex;
    });
  })
</script>

{#if !isTestNet}
  <span uk-icon="icon: user"/>  
{:else}
    <!-- <img alt="test network icon" src="/images/crash-test.jpg"/> -->
  <span uk-icon="icon: warning"/>
  <span> TESTNET </span>
{/if}
