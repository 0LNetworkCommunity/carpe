<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { getPrivateKey } from '../../modules/accountActions';
  import Copy from '../layout/Copy.svelte';
  import { signingAccount } from '../../modules/accounts';
  import { get } from 'svelte/store';
  import { notify_success } from '../../modules/carpeNotify';

  let address = '';
  let privateKey = '';

  onMount(() => {
    const account = get(signingAccount);
    if (account) {
      address = account.account;
    }
  });

  function onCopy() {
    notify_success('copy success');
  }

  function hidePrivateKey() {
    privateKey = '';
    navigator.clipboard.writeText('');
  }

  onDestroy(() => {
    privateKey = '';
  });
</script>

<main class="uk-card uk-card-default uk-card-body  uk-height-1-1" style="height: 280px;">
  <div class="uk-flex uk-flex-column uk-height-1-1">
    <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Private Key</h5>
    <p style="margin:0px">Recover your account private key:</p>
    <div class="uk-flex-1 uk-flex uk-flex-column uk-flex-center">
      <div class="uk-flex uk-flex-center">
        {#if privateKey}
          <code class="uk-text-light">
            {privateKey.slice(0, 8) + '......' + privateKey.slice(-8)}
          </code>
          <Copy text={privateKey} on:copy={onCopy}></Copy>
        {:else}
          <code class="uk-text-light">*******...*******</code>
        {/if}
      </div>
    </div>
    <div class="uk-flex uk-flex-bottom uk-flex-right">
      {#if privateKey}
        <button
          on:click={hidePrivateKey}
          class="uk-button uk-button-default"
          id="add-btn"
          style="margin: 0.5rem 0rem;"
        >
          Hide PrivateKey
        </button>
      {:else}
        <button
          on:click={() => getPrivateKey(address, (res) => (privateKey = res))}
          class="uk-button uk-button-primary"
          id="add-btn"
          style="margin: 0.5rem 0rem;"
        >
          Get PrivateKey
        </button>
      {/if}
      
    </div>
  </div>
</main>

<style>
  .uk-flex-1 {
    flex: 1;
  }

  .uk-flex-right {
    justify-content: flex-end;
  }

  .uk-flex-bottom {
    align-items: flex-end;
  }
</style>
