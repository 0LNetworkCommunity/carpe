<script>
  import { invoke } from "@tauri-apps/api/tauri";
  import { account } from "../../accounts";
  import { responses, errors } from "../../debug";

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
        errors.set(res);
        console.error(e)
      });
  };
</script>

<main>
  <button class="uk-button uk-button-default" on:click={demoTx}>Demo Tx</button>
</main>
