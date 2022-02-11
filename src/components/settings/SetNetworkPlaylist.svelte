<script lang="ts">
  import { Link } from "svelte-navigator";
  import type { CarpeError } from "../../carpeError";
  import { raise_error } from "../../carpeError";
  import { network_profile, refreshWaypoint } from "../../networks";
  import type { NetworkProfile} from "../../networks";
  import { invoke } from "@tauri-apps/api/tauri";
  import { routes } from "../../routes";
  import { notify_success } from "../../carpeNotify";

  // default playlist which is provided in Carpe.
  let playlist_json_url = "https://raw.githubusercontent.com/OLSF/seed-peers/main/fullnode_seed_playlist.json";

  function updateNetwork() {
    // check input data
    // submit
    invoke("update_from_playlist", { url: playlist_json_url })
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
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <span> Update Playlist of Network Servers</span>
        <input
          class="uk-input"
          type="text"
          placeholder={playlist_json_url}
          bind:value={playlist_json_url}
        />
      </div>

      <div>
        <span
          on:click={updateNetwork}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">Use Playlist</span
        >
        <Link to={routes.home}>
          <span class="uk-button uk-button-default uk-align-right">Cancel</span>
        </Link>
      </div>
    </fieldset>
  </form>
</main>
