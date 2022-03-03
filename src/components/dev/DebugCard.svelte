<script lang="ts">
  import { afterUpdate } from "svelte";
  import { get } from "svelte/store";
  import { carpeErrorLog, clearErrors } from "../../carpeError";
  import { responses, debugModeToggle } from "../../debug"; // TODO: Make this read only

  let result_string = "";
  let this_error = get(carpeErrorLog);

  afterUpdate(async () => {
   
    responses.subscribe((value) => {
      result_string = value;
    });

    carpeErrorLog.subscribe((value) => {
      this_error = value;
    });
  });
</script>

<main style="position: fixed; bottom: 0px; left: 0px; right: 0px; height: 280px; overflow-y: auto; z-index: 10; border-style: ridge" >
    <div style="margin: 0px !important; min-height: 100%"
      class="uk-margin-top uk-margin-bottom uk-card uk-card-default uk-card-body uk-width-1-1"
    >
      <div class="uk-row">
          <h5 class="uk-card-title uk-text-light uk-text-muted uk-text-uppercase">
            LOGS
          </h5>
      </div>


      <div>
        <div class="uk-vertical-align-middle">
          <span class="uk-margin-small-right"> ERRORS </span> 
          <div class="uk-align-right">
            <span class="uk-margin-medium" uk-icon="trash" uk-tooltip="title: Clear Errors" on:click={() => clearErrors()} ></span>
            <span uk-icon="sign-out" uk-tooltip="title: Exit Debug Mode" on:click={() => debugModeToggle()} ></span>
          </div>
        </div>

        
        {#if this_error != undefined}
          {#each this_error as e}
            <p class="uk-text-break">
              Error ID: {e.uid} <br />
              Message: {e.msg}
              <br />
            </p>
          {/each}
        {/if}
      </div>
      <hr />
      <div>
        <p class="uk-text-break">
          {#if result_string && result_string.length !== 0}
          <span>LATEST REQUEST</span>
            
            <br />
            {result_string}
          {/if}
          <br />
        </p>
      </div>
    </div>
</main>
