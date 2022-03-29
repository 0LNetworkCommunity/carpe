<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onMount, onDestroy } from "svelte";
  import ErrorAccordion from "../../layout/ErrorAccordion.svelte";
  import CardError from "../../layout/CardError.svelte";
  import type { CarpeError } from "../../../carpeError";
  import { displayWrongDifficulty } from "../../../carpeErrorUI";

  let unsubs;
  let display: CarpeError = null;

  onMount(async () => {
    unsubs = displayWrongDifficulty.subscribe((ce: CarpeError) => {
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
      <span slot="title">{$_("miner.cards.wrong_difficulty.title")}</span>
      <div slot="body">
        <p>
          {$_("miner.cards.wrong_difficulty.body")}
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
