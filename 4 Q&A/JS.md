## 1 this 的指向

```js

let num=20; 

function fn_a(){console.log(num) }
function fn_b(){console.log(this.num) }

const test = {
    num: 10,
    fn1() { console.log(num)},
    fn2() { console.log(this.num)},
    fn3: () => { console.log(num); },
    fn4: () => { console.log(this.num); },
    fn5(){fn_a()},
    fn6(){fn_b()},
    fn7:()=>{fn_a()},
    fn8:()=>{fn_b()},
};

fn_a();
fn_b();
test.fn1();
test.fn2();
test.fn3();
test.fn4();
test.fn5();
test.fn6();
test.fn7();
test.fn8();

如果把第一行的声明由 const 改为 var 或者 let ，结果会有变化吗？

```

<details>
<summary>答案</summary>

```js
fn_a(); //  20
fn_b(); //  undefined
test.fn1(); // 20 【注意这里，易错，之前写成10了！！】
test.fn2(); // 10
test.fn3(); //  20
test.fn4(); // undefined
test.fn5(); //  20
test.fn6(); //  undefined
test.fn7(); //  20
test.fn8(); // undefined
```

改为 var 后，结果变为：20 20 20 10 20 20 20 20 20 20

改为 let 后，结果不变

原理：
- 在普通函数中，this 的指向取决于谁调用的。跟在哪里定义的无关
- 箭头函数没有自己的 this
- 事件绑定函数中的this，指向事件源
- 构造函数中的 this 指向实例化对象
- var 声明的变量会添加到 window下面作为属性；let 和 const 则不会（所以会出现全局作用域下，num有值，但window.num为 undefined 的情况）

</details>



---



## 2 杂七杂八

```js
// q1
+true;
!"Lydia";
+"2";
1+"2"
// q2
let num1=3;
let num2=new Number(3);
num1==num2;
num1===num2;
typeof num2;
// q3
function getAge(...args) {
    console.log(typeof args,args)
}
getAge(21);
// q4
const sum = eval('10*10+5')
// q5
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
// q6
for (let i = 1; i < 5; i++) {
    if (i === 3) continue
    console.log(i)
}
// q7
String.prototype.giveLydiaPizza = () => {
    return 'Just give Lydia pizza already!'
}
const name = 'Lydia'
name.giveLydiaPizza()
// q8
console.log(1&&2);
console.log(1||2);
// q9 如何删除对象的属性
```

<details>
<summary>答案</summary>

- Q1  : 1  ,   false ,  2  ,  "12"
- Q2  : true  ,  false  ,  "object"
- Q3  : "object"   ,   [21]
- Q4  : 105 【`eval(str)` 将字符串转化为代码执行】
- Q5  : { a: 'three', b: 'two' }  【如果有多个相同的key，那么位置是第一个key出现的位置，但是值是最后一个的值。】
- Q6  : 1 2 4
- Q7  : 'Just give Lydia pizza already!'
- Q8  : 2   ,   1
- Q9  : `delete p1.name`【delete只能删除对象的属性，不能删除变量】
- Q10  : 
- Q11  : 
- Q12  : 
- Q13  : 
</details>




---




## 3  不用第三个变量来切换两个变量的值
```js
let a=1;
let b=2;
```
<details>
<summary>答案</summary>

```js
// 方法1
[a,b]=[b,a]
// 方法2
a=a+b;
b=a-b;
a=a-b;
//  方法3
a={a:a,b:b};
b=a.a;
a=a.b;
```

</details>




---




## 4 找出数组中的最大值 ⭐
```js
let arr=[3,2,17,5];
```
<details>
<summary>答案</summary>

```js
// 方法1
Math.max(...arr)
// 方法2
Math.max.apply(null,arr)
// 方法3
arr.sort((a,b)=>a-b)[0] // 必须写排序函数，因为默认是按照字符编码顺序排的，结果是 [17,2,3,5]
```
</details>




---




## 5 将多维数组转化成1维 ⭐
```js
let arr=[1,2,[[5,9],6],[1,4,8]];
```

