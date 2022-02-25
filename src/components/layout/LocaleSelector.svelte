<script>
    import { createEventDispatcher } from "svelte";
    export let value;
    const dispatch = createEventDispatcher();
    function handleLocaleChange(event) {
      event.preventDefault();
      dispatch("locale-changed", event.target.value);
    }
  </script>
  <style>
    /* ... */
  </style>
  <div class="locale-selector">
    <div class="select">
      <!-- svelte-ignore a11y-no-onchange -->
      <select value={value} on:change={handleLocaleChange}>
        <option value="en">English</option>
        <option value="zh_cn">中文</option>
      </select>
    </div>
  </div>