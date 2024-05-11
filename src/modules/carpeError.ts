import { writable } from 'svelte/store'
import {
  displayInsufficientBalance,
  displayDiscontinuity,
  displayInvalidProof,
  displayTooManyProofs,
  displayWrongDifficulty,
} from './carpeErrorUI'
import { notify_error } from './carpeNotify'
import { invoke } from '@tauri-apps/api/tauri'

export interface CarpeOkReturn {
  payload: string
}
export interface CarpeError {
  category: number
  uid: number
  msg: string
  trace?: string
}

export enum ErrMap {
  NoClientCx = 404,
  AccountDNE = 1004,
  InsufficientBalance = 12015, // from DiemAccount.move
  WrongDifficulty = 130102,
  TooManyProofs = 130108,
  Discontinuity = 130109,
  InvalidProof = 130110,
}
export const carpeErrorLog = writable<CarpeError[]>([])

export function raise_error(err: CarpeError, quiet = false, caller: string) {
  let hasCustomErrorDisplay = false

  // maybe we need to take an action on this error type
  if (err.category) {
    // check this is the expected type
    hasCustomErrorDisplay = errAction(err)
    err.msg = `${caller}: ${err.msg}`
  } else {
    err = {
      category: 0,
      uid: 0,
      msg: `WARN: ${caller}: error type returned is not a CarpeError. Payload: ${err}`,
    }
  }

  carpeErrorLog.update((list) => {
    list.push(err)
    return list
  })
  const display = `Error (${err.uid}): ${err.msg}`

  if (!quiet && !hasCustomErrorDisplay) {
    notify_error(display)
  }
  logger(Level.Error, err.msg)
}

export function clearErrors() {
  carpeErrorLog.set([])
}

// returns true if there is a UI for the error, so we know to display generic error notification.
export const errAction = (err: CarpeError): boolean => {
  switch (err.uid) {
    case ErrMap.NoClientCx:
      return false // todo
      break

    case ErrMap.AccountDNE:
      return false //todo
      break

    case ErrMap.WrongDifficulty:
      displayWrongDifficulty.set(err)
      break

    case ErrMap.TooManyProofs:
      displayTooManyProofs.set(err)
      break

    case ErrMap.Discontinuity:
      displayDiscontinuity.set(err)
      break

    // TODO: this last one may never/rarely occur.
    case ErrMap.InvalidProof:
      displayInvalidProof.set(err)

      break

    case ErrMap.InsufficientBalance:
      displayInsufficientBalance.set(err)

      break

    default:
      return false
      break
  }
  return true
}

export enum Level {
  Info = 'Info',
  Warn = 'Warn',
  Error = 'Error',
}

// error logging to terminal and text file
export const logger = async (level: Level, msg: string) => {
  console.log(`${new Date()} : ${level}: ${msg}`)
  invoke('log_this', {
    level,
    msg,
  }).catch((e) => raise_error(e, true, 'log_this'))
}
