<script>
  import { Networks, network_profile } from "../../networks";

  let isMainnet = true;
  network_profile.subscribe((network) => {
    isMainnet = Networks.Mainnet == network.chain_id;
  });
</script>

{#if isMainnet}
  <span uk-icon="icon: user" class="uk-margin-small-right"/>
{:else}
  <img alt="test network icon" class="uk-margin-small-right" src="/images/crash-test.jpg"/>
{/if}
