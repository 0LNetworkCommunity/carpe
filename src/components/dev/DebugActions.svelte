<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  import { raise_error } from "../../carpeError";
  import { listen } from '@tauri-apps/api/event'
  import { onMount } from "svelte";
  import { getCurrent } from '@tauri-apps/api/window'

  const makeError = async () => {
    invoke("debug_error", {
      debugErr: false,
    })
    .then((res) => responses.set(res as string))
    .catch((e) => raise_error(e, false, "makeError"));
  };

  const triggerEventFromRustToJs = async () => {
    invoke("debug_emit_event", {})
    .then((res) => responses.set(res as string))
    .catch((e) => raise_error(e, false, "triggerEventFromRustToJs"));
  };

  function emitEventFromHereToRust() {

    // emit an event that are only visible to the current window
    const current = getCurrent();
    current.emit('emit-from-window', 'Tauri is awesome!');
  };
  const debugStartListener = async () => {
    invoke("debug_start_listener", {})
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };


  

  const init = async () => {
    invoke("init_user", {
      authkey: authkey_string,
      account: account_string,
      // pathStr: home,
    })
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };


  const testAsync = async () => {
    invoke("delay_async", {})
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };


    const startForever = async () => {
    invoke("start_forever_task", {})
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };

  const killForever = async () => {
    const current = getCurrent();
    current.emit('kill_forever', 'Tauri is awesome!');
  };
 
  const startMockTowerListener = async () => {
    console.log("start tower listener")
    invoke("mock_build_tower", {success: true})
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };

  const mockTowerOnce = async () => {
    const current = getCurrent();
    current.emit('mock-tower-make-proof', 'Tauri is awesome!');
  };

  const mockTowerOnceFail = async () => {
    invoke("mock_build_tower", {success: false})
      .then((res) => {
        responses.set(res as string);
      })
      .catch((e) => console.error(e));
  };

</script>

<main>
  <div>
    <div class="uk-margin-medium-bottom">
      <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Helpers </h4>
      <button class="uk-button uk-button-default" on:click={makeError}>Make Error</button>
      <button class="uk-button uk-button-default" on:click={triggerEventFromRustToJs}>Receive Event</button>
      <button class="uk-button uk-button-default" on:click={debugStartListener}>Start Listener</button>
      <button class="uk-button uk-button-default" on:click={emitEventFromHereToRust}>Send Event</button>
    </div>

    <div class="uk-margin-medium-bottom">
      <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Tower </h4>
      <button class="uk-button uk-button-default" on:click={startMockTowerListener}>Start Mock Tower Listener </button>
      <button class="uk-button uk-button-default" on:click={mockTowerOnce}>Mock Tower Once</button>
      <button class="uk-button uk-button-default" on:click={mockTowerOnceFail}>Mock Tower Once Fail</button>
    </div>


    <div class="uk-margin-medium-bottom">
      <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> Tests </h4>
      <button class="uk-button uk-button-default" on:click={testAsync}>Async</button>
      <button class="uk-button uk-button-default" on:click={startForever}>Start Forever</button>
      <button class="uk-button uk-button-default" on:click={killForever}>Kill Forever</button>
    </div>

    <div class="uk-margin-medium-bottom">
      <button class="uk-button uk-button-default" on:click={init}>Init</button>
    </div>

    <DemoTx />
  </div>
</main>
