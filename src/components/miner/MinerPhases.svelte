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
  <ul>
    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {listenerReady ? 'check' : 'close'}; ratio: 1"
      >
        Backlog Listener Started:
      </span>
    </li>

    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {loopEnabled ? 'check' : 'close'}; ratio: 1"
      >
        Mining Enabled:
      </span>
    </li>

    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {proofStarted ? 'check' : 'close'}; ratio: 1"
      >
        Proof start request received:
      </span>
    </li>

    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {isProofComplete ? 'check' : 'close'}; ratio: 1"
      >
        Proof Complete:
      </span>
    </li>

    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {isBacklogInProgress ? 'check' : 'close'}; ratio: 1"
      >
        Backlog in Progress:
      </span>
    </li>

    <li>
      <span
        class="uk-margin-left"
        uk-icon="icon: {isBacklogComplete ? 'check' : 'close'}; ratio: 1"
      >
        Backlog Complete:
      </span>
    </li>
  </ul>
</main>
