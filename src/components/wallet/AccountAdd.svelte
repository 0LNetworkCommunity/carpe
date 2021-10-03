<script lang="ts">
	/*
	title: not empty
	address: 32 chars hexadecimal
	*/

	let title = "";
	let address = "";
	let isFormValid = false;
	
	const re = /[0-9A-Fa-f]{6}/g;	
	$: isFormValid = title.trim().length > 0 && address.length == 32 && re.test(address);
	
	function handleAdd() {
		console.log(address)
		// call tauri add account
		// toast
	}

</script>

<main>
	<div id="modal-account-add" uk-modal>
		<div class="uk-modal-dialog uk-modal-body">
			<h2 class="uk-modal-title">Account Form</h2>
			<form id="account-form">
				<fieldset class="uk-fieldset">
					<div class="uk-margin uk-inline-block uk-width-1-1">
						<input class="uk-input" type="text" placeholder="Account Title" bind:value={title}>
						<p class="uk-form-help-block uk-hidden">An account title is required.</p>
					</div>
					<div class="uk-margin uk-inline-block uk-width-1-1">
						<input class="uk-input" type="text" placeholder="Account Address" bind:value={address}>
						<p class="uk-form-help-block uk-hidden">An account address is required.</p>
					</div>
					<div>
						<button on:click={handleAdd} disabled='{!isFormValid}'class="uk-button uk-button-primary uk-align-right uk-modal-close" id="add-btn">Add</button>
						<button type="submit" class="uk-button uk-button-default uk-align-right uk-modal-close">Cancel</button>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</main>
