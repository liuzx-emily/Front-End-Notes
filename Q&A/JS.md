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

<details>
<summary>答案</summary>

1. 转驼峰：background-color转成backgroundColor
   ```js
	var str='background-color-ha';
	var re=/-([a-z])/g;
	var str2=str.replace(re,function(match,p1){
		return p1.toUpperCase();
	});
	alert(str2);	//backgroundColorHa
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




</details>


---
