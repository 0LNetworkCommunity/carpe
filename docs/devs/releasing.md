# Releasing

Before creating a new TAG, please confirm that Cargo.toml file is pointing to the right libra branch.

## Create a Candidate Release

1. Update app version on files (i.e.: “0.3.0”):

- src-tauri/Cargo.toml
- src-tauri/tauri.conf.json

2. Create first candidate release TAG. i.e.: v0.3.0-rc.0

- mark TAG checkbox “pre-release”
- github actions will generate builds for OSs

3. Share builds link on the #carpe-test channel and get feedback from tests

## Update Candidate Release

1. Merge PRs with fixes or improvements
2. Create TAG. i.e.: v0.3.0-rc.1 -> v0.3.0-rc.2 -> v0.3.0-rc.3

- mark TAG checkbox “pre-release”
- github actions will generate builds for OSs

3. Share builds link on the #carpe-test channel and get feedback from tests

## Publish a Release

1. Create release TAG. i.e.: v0.3.0
2. Update docs with new installer links

- README
- Win
- Mac
- Debian

3. Update auto updater version and links

---

## Icons

If the app icon design will be changed, the high resolution file needs to be in `./app-icon.png`.
Then simply run `yarn tauri icon`, and all the icon formats will be created.

[https://tauri.studio/docs/guides/icons/](https://tauri.app/v1/guides/features/icons/#__docusaurus_skipToContent_fallback)
