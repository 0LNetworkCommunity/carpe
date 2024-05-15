<script lang="ts">
  import UIkit from 'uikit'
  import { _ } from 'svelte-i18n'
  import { is_slow_wallet } from '../../modules/accountActions'
  import { setWalletType } from '../../modules/accountTransactions'
  import { WalletType } from '../../modules/accountTransactions'

  export let signingAccount
  let loading = false
  const setWallet = (wtype: WalletType) => {
    loading = true
    setWalletType(wtype).finally(() => {
      loading = false
    })
    UIkit.modal('.wallet-modal').hide()
  }
</script>

<main class="uk-margin">
  {#await is_slow_wallet($signingAccount.account) then res}
    {#if res}
      <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
        {$_('wallet.settings.slow_label')}
      </h4>
      <p>{$_('wallet.settings.slow_info')}</p>
    {:else if !$signingAccount.watch_only && $signingAccount.on_chain}
      <ul uk-accordion>
        <li class="uk-padding uk-box-shadow-small">
          <a
            class="uk-accordion-title uk-text-light
          uk-text-muted uk-text-thin"
            href
          >
            {$_('txs.set_wallet_type.actions_title')}
            <!-- <span uk-icon="icon: menu"
          class="uk-margin-right"></span> -->
          </a>
          <div class="uk-accordion-content">
            <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
              {$_('txs.set_wallet_type.set_slow_title')}
            </h4>
            <p>{$_('txs.set_wallet_type.subtitle')}</p>

            <div>
              <div class="uk-inline">
                <button
                  class="uk-button uk-button-default"
                  type="button"
                  uk-toggle="target: #slow"
                  disabled={loading ? true : false}
                >
                  {$_('txs.set_wallet_type.btn_slow')} ...
                </button>
              </div>
              {#if loading}
                <div class="uk-flex uk-flex-center">
                  <span uk-spinner />
                </div>
              {/if}
            </div>
          </div>
        </li>
      </ul>

      <!-- SLOW WALLET MODAL -->
      <div id="slow" uk-modal class="uk-modal-container wallet-modal uk-text-center">
        <div class="uk-modal-dialog uk-modal-body uk-padding-large">
          <h4 class="uk-modal-title uk-text-uppercase uk-text-muted">
            {$_('txs.set_wallet_type.warning')}
          </h4>
          <button class="uk-button uk-button-danger" on:click={() => setWallet(WalletType.Slow)}>
            {$_('txs.set_wallet_type.btn_confirm_slow')}
          </button>
        </div>
      </div>
    {/if}
  {/await}
</main>
