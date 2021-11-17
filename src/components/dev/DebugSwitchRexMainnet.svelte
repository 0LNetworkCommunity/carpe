<script lang="ts">
  import { onMount } from "svelte";
  import { Networks, setNetwork, getNetwork, network_profile } from '../../networks';

  let current_chain_id = "";

  network_profile.subscribe((n) => {
      current_chain_id = n.chain_id;
  });

  onMount(async () => {
      getNetwork();
  });
</script>

<div class="uk-margin-medium-bottom">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Network Connection</h4>
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
    <label><input class="uk-radio" type="radio" name="radio2" checked={current_chain_id  == "Mainnet"} on:click={() => setNetwork(Networks.Mainnet)}> Mainnet </label>
    <label><input class="uk-radio" type="radio" name="radio2" checked={current_chain_id == "Rex"} on:click={() => setNetwork(Networks.Rex)}> Rex (testnet) </label>
  </div>
</div>
