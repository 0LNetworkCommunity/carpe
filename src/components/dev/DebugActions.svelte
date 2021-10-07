<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses, errors } from "../../debug.ts";

  let authkey: string = "";
  let account: string = "4c613c2f4b1e67ca8d98a542ee3f59f5";

  const keygen = async () => {
    invoke("keygen", {})
      .then((res) => {
        let o = JSON.parse(res);
        if ("account" in o) {
          console.log(o);
          account = o.account;
          authkey = o.authkey;
          // mnemonic = o.mnemonic;
        }

        responses.set(res);
        // result = res;
      })
      .catch((e) => console.error(e));
  };

  const makeError = async () => {
    invoke("debug_error", {
      debugErr: false,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => {
        errors.set(e);
        // error_string = e; //This is a string
        console.error(e);
      });
  };



  const init = async () => {
    invoke("init_user", {
      authkey: authkey,
      account: account,
      // pathStr: home,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => console.error(e));
  };
</script>

<main>
  <div>

    <button class="uk-button uk-button-default" on:click={makeError}
          >Make Error</button
        >

        <button class="uk-button uk-button-default" on:click={keygen}
          >Keygen</button
        >

        <button class="uk-button uk-button-default" on:click={init}>Init</button
        >
  </div>
</main>