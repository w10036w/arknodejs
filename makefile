## for Ubuntu 16.04
# apt-get install make

# setup vars
DOMAIN = arknodejs.com

COLORS:=$(shell tput colors 2> /dev/null)
ifeq ($(COLORS), 256)
    C_RESET=\033[0;39;49m
    C_GREEN=\033[38;5;118m
    C_BLUE=\033[38;5;81m
    C_RED=\033[38;5;161m
    C_PURPLE=\033[38;5;135m
    C_ORANGE=\033[38;5;208m
    C_YELLOW=\033[38;5;227m
    C_GREY=\033[38;5;245m
    C_WHITE=\033[38;5;15m
else ifeq ($(COLORS), 16)
    C_RESET=\033[0;39;49m
    C_GREEN=\033[0;32m
    C_BLUE=\033[0;34m
    C_RED=\033[0;31m
    C_PURPLE=\033[0;35m
    C_ORANGE=\033[1;31m
    C_YELLOW=\033[0;33m
    C_GREY=\033[1;30m
    C_WHITE=\033[1;37m
endif

all: prep service clean install service-start start
prep: prep-nginx prep-certbot prep-mongo prep-nodejs prep-pm2
NGINX := $(shell nginx 2>/dev/null)
prep-nginx:
ifndef NGINX
	@echo "$(C_BLUE)nginx installing...$(C_RESET)"
	@apt-get update
	@apt-get install nginx
endif
	@echo "$(C_GREEN)nginx installed$(C_RESET)"
	@cp -b /var/www/arknodejs/config/arknodejs.com /etc/nginx/sites-available/
	@ln -s /etc/nginx/sites-available/arknodejs.com /etc/nginx/sites-enabled/arknodejs.com
	@echo "$(C_GREEN)nginx configured$(C_RESET)"
CERTBOT := $(shell certbot 2>/dev/null)
prep-certbot:
ifndef CERTBOT
	@echo "$(C_BLUE)certbot installing...$(C_RESET)"
	@apt-get install software-properties-common
	@add-apt-repository ppa:certbot/certbot
	@apt-get update && apt-get install certbot
endif
	@echo "$(C_GREEN)certbot installed$(C_RESET)"
	@certbot certonly --standalone -d $(DOMAIN)
	@echo "$(C_GREEN)certbot certificate generated$(C_RESET)"
MONGO := $(shell mongod 2>/dev/null)
prep-mongo:
ifndef MONGO
	@echo "$(C_BLUE)mongodb installing...$(C_RESET)"
	@apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	@echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	@apt-get update && apt-get install -y mongodb-org
	@echo "$(C_GREEN)mongodb installed$(C_RESET)"
endif
NODEJS := $(shell node -v)
prep-nodejs:
ifndef NODEJS
	@echo "$(C_BLUE)nodejs installing...$(C_RESET)"
	@curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	@apt-get install -y nodejs
endif
	@echo "$(C_GREEN)nodejs installed$(C_RESET)"
PM2 := $(shell pm2 2>/dev/null)
prep-pm2:
ifndef PM2
	@echo "$(C_GREEN)pm2 installing...$(C_RESET)"
	@npm i -g pm2
endif
	@echo "$(C_GREEN)pm2 installed$(C_RESET)"
service-start:
	@service mongod start
	@nginx
service-end:
	@service mongod stop
	@nginx -s stop

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