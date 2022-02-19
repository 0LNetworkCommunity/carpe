<script>
	import { isDarkMode } from '../../themes';

	let isDark;

	isDarkMode.subscribe(value => {
		isDark = value;
	});

	function toggleThemeMode() {
    isDarkMode.update(n => !n);
	}
</script>


<button class="uk-button uk-button-default" on:click={toggleThemeMode}>
<!-- <a href={"#"} on:click={toggleThemeMode}> -->
	{#if isDark }
		Go light
	{:else}
		Go dark
	{/if}
<!-- </a> -->
</button>
