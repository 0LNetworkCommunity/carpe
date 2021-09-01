<script lang="ts">
  import UIkit from "uikit";
  import Icons from "uikit/dist/js/uikit-icons";
  import Miner from "./Miner.svelte";
  import Wallet from "./Wallet.svelte";
  import Settings from "./Settings.svelte";
  import DevMode from "./DevMode.svelte";
  UIkit.use(Icons);
</script>

<main>
  <a uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav-primary" />

  <ul id="component-nav" class="uk-switcher">
    <li id="miner-panel">
      <Wallet />
    </li>
    <li id="miner-panel">
      <Miner />
    </li>
    <li id="miner-panel">
      <Settings />
    </li>
    <li id="dev-panel">
      <DevMode />
    </li>
  </ul>

  <div id="offcanvas-nav-primary" uk-offcanvas="mode: push">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column uk-offcanvas-bar-override">
      <span class="uk-align-center uk-text-large uk-text-light">CARPE</span>
      <ul
        class="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical"
        uk-switcher="connect: #component-nav"
      >
        <li>
          <a href="#">
            <span
              class="uk-margin-large-top uk-text-light"
              uk-icon="icon: credit-card; ratio: 1"
            />
          </a>
        </li>
        <li>
          <a href="#"
            ><span
              class="uk-margin-large-top uk-text-light"
              uk-switcher="connect: #miner-panel"
              uk-icon="icon: play; ratio: 1"
            />
          </a>
        </li>
        <li>
          <a href="#"
            ><span
              class="uk-margin-large-top uk-text-light"
              uk-icon="icon: settings; ratio: 1"
            />
          </a>
        </li>
        <li>
          <a href="#"
            ><span
              class="uk-margin-large-top uk-text-light"
              uk-toggle="target: #dev-panel"
              uk-icon="icon: code; ratio: 1"
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</main>
