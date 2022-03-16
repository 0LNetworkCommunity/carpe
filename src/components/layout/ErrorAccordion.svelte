<script lang="ts">
import { _ } from "svelte-i18n";

  import type { CarpeError } from "../../carpeError";

  export let error: CarpeError;
</script>

<main>
  <ul uk-accordion>
    <li>
      <a class="uk-accordion-title" href={"#"}>{$_("layout.error_accordion.title")}</a>

      <div class="uk-accordion-content">
        <p>{$_("layout.error_accordion.category")} - {error.category}</p>
        <p>{$_("layout.error_accordion.id")} - {error.uid}</p>
        <p>{error.msg}</p>
      </div>
    </li>
  </ul>
</main>
