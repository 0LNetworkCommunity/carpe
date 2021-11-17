# Note this is for LG's machine which unexplicably must use sudo to call rust from yarn. :/ 
dev: stop
	sudo yarn tauri dev 

stop:
	NODE_ENV=test sudo killall node | true

TAG=$(shell git tag -l "*carpe*")
clean-tags:
	git push origin --delete ${TAG}
	git tag -d ${TAG}