import { invoke } from "@tauri-apps/api/tauri";

export enum Level {
  Warn = "Warn",
  Error = "Error",
}

// error logging to terminal and text file
export const logger = async (level: Level, msg: String) => {
  invoke("log_this", {
    level,
    msg,
  });
}
