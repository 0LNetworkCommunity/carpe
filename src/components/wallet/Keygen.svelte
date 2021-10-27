<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { account, mnem } from "../../accounts";
  import type { AccountEntry } from "../../accounts";

  import { raise_error } from "../../carpeError";
  import { responses } from "../../debug";

  interface NewKeygen {
    entry: AccountEntry,
    mnem: string,
  };

  const keygen = async () => {
    invoke("keygen", {})
      .then((res: NewKeygen) => {
        console.log(res);
        responses.set(JSON.stringify(res));
        account.set(res.entry);
        mnem.set(res.mnem)
      })
      .catch((e) => raise_error(e));
  };
</script>

<main>
  <button class="uk-button uk-button-default" on:click={keygen}>Keygen</button>
</main>
