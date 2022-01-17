# Note this is for LG's machine which unexplicably must use sudo to call rust from yarn. :/ 
dev: stop
	NODE_ENV=test RUST_LOG=trace sudo yarn tauri dev 

stop:
	sudo killall node | true

TAG=$(shell git tag -l "*carpe*")
clean-tags:
	git push origin --delete ${TAG}
	git tag -d ${TAG}