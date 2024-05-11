<script>
  import { _ } from 'svelte-i18n'
  import {
    backlogListenerReady,
    minerLoopEnabled,
    minerEventReceived,
    backlogInProgress,
    backlogSubmitted,
    minerProofComplete,
  } from '../../modules/miner'

</script>


<main>
  <div class="uk-margin">
    <ul class="uk-list uk-list-divider">
      <li>
        <span uk-icon={$backlogListenerReady ? 'check' : 'close'} />
        {$_('miner.miner_phases.backlog_started')}
      </li>

      <li>
        <span uk-icon={$minerLoopEnabled ? 'check' : 'close'} />
        {$_('miner.miner_phases.mining_enabled')}
      </li>

      <li>
        <span uk-icon={$minerEventReceived ? 'check' : 'close'} />
        {$_('miner.miner_phases.proof_started')}
      </li>

      <li>
        <span uk-icon={$minerProofComplete ? 'check' : 'close'} />
        {$_('miner.miner_phases.proof_complete')}
      </li>

      <li>
        <span uk-icon={$backlogInProgress ? 'check' : 'close'} />
        {$_('miner.miner_phases.backlog_in_process')}
      </li>

      <li>
        <span uk-icon={$backlogSubmitted ? 'check' : 'close'} />
        {$_('miner.miner_phases.backlog_complete')}
      </li>
    </ul>
  </div>
</main>
