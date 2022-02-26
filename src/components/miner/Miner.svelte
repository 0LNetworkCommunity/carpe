<script lang="ts">
  import { onMount } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgress from "./MinerProgress.svelte";
  import TowerState from "./TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";
  import { isRefreshingAccounts, signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import FirstProof from "./cards/FirstProof.svelte";
  import { backlogInProgress, isTowerNewbie, tower } from "../../miner";
  import { nodeEnv } from "../../debug";
  import { get } from "svelte/store";
  import SyncProofs from "./cards/SyncProofs.svelte";
  import CommonErrors from "./CommonErrors.svelte";
  import { getTowerChainView } from "../../miner_invoke";
  import EpochStatus from "./cards/EpochStatus.svelte";
  import { _ } from "svelte-i18n";

  let newbie = false;
  let loading = true;
  let account: AccountEntry;
  let isDevTest = false;
  let isSendInProgress = false;
  let hasProofs = false;

  onMount(async () => {
    getTowerChainView();

    tower.subscribe((t) => {
      if (t.last_local_proof) {

        hasProofs = true;
      } else {
        hasProofs = false;
      }
    })

    isTowerNewbie.subscribe((b) =>  newbie = b);

    backlogInProgress.subscribe((b) =>  isSendInProgress = b);

    signingAccount.subscribe((a) => (account = a));

    isRefreshingAccounts.subscribe((a) => loading = a );

    isDevTest = get(nodeEnv) == "test";

  });
</script>

 
<main class="uk-height-viewport">
  {#if loading}
    <div style="position:relative">
      <span style="position:absolute; left:0px; top:0px;" uk-spinner />
    </div>
  {/if}
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">
      {$_("miner.title")}
    </h2>
  </div>

  {#if isDevTest}
    <div class="uk-flex uk-flex-center">
      <p class="uk-text-light uk-text-muted uk-text-uppercase">
        DEV MODE, RUNNING IN TEST DIFFICULTY
      </p>
    </div>
  {/if}
    <div class="uk-grid uk-margin-small">
      {#if account && account.on_chain}

        <div class="uk-width-1-1 uk-align-center">
          <ToggleMiner />
          
          <MinerProgress />
          <!-- <p>Lost time is never found again.</p> -->
        </div>

        <div class="uk-width-1-1">
          {#if newbie && !hasProofs }
            <FirstProof />
          {:else}

          <div class="uk-grid uk-grid-match">
            <div class="uk-width-1-3">
              {#if isSendInProgress}
                <SyncProofs />
              {:else}
                <EpochStatus/>
              {/if}
            </div>

            <div class="uk-width-2-3">
              <TowerState />
            </div>
          </div>
          {/if}
        </div>
      {:else if account }
        <CantStart />
      {/if}
    </div>
    
    <CommonErrors />


    <MinerDebug />
</main>