<details>
<summary>答案</summary>

```js
// 方法1
arr.join(",").split(",").map(i=>+i)
// 方法2
```
</details>


---



## 20 正则
1. 转驼峰：background-color转成backgroundColor
   
2. 查找字符串中出现最多的字符和个数
   
3. 给字符串加千分符
   
4. 返回一个只包含数字类型的数组。例如`js123ldka78sdasdasdfad653 -> [123,78,653]`

5. 实现函数 `check(str,word)`：判断str中是否包含单词word  
	`check("hello world","hello")` => `true`  
	`check("helloworld","hello")` => `false`  
	`check("hello","hello")` => `true`  

6. 把html格式的内容转为纯文本  
	```js
	var str = `<div class='red' id='title'>
			<p>这是段落1</p>
			<p>这是段落2</p>
		</div>`;
	```  
	转为：`"这是段落1这是段落2"`
7. 实现函数： `sensitiveWordFiltering(str,wordArr)`：敏感词过滤  
   `sensitiveWordFiltering('中国五星红旗美利坚星条旗英国米字旗',["中国","美利坚","英国"]);`  
   转为：`**五星红旗***星条旗**米字旗`

<details>
<summary>答案</summary>

1. 转驼峰：background-color转成backgroundColor
   ```js
	var str='background-color-ha';
	var re=/-([a-z])/g;
	var str2=str.replace(re,function(match,p1){
		return p1.toUpperCase();
	});
	console.log(str2);	//backgroundColorHa
	```

2. 查找字符串中出现最多的字符和个数
   ```js
   var str="abkdisaovifwodjn18djaa";
		var str2=str.split("").sort().join("");
		var resMap={};
		var maxMap={el:"",count:0};
		str2.replace(/([\d\D])\1*/g,function(match){
			var el=match[0];
			var len=match.length;
			resMap[el]=len;
			if(len>maxMap.count){
				maxMap.count=len;
				maxMap.el=el;
			}
			return match;
		});
		console.log(resMap);
		console.log(maxMap);
	```
	关键点：
		1. 思路：要想到先排序，把一样的字符排一起
		2. str不能sort，转成arr才能sort
		

3. 给字符串加千分符
   ```js
   	var str = "135452154724";
	var re = /(?=((?!\b)\d{3})+$)/g;
	str.replace(re, ",");
	```
	以后再看：http: //blog.csdn.net/sunhuaer123/article/details/16343313

4. 返回一个只包含数字类型的数组。例如`js123ldka78sdasdasdfad653 -> [123,78,653]`
   ```js
	var str = "js123ldka78sdasdasdfad653";
	var re = /[\d]+/g;
	var arr=str.match(re);	//[ '123', '78', '653' ]
	```


5. 实现函数 `check(str,word)`：判断str中是否包含单词word  
   ```js
   check("hello emily","hello");
   function check(str,word){
	   let re=new RegExp(`\b${word}\b`);
	   return re.test(str);
   }
   ```
   两个要点：
   1. 当正则需要传参的时候，一定要用new RegExp的写法来定义
   2. new RegExp('\\b'+sClass+'\\b')中的\b要写成\\b


6. 把html格式的内容转为纯文本
   ```js
	let str = 
	`<div class='red' id='title'>
		<p>这是段落1</p>
		<p>这是段落2</p>
	</div>`;
	let str2=  str.replace(/<[^>]*>|\s+/g,"");
	```
7. 敏感词过滤
   ```js
   	let res=sensitiveWordFiltering('中国五星红旗美利坚星条旗英国米字旗', ["中国", "美利坚", "英国"]);
	console.log(res);
	function sensitiveWordFiltering(str, wordArr) {
		let reStr = new RegExp(wordArr.join("|"), "g");
		let newStr = str.replace(reStr, (match => {
			return new Array(match.length).fill("*").join("");
		}));
		return newStr;
	}
   ```



</details>


---



## 21 输出？
```js
var f = function g(){ return 23; };
typeof g();
```
- A  "number"
- B "undefined"
- C "function"
- D Error
  
