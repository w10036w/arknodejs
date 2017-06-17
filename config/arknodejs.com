server {
  listen         80;
  server_name    arknodejs.com;
  return         301 https://$server_name$request_uri;
}

proxy_cache_path /etc/nginx/tmp levels=1:2 keys_zone=my_zone:10m inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";

server {
  charset utf-8;
  listen       443 ssl http2 fastopen=3 reuseport;
  server_name  arknodejs.com;

  ssl                   on;
  ssl_certificate /etc/letsencrypt/live/arknodejs.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/arknodejs.com/privkey.pem;
  #add_header Strict-Transport-Security max-age=63072000;
  #add_header X-Frame-Options DENY;
  #add_header X-Content-Type-Options nosniff;

  location / {
    proxy_pass http://127.0.0.1:8002;
    # proxy_pass http://127.0.0.1:8003;
    proxy_set_header    X-Forwarded-Proto-Version $http2;
    proxy_set_header    Upgrade                   $http_upgrade;
    proxy_set_header    Connection                'upgrade';
    proxy_set_header    Host                      $host;
    proxy_cache_bypass  $http_upgrade;
    proxy_redirect off;
    #proxy_set_header   X-Real-IP                 $remote_addr;
    proxy_set_header    X-Forwarded-For           $proxy_add_x_forwarded_for;
    #proxy_set_header   X-NginX-Proxy             true;
    #add_header          X-Proxy-Cache             $upstream_cache_status;
    #proxy_cache         my_zone;
    #include            proxy_params;
  }
  #if only one domain
  location /api {
    proxy_pass http://127.0.0.1:8000;
  }
  location /ws {
    proxy_pass http://127.0.0.1:8001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location /admin {
    rewrite ^/admin(.*) /$1 break;
    proxy_pass http://127.0.0.1:8003;
  }

  location ~ /\.(ht|svn|git|idea|vscode){
    deny all;
  }
  # Feed
  location ~* \.(?:rss|atom)$ {
    expires 1h;
    add_header Cache-Control "public";
  }

  # CSS and Javascript
  #location ~* \.(?:css|js)$ {
  #  expires 1y;
  #  access_log off;
  #  add_header Cache-Control "public";
  #}
}
