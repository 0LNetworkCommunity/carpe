<script lang="ts">
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		Container,
		Input,
	} from 'sveltestrap';

	import { invoke } from '@tauri-apps/api/tauri';

	let input: string = '';
	let result: string = '';
	const handleClick = async () => {
		result = await invoke('my_custom_command', {
			invokeMessage: input,
		});
	};
</script>

<main>
	<Container>
		<Card class="mb-3">
			<CardHeader>
				<CardTitle>Tauri + Svelte</CardTitle>
			</CardHeader>
			<CardBody>
				<CardSubtitle>Example of async call to Tauri</CardSubtitle>
				<CardText>Write something below and press the button.</CardText>
				<Input type="text" bind:value={input} />
				<Button color="primary" on:click={handleClick}>Call Rust</Button>
			</CardBody>
			<CardFooter>
				{#if result.length !== 0}
					{result}
				{:else}
					No result yet.
				{/if}
			</CardFooter>
		</Card>
	</Container>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
