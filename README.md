nginx上部署nextjs

1、在服务器上安装node、pm2


  ubuntu安装nvm
  ```
#下载安装脚本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
 
#刷新配置
source ~/.$(basename $SHELL)rc
 
#验证是否安装成功
nvm --version
  ```
然后通过nvm来安装node

***
安装pm2
```
 npm install pm2@latest -g

```

2、nextjs项目build
先执行一遍npm run build（next build)


3、增加一个package.json的scripts
```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "pm2start": "pm2 start npm --name shishikangh -- run start"
  },

```

4、进入服务器上的项目目录
```
npm run pm2start // 使用pm2 启动项目

pm2 list // 查看任务进程
pm2 stop shishikangh // 停止任务

```

5、nginx中nextjs相关配置
```
    # nextjs
    location / {
        # proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        # 关键代码 nextjs起服务的端口
        proxy_pass http://***.***.***:3000/; 
        proxy_redirect off;
    }
    # 关键代码 让nextjs页面可以访问js、css、图片等文件
    location /_next/static/ {
	  alias /root/nginx/html/shishikang/goodsDetailH5/.next/static/;
    }

```
***
* Ubuntu系统安装nodejs及nodejs升级
  * 安装
    ```
    sudo apt-get install nodejs
    sudo apt-get install npm
    ```
    
  * 升级
  ```
  sudo npm install -g n
  
  sudo n lts # latest #(升级node.js到最新版) stable #（升级node.js到最新稳定版）
  node -v
  npm -v
  ```
  * 输出
    ```
    sudo n lts
    //  提示了要重启终端或者执行 PATH="$PATH"
    ```

  * 卸载
    ```
    sudo npm uninstall npm -g
    sudo apt-get remove nodejs

    ```
