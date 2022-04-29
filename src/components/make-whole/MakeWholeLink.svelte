<script>
  import { onDestroy, onMount } from 'svelte';
  import { Link } from "svelte-navigator";
  import { makeWhole } from "../../accounts";
  import { routes } from "../../routes";
  import { _ } from "svelte-i18n";

  let unsubs;
  let hasMakeWhole = false;
  let hasCoinsToClaim = false;
  onMount(async () => {
    unsubs = makeWhole.subscribe(mk => {
      hasMakeWhole = mk && Object.values(mk).find(credits => credits.length > 0);
      hasCoinsToClaim = mk && Object.values(mk).find(credits => credits.find(credit => !credit.claimed))
    });
  })

  onDestroy(async () => {
    unsubs && unsubs();
  })

</script>

{#if hasMakeWhole}
  <Link to={routes.makeWhole}>
    <button class="uk-button {hasCoinsToClaim ? "uk-button-primary" : "uk-button-default"}"> 
      <span uk-icon="icon: warning; ratio: 0.8" style="margin-right: 5px;"></span>
      {$_("make_whole.link_title")}
    </button>
  </Link>
{/if}

