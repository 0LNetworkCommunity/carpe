<script lang="ts">
  import { onMount } from "svelte";
  import { carpeErrorLog } from "../../../carpeError";
  import type { CarpeError } from "../../../carpeError";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import { _ } from "svelte-i18n";

  let result_string;
  let this_error: CarpeError;

  let test: CarpeError = {
    category: 0,
    uid: 0,
    msg: "hello",
  };

  this_error = test;
  onMount(async () => {
    carpeErrorLog.subscribe((e) => {
      result_string = "";
      if (e) {
        this_error = e[0];
      }
    });
  });
  
</script>

<main>
  <CardError>
    <span slot="title">{$_("miner.cards.oops.title")}</span>
    <div slot="body">
      <p>{$_("miner.cards.oops.body")}</p>
      <ErrorAccordion error={this_error} />
    </div>
  </CardError>
</main>