<details>
<summary>答案</summary>
D
这样赋值的话，g是未定义的，所以会报错。typeof f()是"number"


</details>


---




## 23 输出？
```js
var y = 1, x = y = typeof x;
x;
y;
```

<details>
<summary>答案</summary>

`"undefined"`  
`"undefined"`

逗号：优先级最低，从左到右，返回最右边操作数的值。  
赋值：从右到左。

</details>


---







## 24 输出？
```js
var foo = {
	bar: function() { return this.baz; },
	baz: 1
};
(function(){
	return typeof arguments[0]();
})(foo.bar);
```

<details>
<summary>答案</summary>

`undefined`  
函数中的this指谁，不看在哪定义的。要看在哪调用的。本题中把foo.bar作为一个独立个体传参，this指的是window


</details>


---







## 25 输出？
```js
var foo = {
   bar: function(){ return this.baz; },
   baz: 1
}
typeof (f = foo.bar)();
```

<details>
<summary>答案</summary>

`undefined`  

</details>


---







## 26 输出？
```js
var f = (function f(){ return "1"; }, function g(){ return 2; })();
f;
g;
```

<details>
<summary>答案</summary>

`2`
`Uncaught ReferenceError: g is not defined`  
逗号：优先级最低，从左到右，返回最右边操作数的值。  

</details>


---







## 27 输出？
```js
var x = 1;
if (function f(){}) {
	x += typeof f;
}
x;
```

<details>
<summary>答案</summary>

`1undefined`  
函数声明放到if的条件里时：这个函数白声明了，找不到。

</details>


---







## 28 输出？
```js
function f(){ return f; }
new f() instanceof f;
function g(){ }
new g() instanceof g;
```

<details>
<summary>答案</summary>

`false`
`true`

</details>


---







## 29 输出？
```js
with (function(x, undefined){}) length;
```

<details>
<summary>答案</summary>

`2`  
with：性能差，开发别用。只有考试题会用到。  
with语句接收的对象会添加到作用域链的前端并在代码执行完之后移除。详细见：https://blog.csdn.net/u013983998/article/details/46798691

函数.length就是形参个数（跟实参没关系）


</details>





---





## 30 用apply模拟一个bind函数
js中函数的方法call、apply、bind都是用来改变this指向的，用apply模拟一个bind函数
```js
function bind(fn,target){
// 填内容
}
const fn1=function(msg){
	return this.name+" "+msg;
};
const fn2=bind(fn1,{name:"emily"});
// 期望输出："emily 你好"
fn2("你好");
```
<details>
<summary>答案</summary>

```js
function bind(fn,target){
	return function(){
		return fn.apply(target,arguments);
	}
}
```
</details>





---




## 31 斐波那契数列 1.1.2.3.5.8.13.21.34.55
实现函数fn : fn(10)返回55

<details>
<summary>答案</summary>


```js
function fn(n){
	if(n==1||n==2){
		return 1;
	}else{
		return fn(n-1)+fn(n-2);
	}
}
function fn2(n){
	let arr=[1,1];
	while(arr.length<n){
		arr.push(arr[arr.length-1]+arr[arr.length-2]);
	}
	return arr[n];
}
fn(10);
fn2(10);
```

</details>





---





## 31 数组去重
`[1, 7, 5, 9, 5, 4, 7, 2, 1, 7]` => `[ 1, 7, 5, 9, 4, 2 ]`

<details>
<summary>答案</summary>

方法1：
```js
var arr = [1, 7, 5, 9, 5, 4, 7, 2, 1, 7];
let arr2=Array.from(new Set(arr));
// let arr2=[...new Set(arr)];
```

方法2：
```js
var arr = [1, 7, 5, 9, 5, 4, 7, 2, 1, 7];
function quChong(arr) {
	var arr2 = []; //[1]
	for (var i = 0; i < arr.length; i++) {
		let number = arr[i];
		let flag = true;
		for (var j = 0; j < arr2.length - 1; j++) {
			if (number === arr2[j]) {
				flag = false;
				break;
			}
		}
		flag && arr2.push(number);
	}
	return arr2;
}
console.log(quChong(arr)); //[ 1, 7, 5, 9, 4, 2 ]
```
</details>



