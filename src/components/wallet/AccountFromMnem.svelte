<script>
	import { Link, useNavigate } from "svelte-navigator";
	import UIkit from 'uikit';
  import { responses } from "../../debug";
  import { account } from "../../accounts"
import { raise_error } from "../../carpeError";
  
	const invoke = window.__TAURI__.invoke;
	const navigate = useNavigate();
	
  let alice_mnem = "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";

  let danger_mnem = alice_mnem;

	let helpTitle = "Enter your 24 word recovery mnemonic";
	// let helpAddress = "";
	
	const re = /[0-9A-Fa-f]{32}/g;	

	function handleAdd() {
		// submit
		invoke('init_from_mnem', { mnem: danger_mnem })
			.then((res) => {
        
        responses.set(res);
        account.set(res);

				UIkit.notification({ 
					message: `private key ${res}`, 
					pos: 'bottom-center', 
					status: 'success',
					timeout: 3000
				});				
			})
			.catch((error) => {
        raise_error(error);

      });
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

