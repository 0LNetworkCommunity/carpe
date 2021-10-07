<script lang="ts">
  import { responses, errors } from "../../debug.ts"; // TODO: Make this read only


  let home = "";
  let account = "";

  let result_string = "";
  let error_string = "";

  responses.subscribe(value => {
    result_string = value;
  });

  errors.subscribe(value => {
    error_string = value;
  });

  
</script>

<main>
  <div class="uk-margin uk-card uk-card-default uk-card-body uk-width-1-2@m">
    <h5 class="uk-card-title">Debugging</h5>

    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Path</th>
          <th>Address</th>
          <th>Mnem</th>
        </tr>
      </thead>
      <tbody>
        <!-- {#each accounts as account} -->
        <tr>
          <td>{home}</td>
          <td>{account}</td>
        </tr>
        <!-- {/each} -->
      </tbody>
    </table>

    <h4>Invoke results</h4>
    <p>
      result_string:
      <br />
      {#if result_string.length !== 0}
        {result_string}
      {:else}
        No result_string yet.
      {/if}
      <br />
      error:
      <br />
      {#if error_string.length !== 0}
        {error_string}
      {:else}
        No result_string yet.
      {/if}
    </p>
  </div>
</main>
