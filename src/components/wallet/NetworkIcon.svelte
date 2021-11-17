<script>
  import { Networks, network_profile } from "../../networks";

  let isRex = false;
  network_profile.subscribe((network) => {
    isRex = Networks.Rex == network.chain_id;
  });
</script>

{#if isRex}
  <img alt="test network icon" src="/images/crash-test.jpg"/>
{:else}
  <span uk-icon="icon: user"/>  
{/if}
