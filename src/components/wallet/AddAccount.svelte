<script>
	import { Link, useNavigate } from "svelte-navigator";
	import UIkit from 'uikit';
	const invoke = window.__TAURI__.invoke;
	const navigate = useNavigate();
	
	let title = "";
	let address = "";
	let helpTitle = "";
	let helpAddress = "";
	
	const re = /[0-9A-Fa-f]{32}/g;	
	
	function handleAdd() {
		// check input data
		helpTitle = title.trim().length > 0 ? "" : "Account must have a title";
		helpAddress = (address.length == 32 && re.test(address)) ? "" : "The address must have 32 valid characters";
		if (helpTitle.length > 0 || helpAddress.length > 0) {
			return;
		}

		// submit
		invoke('add_account', {title: title, address: address})
			.then((_) => {
				UIkit.notification({ 
					message: '<span uk-icon=\'icon: check\'></span> Account added', 
					pos: 'bottom-center', 
					status: 'success',
					timeout: 3000
				});				
			})
			.catch((error) => window.alert(error));
		navigate("/", { replace: true });
	}
</script>


<main>
	<h1>Add Account</h1>
	<form id="account-form">
		<fieldset class="uk-fieldset">
			<div class="uk-margin uk-inline-block uk-width-1-1">
				<input class="uk-input" type="text" placeholder="Account Title" bind:value={title}>
				<span class="uk-form-help-inline uk-text-small uk-text-danger uk-position-absolute">{helpTitle}</span>
			</div>
			<div class="uk-margin uk-inline-block uk-width-1-1">
				<input class="uk-input" type="text" placeholder="Account Address" bind:value={address}>
				<span class="uk-form-help-inline uk-text-small uk-text-danger uk-position-absolute">{helpAddress}</span>
			</div>
			<div>
				<span on:click={handleAdd} class="uk-button uk-button-primary uk-align-right" id="add-btn">Add</span>
				<Link to="/">
					<span class="uk-button uk-button-default uk-align-right">Cancel</span>
				</Link>
			</div>
		</fieldset>
	</form>
</main>

