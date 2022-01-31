# Developing and Building Carpe

[Tauri](https://tauri.studio)
[Svelte](https://svelte.dev) apps. 

Carpe is based on: https://github.com/jbarszczewski/tauri-svelte-template.


## Get started

### Dependencies

- NodeJS version 16
- Yarn
- Rust (version will install on its own)
- Setup your environment: https://tauri.studio/en/docs/getting-started/intro#setting-up-your-environment
- Windows development environment setup: [instructions](./windows-dev-setup.md)

Install the dependencies...

First Rust:
```
cd src-tauri/
cargo build

```

Then Javascript:

```bash
yarn
```

...then start development server:

```bash
yarn tauri dev
```

This will take care of running both frontend and backend of your app with watch attached to both. That means whenever you change something in `src` (svelte frontend code) or `src-tauri` (rust backend code), it will be automatically processed and hot reloaded. To finish dev/debug mode simply close the app window.

## Building and running in production mode

To create an optimised version of the app:

```bash
yarn tauri build
```

This will create standalone app and installer in `src-tauri/target/release` directory.

## Useful links

-   [Tauri](https://tauri.studio)
-   [Svelte](https://svelte.dev)
-   [Sveltestrap](https://sveltestrap.js.org)