---




## 32 输出？
```js
console.log("NaN == undefined", NaN == undefined);
console.log("NaN == NaN", NaN == NaN);

console.log("undefined == false",undefined == false);
console.log("null == false",null == false);
console.log("0 == false",0 == false);
```
<details>
<summary>答案</summary>

```js
NaN == undefined false
NaN == NaN false
undefined == false false
null == false false
0 == false true
```
</details>




---




## 33 new 操作符干了什么？


<details>
<summary>答案</summary>

1. 新建一个对象obj
2. 将this指向为obj
3. 执行代码...
4. 返回这个对象
</details>



---



## 34 输出？

1. ```js
	var a=a+10;
	a;
	```
2. ```js
   var b=null;
   b+10
	```
<details>
<summary>答案</summary>

1. `NaN`
2. `10`

`undefined+10` => NaN，`null+10` => 10
</details>



---




## 35 输出？
```js
var add = function(m) {
    var temp = function(n) {
        return add(m + n);
    }
    temp.toString = function() {
        return m.toString(2)
    }
    return temp;
}
console.info(add(3)(4)(5));
```
<details>
<summary>答案</summary>

`"1100"`
</details>



---




## 36 输出？

```js
var a = b = 10;
(function(){
	var a=b=20
})();
console.log(b);
```
<details>
<summary>答案</summary>
20
</details>





---




## 37 输出？
```js
var a=[1, 2, 3];
console.log(a.join());
```

<details>
<summary>答案</summary>
1,2,3
</details>





---




## 38 输出？
```js
var i = 0,j = 0;
for(; i < 10, j < 6; i++, j++){
   k = i + j; 
}
```

<details>
<summary>答案</summary>
10
</details>





---




## 39 输出？

```js
fn1();
var fn1 = function(a){ console.log(a); }
```
<details>
<summary>答案</summary>
报错
</details>





---




## 40 输出？

`"12">"9"`
<details>
<summary>答案</summary>
false
</details>





---




## 41 输出？
```js
console.log(Number(""));
console.log(+"");
console.log(parseInt(""));
console.log(parseFloat(""));
```

<details>
<summary>答案</summary>

```
0
0
NaN
NaN
```
</details>





---




## 42 第一次输出（），第二次输出（），第三次输出（）
```js
function fn1() {
   var a = 0;
   function fn2() {
      ++a;
      console.log(a);
   }
   return fn2;
}
fn1()();
var newFn = fn1();
newFn();
newFn();
```

<details>
<summary>答案</summary>
第一次输出（ 1 ），第二次输出（ 1 ），第三次输出（ 2 ）
</details>





---




## 43 arr最终为（），arr2最终为（）
```js
var arr = [1, 2];
var arr2 = arr.concat();    
arr2.push( arr.splice(1, 0) );
```

<details>
<summary>答案</summary>
arr最终为（[1, 2]），arr2最终为（[1, 2, []]）

concat：合并多个数组，返回一个新数组。不影响原始数组。
splice：修改原数组。返回值是由被删除的元素组成的一个数组。
</details>





---





## 44 输出？
```js
var str = "123abc";
console.log(typeof str++);
console.log(str);
```
<details>
<summary>答案</summary>
NaN  NaN
</details>





---




## 45 实现trim功能

`var str="      hello  emily        ";`
<details>
<summary>答案</summary>

```js
var str="      hello  emily        "
str.replace(/(^\s+)|(\s+$)/g,match=>"");
```
</details>




---




## 46 把str颠倒
<details>
<summary>答案</summary>

```js
let str2=str.split("").reverse().join("");
```

</details>




---




## 47 操作数组元素
```js
let arr=[1,2,3,4,5,6,7];
```
1. 将最后一个元素塞到第一个
2. 将第一个元素塞到最后一个
3. 把第三个元素放到第六个位置
<details>
<summary>答案</summary>


