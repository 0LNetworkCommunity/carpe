<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgress from "./MinerProgress.svelte";
  import TowerState from "./TowerState.svelte";
  import MinerDebug from "./MinerDebug.svelte";
  import CantStart from "./cards/CantStart.svelte";
  import { isRefreshingAccounts, signingAccount } from "../../accounts";
  import type { AccountEntry } from "../../accounts";
  import FirstProof from "./cards/FirstProof.svelte";
  import { backlogInProgress, isTowerNewbie, tower } from "../../miner";
  import type {ClientTowerStatus } from "../../miner";
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
  let minerTower: ClientTowerStatus;

  // unsubscribe functions
  let unsubsTower;
  let unsubsIsTowerNewbie;
  let unsubsBacklogInProgress;
  let unsubsSigningAccount;
  let unsubsIsRefreshingAccounts;
  let unsubsIsDevTest;

  onMount(async () => {
    getTowerChainView();
    unsubsTower = tower.subscribe(t => {
      minerTower = t;
      hasProofs = minerTower.last_local_proof ? true : false;
    });
    unsubsIsTowerNewbie = isTowerNewbie.subscribe((b) => newbie = b);
    unsubsBacklogInProgress = backlogInProgress.subscribe((b) => isSendInProgress = b);
    unsubsSigningAccount = signingAccount.subscribe((a) => (account = a));
    unsubsIsRefreshingAccounts = isRefreshingAccounts.subscribe((a) => loading = a );
    unsubsIsDevTest = isDevTest = get(nodeEnv) == "test";
  });

  onDestroy(async () => {
    unsubsTower && unsubsTower();
    unsubsIsTowerNewbie && unsubsIsTowerNewbie();
    unsubsBacklogInProgress && unsubsBacklogInProgress();
    unsubsSigningAccount && unsubsSigningAccount();
    unsubsIsRefreshingAccounts && unsubsIsRefreshingAccounts();
    unsubsIsDevTest && unsubsIsDevTest();
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
      {#if (account && account.on_chain) || 
           // so we don't get a flash of the error card on an intermittent local network connection if we are in fact mining
           (minerTower && minerTower.progress.pct_complete)
      } 
        <div class="uk-width-1-1 uk-align-center">
          <ToggleMiner />
          <MinerProgress tower={minerTower} />
          <!-- Lost time is never found again. -->
        </div>

        <div class="uk-width-1-1">
          {#if newbie && !hasProofs }
            <FirstProof />
          {:else}
            <div class="uk-grid uk-grid-match">
              <div class="uk-width-1-3">
                {#if isSendInProgress}
                  <SyncProofs {minerTower} {loading} />
                {:else}
                  <EpochStatus {minerTower} isTowerNewbie={newbie}/>
                {/if}
              </div>
              <div class="uk-width-2-3">
                <TowerState {minerTower}/>
              </div>
            </div>
          {/if}
        </div>
      {:else if account}
        <CantStart />
      {/if}
    </div>
    <CommonErrors />
    <MinerDebug {minerTower} />
</main>
