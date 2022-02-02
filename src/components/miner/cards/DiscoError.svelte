
<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import { displayDiscontinuity, displayTooManyProofs } from "../../../miner";
  import type { CarpeError } from "../../../carpeError";

  let display: CarpeError = null;

  onMount(async () => {
    displayDiscontinuity.subscribe((ce: CarpeError) => {
      display = (ce.category? ce : null);
    });
  });
</script>

{#if display}
  <main>
    <CardError>
      <span slot="title">Discontinuity</span>
      <div slot="body">
        <p>
          Looks like there's a gap in the proofs you are submitting. Each proof needs to reference the previous one, and the proof was rejected because of this.
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
