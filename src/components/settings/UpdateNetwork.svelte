<script lang="ts">
  import { Link } from "svelte-navigator";
  import { onMount } from "svelte";
  import type { CarpeError } from "../../carpeError";
  import { raise_error } from "../../carpeError";

  import UIkit from "uikit";
  const invoke = window.__TAURI__.invoke;

  let upstream_url = "http://1.1.1.1:8080";
  let waypoint = "";

  // Note: the string initialized should match the enum in Rust, networks.rs, to easily de/serialize
  enum Networks {
    Mainnet = "Mainnet",
    Testnet = "Rex"
  }

  function updateNetwork() {
    // check input data
    // submit
    invoke("update_upstream", { url: upstream_url, wp: waypoint })
      .then((_) => {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Account added",
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
      })
      .catch((error) => {
        raise_error(error as CarpeError);
      });
  }

  function get() {
    // check input data
    // submit
    invoke("get_networks", {})
      .then((res) => {
        upstream_url = res.url;
        waypoint = res.waypoint;

        console.log(res);

        res;
      })
      .catch((error) => raise_error(error));
  }

  function refreshWaypoint() {
    // check input data
    // submit
    invoke("refresh_waypoint", {})
      .then((res) => {
        upstream_url = res.url;
        waypoint = res.waypoint;

        console.log(res);

        res;
      })
      .catch((error) => raise_error(error));
  }

  function toggleNetwork(network: Networks) {
    // check input data
    // submit
    invoke("toggle_network", {network: network})
      .then((res) => {
        upstream_url = res.url;
        waypoint = res.waypoint;

        console.log(res);

        res;
      })
      .catch((error) => raise_error(error));
  }
  // // TODO: is this the correct event?
  onMount(async () => {
    get();
  });
</script>

<main>
  <h3>What network</h3>
  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
      <label><input class="uk-radio" type="radio" name="radio2" checked> Mainnet </label>
      <label><input class="uk-radio" type="radio" name="radio2"> Rex (testnet) </label>
  </div>

  <h3>Advanced: Manual Network Settings</h3>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <span> URL of upstream node</span>
        <input
          class="uk-input"
          type="text"
          placeholder={upstream_url}
          bind:value={upstream_url}
        />
      </div>

      <div class="uk-margin uk-inline-block uk-width-1-1">
        <span> Waypoint </span>
        <input
          class="uk-input"
          type="text"
          placeholder={waypoint}
          bind:value={waypoint}
        />
      </div>

      <div>
        <span
          on:click={updateNetwork}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">Add</span
        >
        <Link to="/">
          <span class="uk-button uk-button-default uk-align-right">Cancel</span>
        </Link>
      </div>
    </fieldset>
  </form>

  <button class="uk-button uk-button-default" on:click={refreshWaypoint}>Fetch Waypoint</button>
</main>
