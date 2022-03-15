<script lang="ts">
import { _ } from "svelte-i18n";

import Onboard from "./Onboard.svelte";


</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("nav.transactions")}</h2>
  </div>
  
  <Onboard/>
</main>