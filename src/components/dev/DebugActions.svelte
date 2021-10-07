<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses, errors } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  import { account, authkey } from "../../accounts";

  let authkey_string: string = "";
  let account_string: string = "";

  authkey.subscribe((n) => {
    authkey_string = n
  })

  account.subscribe((n) => {
    account_string = n
  })

  const keygen = async () => {
    invoke("keygen", {})
      .then((res) => {
        let o = JSON.parse(res);
        if ("account" in o) {
          console.log(o);
          // account = o.account;
          // authkey = o.authkey;
          authkey.set(o.authkey);
          account.set(o.account);
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
      authkey: authkey_string,
      account: account_string,
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

    <button class="uk-button uk-button-default" on:click={keygen}>Keygen</button
    >

    <button class="uk-button uk-button-default" on:click={init}>Init</button>

    <DemoTx />
  </div>
</main>
