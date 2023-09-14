<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { invoke } from '@tauri-apps/api/tauri'
  import { signingAccount } from '../../modules/accounts'
  import type { CarpeProfile } from '../../modules/accounts'
  import { raise_error } from '../../modules/carpeError'
  import { responses } from '../../modules/debug'
  import AccountFromMnemSubmit from './AccountFromMnemSubmit.svelte'

  interface NewKeygen {
    entry: CarpeProfile
    mnem: string
  }

  let tempDangerDisplayMnem: string

  let hide = true
  const do_keygen = async () => {
    invoke('keygen', {})
      .then((res: NewKeygen) => {
        tempDangerDisplayMnem = res.mnem
        res.mnem = null;
        responses.set(JSON.stringify(res))
        signingAccount.set(res.entry)
        hide = false
      })
      .catch((e) => raise_error(e, true, 'do_keygen'))
  }
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h3 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_('wallet.keygen.title')}
    </h3>
  </div>

  {#if $signingAccount.account && !hide}
    <div class="uk-margin uk-card uk-card-default uk-card-body uk-text-muted">
      <h5 class="uk-text-muted uk-text-uppercase">{$_('wallet.keygen.account_address')}</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{$signingAccount.account}</p>


      <h5 class="uk-text-muted uk-text-uppercase uk-text-danger">
        {$_('wallet.keygen.securite_recovery_phrase')}
      </h5>
      <p class="uk-text-danger">
        {$_('wallet.keygen.securite_note')}
      </p>
      <div class="uk-margin">
        <textarea class="uk-textarea" rows="3" readonly>{tempDangerDisplayMnem}</textarea>
      </div>
    </div>

    <div>
      <p>
        {$_('wallet.keygen.account_tips')}
      </p>
    </div>

    <div>
      <AccountFromMnemSubmit formDangerMnem={tempDangerDisplayMnem} />

      <button class="uk-button uk-button-default uk-align-right" on:click={do_keygen}>
        {$_('wallet.keygen.btn_generate_keys_2')}
      </button>
    </div>
  {:else}
    <div class="uk-flex uk-flex-center">
      <h3 class="uk-text-light uk-text-muted uk-text-center">
        {$_('wallet.keygen.description')}
      </h3>
    </div>

    <div class="uk-position-center">
      <button class="uk-button uk-button-secondary uk-align-right" on:click={do_keygen}>
        {$_('wallet.keygen.btn_generate_keys')}
      </button>
    </div>
  {/if}
</main>
