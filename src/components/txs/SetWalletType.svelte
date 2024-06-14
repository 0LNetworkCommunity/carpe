<script lang="ts">
  import UIkit from 'uikit';
  import { _ } from 'svelte-i18n';
  import { is_slow_wallet } from '../../modules/accountActions';
  import { setWalletType } from '../../modules/accountTransactions';
  import { WalletType } from '../../modules/accountTransactions';
  import { onMount } from 'svelte';

  export let signingAccount;
  let loading = false;
  let isSlowWallet = false;
  let confirmationModal

  onMount(() => {
    confirmationModal = UIkit.modal('#set-slow-wallet-confirmation-modal')
  })

  const checkIsSlowWallet = async () => {
    if (signingAccount && signingAccount.account) {
      isSlowWallet = await is_slow_wallet(signingAccount.account);
    }
  };

  const openSlowModal = () => {
    confirmationModal && confirmationModal.show();
  };

  const setWallet = (wtype: WalletType) => {
    loading = true;
    setWalletType(wtype)
      .finally(() => {
        loading = false;
        checkIsSlowWallet(); // Recheck the slow wallet status after setting the wallet type
        confirmationModal.hide();
      });
  };

  // Run checkIsSlowWallet when the component mounts
  onMount(() => {
    checkIsSlowWallet();
  });

  // Reactive statement to run checkIsSlowWallet when signingAccount changes
  $: signingAccount && checkIsSlowWallet();
</script>

<main class="uk-margin">
  {#if isSlowWallet}
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      {$_('wallet.settings.slow_label')}
    </h4>
    <p>{$_('wallet.settings.slow_info')}</p>
  {:else if !$signingAccount.watch_only && $signingAccount.on_chain}
    <ul uk-accordion style="background-color: white;">
      <li class="uk-padding uk-box-shadow-small">
        <a class="uk-accordion-title uk-text-light uk-text-muted uk-text-thin" href>
          {$_('txs.set_wallet_type.actions_title')}
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
                disabled={loading ? true : false}
                on:click|preventDefault={openSlowModal}
              >
                {$_('txs.set_wallet_type.btn_slow')} ...
              </button>
            </div>
            {#if loading}
              <div class="uk-flex uk-flex-center">
                <span uk-spinner></span>
              </div>
            {/if}
          </div>
        </div>
      </li>
    </ul>

    <!-- SLOW WALLET MODAL -->
    <div id="set-slow-wallet-confirmation-modal" uk-modal class="uk-modal-container">
      <div class="uk-modal-dialog uk-modal-body uk-padding-large">
        <div>
          <h2 class="uk-modal-title uk-text-uppercase uk-text-danger">
            {$_('txs.set_wallet_type.modal.title')}
          </h2>
          <h3 class="uk-text-bold">{$_("txs.set_wallet_type.modal.body.question")}</h3>
          <code class="uk-text-light">{$signingAccount.account}</code>
          <p class="uk-text-lead uk-text-warning">{$_("txs.set_wallet_type.modal.body.review_list.title")}</p>
          <ul class="uk-list uk-list-bullet uk-text-left uk-margin-top uk-margin-large-bottom">
            <li>{@html $_("txs.set_wallet_type.modal.body.review_list.item1")}</li>
            <li>{@html $_("txs.set_wallet_type.modal.body.review_list.item2")}</li>
            <li>{@html $_("txs.set_wallet_type.modal.body.review_list.item3")}</li>
          </ul>
        </div>        
        <div class="uk-margin-top uk-text-right">
          <button 
            class="uk-button uk-button-default uk-margin-right uk-modal-close"
            disabled={loading}
          >
          {$_("txs.set_wallet_type.modal.btn_cancel")}
          </button>
          <button 
            class="uk-button uk-button-danger" 
            disabled={loading}
            on:click={() => setWallet(WalletType.Slow)}
          >
            {$_('txs.set_wallet_type.modal.btn_confirm')}
          </button>
        </div>
      </div>
    </div>
  {/if}
</main>
