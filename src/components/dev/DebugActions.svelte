<script lang="ts">

  import {
    emitBacklog,
    killBacklogListener,
    startBacklogListener,
    maybeTowerOnce,
  } from '../../modules/miner_invoke'

  import { submitBacklog } from '../../modules/submitBacklog';

</script>

<main>
  <div>
    <div class="uk-margin-medium-bottom">
      <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Tower</h4>

      <button class="uk-button uk-button-default" on:click={maybeTowerOnce}> Mine One Proof </button>

      <button class="uk-button uk-button-default" on:click={submitBacklog}> Submit Backlog </button>

      <button class="uk-button uk-button-default" on:click={startBacklogListener}
        >Start Backlog Listener
      </button>

      <button class="uk-button uk-button-default" on:click={killBacklogListener}
        >End Backlog Listener
      </button>

      <button class="uk-button uk-button-default" on:click={emitBacklog}
        >Emit Start Backlog
      </button>
    </div>
  </div>
</main>
