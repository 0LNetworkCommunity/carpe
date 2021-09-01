<script lang="ts">

  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  import "uikit/dist/css/uikit.min.css";
  import Nav from "./Nav.svelte";
  import DevMode from "./DevMode.svelte";

</script>

<main>
  <div class="uk-container uk-container-expand uk-margin ">
    <Nav />
    <DevMode />
  </div>
</main>
