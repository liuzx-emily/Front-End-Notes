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