1. `arr.unshift(arr.pop());`
2. `arr.push(arr.shift())`
3. `arr.splice(5,0,arr.splice(2,1)[0])`

要点：
- pop和shift每次只能删除一个，并且返回被删除的元素。
- splice会修改原始数组，返回被删除元素组成的数组。

</details>




---




## 48 判断obj是不是数组
<details>
<summary>答案</summary>

```js
obj.constructor==Array;
obj instanceof Array;
Array.isArray(obj);
```
</details>




---




## 49 输出？
```js
let str1 = "emily";
let str2 = new String("emily");
console.log("typeof str1:", typeof str1);
console.log("typeof str2:", typeof str2);

console.log("str1.constructor == String", str1.constructor == String);
console.log("str1 instanceof String", str1 instanceof String);

str1.age = 12;
str2.age = 13;
console.log("str1.age", str1.age);
console.log("str2.age", str2.age);
```
<details>
<summary>答案</summary>

```js
typeof str1: string
typeof str2: object
str1.constructor == String true
str1 instanceof String false
str1.age undefined
str2.age 13
```
</details>




---




## 51 按照拼音排序

```js
var arr=["颠倒","啊","存储","明","版本"];
```

<details>
<summary>答案</summary>

```js
arr.sort(function(a,b){
	return a.localeCompare(b);
});
```
`localCompare` 按照当地规则来排序。中文按拼音
</details>




---





## 52 第一次输出（），第二次输出（）

```js
function t(x,y) {
  function x() {} 
  var y = 99;	  
  console.log(x);
  console.log(y);
} 
t(3,4); 
```

<details>
<summary>答案</summary>

第一次输出（`ƒ x() {}`），第二次输出（`99`）
</details>




---




## 53 输出？

```js
var a = 6;
setTimeout(function(a) {
	console.log(a);
	a = 666;
}, 1000, a);
a = 66;
```

<details>
<summary>答案</summary>

`6`
</details>




---




## 54 第一次输出（），第二次输出（）

```js
var a=1;
function f(a){
	console.log(a);
	a=2;
}
f();
console.log(a);
```

<details>
<summary>答案</summary>

第一次输出（`undefined`），第二次输出（`1`）
</details>




---




## 55 a1变为（），a2变为（）

```js
var a1 = [1,2,3];
var a2 = [1,2,3];
function f1(a){	
	a = [1,2,3,4]; 
}
function f2(a){	
	a.push(4);
}
f1(a1);
f2(a2);
```

<details>
<summary>答案</summary>

a1变为（`[1,2,3]`），a2变为（`[1,2,3,4]`）
</details>




---




## 56 输出？

```js
var a =[1,2];
setTimeout(function(a) {
	console.log(a);
	a = 666;
}, 1000, a);
a.push(3);
```

<details>
<summary>答案</summary>

```[1,2,3]```
</details>




---




## 57 输出

```js
function f(){
  a = 10;
}
console.log(a);
```

<details>
<summary>答案</summary>

```Uncaught ReferenceError: a is not defined```
</details>




---




## 58 第一次输出（），第二次输出（）  

```js
function f(){
	var a = b = 10;
}
f();
console.log(b);
console.log(a);
```

<details>
<summary>答案</summary>

第一次输出（`10`），第二次输出（`test.html:19 Uncaught ReferenceError: a is not defined`）
</details>




---




## 59 第一次输出（），第二次输出（），第3次输出（），第4次输出（）

```js
console.log(a);	
console.log(fn1);
if (true) {
	var a = 1;	
	function fn1() {}
}
console.log(a);
console.log(fn1);
```

<details>
<summary>答案</summary>

第一次输出（`undefined`）  
第二次输出（`undefined`）  
block内部的function，在高级浏览器中提升为undefined，低级IE中提升为具体函数  
第3次输出（`1`）  
第4次输出（`function fn1() {}`）
</details>




---




## 60 分别输出（）、（）

