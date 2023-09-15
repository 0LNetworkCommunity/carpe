<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { Link } from 'svelte-navigator'

  import { signingAccount, allAccounts } from '../../modules/accounts'
  import { setAccount } from '../../modules/accountActions'

  import NetworkIcon from './NetworkIcon.svelte'
  import AboutLink from '../about/AboutLink.svelte'
</script>

<main>
  <div>
    <button class="uk-button uk-button-default" type="button">
      <NetworkIcon />
      {#if $allAccounts && $allAccounts.length > 1}
        <span class="uk-margin-small-left">
          {#if $signingAccount}
            {$signingAccount.nickname}
          {:else}
            {$_('wallet.account_switcher.select_account')}
          {/if}
        </span>
      {/if}
    </button>

    <div uk-dropdown>
      <ul class="uk-nav uk-dropdown-nav">
        {#if $signingAccount && $allAccounts && $allAccounts.length > 0}
          <li class="uk-text-muted">
            {$_('wallet.account_switcher.switch_account')}
          </li>
          <li class="uk-nav-divider" />
          {#if !$allAccounts}
            <p>loading...</p>
          {:else}
            {#each $allAccounts as acc}
              <li>
                <a
                  href={'#'}
                  class={$signingAccount.account == acc.account ? 'uk-text-primary' : ''}
                  on:click={() => {
                    if ($signingAccount.account != acc.account) {
                      setAccount(acc.account)
                    }
                  }}
                >
                  {acc.nickname}
                </a>
              </li>
            {/each}
            <li class="uk-nav-divider" />
          {/if}
        {/if}
        <li>
          <a href={'#'}>
            <Link to="settings" class="uk-text-muted">
              {$_('wallet.account_switcher.setting')}</Link
            ></a
          >
        </li>
        <li>
          <a href={'#'}>
            <Link to="dev" class="uk-text-muted">
              {$_('wallet.account_switcher.developers')}</Link
            ></a
          >
        </li>
        <li class="uk-text-muted">
          <AboutLink />
        </li>
      </ul>
    </div>
  </div>
</main>
