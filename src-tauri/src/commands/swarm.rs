use std::path::PathBuf;
use std::process::Command;

use ol_types::config::Workspace;

use crate::configs::get_cfg;

#[tauri::command]
pub async fn easy_swarm(_path: PathBuf) -> Result<String, String>  {

  let cfg = get_cfg();
  let source_path = cfg.workspace.source_path.expect("cant find source path in 0L.toml, to use swarm define it in workspace.source_path");
  let debug_build_diem_node = cfg.workspace.node_home.join("target/debug/diem-node");
  let swarm_temp_path = cfg.workspace.node_home.join("swarm_temp");
  match Command::new("cargo")
    .current_dir(source_path)
    .args(&["run", "-p", "diem-swarm", "--", "--diem-node", debug_build_diem_node.to_str().unwrap(), "-c", swarm_temp_path.to_str().unwrap()])
    .output() {
        Ok(o) => Ok(o.status.success().to_string()),
        Err(e) => Err(e.to_string())
    }
}


// #[tauri::command]
// pub async fn start_swarm(libra_node: PathBuf, config_path: Option<String>, num_nodes: usize, num_full_nodes: usize) -> Result<bool,String> {
//     println!("libra-node: {:?}", libra_node);
//     libra_logger::Logger::new().init();

//     let mut validator_swarm = LibraSwarm::configure_validator_swarm(
//         libra_node.as_ref(),
//         num_nodes,
//         config_path.clone(),
//         None,
//     )
//         .expect("Failed to configure validator swarm");

//     let mut full_node_swarm = if num_full_nodes > 0 {
//         Some(
//             LibraSwarm::configure_fn_swarm(
//                 libra_node.as_ref(),
//                 None, /* config dir */
//                 None,
//                 &validator_swarm.config,
//                 FullnodeType::ValidatorFullnode,
//             )
//                 .expect("Failed to configure full node swarm"),
//         )
//     } else {
//         None
//     };
//     validator_swarm
//         .launch_attempt()
//         .expect("Failed to launch validator swarm");
//     if let Some(ref mut swarm) = full_node_swarm {
//         swarm
//             .launch_attempt()
//             .expect("Failed to launch full node swarm");
//     }

//     let libra_root_key_path = &validator_swarm.config.libra_root_key_path;
//     let validator_config = NodeConfig::load(&validator_swarm.config.config_files[0]).unwrap();
//     let waypoint = validator_config.base.waypoint.waypoint();

//     println!("To run the Libra CLI client in a separate process and connect to the validator nodes you just spawned, use this command:");

//     println!(
//         "\tcli -u {} -m {:?} --waypoint {} --chain-id {:?}",
//         format!(
//             "http://localhost:{}",
//             validator_config.json_rpc.address.port()
//         ),
//         libra_root_key_path,
//         waypoint,
//         ChainId::test().id()
//     );

//     let ports = validator_swarm.config.config_files.iter().map(|config| {
//         let validator_config = NodeConfig::load(config).unwrap();
//         let port = validator_config.json_rpc.address.port();
//         let debug_interface_port = validator_config
//             .debug_interface
//             .admission_control_node_debug_port;
//         (port, debug_interface_port)
//     });

//     let node_address_list = ports
//         .clone()
//         .map(|port| format!("localhost:{}", port.0))
//         .collect::<Vec<String>>()
//         .join(",");

//     println!("To run transaction generator run:");
//     println!(
//         "\tcluster-test --mint-file {:?} --swarm --peers {:?} --emit-tx --workers-per-ac 1",
//         libra_root_key_path, node_address_list,
//     );

//     let node_address_list = ports
//         .map(|port| format!("localhost:{}:{}", port.0, port.1))
//         .collect::<Vec<String>>()
//         .join(",");

//     println!("To run health check:");
//     println!(
//         "\tcluster-test --mint-file {:?} --swarm --peers {:?} --health-check --duration 30",
//         libra_root_key_path, node_address_list,
//     );

//     if let Some(ref swarm) = full_node_swarm {
//         let full_node_config = NodeConfig::load(&swarm.config.config_files[0]).unwrap();
//         println!("To connect to the full nodes you just spawned, use this command:");
//         println!(
//             "\tcli -u {} -m {:?} --waypoint {} --chain-id {}",
//             format!(
//                 "http://localhost:{}",
//                 full_node_config.json_rpc.address.port()
//             ),
//             libra_root_key_path,
//             waypoint,
//             ChainId::test().id(),
//         );
//     }

//     // let faucet = if args.start_faucet {
//     //     let faucet_port = libra_config::utils::get_available_port();
//     //     let server_port = validator_swarm.get_client_port(0);
//     //     println!("Starting faucet service at port: {}", faucet_port);
//     //     let process = faucet::Process::start(
//     //         args.faucet_path.as_ref().unwrap().as_ref(),
//     //         faucet_port,
//     //         server_port,
//     //         Path::new(&libra_root_key_path),
//     //     );
//     //     println!("Waiting for faucet connectivity");
//     //     process
//     //         .wait_for_connectivity()
//     //         .expect("Failed to start Faucet");
//     //     Some(process)
//     // } else {
//     //     None
//     // };

//     // if args.start_client {
//     //     let tmp_mnemonic_file = TempPath::new();
//     //     tmp_mnemonic_file.create_as_file().unwrap();
//     //
//     //     let port = validator_swarm.get_client_port(0);
//     //     let client = if let Some(ref f) = faucet {
//     //         client::InteractiveClient::new_with_inherit_io_faucet(
//     //             args.cli_path.as_ref().unwrap().as_ref(),
//     //             port,
//     //             f.mint_url(),
//     //             waypoint,
//     //         )
//     //     } else {
//     //         client::InteractiveClient::new_with_inherit_io(
//     //             args.cli_path.as_ref().unwrap().as_ref(),
//     //             port,
//     //             Path::new(&libra_root_key_path),
//     //             &tmp_mnemonic_file.path(),
//     //             waypoint,
//     //         )
//     //     };
//     //     println!("Loading client...");
//     //     let _output = client.output().expect("Failed to wait on child");
//     //     println!("Exit client.");
//     // } else {
//         // Explicitly capture CTRL-C to drop LibraSwarm.
//         let (tx, rx) = std::sync::mpsc::channel();
//         ctrlc::set_handler(move || {
//             tx.send(())
//                 .expect("failed to send unit when handling CTRL-C");
//         })
//             .expect("failed to set CTRL-C handler");
//         println!("CTRL-C to exit.");
//         rx.recv()
//             .expect("failed to receive unit when handling CTRL-C");
//     // }

//     // if let Some(dir) = &args.config_dir {
//     //     println!("Please manually cleanup {:?} after inspection", dir);
//     // }

//     println!("Exit libra-swarm.");

//     Ok(true)
// }

// // #[tauri::command]
// // pub async fn init_swarm_miner(swarm_path: String, swarm_persona: String, source_path: String) -> Result<bool, String> {
// //     let args = vec![
// //         //"-c".to_string(), "/Users/ping/.0L".to_string(),
// //         "-s".to_string(), swarm_path,
// //         "-S".to_string(), swarm_persona,
// //         "init".to_string(),
// //         //*"--source-path".to_string(), source_path
// //     ];

// //     println!("args of init miner: {:?}", args);
// //     Application::run(&APPLICATION, args);
// //     //process::exit(0);
// //     Ok(true)
// // }
