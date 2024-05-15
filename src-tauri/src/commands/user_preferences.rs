use crate::carpe_error::CarpeError;
use serde::{Deserialize, Serialize};
use std::fs::{File, OpenOptions};
use std::io::{Read, Write};
use std::path::{PathBuf};
use crate::configs::default_config_path;

#[derive(Serialize, Deserialize)]
pub struct UserPreferences {
    accounts_list_sort_column: Option<String>,
    accounts_list_sort_order: Option<String>,
}

// Utility function to retrieve the full path to the preferences file
fn get_preferences_path() -> Result<PathBuf, CarpeError> {
    let app_dir_path = default_config_path();  // Assuming this returns a PathBuf or Path

    // Check if the path exists, if not, return an error
    if !app_dir_path.exists() {
        return Err(CarpeError::misc("App directory not found"));
    }

    Ok(app_dir_path.join("user_preferences.json"))
}

#[tauri::command(async)]
pub async fn get_user_preferences() -> Result<UserPreferences, CarpeError> {
    let file_path = get_preferences_path()?;
    match File::open(&file_path) {
        Ok(mut file) => {
            let mut contents = String::new();
            if let Err(e) = file.read_to_string(&mut contents) {
                return Err(CarpeError::misc(&format!("Failed to read from preferences file: {}", e)));
            }
            serde_json::from_str(&contents).map_err(|e| CarpeError::misc(&format!("Failed to parse preferences: {}", e)))
        },
        Err(e) => Err(CarpeError::misc(&format!("Failed to open preferences file: {}", e))),
    }
}

#[tauri::command(async)]
pub async fn set_accounts_list_preference(sort_column: String, sort_order: String) -> Result<(), CarpeError> {
    let file_path = get_preferences_path()?;
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open(&file_path)
        .map_err(|e| CarpeError::misc(&format!("Failed to open preferences file for writing: {}", e)))?;

    let preferences = UserPreferences {
        accounts_list_sort_column: Some(sort_column),
        accounts_list_sort_order: Some(sort_order),
    };

    let serialized_data = serde_json::to_string_pretty(&preferences)
        .map_err(|e| CarpeError::misc(&format!("Failed to serialize preferences: {}", e)))?;
    
    file.write_all(serialized_data.as_bytes())
        .map_err(|e| CarpeError::misc(&format!("Failed to write preferences file: {}", e)))
}
