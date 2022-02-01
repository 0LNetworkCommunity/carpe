<script>
  import { onMount } from "svelte";
  import {
    backlogListenerReady,
    minerLoopEnabled,
    minerEventReceived,
    backlogInProgress,
    backlogSubmitted,
    minerProofComplete,
  } from "../../miner";

  let listenerReady;
  let loopEnabled;
  let proofStarted;
  let isProofComplete;
  let isBacklogInProgress;
  let isBacklogComplete;

  onMount(() => {
    backlogListenerReady.subscribe((b) => (listenerReady = b));
    minerLoopEnabled.subscribe((b) => (loopEnabled = b));
    minerEventReceived.subscribe((b) => (proofStarted = b));
    minerProofComplete.subscribe((b) => (isProofComplete = b));
    backlogInProgress.subscribe((b) => (isBacklogInProgress = b));
    backlogSubmitted.subscribe((b) => (isBacklogComplete = b));
  });
</script>

<main>
  <div class="uk-margin">
    <ul class="uk-list uk-list-divider">
      <li>
        <span uk-icon={listenerReady ? "check" : "close"} />
        Backlog Listener Started:
      </li>

      <li>
        <span uk-icon={loopEnabled ? "check" : "close"} />
        Mining Enabled:
      </li>

      <li>
        <span uk-icon={proofStarted ? "check" : "close"} />
        Proof start request received:
      </li>

      <li>
        <span uk-icon={isProofComplete ? "check" : "close"} />
        Proof Complete:
      </li>

      <li>
        <span uk-icon={isBacklogInProgress ? "check" : "close"} />
        Backlog in Progress:
      </li>

      <li>
        <span uk-icon={isBacklogComplete ? "check" : "close"} />
        Backlog Complete:
      </li>
    </ul>
  </div>
</main>
