//! default tauri build
fn main() {
  use std::path::Path;

  let mut opts = built::Options::default();
  opts.set_dependencies(false);
  let src = std::env::var("CARGO_MANIFEST_DIR").unwrap();
  let dst = Path::new(&std::env::var("OUT_DIR").unwrap()).join("built.rs");
  built::write_built_file_with_opts(&opts, src.as_ref(), &dst)
    .expect("Failed to acquire build-time information");
  tauri_build::build()
}
