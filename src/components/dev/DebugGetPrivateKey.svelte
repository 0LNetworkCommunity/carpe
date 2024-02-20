<script lang="ts">
  import { onMount } from 'svelte'
  import { getPrivateKey } from '../../modules/accountActions'
  import Copy from '../../components/layout/Copy.svelte'
  import { signingAccount } from '../../modules/accounts'
  import { get } from 'svelte/store'
  import { notify_success } from '../../modules/carpeNotify'
  let address = ''
  let privateKey = ''
  onMount(() => {
    const account = get(signingAccount)
    if (account) {
      address = account.account
    }
  })
  function onCopy() {
    notify_success('copy success')
  }
</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">PrivateKey</h4>
    <form id="account-form" on:submit|preventDefault={() => {}}>
      <fieldset class="uk-fieldset">
        <div class="uk-margin uk-inline-block uk-width-1-1">
          <span> Address </span>
          <input class="uk-input" type="text" placeholder={address} bind:value={address} />
        </div>
        <div>
          PrivateKey:
          {#if privateKey}
            <code class="uk-text-light">
              {privateKey.slice(0, 8) + '......' + privateKey.slice(-8)}</code>
            <Copy text={privateKey} on:copy={onCopy}></Copy>
          {/if}
        </div>
        <div>
          <button
            on:click={getPrivateKey(address, (res) => (privateKey = res))}
            class="uk-button uk-button-primary uk-align-right"
            id="add-btn">Get PrivateKey</button
          >
        </div>
      </fieldset>
    </form>
   
  </div>
</main>
