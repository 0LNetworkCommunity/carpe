dev: stop
	yarn tauri dev

stop:
	killall node | true

TAG=$(shell git tag -l "*")
clean-tags:
	# git push od --delete ${TAG}
	git tag -d ${TAG}