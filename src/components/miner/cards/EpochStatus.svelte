<script lang="ts">
  import { onMount } from "svelte";
  import { isTowerNewbie, tower } from "../../../miner";

  let actual_proofs: number;
  let newbie = false;
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
  <div class="uk-card uk-card-default uk-card-body">
    {#if actual_proofs >= 72}
      <h3 class="uk-card-title">Whoa</h3>
      <p>
        You have mined 72 proofs, the maximum number of proofs per epoch. The
        tower can keep making proofs but they will only be accepted in the next
        epoch.
      </p>
    {:else if actual_proofs >= 8}
      <h3 class="uk-card-title">Success!</h3>
      <p>
        Your account has submitted enough proofs today (minimum 8 proofs per
        epoch). You should receive rewards at the start of next epoch.
      </p>

      {:else if newbie}
      <h3 class="uk-card-title">No proofs sent</h3>
      <p>
        There are no proofs comitted to the chain. When you successfully submit your first proof, you will see some stats here.
      </p>
      {:else}
      <h3 class="uk-card-title">Keep it up</h3>
      <p>
        Your account needs to submit at least 8 proofs per day (epoch) to
        receive a reward. You will receive the reward on the next day.
      </p>
    {/if}
  </div>
</main>
