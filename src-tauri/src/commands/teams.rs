use crate::carpe_error::CarpeError;
use diem_types::account_address::AccountAddress;
#[derive(serde::Deserialize, serde::Serialize, Debug)]
pub struct TeamEntry {
  name:  String,
  captain_address: String,
  description: String,
  count_members: u64,
  pct_pool: u64,
  estimated_epoch_reward: u64
}

/// get list of teams from chain
#[tauri::command]
pub fn get_all_teams() -> Result<TeamEntry, CarpeError>  {
  let team = TeamEntry {
      name: "test".to_string(),
      captain_address: "test".to_string(),
      description: "test".to_string(),
      count_members: 1,
      pct_pool: 10,
      estimated_epoch_reward: 123,
  };

  Ok(team)

}


/// get the team of the user
#[tauri::command]
pub fn get_my_team(_account: AccountAddress ) -> Result<TeamEntry, CarpeError>  {
  let team = TeamEntry {
      name: "test".to_string(),
      captain_address: "test".to_string(),
      description: "test".to_string(),
      count_members: 1,
      pct_pool: 10,
      estimated_epoch_reward: 123,
  };

  Ok(team)

}

/// SET the team of the user
#[tauri::command]
pub fn set_my_team(_account: AccountAddress, _new_team: AccountAddress ) -> Result<TeamEntry, CarpeError>  {
  let team = TeamEntry {
      name: "test".to_string(),
      captain_address: "test".to_string(),
      description: "test".to_string(),
      count_members: 1,
      pct_pool: 10,
      estimated_epoch_reward: 123,
  };

  Ok(team)

}