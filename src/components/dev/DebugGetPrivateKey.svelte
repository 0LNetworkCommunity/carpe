<script lang="ts">
  import { getPrivateKey } from '../../modules/accountActions'
  let address = ''
  let privateKey = '';
</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">PrivateKey</h4>
    <form id="account-form" on:submit|preventDefault={() => {}}>
      <fieldset class="uk-fieldset">
        <div class="uk-margin uk-inline-block uk-width-1-1">
          <span> Address </span>
          <input class="uk-input" type="text" placeholder={address} bind:value={address} />
        </div>
        <div>
            <span>PrivateKey: {privateKey}</span>
          </div>
        <div>
          <button
            on:click={getPrivateKey(address, (res) => privateKey = res )}
            class="uk-button uk-button-primary uk-align-right"
            id="add-btn">Get PrivateKey</button
          >
        </div>
      </fieldset>
    </form>
   
  </div>
</main>
