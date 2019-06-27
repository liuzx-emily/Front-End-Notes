##### 1.输出？

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
<summary><b>Answer</b></summary>
<p>`undefined` and `ReferenceError`</p>
</details>

---



##### 2.输出？

```js
+true;
!"Lydia";
```

<details>
<summary><b>Answer</b></summary>
<p>`1` and `false`</p>
</details>

---



##### 3.输出？

```js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);
```

<details>
<summary><b>Answer</b></summary>
<p>`true` `false` `false`</p>
<p>
```js
typeof b==="object"
```
</p>
</details>

---


##### 4.输出？

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
<summary><b>Answer</b></summary>
<p>`TypeError`</p>
</details>

---



##### 5.输出？

```js
function sum(a, b) {
    return a + b;
}

sum(1, "2");
```

<details>
<summary><b>Answer</b></summary>
<p>`"12"`</p>
</details>

---


##### 6.输出？

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
<summary><b>Answer</b></summary>
<p>`["", " is ", " years old"]` `"Lydia"` `21`</p>
</details>

---




##### 7.输出？

```js
function getAge(...args) {
    console.log(typeof args)
}

getAge(21)
```

<details>
<summary><b>Answer</b></summary>
<p>`"object"`</p>
</details>

---





##### 8.输出？

```js
const sum = eval('10*10+5')
```

- A `105`
- B `"105"`
- C `TypeError`
- D `"10*10+5"`

<details>
<summary><b>Answer</b></summary>
<p>A</p>
<p>代码以字符串形式传递进来，eval 对其求值。如果它是一个表达式，就像本例中那样，它对表达式求值。表达式是 10 * 10 + 5。这将返回数字 105。</p>
</details>

---






##### 9.cool_secret的有效期是多久？

```js
sessionStorage.setItem("cool_secret", 123);
```

- A Forever, the data doesn't get lost.
- B When the user closes the tab.
- C When the user closes the entire browser, not only the tab.
- D When the user shuts off their computer.

<details>
<summary><b>Answer</b></summary>
<p>B</p>
<p>`sessionStorage`中的数据在<b>关闭tab标签页后</b>删除，刷新页面不会删除</p>
<p>`localStorage`中的数据永远存在</p>
</details>

---




##### 10.输出？

```js
sessionStorage.setItem("cool_secret", 123);
```

- A Forever, the data doesn't get lost.
- B When the user closes the tab.
- C When the user closes the entire browser, not only the tab.
- D When the user shuts off their computer.

<details>
<summary><b>Answer</b></summary>
<p>B</p>
<p>`sessionStorage`中的数据在<b>关闭tab标签页后</b>删除，刷新页面不会删除</p>
<p>`localStorage`中的数据永远存在</p>
</details>


---




##### 11.输出？

```js
const obj = { 1: 'a', 2: 'b', 3: 'c' }
const set = new Set([1, 2, 3, 4, 5])

obj.hasOwnProperty('1')
obj.hasOwnProperty(1)
set.has('1')
set.has(1)
```

<details>
<summary><b>Answer</b></summary>
<p>`true` `true` `false` `true`</p>
</details>



---





##### 12.输出？

```js
const obj = { a: 'one', b: 'two', a: 'three' }
console.log(obj)
```

- A `{ a: "one", b: "two" }`
- B `{ b: "two", a: "three" }`
- C `{ a: "three", b: "two" }`
- D `SyntaxError`

<details>
<summary><b>Answer</b></summary>
<p>C</p>
<p>如果有多个相同的key，那么位置是第一个key出现的位置，但是值是最后一个的值。</p>
</details>



---





##### 13.输出？

```js
for (let i = 1; i < 5; i++) {
    if (i === 3) continue
    console.log(i)
}
```

<details>
<summary><b>Answer</b></summary>
<p>`1` `2` `4`</p>
<p>`continue`跳过每次迭代</p>
</details>



---




##### 13.输出？

```js
String.prototype.giveLydiaPizza = () => {
    return 'Just give Lydia pizza already!'
}

const name = 'Lydia'

name.giveLydiaPizza()
```

<details>
<summary><b>Answer</b></summary>
<p>`"Just give Lydia pizza already!"`</p>
</details>



---
