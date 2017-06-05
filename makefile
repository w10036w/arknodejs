all: prepare service clean install start

prepare:
	@echo 'preparing nginx...'
	@apt-get update
	@apt-get install nginx
	@echo 'nginx installed'
	@touch /etc/nginx/sites-available/arknodejs.com && cp -i /var/www/arknodejs/config/arknodejs.com /etc/nginx/sites-available/
	@ln -s /etc/nginx/sites-enabled/arknodejs.com /etc/nginx/sites-available/arknodejs.com
	@echo 'nginx configured'

	@echo 'preparing certbot...'
	@apt-get install software-properties-common
	@add-apt-repository ppa:certbot/certbot
	@apt-get update && apt-get install certbot
	@echo 'certbot installed'
	@touch /etc/letsencrypt/configs/arknodejs.com.conf && cp -i /var/www/arknodejs/config/arknodejs.com.conf /etc/letsencrypt/configs/
	@certbot -c /etc/letsencrypt/configs/arknodejs.com.conf certonly
	@echo 'certbot configured'

	@echo 'preparing mongo...'
	@apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	@echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	@apt-get update && apt-get install -y mongodb-org
	@echo 'mongo installed'

	@echo 'preparing nodejs...'
	@curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	@apt-get install -y nodejs
	@echo 'node installed'

	@echo 'preparing pm2...'
	@npm i -g pm2
	@echo 'pm2 installed'

	@echo 'make prepare completed'

service:
	@service mongod start
	@nginx

test: 
	@echo '<-- nginx test -->'
	@systemctl status nginx
	@nginx -t
	@echo '<-- nginx tend -->'

clean:
	@rm -rf admin/node_modules
	@rm -rf back/node_modules
	@rm -rf front/node_modules
	@echo	'node_modules clean complete'

install:
	@cd back && npm i --only=production
	@cd ..
	@cd front && npm i --only=production
	@cd ..
	@echo	'npm install production complete'

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

kill:
	@pm2 kill

restart:
	@pm2 restart back front

version:
	@nginx -v
	@echo 'node' && node -v
	@echo 'npm' && npm -v