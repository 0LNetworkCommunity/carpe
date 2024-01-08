import {
  checkUpdate,
  installUpdate,
  type UpdateManifest,
  type UpdateStatus,
} from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { get, writable } from 'svelte/store'
import { format } from 'svelte-i18n'

interface WhatsUpdate {
  refreshing: boolean
  msg?: string
  error?: string
  status?: UpdateStatus
  manifest?: UpdateManifest
}

enum UpdateErrors {
  None,
  MalformedManifest = 'The update URL is not providing a valid JSON',
  InvalidSignature = "The update's code signature does not match the pubkey provided",
  KeyID = 'The key ID does not match',
}

export const updateStatus = writable<WhatsUpdate>({ refreshing: false })

export const tryUpdate = async () => {
  const u = get(updateStatus)
  u.refreshing = true
  try {
    const { shouldUpdate, manifest } = await checkUpdate()
    u.refreshing = false

    if (shouldUpdate) {
      u.msg = get(format)('upgrade.available') // use internationalization to have consistent strings. NOTE: gross dependency. The function is stored in a svelte Readable

      u.manifest = manifest

      updateStatus.set(u)

      u.msg = get(format)('upgrade.download')

      // Install the update. This will also restart the app on Windows!
      await installUpdate()

      u.msg = get(format)('upgrade.restart')
      updateStatus.set(u)
      // On macOS and Linux you will need to restart the app manually.
      // You could use this step to display another confirmation dialog.
      await relaunch()
    } else {
      u.msg = get(format)('upgrade.uptodate')
    }
    updateStatus.set(u)
  } catch (e) {
    updateStatus.update((u) => {
      u.error = e
      u.msg = parseErrorString(e).toString()
      return u
    })
  }
}

export const parseErrorString = (msg: string): UpdateErrors => {
  let errEnum = UpdateErrors.None
  if (msg.length > 0) {
    if (msg.includes('UnexpectedKeyId')) {
      errEnum = UpdateErrors.KeyID
    } else if (msg.includes('missing')) {
      errEnum = UpdateErrors.MalformedManifest
    } else if (msg.includes('InvalidSignature')) {
      errEnum = UpdateErrors.InvalidSignature
    }
  }
  return errEnum
}

// TODO: when you need a progress bar
// export const whatUpdateStep = (u: WhatsUpdate): number => {
//   switch (u.status) {
//     case 'PENDING':
//       return 1
//     case 'DOWNLOADED':
//       return 2
//     case 'DONE':
//       return 3
//     default:
//       return 0
//   }
// }
