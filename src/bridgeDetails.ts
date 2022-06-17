import { writable } from 'svelte/store';

export const bridge_tab_selected = writable("tokens");

export const bridge_form_state = writable({
    from: "",
    to: "ol",
    
    from_network_token: "",
    from_network_amount: "",
});

export const ol_network_tokens = writable({
    "ol":"",
    "eth":"1.25",
    "usdc":"325.55"
});

export const ava_network_tokens = writable({
    "ol":"15.4555582",
    "ava":"0.3114",
    "usdc":"120.25"
});

export const eth_network_tokens = writable({
    "ol":"175.3325",
    "eth":"0.125",
    "usdc":"255.8443",
    "dai":"144.31"
});