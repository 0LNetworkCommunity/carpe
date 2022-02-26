<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
  import { displayTooManyProofs } from "../../../carpeErrorUI";
import { _ } from "svelte-i18n";

  let display: CarpeError = null;

  let maxNum = 72; // TODO: this someday needs to be dynamic.

  onMount(async () => {
    displayTooManyProofs.subscribe((ce: CarpeError) => {
      display = (ce.category? ce : null);
    });
  });
</script>

{#if display}
  <main>
    <CardError>
      <span slot="title">{$_("miner.cards.too_many_proofs.title")}</span>
      <div slot="body">
        <p>
          {$_("miner.cards.too_many_proofs.body", { values : { maxNum }} )}
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
