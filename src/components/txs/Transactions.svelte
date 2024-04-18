<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { invoke } from '@tauri-apps/api/tauri'

  import { responses } from '../../modules/debug'
  import { notify_success } from '../../modules/carpeNotify'
  import { printUnscaledCoins, printCoins, unscaledCoins } from '../../modules/coinHelpers'
  import { formatAccount, signingAccount } from '../../modules/accounts'
  import type { CarpeProfile } from '../../modules/accounts'
  import { raise_error } from '../../modules/carpeError'
  import CantStart from '../miner/cards/CantStart.svelte'

  const errorDic = {
    '120127': $_('txs.transfer.error_slow_wallet'),
    '1004': $_('txs.transfer.error_account_does_not_exist'),
  }

  let account: CarpeProfile
  let unsubs
  onMount(async () => {
    unsubs = signingAccount.subscribe((obj) => {
      account = obj
      watchOnly = obj.watch_only
    })
  })

  let receiver: string
  let amountInput: string

  let amount = 0
  let errorMessage = ''
  let waitingTxs = false
  let waitingConfirmation = false
  let watchOnly = false
  const re = /[a-fA-F0-9]{32}/i

  let isReceiverValid = true
  let isValidAmount = true
  let checkMessage = ''

  $: isReceiverValid = account && receiver && re.test(receiver) && receiver != account.account
  $: isValidAmount = account && amount > 0 && amount < unscaledCoins(account.balance.unlocked)

  $: checkMessage =
    account && amount > unscaledCoins(account.balance)
      ? $_('txs.transfer.error_amount_greater_than_balance')
      : receiver && receiver.toUpperCase() == account.account.toUpperCase()
        ? $_('txs.transfer.error_receiver_equals_sender')
        : ''

  onDestroy(async () => {
    unsubs && unsubs()
  })

  const transferCoins = async () => {
    waitingTxs = true

    return invoke('coin_transfer', {
      sender: account.account,
      receiver: receiver.trim(),
      amount: amount,
      legacy: account.account.startsWith('0'.repeat(32)),
    })
      .then((res) => {
        responses.set(JSON.stringify(res))
        notify_success($_('txs.transfer.success'))
        waitingTxs = false
        amount = 0
        receiver = null
      })
      .catch((error) => {
        responses.set(JSON.stringify(error))
        raise_error(error, false, 'coin_transfer')
        errorMessage = errorDic[error.msg]
          ? errorDic[error.msg]
          : $_('txs.transfer.failed', { values: { code: error.msg } })
        waitingTxs = false
      })
  }

  const cancelClick = () => {
    waitingConfirmation = false
  }

  const confirmClick = () => {
    waitingConfirmation = false
    transferCoins()
  }

  const handleChange = () => {
    let cleanedInput = amountInput
      .replace(/\D*/gm, '') // remove non digits
      .replace(/^0+/gm, '') // remove leading zeros

    if (cleanedInput.length === 0) {
      amount = 0
      amountInput = ''
    } else {
      amount = parseInt(cleanedInput)
      amountInput = printUnscaledCoins(amount, 0, 0)
    }
  }
</script>

<main>
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_('nav.transactions')}
    </h2>
  </div>

  {#if !$signingAccount.on_chain}
    <CantStart />
  {:else if account}
    <div>
      {#if waitingConfirmation}
        <h2 class="uk-text-muted uk-text-uppercase">
          {$_('txs.transfer.confirm_title')}
        </h2>
        <p>{$_('txs.transfer.please_confirm')}</p>
        <p class="uk-text-uppercase">
          {$_('txs.transfer.sender')}:
          <span class="uk-text-bold">{formatAccount(account.account)}</span>
        </p>
        <p class="uk-text-uppercase">
          {$_('txs.transfer.receiver')}:
          <span class="uk-text-bold">{receiver}</span>
        </p>
        <p class="uk-text-uppercase">
          {$_('txs.transfer.amount')}:
          <span class="uk-text-bold">{printUnscaledCoins(amount)}</span>
        </p>

        <p class="uk-text-right">
          <button
            on:click={cancelClick}
            class="uk-button uk-button-default uk-margin-right"
            type="button">{$_('txs.transfer.btn_cancel')}</button
          >
          <button on:click={confirmClick} class="uk-button uk-button-primary" type="button"
            >{$_('txs.transfer.btn_confirm')}</button
          >
        </p>
      {:else}
        <form id="account-form" on:submit|preventDefault={() => {}}>
          <fieldset class="uk-fieldset uk-grid-small" uk-grid>
            <div class="uk-width-3-4@s">
              <label class="uk-form-label" for="sender-text">{$_('txs.transfer.sender')} </label>
              <div>
                {formatAccount(account.account)}
              </div>
            </div>
            <div class="uk-width-1-4@s">
              <label class="uk-form-label" for="balance-text">
                {$_('txs.transfer.balance')}
              </label>
              <div>{printCoins(account.balance.unlocked)}</div>
            </div>
            <div class="uk-width-1-1">
              <label class="uk-form-label" for="receiver-text">
                {$_('txs.transfer.receiver')}
              </label>
              <div class="uk-form-controls">
                <input
                  id="receiver-text"
                  disabled={waitingTxs || watchOnly}
                  class="uk-input"
                  type="text"
                  placeholder={$_('txs.transfer.receiver_placeholder')}
                  bind:value={receiver}
                />
              </div>
            </div>
            <div class="uk-width-1-1">
              <label class="uk-form-label" for="amount-text"
                >{$_('txs.transfer.amount_label')}</label
              >
              <div class="uk-form-controls uk-width-1-1">
                <!-- add mask -->
                <input
                  id="amount-text"
                  disabled={waitingTxs || watchOnly}
                  class="uk-input"
                  type="text"
                  placeholder={$_('txs.transfer.amount_placeholder')}
                  bind:value={amountInput}
                  on:input={handleChange}
                />
              </div>
            </div>
            <p class="uk-text-warning">{checkMessage || errorMessage}</p>
            <div class="uk-width-1-1">
              <div class="uk-align-right">
                {#if waitingTxs}
                  <span uk-spinner="ratio: 0.8" style="margin: 0px 10px 0px 0px" />
                {/if}
                <button class="uk-button uk-button-default uk-modal-close uk-margin-right">
                  {waitingTxs ? $_('txs.transfer.btn_close') : $_('txs.transfer.btn_cancel')}
                </button>
                <button
                  on:click={() => (waitingConfirmation = true)}
                  disabled={waitingTxs || !isValidAmount || !isReceiverValid || watchOnly}
                  class="uk-button uk-button-primary"
                >
                  {waitingTxs ? $_('txs.transfer.await') : $_('txs.transfer.btn_next')}
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      {/if}
    </div>
  {/if}
</main>
