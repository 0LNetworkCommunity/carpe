<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { responses } from "../../debug";
  import DemoTx from "../txs/DemoTx.svelte";
  // import { account, authkey } from "../../accounts";
  // import type { AccountEntry } from "../../accounts";
  import { raise_error } from "../../carpeError";
  import Keygen from "../wallet/Keygen.svelte";

  // let authkey_string: string = "";
  // let account_string: string = "";

  // authkey.subscribe((n) => {
  //   authkey_string = n;
  // });

  // account.subscribe((n) => {
  //   account_string = n;
  // });

  // const keygen = async () => {
  //   invoke("keygen", {})
  //     .then((res: AccountEntry) => {

  //       // let o = JSON.parse(res);

  //       if ("account" in res) {
  //         console.log(res);
  //         // account = o.account;
  //         // authkey = o.authkey;
  //         authkey.set(res.authkey);
  //         account.set(res.account);
  //         // mnemonic = o.mnemonic;
  //       }

  //       responses.set(res);
  //       // result = res;
  //     })
  //     .catch((e) => console.error(e));
  // };

  const makeError = async () => {
    invoke("debug_error", {
      debugErr: false,
    })
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
</script>

<main>
  <div>
    <button class="uk-button uk-button-default" on:click={makeError}
      >Make Error</button
    >

    <Keygen />

    <button class="uk-button uk-button-default" on:click={init}>Init</button>

    <DemoTx />
  </div>
</main>
