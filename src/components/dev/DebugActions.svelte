<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  import { raise_error } from "../../carpeError";
  import { listen } from '@tauri-apps/api/event'
  import { onDestroy, onMount } from "svelte";

  const makeError = async () => {
    invoke("debug_error", {
      debugErr: false,
    })
    .then((res) => responses.set(res))
    .catch((e) => raise_error(e));
  };

  const makeEvent = async () => {
    invoke("debug_emit_event", {})
    .then((res) => responses.set(res))
    .catch((e) => raise_error(e));
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


  let listener_handle;
  // listen to the `event-name` event and get a function to remove the event listener
  // there's also a `once` function that subscribes to an event and automatically unsubscribes the listener on the first event
  onMount(() => {
    let listener_handle = listen('event-name', event => {
      console.log(event);
      window.alert(event.payload.message);
      // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
      // event.payload is the payload object
    });
  })

  onDestroy(() => {
    // destroy listener here?

  })

</script>

<main>
  <div>
    <button class="uk-button uk-button-default" on:click={makeError}
      >Make Error</button
    >

    <button class="uk-button uk-button-default" on:click={makeEvent}
      >Emit Event</button
    >

    <button class="uk-button uk-button-default" on:click={testAsync}>Async</button>


    <button class="uk-button uk-button-default" on:click={init}>Init</button>

    <DemoTx />
  </div>
</main>
