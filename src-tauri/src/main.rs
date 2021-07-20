#![cfg_attr(
	all(not(debug_assertions), target_os = "windows"),
	windows_subsystem = "windows"
)]

#[tauri::command]
fn my_custom_command(invoke_message: String) -> String{
	format!("Yo! I was invoked from JS, with this message: {}", invoke_message)
}

fn main() {
	tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![my_custom_command])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
