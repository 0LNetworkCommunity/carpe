import { invoke } from "@tauri-apps/api/tauri";
import { account, AccountEntry } from "./accounts";
import { raise_error } from "./carpeError";


export function get_balance(a: AccountEntry) {
  invoke( "query_balance", {account: a.account})
  .then((b: number) => {
    a.balance = b
    account.set(a)
  })
  .catch((e) => raise_error(e));
}