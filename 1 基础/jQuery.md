## 注意
- 只有1.x版本支持IE8-，2和3都是IE9+
  
- jQuery的trigger对a没有用。可以对a>span触发

- IE低版本中,绑定事件时，jQuery会添加行间属性 `/jQuery\d{21}="\d+"/`。  
所以直接复制html给另一个元素，会使这两个元素的行间属性 `/jQuery\d{21}/` 值相同，这会导致绑定、取消事件会互相干扰。（写jQuery分页组件时，在IE8下遇到了这个问题）

- IE8-下，有时候动画会触发多次。用`stop()`：
	```js
	subNav.slideDown("fast");
	```
	改成：
	```js
	subNav.stop();
	subNav.slideDown("fast");
	```


---





## iframe
- 父页面中取子页面元素：用contents()
    ```js
	// 根据子页面的高，改变iframe的高度。父页面中的js：
	$(function() {
		// document ready之后调用（dom结构加载完成后），保证能取到iframe元素
		changeIframeHeight();
	});
	function changeIframeHeight(){
		var obj_Iframe = $("#main_iframe");
		// iframe元素load完成之后，取子页面的高（load是在所有图片等外部文件都加载完毕后，这样就保证图片的高度已经撑起来了）
		obj_Iframe.load(function() {
			var h = parseInt(obj_Iframe.contents().find("body").css("height")) + 10;
			obj_Iframe.css("height", h + "px");
		});
	}
	```

- 子页面取父页面元素
  ```js
    // 为了保证高度正确，不能用ready，要用load
    // $(document)没有load，要用$(window).load
    $(window).load(function() {
        var h=parseInt($(document).height())+10;
        var parentIframe=$('#main_iframe', parent.document);
        parentIframe.css('height', h+"px");
	});
	```



---




## 文档就绪事件
在dom文档树加载完之后执行：	`$(document).ready(function(){});`  
简写为：`$(function(){});`





---





## 链(Chaining)
在相同的元素上，可以把动作/方法链接在一起

会变红，然后向上滑动，再然后向下滑动：
`$("#p1").css("color","red").slideUp(2000).slideDown(2000);`





---





## 动画
animate() 方法用于创建自定义动画。

使用队列功能：连续写多个animate()，会按顺序执行（前一个执行完，才开始执行下一个）

```js
// 宽变完了，等1000后，再变高
$(this).animate({width:300},2000).delay(1000).animate({height:300},2000);
```



---




## prop和attr的区别


- prop：DOM元素本身就有的属性  
	`if( $("#checkbox1").prop("checked") === false )`  
	`if( $('#option1').prop("selected") === false )`

- attr：自定义属性



---




## 取html
- outer:
	`$(".test").prop("outerHTML");`
- inner:
	`$(".test").html();`




---




## 用$创建标签
```js
// 选择div标签
$('div')
// 创建div标签，内容为空
$('<div>')
//创建元素，把div对象返回给变量a
var a=$('<div><p>段落</p></div>');

```




---





## 复制节点 clone
`clone()` 可以接收一个参数，true：复制绑定事件
```js
// 是剪贴过去
$('div').appendTo( $('span') );
// 复制过去，但是不复制事件函数
$('div').clone().appendTo( $('span') ); 
// 事件函数也复制了
$('div').clone(true).appendTo( $('span') ); 
```




---




## 包装 wrap
- `wrap()` 包装
- `wrapAll()` 整体包装 【小心，可能会改变DOM结构！】
- `wrapInner()` 内部包装
- `unwrap()` 删除包装，也就是删除父级 ( 父级是body的话删不掉body )

```js
// #nav 变为 div>#nav
$('#nav').wrap('<div>');

// #nav 变为 #nav>div
$('#nav').wrapInner('<div>');

// div>#nav 变为 #nav
$('#nav').unwrap()
```



---




## 删除元素 remove detach empty
- `remove()` - 删除被选元素（及其子元素）。返回值为被删除元素（不包含绑定事件）

	```js
	$("#div1").remove();
	//删除div,并其存到oDiv中。div绑定的事件函数不保存。
	var oDiv = $('div').remove();	
	```

	`remove()`方法也可接受一个参数，允许您对被删元素进行过滤
	```js
	// 删除 class="italic" 的所有p，而不是删除p里的所有.italic元素
	$("p").remove(".italic");
	```

