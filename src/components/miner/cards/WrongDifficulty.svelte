<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
  import { displayWrongDifficulty } from "../../../carpeErrorUI";

  let display: CarpeError = null;

  onMount(async () => {
    displayWrongDifficulty.subscribe((ce: CarpeError) => {
      display = (ce.category? ce : null);
    });
  });
</script>

{#if display}
  <main>
    <CardError>
      <span slot="title">Wrong Difficulty</span>
      <div slot="body">
        <p>
          Looks like you're sending a proof with the wrong difficulty parameters to the chain.
          Check you are connected to the right network with the correct difficulty settings.
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
