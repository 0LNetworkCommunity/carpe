<script>
  import { ignoreMigrate, tryMigrate } from '../../modules/accountActions'
  import { canMigrate, migrateInProgress, migrateSuccess } from '../../modules/accounts'
  import CardAlert from '../layout/CardAlert.svelte'
</script>

<main class="uk-container">
  {#if $canMigrate && !$migrateInProgress}
    <CardAlert>
      <span slot="title">Looks like you are an 0L OG</span>
      <div slot="body">
        <div>
          <p>We need to migrate some files on your computer</p>
          <p>Nothing will be deleted, and no changes will happen on the blockchain</p>

          <button on:click={tryMigrate} class="uk-button uk-button-primary"> migrate </button>

          <button on:click={ignoreMigrate} class="uk-button uk-button-default"> ignore </button>
        </div>
      </div>
    </CardAlert>
  {:else if $migrateSuccess}
    <div>migration successful</div>
  {/if}
</main>
