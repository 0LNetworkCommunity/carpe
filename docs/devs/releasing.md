# Release Process

**Important**: Before creating a new release tag, verify that the `Cargo.toml` file is pointing to the correct libra branch.

## Creating a Candidate Release

### 1. Update Version Numbers

Update the app version in the following files (e.g., "0.3.0"):

- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

### 2. Create Release Candidate Tag

Create your first candidate release tag (e.g., `v0.3.0-rc.0`):

- Mark the tag as "pre-release" in GitHub
- GitHub Actions will automatically generate builds for all supported operating systems

### 3. Testing and Feedback

Share the build links in the `#carpe-test` Discord channel and collect feedback from testers.

## Updating Candidate Releases

### 1. Merge Improvements

Merge pull requests containing fixes or improvements based on feedback.

### 2. Create Updated Tag

Create a new candidate tag (e.g., `v0.3.0-rc.1` → `v0.3.0-rc.2` → `v0.3.0-rc.3`):

- Mark the tag as "pre-release"
- GitHub Actions will generate new builds

### 3. Continue Testing

Share updated build links in the `#carpe-test` channel for additional testing.

## Publishing a Final Release

### 1. Create Release Tag

Create the final release tag (e.g., `v0.3.0`) without the pre-release flag.

### 2. Update Documentation

Update installer links in the following documentation:

- `README.md`
- `docs/start-carpe-windows.md`
- `docs/start-carpe-mac.md`

### 3. Update Auto-Updater

Update the auto-updater configuration with new version information and download links.

---

## Icon Management

If you need to update the app icon design:

1. Place the high-resolution source file at `./app-icon.png`
2. Run `yarn tauri icon` to generate all required icon formats automatically

For more information, see the [Tauri Icon Guide](https://tauri.app/v1/guides/features/icons/).
