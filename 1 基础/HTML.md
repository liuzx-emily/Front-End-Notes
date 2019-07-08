## 应用程序缓存

cache manifest




---





## 地理位置
`navigator.geolocation`  
鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的。


---





## localStorage
cookie使用麻烦，存储容量小（例：农设项目地图对接出错，就是因为cookie满了存不进去了）。  

storage:
- 兼容IE8+
- 存储容量大，每个域名下能存5M
- 浏览器隐私模式下，storage不可用

1. localStorage 
   1. 永久存储
   2. 同域名下，窗口间数据共享
2. sessionStorage
   1. 当前tab的临时存储。tab关闭时，数据消失
   2. 不同的tab之间，数据不共享
   

API： `setItem` , `getItem` , `removeItem` , `clear`  
注意：storage中的key和value都是string类型，所以存取对象时需要：`JSON.stringify` `JSON.parse`


`window.onstorage`  
当数据有变动(修改或删除)时触发，在变动数据的窗口中不会触发。
用处：localStorage多个窗口间同步购物车信息（sessionStorage的数据在不同的tab之间不共享。所以这个storage事件只有tab和它的iframe之间能用。）




---







## 窗口之间通信

define窗口之间：
1. iframe之间
2. 用window.open打开的窗口

#### 同域时，父子之间可以通信。

1. iframe
	```js
	// 父 => 子
	const sonWindow = document.querySelector("#iframe1").contentWindow;
	// 子 => 父
	const fatherWindow=parent;
	// 子 => 祖宗
	const topWindow=top;
	```

2. 用window.open打开的窗口

   ```js
	// 父=>子
	const sonWindow = window.open('./a.html', '_blank');	
    // 子=>父
	const fatherWindow=window.opener;
	```

#### 跨域时，用`postMessage`
说明：跨域时还是可以获得新窗口的window对象，但是没有权限操作它。

页面 www.a.com/a.html 中通过iframe嵌套了 www.b.com/b.html
```js
// 页面a
const sonWindow = document.querySelector("#iframe1").contentWindow;
newWindow.postMessage("hello","http://www.b.com");
// 页面b
window.addEventListener('message', e =>{
	//console.log(e.data);
	//console.log(e.origin);
},false);
```




---







## ajax跨域
需要被访问的服务器设置：
```js
header('Access-Control-Allow-Origin:设置');
```




---




## ajax上传文件进度
```js
var xhr = new XMLHttpRequest();
var oUp = xhr.upload;
oUp.onprogress = function(ev) {
   // ev.loaded
   // ev.total
};
```





---





## websocket
基于TCP的双向、全双工的数据连接。  
- 双向：客户端、服务器端都能发
- 全双工：数据的发送与接受，两者同步进行。

```javascript
var ws = new WebSocket('ws://localhost:8888');
ws.onopen = function (evt) {
	console.log("连接已开启！");
	// ws.send("给服务器发信息");
};

ws.onmessage = function (evt) {
	console.log("收到服务器的信息啦: " + evt.data);
	// ws.close();
};

ws.onclose = function (evt) {
	console.log("连接关闭！");
};
```




---





## web worker
兼容性IE10+

限制：无法访问window、document等。  
所以worker不能操作DOM，不能alert和console。
我们一般用worker来做大量的计算

需要服务器环境。


```javascript
// -------------- 主页面 --------------
// 新建worker
const worker = new Worker("./worker1.js");
// 给worker下发任务
worker.postMessage(100000);
// worker传数据回来了！
worker.onmessage = e => {
	console.log("求和结果: "+e.data);
};

// -------------- worker1.js --------------
// 需要在worker文件中引用其他文件：importScripts("其他js文件")
self.onmessage = function (ev) {
	const count = ev.data;
	let sum = 0;
	console.time(1);
	for (let i = 0; i < count; i++) {
		sum += i;
	}
	console.timeEnd(1);
	self.postMessage(sum);
};
```




---





## H5中 ```<input type="新类型">```

1. email：  
	会验证输入是不是邮箱（验证很弱，1@1也能通过）  
	移动端的键盘会有变化  
2. tel：电话号码  
	无验证
	移动端会变成数字键盘  
3. range：数值选择器  
	min、max、step( 步数 )、value（当前值）  
	```html
	<input type="range" min="0" max="100" step="10" value="20">
	```
6. number：只能包含数字  
	会验证，数字之外的根本输入不进去。  
7. color：颜色选择器  
8. datetime：显示完整日期  
   datetime-local：显示完整日期，不含时区  
   time：显示时间，不含时区  
   date：显示日期  
   week：显示周  
   month：显示月





  ---





## H5中 ```<input 新属性>```

1. placeholder 
2. autocomplete 默认为on
	```html
	<input type="text" name="username" autocomplete="off">  
	```
3. autofocus 




---






## H5新API
- ```classList```  
  `length` class数量  
  `add()`
  `remove()`  
  `toggle()` 切换class。添加操作返回true，删除操作返回false
- querySelector querySelectorAll





---





## 自定义属性dataset

```html
<address data-author-name="liuzx" data-author-age="13">Author:liuzx-emily</address>
```

```js

const el = document.querySelector('address');
// liuzx
console.log(el.dataset.authorName);
// 13
console.log(el.dataset.authorAge);
// 删除自定义属性
delete el.dataset.authorAge
```



---






## JS加载顺序控制 `defer` `async`

1. `<script src="a.js"></script>`  
	浏览器暂停渲染，立刻加载并执行a.js。  
	在a.js加载和执行都完成之后，浏览器才继续渲染后续元素。

2. `<script async src="b.js"></script>`  
	浏览器一边渲染后续元素，一边加载并执行b.js。

3. `<script defer src="c.js"></script>`  
	浏览器一边渲染后续元素，一边加载c.js。  
	等所有元素的解析都完成之后，才会执行c.js。




---





## 历史管理
触发历史管理 : 
1. 跳转页面
2. `hashchange`
3. `history.pushState()`和`history.replaceState()`:在浏览历史中添加、修改记录




---





## `contenteditable="true"`