# Arknodejs Web App
Built with Vue 2.0 + vue-router + vuex, with server-side rendering.

## Features
- Server Side Rendering
    - Vue + vue-router + vuex working together
    - Server-side data pre-fetching
    - Client-side state & DOM hydration
- Single-file Vue Components
    - Hot-reload in development
    - CSS extraction for production

## File Structure
- build: webpack config for bundle in dev / prod
- client
    - components: vue components
    - plugins: vue mixins / directives / filters
    - router: vue router
    - store: vuex
    - styl: general stylus
    - views
- config: general configs
- public: mock data / static resources (js/css/img, .etc)
- server
    - api: provide api for application
    - middleware: express middlewares
    - model: model mappers (yet)
    - pass: config for passport, can be emitted if unused
    - proxy: for native models, can be emitted if unused

## Build Setup

**Requires Node.js 6+**

```
bash cmds
# install dependencies
npm i
# !!Notice!!
# then refer to this
# https://github.com/ElemeFE/vue-swipe/issues/29

# serve in dev mode, with hot reload on localhost,
# port depends on package.json port
# both frontend and backend
npm run dev
# frontend only
npm run dev-f
# backend only
npm run dev-b

# build for production
npm run build

# serve in production mode
npm start
```

## Deployment

**Requires Nginx>1.11.0 (support http2) and pm2**

```
deploy configuration
# set nginx for nodejs in nginx.conf
upstream nodejs {
    server 127.0.0.1:3000;
    keepalive 64;
}

# touch sites/arknodejs
server {
  listen         80;
  server_name    arknodejs.com;
  return         301 https://$server_name$request_uri;
}
server {
  charset utf-8;
  listen       443 ssl http2 default_server;
  server_name  arknodejs.com;
  root /usr/local/var/www/arknodejs/consumer/community;
  access_log /var/log/nginx/arknodejs.access.log access;
  error_log /var/log/nginx/arknodejs.error.log warn;

  ssl                   on;
  ssl_certificate       /usr/local/etc/nginx/ssl/arknodejs.crt;
  ssl_certificate_key   /usr/local/etc/nginx/ssl/arknodejs.key;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header    X-Forwarded-Proto-Version $http2;
    proxy_set_header    Upgrade                   $http_upgrade;
    proxy_set_header    Connection                'upgrade';
    proxy_set_header    Host                      $host;
    proxy_cache_bypass  $http_upgrade;
    proxy_redirect off;
    #proxy_set_header   X-Real-IP                 $remote_addr;
    proxy_set_header    X-Forwarded-For           $proxy_add_x_forwarded_for;
    #proxy_set_header   X-NginX-Proxy             true;
  }
  location /api {
    proxy_pass http://127.0.0.1:3003;
  }
  location /admin {
    rewrite ^/admin(.*) /$1 break;
    proxy_pass http://127.0.0.1:3001;
  }
  
  location ~ /\.(ht|svn|git|idea|vscode){
    deny all;
  }
}


# start in prod
pm2 start npm -- start

```