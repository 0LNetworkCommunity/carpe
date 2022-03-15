<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
import { displayInvalidProof } from "../../../carpeErrorUI";
import { _ } from "svelte-i18n";

  let display: CarpeError = null;

  onMount(async () => {
    displayInvalidProof.subscribe((ce: CarpeError) => {
      display = (ce.category? ce : null);
    });
  });
</script>

{#if display}
  <main>
    <CardError>
      <span slot="title">{$_("miner.cards.invalid_proof.title")}</span>
      <div slot="body">
        <p>
          {$_("miner.cards.invalid_proof.body")}
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
