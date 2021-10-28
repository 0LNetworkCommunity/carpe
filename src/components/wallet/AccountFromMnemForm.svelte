<script lang="ts">
  // import { Link } from "svelte-navigator";
  // import UIkit from "uikit";
  // import { responses } from "../../debug";
  // import { account, mnem } from "../../accounts";
  // import type { AccountEntry } from "../../accounts";
  // import { raise_error } from "../../carpeError";
  // import { invoke } from "@tauri-apps/api/tauri";
  import AccountFromMnemSubmit from "./AccountFromMnemSubmit.svelte";


  let danger_temp_mnem: string;
  // // let alice_mnem =
  // //   "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";

  // let danger_temp_mnem: string;

  // mnem.subscribe((m) => danger_temp_mnem = m);

  // let helpTitle = "Enter your 24 word recovery mnemonic";
  // // let helpAddress = "";

  // const re = /[0-9A-Fa-f]{32}/g;

  // function handleAdd() {
  //   // submit
  //   invoke("init_from_mnem", { mnem: danger_temp_mnem })
  //     .then((res: AccountEntry) => {
  //       responses.set(JSON.stringify(res));
  //       account.set(res);

  //       UIkit.notification({
  //         message: `Account Added:  ${res.account}`,
  //         pos: "bottom-right",
  //         status: "success",
  //         timeout: 3000,
  //       });
  //     })
  //     .catch((error) => raise_error(error));
  // }
</script>

<main class="uk-height-viewport">
  <h1>Add Account</h1>
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <div class="uk-margin uk-inline-block uk-width-1-1">
        <input
          class="uk-input"
          type="text"
          placeholder="Recovery Mnemonic"
          bind:value={danger_temp_mnem}
        />
      </div>
      
      <AccountFromMnemSubmit danger_temp_mnem={danger_temp_mnem} />
    </fieldset>
  </form>
</main>
