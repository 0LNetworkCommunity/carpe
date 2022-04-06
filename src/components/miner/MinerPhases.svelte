<script>
  import { onDestroy, onMount } from "svelte";
  import { _ } from "svelte-i18n";
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

  let unsubsBacklogListenerReady;
  let unsubsMinerLoopEnabled;
  let unsubsMinerEventReceived;
  let unsubsMinerProofComplete;
  let unsubsBacklogInProgress;
  let unsubsBacklogSubmitted;

  onMount(async () => {
    unsubsBacklogListenerReady = backlogListenerReady.subscribe((b) => (listenerReady = b));
    unsubsMinerLoopEnabled = minerLoopEnabled.subscribe((b) => (loopEnabled = b));
    unsubsMinerEventReceived = minerEventReceived.subscribe((b) => (proofStarted = b));
    unsubsMinerProofComplete = minerProofComplete.subscribe((b) => (isProofComplete = b));
    unsubsBacklogInProgress = backlogInProgress.subscribe((b) => (isBacklogInProgress = b));
    unsubsBacklogSubmitted = backlogSubmitted.subscribe((b) => (isBacklogComplete = b));
  });

  onDestroy(async () => {
    unsubsBacklogListenerReady && unsubsBacklogListenerReady();
    unsubsMinerLoopEnabled && unsubsMinerLoopEnabled();
    unsubsMinerEventReceived && unsubsMinerEventReceived();
    unsubsMinerProofComplete && unsubsMinerProofComplete();
    unsubsBacklogInProgress && unsubsBacklogInProgress();
    unsubsBacklogSubmitted && unsubsBacklogSubmitted();
  });
</script>

<main>
  <div class="uk-margin">
    <ul class="uk-list uk-list-divider">
      <li>
        <span uk-icon={listenerReady ? "check" : "close"} />
        {$_("miner.miner_phrases.backlog_started")}:
      </li>

      <li>
        <span uk-icon={loopEnabled ? "check" : "close"} />
        {$_("miner.miner_phrases.mining_enabled")}:
      </li>

      <li>
        <span uk-icon={proofStarted ? "check" : "close"} />
        {$_("miner.miner_phrases.proof_started")}:
      </li>

      <li>
        <span uk-icon={isProofComplete ? "check" : "close"} />
        {$_("miner.miner_phrases.proof_complete")}:
      </li>

      <li>
        <span uk-icon={isBacklogInProgress ? "check" : "close"} />
        {$_("miner.miner_phrases.backlog_in_process")}:
      </li>

      <li>
        <span uk-icon={isBacklogComplete ? "check" : "close"} />
        {$_("miner.miner_phrases.backlog_complete")}:
      </li>
    </ul>
  </div>
</main>
