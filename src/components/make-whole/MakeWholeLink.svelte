<script>
  import { onMount } from "svelte";
  import { Link } from "svelte-navigator";
  import { makeWhole } from "../../accounts";
  import { routes } from "../../routes";

  let hasCoinsToClaim = false;
  onMount(async () => {
    makeWhole.subscribe(mk => {
      hasCoinsToClaim = mk && Object.values(mk).find(credits => credits.length > 0);
    });
  })

</script>

{#if hasCoinsToClaim}
  <Link to={routes.makeWhole}>
    <button class="uk-button uk-button-primary"> 
      <span uk-icon="icon: warning; ratio: 0.8" style="margin-right: 5px;"></span>
      Claim Coins
    </button>
  </Link>
{/if}

