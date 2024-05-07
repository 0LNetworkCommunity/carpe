<script>
  import { signingAccount } from '../../modules/accounts'
  import { associateNoteWithAccount } from '../../modules/accountActions'

  export let account = $signingAccount.account
  export let note = $signingAccount.note

  async function updateNote() {
    $signingAccount.note = note
    associateNoteWithAccount(account, note)
  }
</script>

<div class="account-note">
  <h3>Account Note</h3>
  <textarea class="uk-textarea" bind:value={note} rows="4" placeholder="Enter note here..."
  ></textarea>
  <button class="uk-button uk-button-primary" on:click={() => updateNote()}>Save Note</button>
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
    width: 100%;
    margin-top: 0.5rem;
  }
</style>
