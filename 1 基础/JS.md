## 零散知识点

- 很多问题都是因为文档声明不对：`<!DOCTYPE html>`(以前帮后端查jsp报错时发现的)

- 锚点`#`可以横向定位（做移动端的时候发现的）

- `obj.select()` 选中元素中的内容，只对部分元素生效。  
  不生效的元素根本没有这个方法：`span元素.select()`会报错

- switch使用`===`来比较

- 页面中的多个`<script>`标签：从上到下依次处理。处理完一个,才去处理下一个。
	```js
	<script> 
		alert(a);	//ReferenceError: a is not defined
	</script>	
	<script>
		var a=33;
	</script>
	```
- 定时器可以传参数，IE11+ `setInterval( 函数, 毫秒，参数)`
  ```js
  var foo=1;
  setTimeout(value=>{
      alert(value);
  },1000,foo);
  foo=2;
  // 一秒之后 弹出1
  ```

- 操作属性 `el.getAttribute` , `setAttribute` , `removeAttribute`

- 使用#来实现路由跳转的SPA中，不能再用#来实现滚动定位。所以使用 `scrollIntoView` 来完成滚动定位（兼容性好，IE8开始支持基本功能）

- `null >= null `是 `true`，所以下面这样写不行
  ```js
  if (this.searchparam.startTime >= this.searchparam.endTime) {
		alert("起始时间不能晚于结束时间");
		return;
	}
  ```

- 数字取整 `~~-9.05` => `-9` （截断，不是四舍五入）

- string转数字 `+"-59.65"`





---




## Array

- 数组的长度可读可写。string的长度可读不可写。

- push unshift：一次可以加多个，返回arr的新length

- pop shift：一次只能删一个，返回被扔掉的

- splice：修改原数组，返回值：被删除的元素组成的数组  
  `splice(start, deleteCount, item1, item2, ...)`

- slice：返回一个由 start 和 end（不包括end）决定的原数组的<mark>浅拷贝</mark>。不修改原数组  
  `slice(start[,end])`  
  字符串也有slice方法

- concat：合并多个数组，返回一个新数组。不修改原数组。
  
- sort：排序，修改原数组。  
  不传递compareFunction时，元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。所以给数字排序时不准：
  ```js
  let arr=[15,25,37,200];
  arr.sort();
  arr; //[15, 200, 25, 37]
  ```

- reverse：修改原数组

- join：默认用`,`链接


 

---





## String

三个基本类型都有自己对应的包装对象：Number Boolean String。 
基本类型调用属性和方法：
   1. 新建一个对应的包装对象obj
   2. obj去调用属性、方法
   3. 销毁obj
   
- indexOf：查找字符
- includes 
- search：按正则查找
- slice：返回一个新字符串，不影响原始str  
  `slice(start[,end])`




---





## 正则

#### 创建正则
1. `let re = /a/gi;`
2. `let re = new RegExp('a','gi');`

#### []
- `[abc]` a或b或c
- `[a,b]` a或逗号或b
- `[a b]` a或空格或b
- `[^abc]` 除了abc的所有
- `[a-zA-Z0-9]`
- `[\u4e00-\u9fa5]` 中文
- `[b-f]` 也行，只要范围从小到大


#### 转义字符
- `.` 任意字符，除了换行和行结束符。
- `\s` 空白字符 （包括空格、tab、换行等）
- `\d` 数字
- `\w` 字符 (字母 数字 下划线)，等价于[0-9a-zA-Z_]
- `\b` 独立的部分 (起始 结束 空格)  \
  ```js
	/em/.test("emily"); 	// true
	/em\b/.test("emily"); 	// false
  ```
