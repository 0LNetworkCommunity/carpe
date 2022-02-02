<script lang="ts">
  import { onMount } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import { displayTooManyProofs } from "../../../miner";
  import type { CarpeError } from "../../../carpeError";

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
      <span slot="title">Too Many Proofs</span>
      <div slot="body">
        <p>
          Looks like you've sent more proofs than expected during the last 24 hours.
          The chain expects a max {maxNum} proofs during each epoch. On the next epoch your proofs will begin to be submitted again.
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
