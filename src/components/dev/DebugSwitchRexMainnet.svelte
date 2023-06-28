<script lang="ts">
  import { onMount } from "svelte";
  import {
    setNetwork,
    getNetwork,
    network_profile,
    NamedChain,
  } from "../../networks";

  let current_chain_id;

  onMount(async () => {
    getNetwork();
    network_profile.subscribe((n) => {
      // waypoint = n.waypoint;
      current_chain_id = n.chain_id;
    });
  });
</script>

<div class="uk-margin-medium-bottom">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Network Connection
  </h4>
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
      /> Rex (testnet)
    </label>
    <label
      ><input
        class="uk-radio"
        type="radio"
        name="networkCb"
        checked={current_chain_id == NamedChain.TESTING}
        on:click={() => setNetwork(NamedChain.TESTING)}
      /> Swarm (devnet)
    </label>
  </div>

  <!-- <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    Override The Waypoint
  </h5>
  <p>You need to know what you are doing here.</p>
  <div class="uk-margin uk-inline-block uk-width-1-1">
    <span> Waypoint </span>
    <input
      class="uk-input"
      type="text"
      placeholder={waypoint}
      bind:value={waypoint}
    />

  </div>

      <span
      on:click={updateWaypoint}
      class="uk-button uk-button-primary uk-align-right"
      id="add-btn">Override Waypoint</span
    > -->
</div>
