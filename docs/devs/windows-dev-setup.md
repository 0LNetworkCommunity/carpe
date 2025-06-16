# Windows Development Environment Setup

Setting up Carpe for development on Windows requires specific tools and configurations not fully covered in the standard Tauri documentation. Additionally, Carpe's Rust codebase requires specialized tools beyond those needed for typical Tauri applications.

These instructions have been tested on Windows 11 but should work on Windows 10. They're designed for users with minimal Windows development experience.

⚠️ **Important Note**: While Unix-like environments (Cygwin, WSL) are common for Windows development, they won't work for Tauri app builds. Tauri depends on the Microsoft compiler and Windows SDK, which are currently only available on native Windows.

## Step 1: Install Git

**Note**: Skip this step if you already have a working Git installation.

1. Download Git from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer and select all default options
3. **Verify installation**: Open Command Prompt and run `git`. You should see Git help output.

## Step 2: Install Node.js

**Requirements**: Tauri requires Node.js version 16 (LTS).

1. Download the Windows Installer (.msi) from: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Run the installer and accept all defaults
3. **Important**: When prompted, choose to install necessary tools (this will install Chocolatey package manager)
4. **Verify installation**: Open Command Prompt and run `node --version`. You should see version 16.x.x

## Step 3: Install Yarn

Yarn installation requires Chocolatey (installed in Step 2) and must be run with administrator privileges.

1. **Open Administrator Command Prompt**: Right-click Command Prompt and select "Run as Administrator"
2. **Install Yarn**: Run the following command:
   ```cmd
   choco install yarn
   ```
3. **Verify installation**: Open a new Command Prompt window and run `yarn --version`

## Step 4: Install Microsoft Build Tools

Microsoft provides a command-line compiler toolchain called "Build Tools for Visual Studio" (BTFVS). Despite the confusing name, this allows development without installing Visual Studio.

### Download and Installation

1. **Download**: Visit the [Build Tools for Visual Studio 2022 page](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
2. Look for this download option:

   ![Download Build Tools](./img/win-screen-shot-1.png)

3. **Install with specific components**: Run the downloaded installer to open the component selector
4. **Important**: Select "Desktop development with C++" AND the additional checkboxes shown below (these are NOT selected by default):

   ![Component Selection](./img/win-screen-shot-2.png)

5. **Wait for completion**: The installation will take some time. You should see confirmation similar to:

   ![Installation Complete](./img/win-screen-shot-3.png)

## Step 5: Install LLVM

1. **Download LLVM 13.0.0**: Visit [LLVM releases](https://github.com/llvm/llvm-project/releases/tag/llvmorg-13.0.0)
2. **Important**: During installation, select "Add LLVM to the system PATH":

   ![LLVM PATH Setup](./img/win-screen-shot-4.png)

## Step 6: Set Environment Variable

Set the `LIBCLANG_PATH` environment variable to `C:\Program Files\LLVM\bin`:

1. Open **Control Panel > System and Security > System > Advanced System Settings**
2. Click **Environment Variables**
3. Add new system variable as shown:

   ![Environment Variable Setup](./img/win-screen-shot-6.png)

## Step 7: Install Rust

1. **Download Rust installer**: Visit [https://win.rustup.rs/x86_64](https://win.rustup.rs/x86_64)
2. **Run the installer**: Follow the prompts to install the latest Rust toolchain

## Step 8: Open Development Shell

The Microsoft compiler requires specific environment variables. Use the shortcut installed in Step 4:

1. **Find the shortcut**: Look in your Apps list under "Visual Studio" folder:

   ![Development Shell Shortcut](./img/win-screen-shot-5.png)

2. **Select appropriate shell**: Usually "x64 Native Tools Command Prompt for VS 2022"

## Step 9: Build Carpe

Now you can clone and build Carpe using the same commands as Linux and macOS:

```cmd
git clone https://github.com/0LNetworkCommunity/carpe.git
cd carpe
cd src-tauri
cargo build
cd ..
yarn
yarn tauri dev
```

**Build time**: The Rust compilation phase takes considerable time. Eventually, you should see output indicating a successful build with an installable `.msi` package:

![Build Success](./img/win-screen-shot-7.png)

## Step 10: Enjoy Your Development Environment

Congratulations! You now have a fully functional Carpe development environment on Windows.