```js
var a = 10;
function fn_inner() {
	console.log(a);
}
function fn_outer() {
	var a = 20;
	fn_inner();
}
fn_outer();
```
```js
var a = 10;
function fn_outer() {
	var a = 20;
	aaa();
	function aaa() {
		console.log(a);
	}
}
fn_outer();
```

<details>
<summary>答案</summary>

分别输出（`10`）、（`20`）
</details>




---






## 61 弹出（），输出（）
```js
var a=[1,2,3];
Array.prototype.toString=function(){
	return "改了";
}
alert(a);
console.log(a);
```
<details>
<summary>答案</summary>

弹出（`"改了"`），输出（`[1,2,3]`）
</details>




---




## 62 a是（）
```js
var a=2;
function a(){};
```
<details>
<summary>答案</summary>

a是（`2`）
`function a(){}`是声明语句，不会修改变量的值。
</details>




---





## 63 在if条件中，[]是（），""是（）
```js
if([]){}
if(""){}
```
<details>
<summary>答案</summary>

在if条件中，[]是（`true`），""是（`false`）
</details>



---




## 64 输出b1会显示（），输出b2会显示（）
```js
function f1(){
	let a1=1,b1=1;
}
function f2(){
	let a2=b2=1;
}
f1();
f2();
```
<details>
<summary>答案</summary>

输出b1会显示（`报错`），输出b2会显示（`1`）

`let a1=1,b1=1;`声明a1 b1
`let a2=b2=1;`只声明a2
</details>



---




## 65 输出？
```js
function f() {
  return
  10;
}
console.log(f());
```
<details>
<summary>答案</summary>

输出(`undefined`)  

在JS中,分号是可选的。如果是一个不完整的语句,JS 将尝试读取第二行的语句。如果读到一个完整的语句,JS 将自动关闭语句。
</details>




---




## 66 jQuery中，ready和load谁先执行？


<details>
<summary>答案</summary>

DOM文档加载步骤：
1. 解析HTML结构
2. 加载外部js和css 
3. 解析并执行js 
4. 构造HTML DOM模型(`ready`)
5. 加载图片等外部文件页面加载完毕(`load`)

---

总结：
- ready：在dom结构加载完成后执行，保证js一定可以找到元素（但是图片可能没加载完，图片高度可能是0）
- load：在dom结构加载完成后，还要等待所有外部资源（图片、视频等）都加载完毕

---

页面加载时，触发顺序
  1. `$(document).ready()`
  2. `$(window).ready()`
  3. `$(window).load()`

	说明：
	- 以上三个都是在页面中可以有多个，并且都会执行（已实测）
	- 没有 $(document).load
	- 原生JS中只有window.onload（已实测）

</details>



---




## 67 输出？

```js
const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```


- A: 123
- B: 456
- C: undefined
- D: ReferenceError


<details>
<summary>答案</summary>

B

对象的键都是字符串。如果不是，会自动转换为字符串。

将对象转化为字符串时，它会变成 "[object Object]"


</details>

---



## 68 用原生 js 获取 id="a" 的节点的父节点下的所有子节点


<details>
<summary>答案</summary>

```js
const res=document.getElementById("a").parentNode.children; // 是 HTMLCollection，伪数组
const arr=Array.from(res);  // 可以转成真数组
```
</details>

---


## 69 用js递归的方式写1到100求和？

<details>
<summary>答案</summary>
```js
		function sum(num) {
			if (num === 1) {
				return 1;
			}
			return num + sum(num - 1);
		}
```
</details>

--- 

## 70 事件代理是什么？

<details>
<summary>答案</summary>
将事件绑定到目标元素的父元素上，用冒泡机制触发事件 

```js
ulEl.addEventListener('click', function(e){
    var target = event.target;  // 当前被点击的元素
    if(!!target && target.nodeName.toUpperCase() === "LI"){
        console.log(target.innerHTML);
    }
}, false);
```
</details>


---

