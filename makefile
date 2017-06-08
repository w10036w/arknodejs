# apt-get install make

# setup vars
DOMAIN = arknodejs.com
all: prep service clean install start

# tput color code:
# 0 black
# 1 red
# 2 green
# 3 yellow
# 4 blue
# 5 magenta
# 6 cyan
# 7 white
# $(tput setab 7) [set background color]

prep: prep-nginx prep-certbot prep-mongo prep-nodejs prep-pm2

prep-nginx:
	@echo -e "\x1b[1m$(tput setaf 3)preparing nginx...$(tput sgr 0)"
	@apt-get update
	@apt-get install nginx
	@echo -e "\x1b[1m$(tput setaf 2)nginx installed$(tput sgr 0)"
	@touch /etc/nginx/sites-available/arknodejs.com && cp -b /var/www/arknodejs/config/arknodejs.com /etc/nginx/sites-available/
	@ln -s /etc/nginx/sites-available/arknodejs.com /etc/nginx/sites-enabled/arknodejs.com
	@echo -e "\x1b[1m$(tput setaf 2)nginx configured$(tput sgr 0)"
prep-certbot:
	@echo -e "\x1b[1m$(tput setaf 3)preparing certbot...$(tput sgr 0)"
	@apt-get install software-properties-common
	@add-apt-repository ppa:certbot/certbot
	@apt-get update && apt-get install certbot
	@echo -e "\x1b[1m$(tput setaf 2)certbot installed$(tput sgr 0)"
# @mkdir /etc/letsencrypt/configs && cp -i /var/www/arknodejs/config/arknodejs.com.conf /etc/letsencrypt/configs/
#	@certbot -c /etc/letsencrypt/configs/arknodejs.com.conf certonly
	@certbot certonly --standalone -d $(DOMAIN)
	@echo -e "\x1b[1m$(tput setaf 2)certbot cert generated$(tput sgr 0)"
prep-mongo:
	@echo -e "\x1b[1m$(tput setaf 3)preparing mongo...$(tput sgr 0)"
	@apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	@echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	@apt-get update && apt-get install -y mongodb-org
	@echo -e "\x1b[1m$(tput setaf 2)mongo installed$(tput sgr 0)"
prep-nodejs:
	@echo -e "\x1b[1m$(tput setaf 3)preparing nodejs...$(tput sgr 0)"
	@curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	@apt-get install -y nodejs
	@echo -e "\x1b[1m$(tput setaf 2)node installed$(tput sgr 0)"
prep-pm2:
	@echo -e "\x1b[1m$(tput setaf 3)preparing pm2...$(tput sgr 0)"
	@npm i -g pm2
	@echo -e "\x1b[1m$(tput setaf 2)pm2 installed$(tput sgr 0)"

service:
	@service mongod start
	@nginx

test: 
	@echo "<-- nginx test -->"
	@systemctl status nginx
	@nginx -t
	@echo "<-- nginx tend -->"

clean:
	@rm -rf admin/node_modules
	@rm -rf back/node_modules
	@rm -rf front/node_modules
	@echo	"node_modules clean complete"

install:
	@cd back && npm i --only=production
	@cd ..
	@cd front && npm i --only=production
	@cd ..
	@echo	"npm install production complete"

start:
	@echo "start back"
	@cd back && pm2 start pm2.json --env production
	@cd ..
	@echo "start front"
	@cd front && pm2 start pm2.json --env production
	@cd ..

dev:
	@echo "start back"
	@cd back && pm2 start pm2.json
	@cd ..
	@echo "start front"
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
	@echo "node" && node -v
	@echo "npm" && npm -v