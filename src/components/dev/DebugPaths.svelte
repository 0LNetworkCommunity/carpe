<script lang="ts">
  import { invoke } from '@tauri-apps/api/tauri'
  // import { raise_error } from '../../modules/carpeError'

  let config_path
  // let last_proof_path

  // invoke('debug_highest_proof_path', {})
  //   .then((path) => {
  //     last_proof_path = path
  //   })
  //   .catch((e) => raise_error(e, true, 'debug_highest_proof_path'))

  invoke('debug_preferences_path', {})
    .then((path) => {
      config_path = path
    })
    .catch(() => {
      config_path = 'no local tower proofs found'
    })
</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Local Files</h4>
    <div>
      <span>Configs Path: {config_path} </span>
    </div>
    <div>
      <span>App Configs: {config_path}/libra.yaml </span>
    </div>
    <div>
      <span>App Logs: {config_path}/carpe.log </span>
    </div>
    <!-- <div>
      <span>Latest Proof Path: {last_proof_path} </span>
    </div> -->
  </div>
</main>
