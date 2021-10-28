<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  import { raise_error } from "../../carpeError";
  import { listen } from '@tauri-apps/api/event'

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

  // listen to the `event-name` event and get a function to remove the event listener
  listen('event-name', event => {
    console.log(event);
    window.alert(event.payload.message);
    // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
    // event.payload is the payload object
  });

</script>

<main>
  <div>
    <button class="uk-button uk-button-default" on:click={makeError}
      >Make Error</button
    >

    <button class="uk-button uk-button-default" on:click={makeEvent}
      >Emit Event</button
    >

    <button class="uk-button uk-button-default" on:click={init}>Init</button>

    <DemoTx />
  </div>
</main>
