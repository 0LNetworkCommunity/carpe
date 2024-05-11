<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'

  import type { CarpeError } from '../../../modules/carpeError'
  import { displayDiscontinuity } from '../../../modules/carpeErrorUI'

  import CardError from '../../layout/CardError.svelte'
  import ErrorAccordion from '../../layout/ErrorAccordion.svelte'

  let display: CarpeError = null
  let unsubs

  onMount(async () => {
    unsubs = displayDiscontinuity.subscribe((ce: CarpeError) => {
      display = ce.category ? ce : null
    })
  })

  onDestroy(async () => {
    unsubs && unsubs()
  })
</script>

{#if display}
  <main>
    <CardError>
      <span slot="title">{$_('miner.cards.disco_error.title')} </span>
      <div slot="body">
        <p>
          {$_('miner.cards.disco_error.body')}
        </p>
        <ErrorAccordion error={display} />
      </div>
    </CardError>
  </main>
{/if}
