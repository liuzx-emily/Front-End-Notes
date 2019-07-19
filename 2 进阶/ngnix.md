## 打开后一闪就没了
在 `安装目录/logs/error.log`中可以查看原因

一般是80端口被占用，在`安装目录/conf/ngnix.conf`修改端口号后，重新打开。


---


## 示例

把前端打包之后得到的dist文件夹放在E盘根目录下，并且设置首页为`E:/dist/index.html`。

访问`http://localhost:8055`就可以看到页面了。

请求`http://localhost:8055/kitty/userInfo.do`会被转到`"http://localhost:3000/getMenus.do"`

```
server{

	listen       8055;
	server_name  localhost;

	location / {
		root   E:/dist;
		index  index.html;
	}
	location /kitty/ {
		proxy_pass   http://localhost:3000/;
	}
}

```



---



## proxy_pass说明

- 如果proxy_pass后面的url加/，表示绝对根路径；
- 如果没有/，表示相对路径，把匹配的路径部分也给代理走。



请求 `http://localhost:8055/kitty/test`


- 代理到URL：`http://localhost:3000/test.html`
  
	```
	location /kitty/ {
		proxy_pass http://localhost:3000/;
	}
	```


- 代理到URL：`http://localhost:3000/kitty/test.html`
  
	```
	location /kitty/ {
    	proxy_pass http://localhost:3000;
	}
	```


- 代理到URL：`http://localhost:3000/aaa/test.html`

	```
	location /kitty/ {
		proxy_pass http://localhost:3000/aaa/;
	}
	```


- 代理到URL：`http://127.0.0.1/aaatest.html`
	```
	location /kitty/ {
		proxy_pass http://127.0.0.1/aaa;
	}
	```
