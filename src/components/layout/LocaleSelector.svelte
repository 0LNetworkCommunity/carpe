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
        <option value="pt">Portuguese</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="es">Spanish</option>
        <option value="ar">Arabic</option>
        <option value="fr">French</option>
      </select>
    </div>
  </div>
