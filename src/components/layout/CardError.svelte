<script lang="ts">
  import DebugSwitcher from "../dev/DebugSwitcher.svelte";
</script>

<main>
    <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light ">
      <h3 class="uk-card-title uk-text-uppercase"><slot name="title"/> </h3>
      <div>
        <slot name="body"/> 
      </div>
      <DebugSwitcher/>
    </div>
</main>
