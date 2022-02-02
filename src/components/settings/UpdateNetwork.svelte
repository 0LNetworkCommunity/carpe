<script lang="ts">
  import { onMount } from "svelte";
  import type { CarpeError } from "../../carpeError";
  import { raise_error } from "../../carpeError";
  import { network_profile, getNetwork, refreshWaypoint } from "../../networks";
  import type { NetworkProfile} from "../../networks";
  import { invoke } from "@tauri-apps/api/tauri";
  import { notify_success } from "../../carpeNotify";
  import SetNetworkPlaylist from "./SetNetworkPlaylist.svelte";
  
  let upstream_url = "http://1.1.1.1:8080";
  let current_chain_id = "";
  
  onMount(async () => {
    getNetwork();

    network_profile.subscribe((n) => {
      upstream_url = n.url;
      current_chain_id = n.chain_id;
    });
  });

  function updateNetwork() {
    // check input data
    // submit
    invoke("force_upstream", { url: upstream_url })
      .then((res: NetworkProfile) => {
        network_profile.set(res);
        notify_success("Network Settings Updated");

      })
      .catch((error) => {
        raise_error(error as CarpeError, false, "updateNetwork");
      });
  }

</script>

<main>
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Network Settings {current_chain_id}</h4>

  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> List of Peers</h5>
  <p>Choose a playlist of upstream nodes, so you can access the chain. Network connections will try the list in random order until a connection is made. Simply link to any playlist.json file here to update peers.</p>
  <SetNetworkPlaylist />
  
  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Override Peers</h5>
  <p>You can force using a different peer. You can only choose one peer with this setting. It will remove the playlist. This will now be a list of one element. </p>

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

      <span
          on:click={updateNetwork}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">Update</span
        >

      <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Fetch a new Waypoint from Upstream</h5>
      <p>Most waypoint issues can easily be fixed by fetching an updated one from a connected upstream peer.</p>
      <button class="uk-button uk-button-default" on:click={refreshWaypoint}>Fetch New Waypoint</button>

    </fieldset>
  </form>
</main>
