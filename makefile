all: clean install start

clean:
	@rm -rf admin/node_modules
	@rm -rf back/node_modules
	@rm -rf front/node_modules
	@echo	'node_modules clean complete'

install:

	@cd back && npm install
	@cd ..
	@cd front && npm install
	@cd ..
	@echo	'npm install complete'

start:
	@echo 'start back'
	@cd back && pm2 start pm2.json --env production
	@cd ..
	@echo 'start front'
	@cd front && pm2 start pm2.json --env production
	@cd ..
	
dev:
	@echo 'start back'
	@cd back && pm2 start pm2.json
	@cd ..
	@echo 'start front'
	@cd front && pm2 start pm2.json
	@cd ..

end:
	@pm2 stop back front

restart:
	@pm2 restart back front


version:
	@nginx -v
	@echo 'node' && node -v
	@echo 'npm' && npm -v