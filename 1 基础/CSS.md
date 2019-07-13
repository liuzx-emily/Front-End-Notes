## 零散知识点
- 巧用margin。设定了width的block元素：  
	- 在最右 maring-left:auto  
	- 在最左 maring-right:auto  
	- 在中间 margin:0 auto

- why图片下方出现间隙？
	- 原因：一行中元素的对齐方式 vertical-align的默认值是`baseline`，但是撑开高度的是整体高度  
	- 解决：`vertical-align:top`

- 两个div，左30%，右宽70%。why一行放不下？
	- 原因：空白符也有宽度。"空白符"包括空格、tab、换行符等。在浏览器中，空白符是不会被忽略的，多个连续的空白符会自动合并成一个
	- 解决：空白符归根结底是个字符，可以通过设置`font-size:0` 控制

- 竖直方向的margin叠加
	- normal flow中block级元素的垂直margin会发生叠加
	- 举例：一连串空的p元素占用空间很小，因为它们的margin都叠加到一起，形成了一个很小的margin。
- why img元素可以设置宽高？  
	虽然img是inline元素，但它是replaced element。

- transition渐变效果
	- 处理显示、隐藏效果：对display不生效，用opacity
	- 处理高度从0到h渐变：对height不生效，用max-height

- `:before`的`content`属性可以读取行间属性。  
  可以做一些小效果，比如：鼠标悬浮时显示自制的tooltip
	```html
	<style>
	section:before{
		content:attr(tips);
	}
	</style>
	<section tips="嘿嘿嘿~">你好呀</section>
	```



---




## 属性选择器
兼容性：非常好！！在IE8中，只要声明`<!DOCTYPE html>`就ok
```html	
<a title="">a1</a>
<a title="hello">a2:hello</a>
<a title="hello student">a3:hello student</a>
<a title="hello teacher">a4:hello teacher</a>
<a title="teacher hello">a5:teacher hello</a>
<a title="hello all">a6:hello all</a>
<a title="helloall">a7:helloall</a>
```

```css
[title]{} /*选中所有*/
[title="hello"] /*精准匹配，选中2*/
[title*="hello"] /*包含就行，选中2 3 4 5 6 7*/
[title~="hello"] /*作为一个整体包含，选中2 3 4 5 6*/
[title^="hello"] /*选中2 3 4 6 7*/ 
[title$="hello"] /*选中2 5*/
```

 

---



## :选择器
兼容性：IE9+  （IE8认识:before :after）  
css是从1开始计数的，不是从0开始

- `:before`,`:after`
- `:not()`
- `element1~element2` 匹配element1 之后出现的所有 element2（不需要挨着）
- `:selection` 用户选取的部分 （浏览器默认：选中的内容变成白色字，蓝背景）
- `:nth-child(n)`  同级元素中的第n个，且这个元素必须也是E类型 `:first-child`  
	`:nth-child(-n+3)` 前3个  <b>不能写成3-n</b>  
	`:nth-child(n+5)` 从第5个开始
	`:nth-child(n+5):nth-child(-n+10)` （取交集）第5个~第10个

- `:nth-last-child(n)`  从后向前计算  `:last-child`
- `:nth-of-type(n)`  同级元素中的第n个类型为E的元素`:first-of-type` 
- `:nth-last-of-type(n)`  从后向前计算 `:last-of-type  `

- `:empty` 选取空元素。空元素：不包含子元素或文本。（可以包含空白符）  
	```html
	<!-- 会选中前两个p -->
	<p></p>
	<p> </p>
	<p>1</p>
	<p><span></span></p>
	```

- `:only-child` 选中没有兄弟的元素（不可以有兄弟元素，但是可以有兄弟文本）  
	```html
	<p>
		你好啊
		<span></span>
	</p>
	``` 
	```css
	<!-- 会匹配到span -->
	p :only-child{}
	```

- `:only-of-type` 选中没有同类型兄弟的元素

- `:target` 当前的HTML锚(url中的#)  
	```html
	<a href="#div1">目标为div1</a>
	<a href="#div2">目标为div2</a>
	<div id="div1">div1</div>
	<div id="div2">div2</div>

	<style>
	 	<!-- 点哪个a标签，就显示哪个对应的div：  -->
		div {display: none;}		
		div:target {display: block;}
	</style>
	```
- `:enabled` , `:disabled` 启用、禁用的表单元素

- `:checked` 被选中的radio、checkbox

- `:first-line` 元素中的第一行

- `:first-letter` 元素中的第一个字符


---





## float总结

1. 脱离normal flow，不脱离"文本流"。所以会有"文字环绕图片"效果  

2. 设置了float的元素，display属性恒为`block`  
	```css
	.box{
        float:left;
        display:inline-block;
    }
	```
    .box最终的display是block

3. float的元素会脱离normal flow，所以不能撑起父元素的高度。  
   想要撑起的话，必须“清除浮动”。下面是一个全兼容完美方法：
   ```css
   .fix{
	   zoom:1;
	}
   .fix:after{
	   display:block;
	   content:'';
	   clear:both;
	   height:0;
	   visibility:hidden;
	}
   ```



---




## 正常流 & 文本流

脱离正常流：  
1. 将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做它不存在。  
2. 元素不再受原先的inline、block的限制，反而比较像inline-block：可以设置w h p b m，不设置w h时，由内容撑开。

postion:absolute、fixed 脱离正常流+文本流  
float:left、right 脱离正常流，还在文本流中（所以会有"文字环绕图片"效果）




---


## IE8兼容media

@media是CSS3中的，IE8-不支持，需要额外引入respond.js。

respond.js原理：  

1. 将head中所有外部引入的CSS文件路径取出来存储到一个数组当中
2. 第二步，遍历数组，并一个个发送AJAX请求
3. AJAX回调后，分析response中的media query的min-width和max-width语法(该js仅支持这两种),分析出viewport变化区间对应相应的css块； 第四步，页面初始化时和resize时，根据当前viewport使用相应的css块。 

注意事项：

- 需要服务器环境
- 需要link外部引入CSS文件，写在style中是无效的  
- respond文件一定要放在CSS文件的后面  
- 真正的@media是算上滚动条的宽度的。但IE8-模拟出来的假media不包含滚动条。所以要使用response.js兼容IE8-，最好减去滚动条的宽度：
	```css
	<!-- 1920的屏 -->
	@media (min-width:1890px) 
	```




---





