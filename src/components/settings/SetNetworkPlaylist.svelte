<script lang="ts">
  import { _ } from "svelte-i18n";

  import { updateNetwork, playlistJsonUrl } from "../../modules/networks";
  let playlist_json_url = playlistJsonUrl;
</script>

<main>
  <form id="account-form" on:submit|preventDefault={() => {}}>
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
