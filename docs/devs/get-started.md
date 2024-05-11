# Developing and Building Carpe with Tauri and Svelte

Carpe leverages the power of [Tauri](https://tauri.app/) for building secure, lightweight desktop applications and [Svelte](https://svelte.dev) for creating efficient, reactive web interfaces. The template for Carpe can be found at: https://github.com/jbarszczewski/tauri-svelte-template.

## Get Started

To start developing with Carpe, you need to set up your development environment by installing the necessary dependencies and configuring your system.

### Dependencies

Ensure you have the following prerequisites installed:

- **Node.js**: Version 16. Download it from [https://nodejs.org](https://nodejs.org).
- **Yarn**: A dependency management system. Install it via npm with `npm install -g yarn`.
- **Rust**: The Rust programming language environment. The specific version of Rust will install automatically, but ensure you have the Rust toolchain by getting it from [https://rustup.rs/](https://rustup.rs/).

Additionally, you'll need to set up your environment for Tauri development:

- Follow the Tauri setup guide: [Setting up your environment](https://tauri.app/v1/guides/).
- For Windows users, a specific guide is available: [Windows development environment setup](./windows-dev-setup.md).

### Installation Steps

1. **Install Rust Dependencies**: Navigate to the `src-tauri/` directory and build the Rust codebase:

   ```bash
   cd src-tauri/
   cargo build
   ```

2. **Install JavaScript Dependencies**: Return to the project root directory and install the JavaScript dependencies using Yarn:

   ```bash
   cd ..
   yarn
   ```

3. **Start the Development Server**: Launch the development server with:

   ```bash
   yarn dev
   ```

Closing the app window exits the development/debug mode.

## Building and Running in Production Mode

Compile and package your Carpe application for production with:

```bash
yarn build
```

This generates an optimized version of your application, including standalone executables and installers, in the `src-tauri/target/release` directory.

## Additional Resources

- [Tauri Studio](https://tauri.app/): Official Tauri project website with comprehensive documentation.
- [Svelte](https://svelte.dev): Home of the Svelte framework, with guides, tutorials, and API documentation.
- [Sveltestrap](https://sveltestrap.js.org): Bootstrap 4 components for Svelte, facilitating quick and responsive UI development.
