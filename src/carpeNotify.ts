
import UIkit from 'uikit';


export function notify_success(s: string) {
  UIkit.notification({
    message: `<span uk-icon=\'icon: check\'></span> ${s}`,
    pos: 'top-center',
    status: 'success',
    timeout: 3000
  });
}


export function notify_error(s: string) {
  UIkit.notification({
    message: `<span uk-icon=\'icon: warning\'></span> ${s}`,
    pos: 'top-center',
    status: 'error',
    timeout: 3000
  });
}