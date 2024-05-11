// from: https://github.com/Wigtertainment/svelte-uikit-components/blob/master/src/app.d.ts

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  /* eslint @typescript-eslint/no-explicit-any: "off" */
  // Note: this is an issue with UIKIT types not being compatible
  namespace svelteHTML {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      ['uk-accordion']?: boolean
      ['uk-alert']?: boolean
      ['uk-close']?: boolean
      ['uk-grid']?: boolean
      ['uk-countdown']?: string
      ['uk-icon']?: string
      [key: string]: any
    }
  }
}

export {}
