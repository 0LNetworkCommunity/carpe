<script lang="ts">
  import { onMount } from "svelte";
  import { isTowerNewbie, tower } from "../../../miner";
  import { isDarkMode } from '../../../themes';

  let actual_proofs: number;
  let newbie = false;
	let isDark;

	isDarkMode.subscribe(value => {
		isDark = value;
  });

  onMount(() => {
    tower.subscribe((t) => {
      if (t && t.on_chain) {
        actual_proofs = t.on_chain.actual_count_proofs_in_epoch;
      }
      isTowerNewbie.subscribe((n) => {
        newbie = n;
      })
    });
  });
</script>

<main>
  <div class="uk-card uk-card-default uk-card-body {isDark ? 'uk-background-secondary' : 'uk-background-muted'}">
    {#if actual_proofs >= 72}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">Whoa</h3>
      <p class="uk-text-light uk-text-muted">
        You have mined 72 proofs, the maximum number of proofs per epoch. The
        tower can keep making proofs but they will only be accepted in the next
        epoch.
      </p>
    {:else if actual_proofs >= 8}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">Success!</h3>
      <p class="uk-text-light uk-text-muted">
        Your account has submitted enough proofs today (minimum 8 proofs per
        epoch). You should receive rewards at the start of next epoch.
      </p>

      {:else if newbie}
      <!-- I don't think this view is ever accessible -->
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">No proofs sent</h3>
      <p class="uk-text-light uk-text-muted">
        There are no proofs saved to the chain. When you successfully submit your first proof, you will see some stats here.
      </p>
      {:else}
      <h3 class="uk-card-title uk-text-uppercase uk-text-light uk-text-muted">Keep it up</h3>
      <p class="uk-text-light uk-text-muted">
        Your account needs to submit at least 8 proofs per day (epoch) to
        receive a reward. You will receive the reward on the next day.
      </p>
    {/if}
  </div>
</main>