- `detach()` - 删除被选元素（及其子元素）。返回值为被删除元素（包含绑定事件）

- `empty()` - 删除被选元素的所有子元素




---





## 大小
```js
$('div').css('width');	//有单位 w
$('div').width();	//无单位 w
$('div').innerWidth();	//无单位 w+p
$('div').outerWidth();	//无单位 w+p+b
$('div').outerWidth(true);	//无单位 w+p+b+m
```

原生js中：
```js
ele.style.width	// 有单位 w
ele.clientWidth	// 无单位 w+p
ele.offsetWidth	// 无单位 w+p+b
```

jq的和js的区别：jq方法可以获取`display:none`的元素的尺寸，原生js不能。



---




## 找后代
- `children()` 只找儿子，不找孙子
- `find()` 所有儿孙
```js
$("div").children();	//返回div的所有儿子
$("div").children("p.a");	//返回div的所有儿子中，是p.a的元素
$("div").find("span");	//返回div中的所有后代span
$("div").find("*");	//返回div所有后代
```



---





## index
```js
// 返回当前元素在所有兄弟节点中的位置，从0开始
$('#h').index();
```



---




## 筛选 

- 根据位置来筛选：`first() last() eq(3) slice(1,4)`
  ```js
  $("div p").first()	选取首个 <div> 元素内部的第一个 <p> 元素
  $("div p").last() 	选择最后一个 <div> 元素中的最后一个 <p> 元素
  $("p").eq(1); 		选取第二个p
  $('div').eq(-2) 	选择倒数第2个div
  $('li').slice(1,4) 	选中1，2，3
  ```

- `filter not` 针对当前元素。`has` 针对子孙元素
	```js
	$("p").filter(".url");	//返回带有类名 "url" 的所有 <p> 元素：
	$("p").not(".url");	//返回不带有类名 "url" 的所有 <p> 元素：
	$('div').filter('.box');	//能选中div.box
	$('div').has('.box');	//能选中div>.box
	```



	

---





## 事件

- `on`  
  `off`  
  `one` 只运行一次
	```js
	// 事件委托：结构：ul>(li*3)
	$('ul').on('click', 'li', function() {
		// this指向点击的li
	});

	$("p").off();	//移除p的所有事件
	$("p").off("click");	//移除p的所有点击事件

	// 事件委托的绑定和取消
	$("body").on("click", "p", fn1);
	$("body").off("click", "p", fn1); 
	```
- `trigger` `triggerHandler`
  	共同点：
    1. 能触发通过 jquery 绑定的事件处理函数，on() bind() click()等
    2. 都能触发原生元素对象上的on{eventType}绑定的事件处理函数；
	区别：
	1. trigger引起事件的浏览器默认行为（比如表单提交）；后者不引起
	2. trigger会操作所有元素；后者只影响第一个元素。
	3. trigger触发的事件会冒泡；后者不冒泡。
	4. trigger返回jQuery对象，所以可以链式调用；后者返回undefined

- 事件对象
	```js
	$('div').click( e =>{});
	```
	- `ev.pageX` 鼠标相对于文档的左边缘的位置(注意区分：原生js中的clientX是相对于可视区)
	- `ev.which` 监视输入。针对键盘和鼠标事件，这个属性能确定你到底按的是哪个键或按钮。
  	- `ev.preventDefault();	//阻止默认事件`
  	- `ev.stopPropagation();	//阻止冒泡的操作`
  	- `return false;	//阻止默认事件 + 阻止冒泡的操作`
	- `event.currentTarget` 在事件冒泡阶段中的当前DOM元素
	- `event.target`最初触发事件的DOM元素。通常用于比较event.target和this来确定事件是不是由于冒泡而触发的。经常用于事件冒泡时处理事件委托
	- `event.type` 事件的类型




---





## jQuery对象转成DOM对象 get

```js
$('#div1').innerHTML		// 报错
$('#div1').get(0).innerHTML
```




---





## text()、html()、val()、attr()等都有回调函数
```js
$("div").attr("title",function(){
	return $(this).html();
});
```