<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { get } from 'svelte/store'
  import { carpeErrorLog, clearErrors } from '../../modules/carpeError'
  import { responses, debugModeToggle } from '../../modules/debug' // TODO: Make this read only
  import { allAccounts, canMigrate, isAccountRefreshed, isInit, isRefreshingAccounts, signingAccount } from '../../modules/accounts'
    import { connected } from '../../modules/networks'

  let result_string = ''
  let this_error = get(carpeErrorLog)

  afterUpdate(async () => {
    responses.subscribe((value) => {
      result_string = value
    })

    carpeErrorLog.subscribe((value) => {
      this_error = value
    })
  })
</script>

<main class="uk-card uk-card-default uk-card-body">
  <div class="uk-row">
    <h5 class="uk-margin-top uk-card-title uk-text-light uk-text-muted uk-text-uppercase">LOGS</h5>
  </div>

  <div>
    <div class="uk-vertical-align-middle">
      <span class="uk-margin-small-right"> ERRORS </span>
      <div class="uk-align-right">
        <button
          class="uk-margin-medium"
          uk-icon="trash"
          uk-tooltip="title: Clear Errors"
          on:click={() => clearErrors()}
        />
        <button
          uk-icon="sign-out"
          uk-tooltip="title: Exit Debug Mode"
          on:click={() => debugModeToggle()}
        />
      </div>
    </div>

    {#if this_error != undefined}
      {#each this_error as e}
        <p class="uk-text-break">
          Error ID: {e.uid} <br />
          Message: {e.msg}
          <br />
        </p>
      {/each}
    {/if}
  </div>
  <hr />
  <div>
    <p class="uk-text-break">
      {#if result_string && result_string.length !== 0}
        <span>LATEST REQUEST</span>

        <br />
        {result_string}
      {/if}
      <br />
    </p>
  </div>

  <hr />
  <p> CLIENT STATE </p>
  <ul>
      <li> is init: {$isInit}</li>
      <li> is connected: {$connected}</li>
      <li> is refreshing: {$isRefreshingAccounts}</li>
      <li> signing account: {JSON.stringify($signingAccount, null, 2)}</li>
      <li> is onchain: {$signingAccount && $signingAccount.on_chain}</li>
      <li> can migrate: {$canMigrate}</li>
      <li> is account refreshed: {$isAccountRefreshed}</li>
      <li> all accounts: {JSON.stringify($allAccounts, null, 2)}</li>
  </ul>

</main>
