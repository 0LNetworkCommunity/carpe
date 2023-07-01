
import UIkit from 'uikit'


export function notify_success(s: string) {
  UIkit.notification({
    message: `<span uk-icon=\'icon: check\'></span> ${s}`,
    pos: 'bottom-left',
    status: 'success',
    timeout: 10000
  });
}


export function notify_error(s: string) {
  UIkit.notification({
    message: `<span uk-icon=\'icon: warning\'></span> ${s}`,
    pos: 'bottom-left',
    status: 'error',
    timeout: 15000
  });
}