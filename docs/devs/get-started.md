# Developing Carpe with Tauri and Svelte

Carpe leverages the power of [Tauri](https://tauri.app/) for building secure, lightweight desktop applications and [Svelte](https://svelte.dev) for creating efficient, reactive web interfaces. The project template is based on: https://github.com/jbarszczewski/tauri-svelte-template.

## Prerequisites

Before you begin, ensure you have the following dependencies installed:

### Required Software

- **Node.js**: Version 16 or higher - [Download from nodejs.org](https://nodejs.org)
- **Yarn**: Package manager - Install via npm: `npm install -g yarn`
- **Rust**: Programming language toolchain - [Install from rustup.rs](https://rustup.rs/)

### Environment Setup

- **General Tauri setup**: Follow the [official Tauri setup guide](https://tauri.app/v1/guides/)
- **Windows users**: See our specific [Windows development environment setup guide](./windows-dev-setup.md)

## Getting Started

### 1. Install Rust Dependencies

Navigate to the Tauri source directory and build the Rust backend:

```bash
cd src-tauri/
cargo build
```

### 2. Install JavaScript Dependencies

Return to the project root and install frontend dependencies:

```bash
cd ..
yarn
```

### 3. Start Development Server

Launch the development environment:

```bash
yarn dev
```

**Note**: Closing the app window will exit development/debug mode.

## Building for Production

To compile and package Carpe for distribution:

```bash
yarn build
```

This command generates:
- Optimized application builds
- Standalone executables
- Platform-specific installers

All build artifacts are placed in the `src-tauri/target/release` directory.

## Additional Resources

- **[Tauri](https://tauri.app/)**: Official Tauri project website with comprehensive documentation
- **[Svelte](https://svelte.dev)**: Svelte framework home with guides, tutorials, and API documentation
- **[Sveltestrap](https://sveltestrap.js.org)**: Bootstrap 4 components for Svelte, enabling rapid responsive UI development
