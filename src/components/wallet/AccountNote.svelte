<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { associateNoteWithAccount } from '../../modules/accountActions'

  export let signingAccount

  async function updateNote() {
    associateNoteWithAccount($signingAccount.account, $signingAccount.note)
  }
</script>

<main class="uk-card uk-card-default uk-card-body">
  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('wallet.account_note.title')}
  </h5>
  <p>{$_('wallet.account_note.description')}</p>
  <textarea
    class="uk-textarea"
    bind:value={$signingAccount.note}
    rows="4"
    placeholder={$_('wallet.account_note.placeholder')}
    maxlength="100"
    disabled={!$signingAccount}
    style="max-height: 62px;"
  ></textarea>
  <button
    class="uk-button uk-button-primary save-note-btn uk-align-right"
    on:click={() => updateNote()}
    disabled={!$signingAccount}
  >
    {$_('wallet.account_note.btn_save')}
  </button>
</main>

<style>
  .uk-textarea,
  .uk-button {
    margin: 0.5rem 0rem;
    resize: none;
  }
</style>
