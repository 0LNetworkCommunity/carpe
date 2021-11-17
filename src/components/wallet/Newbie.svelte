<script  lang="ts">
  import { Link } from "svelte-navigator";

</script>

<main class="uk-position-center uk-margin-large">
  <div class="uk-container uk-align-center">
    <h1 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">CARPE</h1>
    <h5 class="uk-text-light uk-text-muted uk-text-uppercase uk-text-center">Looks like you don't have any accounts</h5>
  </div>

    <div uk-grid class="uk-margin uk-flex uk-flex-center">
    <Link to="keygen">
      <button class="uk-button uk-button-secondary"> New Account </button>
    </Link>
    <Link to="account-from-mnem">
      <button class="uk-button uk-button-default">Restore Account </button>
    </Link>
  </div>
</main>
