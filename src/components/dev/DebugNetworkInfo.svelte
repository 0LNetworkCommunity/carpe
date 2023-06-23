<script lang="ts">
  import { IndexResponse, getMetadata, network_metadata } from "../../networks";

  let metadata: IndexResponse;

  getMetadata();

  network_metadata.subscribe((n) => {
    metadata = n;
  });

</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      Chain Metadata
    </h4>
    <button class="uk-button uk-button-default" on:click={getMetadata}>Update</button>

    <div>
        <div>chain_id: {metadata.chain_id} </div>
        <div>epoch: {metadata.epoch} </div>
        <div>ledger_version: {metadata.ledger_version} </div>
        <div>oldest_ledger_version: {metadata.oldest_ledger_version} </div>
        <div>ledger_timestamp: {metadata.ledger_timestamp} </div>
        <div>node_role: {metadata.node_role} </div>
        <div>oldest_block_height: {metadata.oldest_block_height} </div>
        <div>block_height: {metadata.block_height} </div>
        <div>git_hash: {metadata.git_hash} </div>
    </div>
  </div>
</main>
