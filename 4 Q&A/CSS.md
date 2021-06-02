## 1 容器的高度固定，内部文字的高度未知。如何让文字块垂直居中？

说明：不限制dom结构，可以多套几层


<details><summary>答案</summary>

```html
<div id="outer">
	<div id="inner">文字长度不定，所以高度不定。</div>
</div>
```
```css
#outer{
	height: 500px;
	outline: 1px solid black;
	/* table-row也可以 */
	display: table;
}
#inner{
	display: table-cell;
	vertical-align: middle;
}
```
</details>



---




## 2 父容器大小不确定，子元素宽高确定，父容器不定。如何让子元素水平、垂直居中？

<details><summary>答案</summary>

```html
<div id="outer">
	<div id="inner"></div>
</div>
```
```css
#outer{
	width: 150px;
	height: 200px;
	outline:1px solid black;
	position: relative;
}
#inner{
	width: 50px;
	height: 50px;
	background:pink;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;	
}
```
</details>

 
 ---


## 3 如何选中百度链接

```html
	<a href="#/system">系统管理</a>
	<a href="www.baidu.com">百度</a>
	<a href="#/article">文章管理</a>
```
<details><summary>答案</summary>

- ```a:nth-of-type(2)```
- ```a[href$=".com"]```
- ```a:not([href^="#/"])```

</details> 



---


## 4 如何选中前两个P

```html
	<p title="hello world">Hello world</p>
	<p title="student hello">Hello CSS students!</p>
	<p title="student">Hi CSS students!</p>
```

<details><summary>答案</summary>

- ```p:nth-child(-n+2)```
- ```p:nth-last-child(n+2)```
- ```p[title*="hello"]```

</details> 



---




## 5 区分 :nth-child 和 :nth-of-type

```html
	<div>
		<p>p1</p>
		<span>span2</span>
		<p>p3</p>
		<p>p4</p>
		<p>p5</p>
	</div>
```

1. ```p:nth-child(2n)  ```
2. ```div>*:nth-child(2n)```
3. ```p:nth-of-type(2)``` 
4. ```div> *:nth-last-child(2n)``` 
分别会选中什么元素？

<details><summary>答案</summary>

1.  p4  
2.  span2 p4
3.  p3
4.  p4 span2

</details> 



---




## 6 :empty会选中谁？

```html
	<p></p>
	<p> </p>
	<p>1</p>
	<p><span></span></p>
```


<details><summary>答案</summary>
前两个p
</details> 



---



## 7 如何选中目标a
```html
<ul>
	<li>
		<a href="#"></a>
		<a href="#"></a>
	</li>
	<li>
		<a href="#"></a>
		<a href="#">目标</a>
		<a href="#"></a>
	</li>
</ul>
```

<details><summary>答案</summary>

1. ```a:not(:empty)```
2. ```li:nth-child(2) a:nth-child(2)```

</details> 





---





## 8 点击a标签，显示对应的div

```html
<a href="#div1">目标为div1</a>
<a href="#div2">目标为div2</a>
<div id="div1">div1</div>
<div id="div2">div2</div>
```

<details><summary>答案</summary>

```css
	div {
	   display: none;
	}
	
	div:target {
	   display: block;
	}
```
</details> 



---





## 9 让span2在左边，span1在右边

```html
<div>
   <span>span1</span>
   <span>span2</span>
</div>
```

<details><summary>答案</summary>

```direction: rtl;```  
span的display不能是inline
</details> 



---




## 10 文字过长显示...

<details><summary>答案</summary>

```css
p{ 
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
```
</details> 



---


## 11  calc, supports, media 分别是什么

<details><summary>答案</summary>


calc() 函数常用于动态计算长度值，比如 `width:calc(100% - 300px)`

@supports 判断当前浏览器是否支持某属性

```css
@supports (display: flex) {
  div {
    display: flex;
  }
}
@supports not (display: flex) {
  div {
    display:inline-block;
  }
}
```

@media 媒体查询，常用来判断当前窗口的大小或者类型

```css
@media screen and (min-width:900px){
  div{}
}
```

</details> 


---

## 12 水平居中、垂直居中的写法，分别写出5种

<details><summary>答案</summary>

水平居中：

- 对于行内元素，给父级设置 `text-align:center;`
- ```css
  display:block;
  width:10px;
  margin:0 auto;
  ```
- 用 calc() 【注意：垂直的居中想用 `margin-top:calc(50% - ..)` 是不行的】
  ```css
  display: inline-block; /* block 也可以 */
  width:100px;
  margin-left: calc(50% - 50px);
  ```
- 用 flex，给父级设置
  ```css
  display: flex;
  justify-content: center;
  ```
- ```css
  position:absolute; /* 父级设置 relative */
  left:50%;
  width:100px;
  margin-left:-50px; /* 也可以用 transform: translateX(-50px); */
  ```

垂直居中

- 对行内元素，把父级的`line-height` 和 `height` 设置为相同数值
- 
  ```css
  position: absolute;/* 父级设置 relative */
  top: 50%;
  height: 200px;
  margin-top: -100px; /* 也可以用transform: translateY(-100px); */
  ```
- 用 flex，给父级设置
  ```css
  display: flex;
  align-items: center;
  ```

- 用 table
  
  父级设置 `display:table` ，自身设置
  ```css
  display: table-cell;
  vertical-align: middle;
  ```

</details> 


---

## 13 `1rem、1em、1vh、1px` 分别是什么意思？

<details><summary>答案</summary>

rem: 相对于根元素 html

em：相对于父元素

vh：1vh为窗口高度的1%

px：像素，相对于屏幕分辨率  (1920*1024 ：屏幕横排有1920个像素，竖排为1024个像素)

</details> 

---

## 14 画一条0.5px的直线？


<details><summary>答案</summary>

```css
height: 1px;
transform: scaleY(0.5);
```
</details> 

---


## 15 盒模型

内容宽+padding+border+margin

标准：width 就是内容宽，默认是这种（即 box-sizing: content-box;)
怪异：width 是内容宽+p+b，可通过设置 box-sizing:border-box; 实现（老IE默认是这种）

---


## 16 画一个三角形
```css
width: 0;
height: 0;
border: 30px solid transparent;
border-bottom-color: red;
```

---

## 17 清除浮动是什么意思？怎么清？

浮动元素不能撑起父元素的高度。（如果一个元素里只有浮动元素，那它的高度会是0；如果还有非浮动子元素，那么它的高度是由这些非浮动子元素决定的。）
如果想要一个父元素自适应，即包含所有浮动元素，那么需要“清除浮动”

方法：
- 给父元素设置
    ```css
    div::after{
      content:"";
      display:block;
      clear:both;
    }
    ```

- 让父容器形成 BFC，而BFC可以包含浮动。BFC 触发方式：
  - float 为 left / right
  - ovevflow !== visible（常设置为 auto，hidden 也可）
  - display 为 table / inline-block
  - position 为 absolute / fixed