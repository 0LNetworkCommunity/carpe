<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { makeWhole } from "../../accounts";
  import { routes } from "../../routes";

  let hasMakeWhole = false;
  let hasCoinsToClaim = false;
  onMount(async () => {
    makeWhole.subscribe(mk => {
      hasMakeWhole = mk && Object.values(mk).find(credits => credits.length > 0);
      hasCoinsToClaim = mk && Object.values(mk).find(credits => credits.find(credit => !credit.claimed))
    });
  })

</script>

{#if hasMakeWhole}
  <Link to={routes.makeWhole}>
    <button class="uk-button {hasCoinsToClaim ? "uk-button-primary" : "uk-button-default"}"> 
      <span uk-icon="icon: warning; ratio: 0.8" style="margin-right: 5px;"></span>
      Claim Coins
    </button>
  </Link>
{/if}