## 71 
```js
function A() {
  this.name = 'a'
  this.color = ['green', 'yellow']
}
function B() {}
B.prototype = new A()
var b1 = new B()
var b2 = new B()

b1.name = 'change'
b1.color.push('black')

console.log(b1.name); 
console.log(b2.name); 
console.log(b1.color); 
console.log(b2.color); 
```


<details>
<summary>答案</summary>

```js
console.log(b1.name); // change
console.log(b2.name); // a
console.log(b1.color); // ['green', 'yellow', 'black']
console.log(b2.color); // ['green', 'yellow', 'black']
```
</details>


---


## 72 继承的几种方式？优缺点？

<details>
<summary>答案</summary>
### 原型链继承（将子对象的原型，指向父对象的一个实例）

```js
const Dog = function() {};
Dog.prototype = new Animal();
const d1 = new Dog();
const d2 = new Dog();
```
缺点：
- 1 创建子类实例时，不能向父类传参
- 2 子类实例继承的引用类型的属性是共享的
- 3 子类实例继承的值类型的属性，修改的话会中断继承关系（相当于给子类实例本身添加了一个同名属性）
  ```js
  d1.names.push("大黄");  // 引用类型的属性是共享的。d2.names 也会变
  d1.age=12;  // age是值类型的属性，相当于给 d1本身添加了一个属性 age，中断了 d1.age的继承关系。不会影响 d2
  ```

### 借用构造函数继承
使用 call 或者 apply，把父对象的构造函数绑定在子对象上

```js
function Animal(msg) {
  this.type = "动物";
  this.arr = ["小狗"];
  this.msg = msg || "";
}
const Dog = function(msg) {
  Animal.call(this, msg);
  // Animal.apply(this, [msg]);
};

const p1 = new Dog("汪汪");
const p2 = new Dog();
```
优点：
- 可以向父类传参
- 子类继承的引用属性不会被共享
缺点：
- 每次创建一个子类实例时，都会调用一遍父方法。
- 只是子类的实例，不是父类的实例。不算是真正的继承。`p1 instanceof Animal` 为 false

### 组合式继承

（原型链继承：继承方法） + （借用构造函数：继承属性）
优点：融合两种继承方式的优点：在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性
缺点：无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部
```js
// 父类
		function Animal(msg, type) {
			this.msg = msg || "";
			this.type = type || "";
		}
		Animal.prototype.say = function() { console.log(this.msg) };
		//  子类
		const Dog = function(msg, age) {
			// Animal.call(this, msg, "狗");
			Animal.apply(this, [msg,"狗"]);
			this.age = age || 10;
		};
		Dog.prototype = new Animal();
		//  子类实例
		const d1 = new Dog("汪汪", 5);
		const d2 = new Dog("咻", 2);
		console.log(d1);
		console.log(d2);
```
</details>


---



## 74 document.write() 、 innerHTML、outerHTML、innerText、outerText 的区别

document.write() 是整个页面替换（之前的内容全部没了），后四个都是局部替换

innerHTML：获取、设置时包含标签
innerText：获取、设置时只有文本（`oDiv.innerText="<p>哈哈</p>"`设置了，也会进行转义处理成文本，而不是p标签）

outerHTML 和 outerText 就是包含节点本身，上面两个 inner 都不包含本身




---




## 3. 永久cookie ， 临时cookie  ， localStorage，  sessionStorage

<details>
<summary>答案</summary>

cookie：一般为 4KB；有个数限制，一般不超过20个；服务器能设置，会传送到服务器；前端设置不方便
- 永久 cookie：设置了过期时间
- 临时 cookie：也称会话cookie。没有设置过期时间，则默认为 cookie 的生命周期为浏览器会话期间。关闭窗口，cookie消失
 
storage：一般为 5M；仅在浏览器中保存，不参与和服务器通信；只能存 str；设置方便
- localStorage：数据永远存在
- sessionStorage：关闭tab标签页后删除，刷新页面不会删除

</details>

---
## 73 闭包 【未完成】

for(var i = 0; i < 10; i ++) {
	bt[i].onclick = function(){
		console.log(i);
	}
}

---