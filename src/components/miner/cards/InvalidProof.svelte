<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  import type { CarpeError } from "../../../modules/carpeError";
  import { displayInvalidProof } from "../../../modules/carpeErrorUI";

  import CardError from "../../layout/CardError.svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";


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
