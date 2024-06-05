<script>
  import { signingAccount } from '../../modules/accounts';
  import Info from './Info.svelte';
  import AccountNote from './AccountNote.svelte';
  import SetWalletType from '../txs/SetWalletType.svelte';
  import GetPrivateKey from './GetPrivateKey.svelte';
  import RemoveAccount from './RemoveAccount.svelte';
  import { _ } from 'svelte-i18n';

</script>

<main class="uk-container uk-margin-large-top">
  <div class="uk-position-relative uk-margin-bottom">
    <div class="uk-flex uk-flex-center">
      <h2 class="uk-text-light uk-text-muted uk-text-uppercase">{$_("wallet.account_details.title")}</h2>
    </div>
  </div>

  {#if $signingAccount}
    <section>
      <div class="uk-container">
        <div class="uk-grid-small" uk-grid>
          <div class="uk-width-1-1">
            <Info {signingAccount} />
          </div>
          <div class="uk-width-1-2@m">
            <AccountNote {signingAccount} />
          </div>
          {#if !$signingAccount.watch_only}
            <div class="uk-width-1-2@m">
              <GetPrivateKey />
            </div>
          {/if}          
          <div class="uk-width-1-1">
            <SetWalletType {signingAccount} />
          </div>          
        </div>
        <div class="uk-margin-top uk-flex uk-flex-left uk-flex-wrap">
          <RemoveAccount {signingAccount} />
        </div>
      </div>
    </section>
  {/if}  
</main>

<style>
  .uk-container {
    max-width: 800px;
    margin: auto;
  }
  section {
    margin-top: 20px;
  }
</style>
