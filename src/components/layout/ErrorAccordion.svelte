<script lang="ts">
  import type { CarpeError } from "../../carpeError";

  export let error: CarpeError;
</script>

<main>
  <ul uk-accordion>
    <li>
      <a class="uk-accordion-title" href={"#"}> Error Report</a>

      <div class="uk-accordion-content">
        <p>Error Category - {error.category}</p>
        <p>Id - {error.uid}</p>
        <p>{error.msg}</p>
      </div>
    </li>
  </ul>
</main>
