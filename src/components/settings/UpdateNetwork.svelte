<script lang="ts">
  import { onMount } from "svelte";
  import type { CarpeError } from "../../carpeError";
  import { raise_error } from "../../carpeError";
  import { network_profile, getNetwork, refreshWaypoint } from "../../networks";
  import type { NetworkProfile} from "../../networks";
  import { invoke } from "@tauri-apps/api/tauri";
  import { notify_success } from "../../carpeNotify";
  import SetNetworkPlaylist from "./SetNetworkPlaylist.svelte";
import { _ } from "svelte-i18n";
  
  let upstream_url = "";
  let current_chain_id = "";
  
  onMount(async () => {
    getNetwork();

    network_profile.subscribe((n) => {
      upstream_url = n.urls.length == 1 ? n.urls[0] : ""; // just used to show OVERRIDE PEERS url
      current_chain_id = n.chain_id;
    });
  });

  function forceUpstream() {
    // check input data
    // submit
    invoke("force_upstream", { url: upstream_url })
      .then((res: NetworkProfile) => {
        network_profile.set(res);
        notify_success("Network Settings Updated");

      })
      .catch((error) => {
        raise_error(error as CarpeError, false, "forceUpstream");
      });
  }

</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> {$_("settings.network_settings.title")} {current_chain_id}</h4>

  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> {$_("settings.network_settings.list_of_peers")} </h5>
  <p>{$_("settings.network_settings.description")}</p>
  <SetNetworkPlaylist />
  
  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">{$_("settings.network_settings.override_peers")}</h5>
  <p>{$_("settings.network_settings.override_peers_description")}</p>

  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <span>{$_("settings.network_settings.url_of_upstream_node")}</span>
        <input
          class="uk-input"
          type="text"
          placeholder="http://1.1.1.1:8080"
          bind:value={upstream_url}
        />
      </div>

      <span
          on:click={forceUpstream}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">{$_("settings.network_settings.btn_update")}</span
        >

      <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">{$_("settings.network_settings.upstream_title")}</h5>
      <p>{$_("settings.network_settings.upstream_subtitle")}</p>
      <button class="uk-button uk-button-default" on:click={refreshWaypoint}>{$_("settings.network_settings.btn_fetch_new_waypoint")}</button>

    </fieldset>
  </form>
</main>
