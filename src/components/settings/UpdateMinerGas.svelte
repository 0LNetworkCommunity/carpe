<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { onMount } from 'svelte'
  import { setMinerMaxGas, getMinerMaxGas, minerMaxGasUnitForTx } from '../../modules/preferences'

  onMount(() => {
    getMinerMaxGas()
  })
  let maxGasUnitForTx = 10000
  minerMaxGasUnitForTx.subscribe((v) => {
    maxGasUnitForTx = v
  })
</script>

<main>
  <form id="gas-form" on:submit|preventDefault={() => {}}>
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <span> {$_('settings.gas_setting.title')} </span>
        <input
          class="uk-input"
          type="number"
          placeholder={maxGasUnitForTx}
          bind:value={maxGasUnitForTx}
        />
      </div>

      <div>
        <button
          on:click={setMinerMaxGas(maxGasUnitForTx)}
          class="uk-button uk-button-primary uk-align-right"
          id="add-btn">{$_('settings.gas_setting.btn_confirm')}</button
        >
      </div>
    </fieldset>
  </form>
</main>