- `\S` 非空白字符，`\D` 非数字，`\W` 非字符，`\B` 非独立的部分
- `\\` 真正的\ (在str中真正的`\`也是`\\`，因为单个`\`在str里起换行的作用)
- `\/` 真正的/
- `\.` 真正的点
- `\1` 重复的第一个子项（放在小括号里的。必须跟第一个子项的值一样）
- `\2` 重复的第二个子项
  ```js
	/(\d)\1/.test("12")  	// false
  ```
#### 量词 
- `{4,7}` 最少4次，最多7次
- `{4,}`  最少4次,最多不限
- `{,7}`  最少不限，最多7次
- `{4}`   正好4次
- `+` 相当于`{1,}`
- `*` 相当于`{0,}`
- `?` 相当于`{0,1}`

#### 起始 结束
- `^` 出现在正则的最开始位置，就代表起始的意思  
  `^`写在`[]`里面的话，就代表排除的意思
- `$` 如果出现在正则的最后位置 , 就代表结束的意思  

匹配前后空格：`/^\s+|\s+$/g`

#### 常用方法
- `re.test(str)`
- `string.split(re)`
- `string.search(re)` 匹配成功就返回位置（找到多个的话，只返回第一个的位置）；失败返回-1。
- `string.replace(re,替换值或function)` 不修改原始str





---






## JS作用域

ES5只有两种：函数内部、全局作用域  
ES6新加了块级作用域(`let` `const`)

(通过var声明的变量，会被注册为window的属性。let和const不会)

#### 变量提升：
变量提升：`var`和`function`会被提升。var提升为undefined，function提升为声明的函数。  
（在高级浏览器中，块中的function变量提升为undefined）  
重名的话只留一个，优先级为：function > var，后面的优先。  

`var a=function(){}`和`function a(){}`是有着本质区别的。  
前者是赋值，发生在函数运行期。  
后者是声明，发生在词法分析期。

#### 函数执行



词法分析期
1. 处理形参 值为undefined
2. 处理实参
3. 处理函数内部声明的var和function
```js
function test(a){
  console.log(a);
  function a(){}
}
test(1);  // Function: a
```

函数运行期
- 从上到下，依次执行，变量从最近的函数体内开始找，扩散到外层函数，直到window对象中找，仍找不到即是undefined。



#### this指向
1. 作为函数调用：this -> `window`
   ```js
	sayHi();
	oDiv.onclick = function() {sayHi();};
	<div onclick="sayHi();"></div>
   ```
2. **作为对象的方法调用：this -> 对象本身**
    ```js
    var Person = {
      sayHi: function(){}
    }
    Person.sayHi();		//this指向Person对象
    oDiv.onclick = fn1;	//this指向oDiv
    ```

3. 构造函数：`this指向创建的元素`  
    ```js
    function People(name) {
      this.name = name;
    }
    var x = new People("John");	
    ```

4. 可以修改this指向：
   - `call(thisArg,参数1,参数2,参数3)` 直接执行函数
   - `apply(thisArg,[参数1,参数2,参数3])` 直接执行函数
   - `bind(thisArg,参数1,参数2,参数3)` 返回一个函数




---






## 事件

W3C规范：先进入捕获阶段，直到达到目标元素，再进入冒泡阶段


#### 默认事件
举例：
- 点击一个a链接：跳转到对应页面
- 点击form内的submit：向后端提交数据
- 在一段文字上点击并移动鼠标：选中文字
- js中运行到oBtn.focus()：光标移到oBtn中
- 右键单击：弹出右键菜单
- 按空格：页面下滚
- 鼠标滚轮：页面滚动

怎么阻止？
- 确定当前这个行为是什么事件触发的，然后在这个事件的处理函数中阻止它

	阻止右键菜单
	```js
	document.oncontextmenu = function() {
		return false;
	};
	document.attachEvent('oncontextmenu', function() {
		return false;
	});
	document.addEventListener('contextmenu', function(ev) {
		ev.preventDefault();
	});
	```

#### 绑定事件的多种方式

- `obj.onclick=f1;`  
  - 一个事件只能绑定一个函数，绑定多个会覆盖。
  - 没有捕获，只能冒泡。阻止冒泡用：
	```js
	ev.cancelBubble = true;
	ev.stopPropagation&&ev.stopPropagation();
	```
  - 阻止默认事件：`return false`
  - 取消绑定：`obj.onclick = null;`
		
- `obj.attachEvent('onclick', fn1)`  
  - 一个事件可以绑定多个函数
  - 只在IE10-中可用(经测试IE edge中不可用)
  - 没有捕获，只能冒泡，阻止冒泡：`ev.cancelBubble=true;`
  - this指向window，解决：
	```js
	obj.attachEvent('onclick', function() {
		fn1.call(obj);
	});
	```
  - 阻止默认事件：`return false`
  - 取消绑定：`obj.detachEvent('onclick', fn1);`

- `obj.addEventListener('click', fn1, false);`
  - 一个事件可以绑定多个函数
  - 标准浏览器可用(IE8-不支持)
  -  参数：true捕获 false冒泡。默认为false
  -  阻止默认事件：`preventDefault()`
  -  取消绑定：`obj.removeEventListener('click', fn1, false);`

翻译`oDiv1.onclick = fn1; `  
"给oDiv1的click事件的冒泡阶段添加事件处理函数fn1"：告诉div1,如果它接收到了一个点击事件,那么它在冒泡阶段就去执行fn1


#### 事件委托
什么时候用事件委托？
1. 元素是动态添加的。绑定事件的时候元素还没有添加到DOM结构中。
2. 场景：`ul>li*1000000`，需要给所有li绑定点击事件。如果循环给每个li绑定事件，那么会有1000000个函数存在内存当中，性能不好。


#### 存在子元素时，mouseover 和 mouseenter 的触发机制有何不同
这里不方便贴图，具体看[文章](https://blog.csdn.net/tangran0526/article/details/100765036 )  
后续备注：这个问题和拖拽时的 dragleave 问题一样。只不过拖拽API没有提供这么方便事件，只能自己硬处理。


#### 表单元素的onchange事件
用户操作可以触发`onchange`，但是用js去修改的话不能触发`onchange`  
具体看[文章](https://blog.csdn.net/tangran0526/article/details/99686744)




---




## 数据类型
- 根据typeof 5+1  
  `number string boolean function object + undefined`
- 根据所存内容 值类型+引用类型
  - 值类型：`number string boolean null undefined`  
  	其中`number string boolean`有对应的包装对象，所以可以调用方法和属性
  - 引用类型：共用地址，要小心



---






## 浮点数使用注意
JS中的所有数据都是以 64 位浮点型数据(float) 来存储。  
所有的编程语言,包括 JS,对浮点型数据的精确度都很难确定：
```js
console.log(0.07 * 100 === 7);	//false
console.log(0.1 + 0.2 === 0.3);	//false
```





---






## 用js操作css样式

#### 读取css
- `getComputedStyle(obj).width`
    1. IE8-不能用
    2. 可以获取伪类`getComputedStyle(元素, 伪类)`;
    3. 得到计算后的值,2em 20% 都会计算 得到对应的px
- `obj.currentStyle.width`
    1. 只有IE能用
    2. 不能获取伪类
    3. 不会计算,2em还是2em

兼容写法：
1. `var oStyle = oSpan.currentStyle? oSpan.currentStyle:getComputedStyle(oSpan);	`
2. `var oStyle = window.getComputedStyle ? getComputedStyle(oSpan) : oSpan.currentStyle;`  
	判断条件必须写成window.getComputedStyle，如果省略window.那么在IE8-会报错
3. 上面两个方法虽然能解决兼容问题，但是返回的值有可能不同。例：  
   设置`width: 20%`，用`getComputedStyle`得到`270px`，用`currentStyle`得到`20%` 

注意：
1. 两种方法都是只读
2. -改成驼峰：读取background-color需要写成backgroundColor
3. 不要获取复合样式,各浏览器返回不同。  
	如background: chrome会返回一长串,FF和IE9+会返回空,IE8-返回undefined
4. 不要用返回的color做判断，各浏览器返回不同。`black rgb(0,0,0) #000000`
5. 不要获取没有显式设置的值  
   比如一个div没有设置margin：chrome返回0px,FF和IE9+返回空,IE8-返回auto


#### 设置css
`obj.style.width='100px';`  
样式会添加到行间。  
不要用这种方法去读，因为只能读到行间的样式，css文件和`<style>`中的样式都读不到。





---






## 用js操作DOM结构
- 创建：`document.createElement(标签名称)`
- 添加：`父级.appendChild(要添加的元素)` `父级.insertBefore(新元素,指定元素)`
- 替换：`父级.replaceChild(新节点,被替换节点)`
- 克隆 `var cElement=元素.cloneNode(true);` 参数：是否克隆子孙，默认false。不克隆事件。
- 删除 `父级.removeChild(要删除的元素);`

注意：
如果`appendChild insertBefore replaceChild`操作的是页面中已有的节点。那么是剪切，而不是复制。

- 找儿子：`元素.children`
- 找爹：`元素.parentNode`
- 找定位爹：`元素.offsetParent` 如果没有定位父级,默认是body
- 找兄弟：`子.nextSibling` , `子.previousSibling`





---





## 涉及位置、定位的

#### 获取元素位置
- `元素.offsetLeft`：只读。当前元素外边框到定位父级的内边框的距离
- `oDiv.getBoundingClientRect().left` 只读。元素的外边框到当前窗口边框的距离

#### 可视区尺寸
- `document.documentElement.clientWidth` 只读。

#### 滚动条滚动距离
`document.body.scrollTop/scrollLeft`  
`document.documentElement.scrollTop/scrollLeft`  
有兼容问题：chrome中body写法ok，documentElement写法恒为0。其他浏览器正好相反。  
兼容：
```js
var doc = document[document.body.scrollTop ? 'body' : 'documentElement'];
console.log(doc.scrollTop);
doc.scrollTop = 500;
```

#### 文档高度
- `document.body.offsetHeight` 

#### 鼠标到viewport的偏移
- `ev.clientX`





---





## 获取元素尺寸

|               |       | 单位 |                            |
| ------------- | ----- | ---- | -------------------------- |
| `style.width` | w     | 有   | 只能操作行间，读写都行     |
| `clientWidth` | w+p   | 无   | 能读取任意位置的结果，只读 |
| `offsetWidth` | w+p+b | 无   | 能读取任意位置的结果，只读 |




---




## JS的组成
JS组成：`ECMAScript` + `DOM` + `BOM`
- ECMAScript 	
- DOM 遵从W3C标准，顶级对象是document
- BOM 各浏览器有自己的标准，顶级对象是window

window对象的双重身份
1. window是BOM的顶层对象，特指**当前**窗口
2. window不是JS对象。但是在ECMAScript中将window设定为Global对象，所以用var function声明的都成为了window的属性和方法  
```js
window.open()		//BOM中定义的open方法
window.document 	//因为ECMAScript将window定为全局变量
```




---





## 运动
参考[文章](https://www.cnblogs.com/bokebi520/p/5057380.html)

拖拽：
1. 小问题：拖拽的时候，如果有文字被选中，会产生问题。  
   原始：有文字被选中时，拖拽会触发浏览器的拖拽文字的效果  
   解决方法：阻止默认事件



---




## 面向对象

#### 构造函数 + prototype  
私有的放在构造函数中，公共的放在prototype中。 
```js
function Person(name){ 
	this.name = name;
}
Person.prototype.showName = function(){ 
	console.log(this.name);
}
const p1 = new Person("emily");
p1.showName();
```


#### constructor
创建函数`f`时，`f.prototype.constructor`会指向`f`。  
给原型对象添加方法时，如果图方便整体赋值，constructor就丢了：
```js
function Person(){}
Person.prototype = {
	sayHi:function(){},
} 
```
要修正constructor：
```js
function Person(){}
Person.prototype = {
	// 修正
	constructor:Person,
	sayHi:function(){},
} 
```


#### 原型链
每个实例化对象都有一个`_proto_`属性，指向构造函数的原型对象。   
原型链：通过`__proto__`属性串联起来的，原型链的终点都是 `Object.prototype` => `null`  
每个实例化对象都可以访问到原型链上方的所有方法、属性。规则：从下往上一级一级找。


```js
function Person() {}
var p1 = new Person();

p1.__proto__ === Person.prototype
Person.__proto__ === Function.prototype
```


#### 为什么 `p1.constructor===Person`
p1本身没有constructor属性。顺着原型链向上找，Person.prototype有constructor属性

#### `obj.hasOwnProperty("name")`  
判断obj是否有"name"这个属性/方法。原型链上找到不算，必须要是它自己的。

#### ES6中的class是语法糖




---





## canvas

- 绘图样式 fillStyle strokeStyle
  
- 常用绘图方法 fill() stroke() beginPath() moveTo(x,y) lineTo(x,y) closePath() arc() arcTo()

- 剪切 clip() 一旦剪切了某个区域，则之后所有的绘图都会被限制在此区域内。

- save() restore()

- 写字样式 font textAlign textBaseline 
  
- 写字方法 fillText strokeText measureText

- 矩形 rect fillRect strokeRect clearRect

- 变换 scale rotate translate

- 添加图片/视频 drawImage
  ```js
	// 把图片添加到画布上，缩放为400*250尺寸
	let img = new Image();
	img.onload = () => {
		ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 400, 250);
	};
	img.src = "./4.jpg";
  ```

- 保存为图片 `canvas对象.toDataURL()`

- isPointInPath(x,y) 判断特定点是否在当前路径中，只能测试最新的路径。用个空心的长方形，长方形内部也返回true。


1. rotate是绕(0,0)旋转。如果要按照某个中心旋转，就先translate移过去
2. 剪切、变换时勤用save()， restore()

#### Q：画多个长方形。鼠标点一下，判断是不是点中了某个长方形
用 `isPointInPath`。因为它只能测试最新的路径，所有要把画过的所有长方形绘画方法存下来。  
每次点击时，所有长方形重新画一遍，画一个测一个画一个测一个。
   

#### 小tips
- canvas的宽高必须在行间属性中设置，不能在css中设置。不然画画的时候定位会出错。
  ```html
	<canvas width="500" height="500"></canvas>
  ```

- （不确定）canvas不阻塞进程？
  
- 问题：边框1px变2px  
  因为边框需要向两边延申。  
  如果在(10,10)画边框，那么边框宽2px  
  如果在(10.5,10.5)画边框，那么边框宽1px

------




## canvas之ImageData

ImageData属性： 
- `width` `height`
- `data`(数组形式，存储RGBA)
  ```js
	function getColor(imageData, x, y) {
		let index = 4 * (y * imageData.width + x);
		return [imageData.data[index], 
			imageData.data[index + 1], 
			imageData.data[index + 2], 
			imageData.data[index + 3]];
	}

	function setColor(imageData, x, y, color) {
		let index = 4 * (y * imageData.width + x);
		imageData.data[index] = color[0];
		imageData.data[index + 1] = color[1];
		imageData.data[index + 2] = color[2];
		imageData.data[index + 3] = color[3];
	}
	```

ImageData方法：
- 创建新对象：
  - `ctx.createImageData(w,h)`
  - `ctx.createImageData(imageData2)` 创建与ImageData2对象尺寸相同的新对象（图像数据不会复制）

- `ctx.getImageData(x,y,w,h)`
- `ctx.putImageData(imgData,x,y)`

注意事项：只设置一个像素点的颜色是看不出来的
#### 好玩的效果：
- “沫沫”效果
- 图片变黑白色
- 图片颠倒
- 马赛克

思路：
1. 先画一张正常的图片，取到imageData1后存起来，把图片立刻清除掉。
2. 新建同尺寸的imageData2，把imageData1改一改赋给imageData2
3. 改完之后，再画上去





---




## 拖拽 drag & drop
IE8-不支持拖放

设置属性 `draggable`

事件
- 被拖的元素 `dragstart` `drag` `dragend`
- 拖入的元素 `dragenter` `dragover` `dragleave` `drop`
- 执行顺序
  `dragstart` => `drag` => `dragenter` => `dragover` => 可以drop?`drop`:`dragleave` => `dragend` 
- **默认元素不能被drop。想要drop必须在dragover事件中阻止默认事件。**不能释放、能释放的光标不一样。


火狐：默认只能拖拽图片。想要拖拽非图片，需要在该元素的dragstart中设置dataTransfer对象

#### 从元素father进入子元素son时，会触发father的dragleave事件
写“将文件从任意角度拖进页面时，全屏显示拖拽上传框A”时，出现了问题：“文件拖进来时，会显示框A。但是在拖来拖去的过程中，框A有时候会闪一下，有时候会消失”。

具体看[这篇文章](https://blog.csdn.net/tangran0526/article/details/99633918)


#### dataTransfer
方法
- `setData(key,value)` key和value都必须是string类型
- `getData(key)`

属性
- `files` 获取外部拖拽的文件，返回一个filesList列表 是类数组对象（ajax实现无刷新上传文件，用的也是files对象）

#### 拖拽外部文件
- 拖拽外部文件，鼠标抬起时，浏览器会默认打开该文件。所以需要在drop中阻止默认事件。
  



---




## FileReader对象

想要获取File对象，可以：
- 放一个 `<input type="file">`，用户自己选择文件后获得
- 放一个拖拽box，用户自己拖拽本地文件后获得File

想要不经用户操作，浏览器自己从本地读取文件是不可能的！！！  
因为这属于严重侵犯隐私的行为，是浏览器坚决不允许的。

- readAsDataURL()
- load事件：当读取文件成功完成的时候触发此事件  this.result 获取读取的文件数据
	```js
	var fr = new FileReader();
	fr.readAsDataURL(File对象);
	fr.onload = function() {
		// this.result
	};
	```



---




## 视频、音频

`audio` `video`

属性
- controls  :   显示或隐藏用户控制界面 默认隐藏
	（不写controls,音视频就藏起来了。可以这样“添加背景音乐 autoplay loop”）
- autoplay  :  媒体是否自动播放
- loop  : 媒体是否循环播放
- currentTime  :  开始到播放现在所用的时间(s) 可写
- duration  :  媒体总时间(s)(只读)
- volume  :   0.0-1.0的音量相对值
- muted  :   是否静音
- autobuffer  :   开始的时候是否缓冲加载，autoplay的时候，忽略此属性
- paused  :   媒体是否暂停(只读)
- ended   :   媒体是否播放完毕(只读)
- error   :  媒体发生错误的时候，返回错误代码 (只读)
- currentSrc  :   以字符串的形式返回媒体地址(只读)

video的独有属性：
- poster  :   视频播放前的预览图片
- width、height  :   设置视频的尺寸
- videoWidth、 videoHeight  :   视频的实际尺寸(只读)

方法
- play()
- pause()
- load() 重新加载 用途：修改src后，只有load()一下才会生效

- 事件  
  loadstart progress suspend emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange

例子
- 网页带背景音乐：隐藏video标签，自动循环播放
- canvas可以做变色 颠倒 沫沫
- 自制播放器：为了在不同浏览器下，统一外观。
  1. 注意  
  	音量为0 !==静音  
  	oninput：在内容修改后立即被触发，onchange：在内容修改，并且失去焦点后才触发
  2. 连播：ended事件 换当前视频的src，然后load()



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
（上传文件前需要先计算md5，这就可以用worker来读取文件并计算）

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




## 自定义属性dataset

value都是字符串

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
3. `history.pushState()`和`history.replaceState()` 在不进行刷新的情况下，操作浏览器的历史纪录。pushState是新增一个历史记录，replaceState是直接替换当前的历史记录

`window.onpopstate`事件：历史管理发生变化时触发
- 在浏览器某些行为下触发, 比如点击后退、前进按钮
- 在JavaScript中调用history.back()、history.forward()、history.go()方法时触发
- history的`pushState()`或 `replaceState()`不会触发！！！

（vue-router中有两种模式：hash history）



---



## 浏览历史 history


在history中跳转：`history.back()` `history.forward()` `history.go(-2)`

查看history中页面的数量：`history.length`

#### 添加、修改history
`history.pushState()`和`history.replaceState()`

假设在 http://mozilla.org/foo.html 中执行了以下代码:
```js
let stateObj = {
    foo: "bar",
};
history.pushState(stateObj, "page 2", "bar.html");
```
这将使浏览器地址栏显示为 http://mozilla.org/bar.html，但并不会导致浏览器加载 bar.html ，甚至不会检查bar.html 是否存在。

假设现在用户又访问了 http://google.com，然后点击了返回按钮。此时，地址栏将显示 http://mozilla.org/bar.html，history.state 中包含了 stateObj 的一份拷贝。页面此时展现为bar.html。且因为页面被重新加载了，所以popstate事件将不会被触发。


#### popstate事件
每当活动的历史记录项发生变化时， 会触发window的popstate 事件。如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝。




---





## H5的一些新特性
- ```classList```  
  `add()` , `remove()` , `length` class数量,  
  `toggle()` 切换class。添加操作返回true，删除操作返回false
- `querySelector` `querySelectorAll`
-  `contenteditable="true"`
- ```<input 新属性>```：placeholder  autocomplete autofocus
- ```<input type="新类型">```
  1. email 有验证，验证很弱，1@1也能通过。移动端的键盘会有变化  
  2. tel 无验证。移动端会变成数字键盘  
  3. range 数值选择器 
  4. number 会验证，数字之外的根本输入不进去。  
  5. color 
  6. datetime：显示完整日期  
     datetime-local：显示完整日期，不含时区  
     time：显示时间，不含时区  
     date：显示日期  
     week：显示周  
     month：显示月
- 地理位置 `navigator.geolocation`：因为关乎隐私，所以浏览器不允许未经用户同意使用
- 应用程序缓存 cache manifest
- ajax跨域 需要被访问的服务器设置：`Access-Control-Allow-Origin`
- ajax上传文件进度
	```js
	var xhr = new XMLHttpRequest();
	var oUp = xhr.upload;
	oUp.onprogress = function(ev) {
		// ev.loaded
		// ev.total
	};
	```




---





## modules

#### 编译时加载
ES6 模块的设计思想：尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

export 和import 命令必须在模块顶层。如果处于块级作用域内，就会报错。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。


#### export
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。
```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```
等价于
```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```
推荐使用第二种写法，因为这样就可以在脚本尾部，一眼看清楚输出了哪些变量。


export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新
```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```
上面代码输出变量foo，值为bar，500 毫秒之后变成baz。


#### import
import命令输入的变量都是只读的，因为它的本质是输入接口。

```js
import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;
```

如果a是一个对象，改写a的属性是允许的。

```js
import {a} from './xxx.js'
a.foo = 'hello'; // 合法操作
```
上面代码中，**a的属性可以成功改写，并且其他模块也可以读到改写后的值**。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。

注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
```js
foo();
import { foo } from 'my_module';
```
上面的代码不会报错，因为import的执行早于foo的调用。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。

由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

最后，import语句会执行所加载的模块，因此可以有下面的写法。

```js
// 仅仅执行lodash模块，但是不输入任何值。
import 'lodash';
```

如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
```js
// 代码加载了两次lodash，但是只会执行一次。
import 'lodash';
import 'lodash';
```

```js
import { foo } from 'my_module';
import { bar } from 'my_module';
// 上面两行 等同于下面的一行
import { foo, bar } from 'my_module';
```

#### 模块的整体加载
除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

下面是一个circle.js文件，它输出两个方法。
```js
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
现在，加载这个模块。
```js
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下：

```js
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

#### export default
为模块指定默认输出。

本质上，`export default`就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

一个模块只能有一个默认输出，因此export default命令只能使用一次。

import命令后面不用加大括号，因为只可能唯一对应export default命令。

```js
// a.js
export default function () {
  console.log('foo');
}
```

```js
// b.js
import customName from './a';
customName(); // 'foo'
```



---





