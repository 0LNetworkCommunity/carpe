<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  import { raise_error } from "../../carpeError";
  import { listen } from '@tauri-apps/api/event'
  import { onDestroy, onMount } from "svelte";
    import { getCurrent } from '@tauri-apps/api/window'

  const makeError = async () => {
    invoke("debug_error", {
      debugErr: false,
    })
    .then((res) => responses.set(res))
    .catch((e) => raise_error(e));
  };

  const triggerEventFromRustToJs = async () => {
    invoke("debug_emit_event", {})
    .then((res) => responses.set(res))
    .catch((e) => raise_error(e));
  };

  function emitEventFromHereToRust() {

    // emit an event that are only visible to the current window
    const current = getCurrent();
    current.emit('receive_event', 'Tauri is awesome!');
  };

  const init = async () => {
    invoke("init_user", {
      authkey: authkey_string,
      account: account_string,
      // pathStr: home,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };


  const testAsync = async () => {
    invoke("delay_async", {})
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };

  const mockTowerOnce = async () => {
    console.log("mine tower once")
    invoke("mock_build_tower", {success: true})
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };

  const mockTowerOnceFail = async () => {
    invoke("mock_build_tower", {success: false})
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };

  let listener_handle;
  // listen to the `event-name` event and get a function to remove the event listener
  // there's also a `once` function that subscribes to an event and automatically unsubscribes the listener on the first event
  onMount(() => {
    listener_handle = listen('event-name', event => {
      console.log(event);
      window.alert(event.payload.message);
      // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
      // event.payload is the payload object
    });

    listener_handle = listen('tower-event', event => {
      console.log(event);
      window.alert(JSON.stringify(event.payload));
      mockTowerOnce(); // chain the creation of proofs
    });

    // let 
  })



  let startMinerLoop = async () => {
    console.log("start miner loop");
    if (miner_loop_enabled) {
      mockTowerOnce();
    }
  }

  



  onDestroy(() => {
    // destroy listener here?
    listener_handle()

  })

</script>

<main>
  <div>
    <button class="uk-button uk-button-default" on:click={makeError}
      >Make Error</button
    >

    <button class="uk-button uk-button-default" on:click={triggerEventFromRustToJs}
      >Receive Event</button
    >

    <button class="uk-button uk-button-default" on:click={emitEventFromHereToRust}>Send Event</button>

    <div class="margin">
      <h5> Tower </h5>
      <button class="uk-button uk-button-default" on:click={mockTowerOnce}>Mock Tower Once</button>
      <button class="uk-button uk-button-default" on:click={mockTowerOnceFail}>Mock Tower Once Fail</button>
      <button class="uk-button uk-button-default" on:click={startMinerLoop}>Mock Tower Loop</button>

        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
          <label><input class="uk-radio" type="radio" name="radio2" checked={miner_loop_enabled} on:click={() => toggleMining(true)}> Mining Enabled </label>
          <label><input class="uk-radio" type="radio" name="radio2" checked={!miner_loop_enabled} on:click={() => toggleMining(false)}> Disabled </label>

        </div>

    </div>

    <button class="uk-button uk-button-default" on:click={testAsync}>Async</button>


    <button class="uk-button uk-button-default" on:click={init}>Init</button>


    <DemoTx />
  </div>
</main>
