<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
  import { displayInvalidProof } from "../../../carpeErrorUI";
  import { _ } from "svelte-i18n";

  let display: CarpeError = null;
  let unsubs;

  onMount(async () => {
    unsubs = displayInvalidProof.subscribe((ce: CarpeError) => {
      display = (ce.category? ce : null);
    });
  });

  onDestroy(async () => {
    unsubs && unsubs();
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
