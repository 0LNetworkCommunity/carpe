<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { invoke } from "@tauri-apps/api/tauri";

  import type { CarpeError } from "../../modules/carpeError";
  import { raise_error } from "../../modules/carpeError";
  import {
    network_profile,
    getNetwork,
    synced_fullnodes,
    refreshUpstreamPeerStats,
    pickChainIdFromNetworkPlaylist,
  } from "../../modules/networks";
  import type { NetworkPlaylist } from "../../modules/networks";
  import { notify_success } from "../../modules/carpeNotify";

  import SetNetworkPlaylist from "./SetNetworkPlaylist.svelte";

  let upstream_url = "";
  let current_chain_id = "";

  onMount(async () => {
    getNetwork();

    network_profile.subscribe((n: NetworkPlaylist) => {
      if (n) {
        upstream_url = n.nodes.length == 1 ? n.nodes[0].url : ""; // just used to show OVERRIDE PEERS url
        current_chain_id = pickChainIdFromNetworkPlaylist(n);
      }

    });
  });

  let peers: string[];
  synced_fullnodes.subscribe((n) => {
    peers = n;
  });

  const check_sync = () => {
    refreshUpstreamPeerStats().then(() => {
      notify_success("Refreshed Fullnode Statistics");
    });
  };

  const forceUpstream = () => {
    invoke("force_upstream", { url: upstream_url })
      .then((res: NetworkPlaylist) => {
        network_profile.set(res);
        notify_success("Network Settings Updated");
      })
      .catch((error) => {
        raise_error(error as CarpeError, false, "forceUpstream");
      });
  };

</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("settings.network_settings.title")}
    {current_chain_id}
  </h4>

  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("settings.network_settings.synced_peers")}
  </h5>

  {#if peers }
    {#each peers as url}
      <p>{url}</p>
    {/each}
  {/if}

  <button
    class="uk-button uk-button-primary uk-align-right"
    on:click={check_sync}
  >
    {$_("settings.network_settings.refresh_peers_button")}
  </button>

  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("settings.network_settings.list_of_peers")}
  </h5>
  <p>{$_("settings.network_settings.description")}</p>
  <SetNetworkPlaylist />

  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_("settings.network_settings.override_peers")}
  </h5>
  <p>{$_("settings.network_settings.override_peers_description")}</p>

  <form id="account-form" on:submit|preventDefault={() => {}}>
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

      <button
        on:click={forceUpstream}
        class="uk-button uk-button-primary uk-align-right"
        id="add-btn">{$_("settings.network_settings.btn_update")}</button
      >

      <!-- <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
        {$_("settings.network_settings.upstream_title")}
      </h5>
      <p>{$_("settings.network_settings.upstream_subtitle")}</p> -->
      <!-- <button class="uk-button uk-button-default" on:click={refreshWaypoint}>{$_("settings.network_settings.btn_fetch_new_waypoint")}</button> -->
    </fieldset>
  </form>
</main>
