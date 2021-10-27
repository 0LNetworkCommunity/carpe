import { invoke } from "@tauri-apps/api/tauri";
import { account, AccountEntry } from "./accounts";
import { raise_error } from "./carpeError";

// TODO: clean this up
export const get_balance = async (a: AccountEntry): Promise<number> => {
  let p = invoke("query_balance", { account: a.account })
    .then((b: number) => {
      a.balance = Number(b);
      account.set(a) // also set to account state
      return Number(b)
    })
    .catch((e) => raise_error(e));
  return await p;
};
