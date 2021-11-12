<script lang="ts">
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgres from "./MinerProgres.svelte";
  import TowerState from "./TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./CantStart.svelte";
  import { debugMode } from "../../debug";
  import { signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import Status from "./Status.svelte";
import FirstProof from "./FirstProof.svelte";
import Oops from "./Oops.svelte";

  let debug: boolean;
  debugMode.subscribe((d) => {
    debug = d;
  });
  let account: AccountEntry;
  signingAccount.subscribe((a) => {
    account = a;
  });

  let info = false;
</script>

<main class="uk-height-viewport">
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>
  {#if !account.balance}
    <CantStart />
  {:else}
    <div class="uk-grid">
      <div class="uk-width-auto">
        <ToggleMiner />
      </div>
      <div class="uk-width-expand">
        <MinerProgres />
      </div>
      <!-- <p>Lost time is never found again.</p> -->
    </div>
  {/if}


  {#if debug}
    <MinerDebug />
  {/if}

  <Oops/>

  <div class="uk-text-center uk-grid-match" uk-grid>
      <div class="uk-width-expand">
              {#if info}
                <TowerState />
              {:else}
                <FirstProof/>
              {/if}
            

      </div>
      <div class="uk-width-1-3">
          <div class="uk-card uk-card-default uk-card-body">
            <Status/>
          </div>
      </div>
  </div>
</main>

