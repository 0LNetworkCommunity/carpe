<script lang="ts">
  import { _ } from "svelte-i18n";

</script>

<table class="uk-table uk-table-divider">
  <thead>
    <tr>
      <th class="uk-text-center"><span class="skeleton-container">{$_("miner.tower_state.local_height")}</span></th>
      <th class="uk-text-center"><span class="skeleton-container">{$_("miner.tower_state.on_chain_height")}</span></th>
      <th class="uk-text-center"><span class="skeleton-container">{$_("miner.tower_state.mined_in_last_epoch")}</span></th>
      <th class="uk-text-center"><span class="skeleton-container">{$_("miner.tower_state.sent_in_this_epoch")}</span></th>
    </tr>
  </thead>
  <tbody>
    <tr class="uk-text-center">
      <td><span class="skeleton-container">0000</span></td>
      <td><span class="skeleton-container">0000</span></td>
      <td><span class="skeleton-container">0000</span></td>
      <td><span class="skeleton-container">0000</span></td>
    </tr>
  </tbody>
</table>

<style>
  .skeleton-container {
    background-color: #F0F0F0;
    color: #F0F0F0;
  }
</style>