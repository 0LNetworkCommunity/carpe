<script lang="ts">
  import { Link, useNavigate } from "svelte-navigator";
  import { onMount } from 'svelte';

  import UIkit from "uikit";
  const invoke = window.__TAURI__.invoke;
  const navigate = useNavigate();


  let upstream_url = "http://1.1.1.1:8080";
  let base_waypoint = "";
  let address = "";


  function updateUpstream() {
    // check input data
    // submit
    invoke("update_upstream", { url: upstream_url, address: address })
      .then((_) => {
        UIkit.notification({
          message: "<span uk-icon='icon: check'></span> Account added",
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
      })
      .catch((error) => window.alert(error));
    navigate("/", { replace: true });
  }


  function getUpstream() {
    // check input data
    // submit
    invoke("get_networks", {})
      .then((res) => {
        upstream_url = res.url;
        base_waypoint = res.base_waypoint;

        console.log(res);

        res
      })
      .catch((error) => window.alert(error));
  }

    // // TODO: is this the correct event?
    onMount(async () => {
      getUpstream();
    });

</script>

<main>
  <h3> Update Network Settings </h3>

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
          placeholder={base_waypoint}
          bind:value={base_waypoint}
        />
      </div>

      <div>
        <span
          on:click={updateUpstream}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">Add</span
        >
        <Link to="/">
          <span class="uk-button uk-button-default uk-align-right">Cancel</span>
        </Link>
      </div>
    </fieldset>
  </form>  
</main>
