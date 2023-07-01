<script lang="ts">
  import { getMetadata, networkMetadata } from '../../modules/networks'
  import type { IndexResponse } from '../../modules/networks'
  import CarpeButton  from "../layout/CarpeButton.svelte"
  
  let metadata: IndexResponse

  getMetadata()

  networkMetadata.subscribe((n) => {
    if (n) metadata = n
  })
</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">Chain Metadata</h4>
    <CarpeButton color={""} text={"UPDATE"} cbAction={getMetadata}/>
    <!-- <button class="uk-button uk-button-default" on:click={getMetadata}>Update</button> -->

    {#if metadata}
      <div>
        <div>chain_id: {metadata.chain_id}</div>
        <div>epoch: {metadata.epoch}</div>
        <div>ledger_version: {metadata.ledger_version}</div>
        <div>oldest_ledger_version: {metadata.oldest_ledger_version}</div>
        <div>ledger_timestamp: {metadata.ledger_timestamp}</div>
        <div>node_role: {metadata.node_role}</div>
        <div>oldest_block_height: {metadata.oldest_block_height}</div>
        <div>block_height: {metadata.block_height}</div>
        <div>git_hash: {metadata.git_hash}</div>
      </div>
    {/if}
  </div>
</main>
