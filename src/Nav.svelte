<script lang="ts">
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import "uikit/dist/css/uikit.min.css";
    
  UIkit.use(Icons);

  window.__TAURI__.path.homeDir().then((dir) => {
    home = dir;
  });
</script>

<main>
  <a
    uk-icon="icon: table; ratio: 2"
    uk-toggle="target: #offcanvas-nav-primary"></a
  >

  <div id="offcanvas-nav-primary" uk-offcanvas="mode: push">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column">
      <span class="uk-align-center uk-text-large uk-text-light">CARPE</span>
      <ul class="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
        <li>
          <a href="#"
            ><span class="uk-margin-small-right uk-text-light" uk-icon="icon: table; ratio: 2" /> </a
          >
        </li>
        <li>
          <a href="#"
            ><span class="uk-margin-small-right uk-text-light" uk-icon="icon: thumbnails; ratio: 2" /> </a
          >
        </li>
        
        <li>
          <a href="#"
            ><span class="uk-margin-small-right uk-text-light" uk-icon="icon: trash; ratio: 2" /> </a
          >
        </li>
      </ul>
    </div>
  </div>
</main>
