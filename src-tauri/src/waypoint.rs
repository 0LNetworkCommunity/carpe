// TODO: This is duplicated in libra/ol/config.rs which is Blocking, and not async

use std::time::Duration;

use diem_types::waypoint::Waypoint;
use reqwest::{Url, ClientBuilder};
use serde::{Serialize, Deserialize};
use anyhow::{Result, bail};
use serde_json::json;


#[derive(Serialize, Deserialize, Debug)]
struct WaypointRpc {
    result: Option<serde_json::Value>,
}
/// get the waypoint from a fullnode
pub async fn bootstrap_waypoint_from_rpc(url: Url) -> Result<Waypoint> {
    let method = "get_waypoint_view";
    let params = json!([]);
    let request = json!({"jsonrpc": "2.0", "method": method, "params": params, "id": 1});

    let client = ClientBuilder::new()
      .timeout(Duration::from_secs(1))
      .build()?;

    // let client = Client::new();
    let resp = client.post(url.as_str()).json(&request).send().await?;

    // let json: WaypointRpc = serde_json::from_value(resp.json().unwrap()).unwrap();
    let parsed: serde_json::Value = resp.json().await?;
    match &parsed["result"] {
        serde_json::Value::Object(r) => {
            if let serde_json::Value::String(waypoint) = &r["waypoint"] {
                let w: Waypoint = waypoint.parse()?;
                return Ok(w);
            }
        }
        _ => {}
    }
    bail!("could not get waypoint from json-rpc, url: {:?} ", url)
}
