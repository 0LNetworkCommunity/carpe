mod built_info {
    include!(concat!(env!("OUT_DIR"), "/built.rs"));
}

pub fn version() -> String {
    let hash: &str = match  built_info::GIT_COMMIT_HASH {
        Some(t) => &t[0..8],
        None => "",
    };
    let head = match  built_info::GIT_HEAD_REF {
        Some(t) => t,
        None => "",
    };
    format!("{}-{}-{}", built_info::PKG_VERSION, head, hash)
}