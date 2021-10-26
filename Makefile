# Note this is for LG's machine which unexplicably must use sudo to call rust from yarn. :/ 
dev:
	sudo killall node | true && sudo yarn tauri dev 