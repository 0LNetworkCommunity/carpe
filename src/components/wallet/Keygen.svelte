<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { invoke } from '@tauri-apps/api/tauri'
  import { tempCreateAccount } from '../../modules/accounts'
  import type { CarpeProfile } from '../../modules/accounts'
  // import { minerLoopEnabled } from '../../modules/miner'

  import { raise_error } from '../../modules/carpeError'
  import { responses } from '../../modules/debug'
  import AccountFromMnemSubmit from './AccountFromMnemSubmit.svelte'
  import { onDestroy } from 'svelte'
  // import { get } from 'svelte/store'

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
        res.mnem = null
        responses.set(JSON.stringify(res))
        tempCreateAccount.set(res.entry)
        hide = false
      })
      .catch((e) => raise_error(e, true, 'do_keygen'))
  }

  onDestroy(() => {
    tempDangerDisplayMnem = null
    tempCreateAccount.set(null)
  })
</script>

<main>
  <!-- <div class="uk-flex uk-flex-center">
    <h3 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_('wallet.keygen.title')}
    </h3>
  </div> -->

  {#if $tempCreateAccount && $tempCreateAccount.account && !hide}
    <div class="uk-margin uk-card uk-card-default uk-card-body uk-text-muted">
      <h5 class="uk-text-muted uk-text-uppercase">{$_('wallet.keygen.account_address')}</h5>
      <p class="uk-text-emphasis uk-text-uppercase">{$tempCreateAccount.account}</p>

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
    <div class="uk-card uk-card-default uk-align-center uk-width-1-2@m">
      <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom uk-text-muted uk-text-uppercase">
              {$_('wallet.keygen.title')}
            </h3>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <p>{$_('wallet.keygen.description')}</p>
      </div>
      <div class="uk-card-footer">
        <button class="uk-button uk-button-secondary" on:click={do_keygen}
          >{$_('wallet.keygen.btn_generate_keys')}</button
        >
      </div>
    </div>

    <!-- <div class="uk-card uk-card-default uk-card-body">
      <div class="uk-flex uk-child-width-1-2">
        <div class=" uk-margin-left">
          <h3 class="uk-text-light uk-text-muted uk-text">
            {$_('wallet.keygen.description')}
          </h3>
        </div>

        <div class="uk-align-center">
          <button class="uk-button uk-button-secondary" on:click={do_keygen}>
            {$_('wallet.keygen.btn_generate_keys')}
          </button>
        </div>
      </div>
    </div> -->
  {/if}
</main>
