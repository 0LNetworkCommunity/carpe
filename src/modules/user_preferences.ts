import { writable } from 'svelte/store'
import { invoke } from '@tauri-apps/api/tauri'

// Define the interface for UserPreferences
interface UserPreferences {
  accounts_list_sort_column?: string
  accounts_list_sort_order?: string
}

// Create a writable store to hold the preferences
export const preferences = writable<UserPreferences>({})

// Function to load preferences from the backend
export async function loadUserPreferences() {
  try {
    const prefs = await invoke<UserPreferences>('get_user_preferences')
    preferences.set(prefs)
  } catch (error) {
    console.error('Failed to load user preferences:', error)
    // Optionally set defaults or handle errors in a specific way
    preferences.set({})
  }
}

// Function to save preferences to the backend
export async function setAccountsListPreference(sortColumn: string, sortOrder: string) {
  try {
    await invoke('set_accounts_list_preference', { sortColumn, sortOrder })
    // Update the local store after successful backend update
    preferences.update((prefs) => ({
      ...prefs,
      accounts_list_sort_column: sortColumn,
      accounts_list_sort_order: sortOrder,
    }))
  } catch (error) {
    console.error('Failed to set accounts list preference:', error)
    // Handle errors, possibly revert to old values or show user feedback
  }
}

// Initial load of preferences
loadUserPreferences()
