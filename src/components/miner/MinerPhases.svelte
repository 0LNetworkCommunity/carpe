<script>
  import { onMount } from "svelte";
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

  onMount(async () => {
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
