<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { removeAllAccounts } from '../../modules/accountActions'
  import { writable } from 'svelte/store'

  let isSubmitting = writable(false)

  const removeAccounts = async () => {
    isSubmitting.set(true)
    try {
      removeAllAccounts() 
    } finally {
      isSubmitting.set(false)
    }
    
  }
</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
    {$_('settings.account_settings.title')}
  </h4>

  <div class="uk-margin" uk-grid>
    <div>
      <div class="uk-inline">
        <button class="uk-button uk-button-danger" type="button"
          >{$_('settings.account_settings.btn_remove')}</button
        >
        <div uk-dropdown="mode: click">
          <p>{$_('settings.account_settings.confirm')}</p>
          <button class="uk-button uk-button-danger" 
            on:click={removeAccounts}
            disabled={!isSubmitting}
            >
            {$_('settings.account_settings.btn_remove')}
          </button>
        </div>
      </div>
    </div>
    <div>
      <span>
        {$_('settings.account_settings.description')}
      </span>
    </div>
  </div>
</main>
