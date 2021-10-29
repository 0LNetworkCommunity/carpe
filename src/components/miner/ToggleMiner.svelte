<script>
import { get } from "svelte/store";
import { toggleMining, miner_loop_enabled} from "../../miner";
</script>

<main>
  <div>
    <label class="uk-switch">
      <input
        type="checkbox"
        on:click={() => toggleMining()}
        checked={get(miner_loop_enabled)}
      />
      <div class="uk-switch-slider uk-switch-on-off round" />
    </label>
  </div>
</main>
