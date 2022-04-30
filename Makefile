dev: stop
	yarn tauri dev 

stop:
	killall node | true

TAG=$(shell git tag -l "*carpe*")
clean-tags:
	git push origin --delete ${TAG}
	git tag -d ${TAG}