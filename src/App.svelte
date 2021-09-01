<script lang="ts">
  import "uikit/dist/css/uikit.min.css";
  import Layout from "./components/Layout.svelte";

  // TODO: need this?
  // window.__TAURI__.path.homeDir().then((dir) => {
  //   home = dir;
  // });

</script>

<main>
  <div class="uk-container uk-container-expand uk-margin-top">
    <Layout />
  </div>
</main>
