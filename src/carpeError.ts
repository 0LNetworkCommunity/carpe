import { writable } from 'svelte/store';
import UIkit from 'uikit';

export interface CarpeError {
  category: number;
  uid: number;
  msg: string;
};

let list_errors: CarpeError;
export const errors = writable(list_errors);

export function raise_error(err: CarpeError) {
  errors.set(err);
  console.log(err);
  error_notification(err);
}

function error_notification(err: CarpeError) {
  UIkit.notification({
    message: `<span uk-icon=\'icon: check\'></span> ${err.msg} \(code: ${err.uid}\)`,
    pos: 'bottom-center',
    status: 'error',
    timeout: 3000
  });
}
