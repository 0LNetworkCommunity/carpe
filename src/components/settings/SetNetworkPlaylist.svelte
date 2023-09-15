<script lang="ts">
  import { Link } from "svelte-navigator";
  import { _ } from "svelte-i18n";
  import { invoke } from "@tauri-apps/api/tauri";

  import type { CarpeError } from "../../modules/carpeError";
  import { raise_error } from "../../modules/carpeError";
  import { network_profile } from "../../modules/networks";
  import type { NetworkPlaylist} from "../../modules/networks";
  import { routes } from "../../modules/routes";
  import { notify_success } from "../../modules/carpeNotify";

  // default playlist which is provided in Carpe.
  let playlist_json_url = "https://raw.githubusercontent.com/0LNetworkCommunity/seed-peers/main/fullnode_seed_playlist.json";

  const updateNetwork = (url: string) => {
    // check input data
    // submit
    invoke("override_playlist", { url })
      .then((res: NetworkPlaylist) => {
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
        <span> {$_("settings.network_settings.playlist")} </span>
        <input
          class="uk-input"
          type="text"
          placeholder={playlist_json_url}
          bind:value={playlist_json_url}
        />
      </div>

      <div>
        <button
          on:click={updateNetwork(playlist_json_url)}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">{$_("settings.network_settings.btn_submit")}</button
        >
        <!-- <Link to={routes.home}>
          <button class="uk-button uk-button-default uk-align-right">{$_("settings.network_settings.btn_cancel")}</button>
        </Link> -->
      </div>
    </fieldset>
  </form>
</main>
