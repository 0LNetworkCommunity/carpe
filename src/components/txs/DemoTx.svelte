<script>
  import { invoke } from "@tauri-apps/api/tauri";
  import { account } from "../../accounts";
import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";

  let account_string = "";
  account.subscribe((n) => {
    account_string = n;
  });

  const demoTx = async () => {
    invoke("demo_tx", {
      account: account_string,
    })
      .then((res) => {
        responses.set(res);
      })
      .catch((e) => {
        raise_error(e);
      });
  };
</script>

<button class="uk-button uk-button-default" on:click={demoTx}>Demo Tx</button>
