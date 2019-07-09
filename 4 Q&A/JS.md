## 1 输出？

```js
const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
};

shape.diameter();
shape.perimeter();
```

<details>
<summary>答案</summary>
<p>`undefined` and `ReferenceError`</p>
</details>



---



## 2 输出？

```js
+true;
!"Lydia";
```

<details>
<summary>答案</summary>
<p>`1` and `false`</p>
</details>



---



## 3 输出？

```js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

<details>
<summary>答案</summary>
<p>`true` `false` `false`</p>
<p>
```js
typeof b==="object"
```
</p>
</details>

---


## 4 输出？

```js
class Chameleon {
    static colorChange(newColor) {
        this.newColor = newColor;
        return this.newColor;
    }

    constructor({ newColor = "green" } = {}) {
        this.newColor = newColor;
    }
}

const freddie = new Chameleon({ newColor: "purple" });
freddie.colorChange("orange");
```

<details>
<summary>答案</summary>
<p>`TypeError`</p>
</details>



---




## 5 输出？

```js
function sum(a, b) {
    return a + b;
}

sum(1, "2");
```

<details>
<summary>答案</summary>
<p>`"12"`</p>
</details>


---



## 6 输出？

```js
function getPersonInfo(one, two, three) {
    console.log(one);
    console.log(two);
    console.log(three);
}

const person = "Lydia";
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

<details>
<summary>答案</summary>
<p>`["", " is ", " years old"]` `"Lydia"` `21`</p>
</details>

---




## 7 输出？

```js
function getAge(...args) {
    console.log(typeof args)
}

getAge(21)
```

<details>
<summary>答案</summary>
<p>`"object"`</p>
</details>

---





## 8 输出？

```js
const sum = eval('10*10+5')
```

- A `105`
- B `"105"`
- C `TypeError`
- D `"10*10+5"`

<details>
<summary>答案</summary>
<p>A</p>
<p>代码以字符串形式传递进来，eval 对其求值。如果它是一个表达式，就像本例中那样，它对表达式求值。表达式是 10 * 10 + 5。这将返回数字 105。</p>
</details>

---






## 9.cool_secret的有效期是多久？

```js
sessionStorage.setItem("cool_secret", 123);
```

- A Forever, the data doesn't get lost.
- B When the user closes the tab.
- C When the user closes the entire browser, not only the tab.
- D When the user shuts off their computer.

<details>
<summary>答案</summary>
<p>B</p>
<p>`sessionStorage`中的数据在<b>关闭tab标签页后</b>删除，刷新页面不会删除</p>
<p>`localStorage`中的数据永远存在</p>
</details>

---




## 10 输出？

```js
sessionStorage.setItem("cool_secret", 123);
```

- A Forever, the data doesn't get lost.
- B When the user closes the tab.
- C When the user closes the entire browser, not only the tab.
- D When the user shuts off their computer.

<details>
<summary>答案</summary>
<p>B</p>
<p>`sessionStorage`中的数据在<b>关闭tab标签页后</b>删除，刷新页面不会删除</p>
<p>`localStorage`中的数据永远存在</p>
</details>


---




## 11 输出？

```js
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)
```

<details>
<summary>答案</summary>
<p>`true` `true` `false` `true`</p>
</details>



---





## 12 输出？

```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

- A `{ a: "one", b: "two" }`
- B `{ b: "two", a: "three" }`
- C `{ a: "three", b: "two" }`
- D `SyntaxError`

<details>
<summary>答案</summary>
<p>C</p>
<p>如果有多个相同的key，那么位置是第一个key出现的位置，但是值是最后一个的值。</p>
</details>



---





## 13 输出？

```js
for (let i = 1; i < 5; i++) {
    if (i === 3) continue
    console.log(i)
}
```

<details>
<summary>答案</summary>
<p>`1` `2` `4`</p>
<p>`continue`跳过每次迭代</p>
</details>



---




## 13 输出？

```js
String.prototype.giveLydiaPizza = () => {
    return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
```

<details>
<summary>答案</summary>
<p>`"Just give Lydia pizza already!"`</p>
</details>



---





## 14 输出？
```js
console.log(1&&2);
console.log(1||2);
```

<details>
<summary>答案</summary>
2  
1
</details>



---



## 15 不用第三个变量来切换两个变量的值
```js
let a=1;
let b=2;
```
<details>
<summary>答案</summary>

1. `[a,b]=[b,a]`
2. ```js
   a=a+b;
   b=a-b;
   a=a-b;
   ```
3. ```js
	a={a:a,b:b};
	b=a.a;
	a=a.b;
   ```
</details>




---




## 16 找出数组中的最大值
```js
let arr=[3,2,17,5];
```
<details>
<summary>答案</summary>

- `Math.max(...arr)`
- `Math.max.apply(null,arr)`

</details>




---




## 17 将多维数组转化成1维：
```js
let arr=[1,2,[[5,9],6],[1,4,8]];
```

<details>
<summary>答案</summary>

`arr.join(",").split(",").map(i=>+i)`

</details>


---




## 18 输出？
```js
let arr1=[1,2,3];
let arr2=[4,5,6];
console.log(arr1+arr2);
```

<details>
<summary>答案</summary>

`"1,2,34,5,6"`

</details>


---




## 19 jQuery：获得ul>li*4中所有li的内容

<details>
<summary>答案</summary>

1. 用text()取值和别的函数不同。它不是返回第一个匹配元素的内容，而是返回所有匹配元素的内容
	```js
	$("ul>li").text();
	```
2. html text val attr prop都可以用function(){}
	```js
	var str="";
	$("ul>li").html(function(index,val){
		str+=val;
		return val;
	});
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







## 22 输出？
```js
(function(x){
	delete x;
	return x;
})(1);
```

<details>
<summary>答案</summary>

`1`  
delete只能删除对象的属性，删不掉x。

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


