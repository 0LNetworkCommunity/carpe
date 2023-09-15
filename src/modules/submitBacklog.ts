import { invoke } from '@tauri-apps/api/tauri'
import { Level, logger, raise_error } from './carpeError'
import { clearDisplayErrors } from './carpeErrorUI'
import { notify_success } from './carpeNotify'
import { responses } from './debug'
import { backlogInProgress, backlogSubmitted } from './miner'

// submit any transactions that are in the backlog. Proofs that have been mined but for any reason were not committed.

export const submitBacklog = async () => {
  console.log('submitBacklog called')
  clearDisplayErrors()
  backlogInProgress.set(true)
  invoke('submit_backlog', {})
    .then((res) => {
      backlogInProgress.set(false)
      backlogSubmitted.set(true)
      console.log('submit_backlog response: ' + res)
      responses.set(res as string)
      notify_success('Backlog submitted')
      return res
    })
    .catch((e) => {
      backlogInProgress.set(false)
      backlogSubmitted.set(false)
      logger(Level.Info, ' submit_backlog error: ' + e)
      raise_error(e, false, 'submitBacklog')
    })
}
