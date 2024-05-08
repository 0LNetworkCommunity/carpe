<script lang="ts">
  import { _ } from '../../lang/i18n'
  import { associateNoteWithAccount } from '../../modules/accountActions'

  export let account
  export let note

  async function updateNote() {
    associateNoteWithAccount(account, note)
  }
</script>

<div class="account-note uk-inline">
  <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('wallet.account_note.title')}
  </h5>
  <p>{$_('wallet.account_note.description')}</p>
  <textarea
    class="uk-textarea"
    bind:value={note}
    rows="4"
    placeholder={$_('wallet.account_note.placeholder')}
    maxlength="100"
  ></textarea>
  <button
    class="uk-button uk-button-primary save-note-btn uk-align-right"
    on:click={() => updateNote()}
  >
    {$_('wallet.account_note.btn_save')}
  </button>
</div>

<style>
  .account-note {
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 1rem;
  }

  .uk-textarea,
  .uk-button {
    margin: 0.5rem 0rem;
    resize: none;
  }
</style>
