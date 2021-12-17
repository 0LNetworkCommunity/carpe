<script>
	import { onMount } from "svelte";
  import { debugMode, debugModeToggle } from "../../debug";

  let debugEnabled = false;
	onMount(async () => {
	  debugMode.subscribe(boo => debugEnabled = boo);
  });
  
</script>

<div>
	<h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
		Debug Mode
	</h4>
	<label class="uk-switch">
		<input
			type="checkbox"
			on:click={() => debugModeToggle()}
			checked={debugEnabled}
		/>
		<div class="uk-switch-slider uk-switch-on-off round" />     
	</label>
</div>
