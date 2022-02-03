<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
import { displayInvalidProof } from "../../../carpeErrorUI";

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
      <span slot="title">Cannot Verify Proof</span>
      <div slot="body">
        <p>
          Weird. This proof was rejected because it is not a valid "delay proof". This is usually because parameters are not set correctly.
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
