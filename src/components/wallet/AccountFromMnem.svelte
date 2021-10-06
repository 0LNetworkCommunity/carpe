<script>
	import { Link, useNavigate } from "svelte-navigator";
	import UIkit from 'uikit';
	const invoke = window.__TAURI__.invoke;
	const navigate = useNavigate();
	
  let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";

  let danger_mnem = alice_mnem;

  let pin_number = "1234";
  // let hashed_pin = crypto.subtle.digest('SHA-256', data);
  let res = "";

	let address = "";
	let helpTitle = "Enter your 24 word recovery mnemonic";
	// let helpAddress = "";
	
	const re = /[0-9A-Fa-f]{32}/g;	

	function handleAdd() {
		// check input data
		// helpTitle = title.trim().length > 0 ? "" : "Account must have a title";
		// helpAddress = (address.length == 32 && re.test(address)) ? "" : "The address must have 32 valid characters";
		// if (helpTitle.length > 0 || helpAddress.length > 0) {
		// 	return;
		// }

		// submit
		invoke('init_from_mnem', {mnem: danger_mnem, userPinHash: pin_number})
			.then((_) => {


        dangerCheck();


				UIkit.notification({ 
					message: `private key ${res}`, 
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
				<input class="uk-input" type="text" placeholder="Recovery Mnemonic" bind:value={danger_mnem}>
				<span class="uk-form-help-inline uk-text-small uk-text-danger uk-position-absolute">{helpTitle}</span>
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

