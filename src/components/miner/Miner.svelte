<script lang="ts">
  import { onMount } from "svelte";
  import ToggleMiner from "./ToggleMiner.svelte";
  import MinerProgress from "./MinerProgress.svelte";
  import TowerState from "./cards/TowerState.svelte";
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
  import SyncProofsError from "./cards/SyncProofsError.svelte";

  let newbie = false;
  let loading = true;
  let account: AccountEntry;
  let isDevTest = false;
  let isSendInProgress = false;
  let hasProofs = false;
  let towers;
  onMount(async () => {
    getTowerChainView();

    tower.subscribe((t) => {
      towers = t;
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
  is send in progress: {isSendInProgress}
  has proofs: {hasProofs}
  is newbie: {newbie}
  {#if towers }
    tower local: {JSON.stringify(towers)}
  {/if}
  <div class="uk-flex uk-flex-center">
    <h2 class="uk-text-light uk-text-muted uk-text-uppercase">Miner</h2>
  </div>

  {#if isDevTest}
    <div class="uk-flex uk-flex-center">
      <p class="uk-text-light uk-text-muted uk-text-uppercase">
        DEV MODE, RUNNING IN TEST DIFFICULTY
      </p>
    </div>
  {/if}

  {#if loading}
    <div class="uk-flex uk-flex-center">
      <span uk-spinner />
    </div>
  {/if}
  <!-- {:else} -->
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
            <TowerState />
          {/if}
        </div>
      {:else if account }
        <CantStart />
      {/if}
    </div>

              
    {#if isSendInProgress}
      <SyncProofs />
    {/if}

    <CommonErrors />

    <MinerDebug />
</main>
