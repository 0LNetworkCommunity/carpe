<script lang="ts">
  import { errors } from "../../carpeError";
  import CardWarn from "../layout/CardWarn.svelte";
  let result_string;
  let this_error;

  errors.subscribe((value) => {
    result_string = "";
    if (value != undefined) {
      this_error = value;
    }
  });
</script>

<main>
  <CardWarn>
    <span slot="title">Hello World!</span>
    <div slot="body">
      <p>Looks like there's an error with mining a delay proof.</p>
      <ul uk-accordion>
        <li class="uk-open">
          <a class="uk-accordion-title" href={"#"}>Error Details</a>
          {this_error}
        </li>
      </ul>
    </div>
  </CardWarn>
</main>
