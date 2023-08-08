<script>
  import { onDestroy, onMount } from 'svelte'
  import { Link } from 'svelte-navigator'

  import { _ } from 'svelte-i18n'
  import { makeWhole } from '../../modules/accounts'
  import { routes } from '../../modules/routes'

  let unsubs
  let hasMakeWhole = false
  let hasCoinsToClaim = false
  onMount(async () => {
    unsubs = makeWhole.subscribe((mk) => {
      hasMakeWhole = mk && Object.values(mk).find((credits) => credits.length > 0)
      hasCoinsToClaim =
        mk && Object.values(mk).find((credits) => credits.find((credit) => !credit.claimed))
    })
  })

  onDestroy(async () => {
    unsubs && unsubs()
  })
</script>

{#if hasMakeWhole}
  <Link to={routes.makeWhole}>
    <button class="uk-button {hasCoinsToClaim ? 'uk-button-primary' : 'uk-button-default'}">
      <span uk-icon="icon: warning; ratio: 0.8" style="margin-right: 5px;" />
      {$_('make_whole.link_title')}
    </button>
  </Link>
{/if}
