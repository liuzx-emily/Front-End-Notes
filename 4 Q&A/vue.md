## 1 说说你对 SPA 单页面的理解，它的优缺点分别是什么？

<details>
<summary>答案</summary>

单页面：把传统的多页面都放在一个页面中，传统的页面间跳转转变为页面内的路由跳转。单页面初始化的时候加载了所有需要的资源，js、css。

优点：
- 跳转流畅，用户体验好。
- 没有了页面跳转时资源的重复加载，减轻了服务器的压力。


缺点：
- 初次加载耗时长。
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。


</details>



---



## 2 v-show 与 v-if 的区别，分别适合什么场景？

<details>
<summary>答案</summary>


v-if
- 是“真正”的条件渲染，在切换过程中会销毁、重建条件块内的事件监听器和子组件
- 是惰性的：如果在初始渲染时条件为假，则什么也不做。——直到条件第一次变为真时，才会开始渲染条件块。

v-show
- 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

总结
- 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销（因为如果条件为false，则v-if就省去了渲染过程）。
- 如果在运行时条件很少改变，则使用 v-if 较好。
- 如果需要非常频繁地切换，则使用 v-show 较好；

</details>



---




## 3 class和style如何动态绑定



<details>
<summary>答案</summary>

为了方便，v-bind 用于 class 和 style 时，Vue 做了专门的增强。除了传递字符串之外，还可以传递对象、数组，并且数组语法中可以使用对象语法。

```html
<div :class="demoClass">demo</div>
```
```js
computed:{
  demoClass(){
    return ["type-"+this.type,"class2",{active:this.isActive}];
  }
}
```

</details>



---



## 4 怎样理解vue中的单向数据流，为什么这样设定

<details>
<summary>答案</summary>

父级通过props向子级传递数据，这种传递是单向的：父级中对prop的更新，会传递到子级中。但是子级不能修改父级传来的prop。
如果子级中想要修改prop，需要用 $emit 派发一个自定义事件，父组件接收到后由父组件进行修改。

这样设定的原因是：防止子级意外改变父级组件的状态，致使数据流难以理解。

</details>



---




## 5 什么情况下，vue监测不到数据的变化？为什么？怎么办？


<details>
<summary>答案</summary>

(vue检测不到数据的变化的意思是：数据变了，但是视图没有更新)

### 数组
由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时
- 当你修改数组的长度时

举例：
```js
var vm = new Vue({
  data: {
    studentList: ['emily', 'mike', 'sally']
  }
})
vm.studentList[1] = 'john' // 不是响应性的
vm.studentList.length = 2 // 不是响应性的
```

为了解决第一个问题（修改数组某一项的值），Vue 提供了以下操作方法：

```js
Vue.set(vm.studentList, 1, "john");
// vm.$set 是全局方法 Vue.set的一个别名
vm.$set(vm.studentList, 1, "john");
vm.studentList.splice(1, 1, "john");
```

为了解决第二个问题（修改数组长度），Vue 提供了以下操作方法：

```js
vm.studentList.splice(newLength)
```

### 对象

还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除：
```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：
```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```
你可以添加一个新的 age 属性到嵌套的 userProfile 对象：
```js
Vue.set(vm.userProfile, 'age', 27)
vm.$set(vm.userProfile, 'age', 27)
```

有时你想向一个已有对象添加多个属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。但是，这样添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性。不要像这样：
```js
Object.assign(vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```
你应该这样做：
```js
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```


</details>



---



## 6 简述vue的生命周期


<details>
<summary>答案</summary>

创建阶段：

- beforeCreate
  - 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
  - 刚初始化了一个vue空的实例对象。这时候，这个对象上，只有默认的一些生命周期函数和默认的事件，其他的东西都未创建。

- created
  - 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
  - data 和 methods 都已经初始化完成了
  - 如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作

- beforeMount
   - 在挂载开始之前被调用：相关的 render 函数首次被调用。
   - 在内存中已经生成了一个编译好的最终模版字符串，但并没有挂载到真正的页面中。

- mounted 
  - el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
  - 此时，组件已经脱离了创建阶段，进入到了运行阶段。
  - 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，在 mounted 中再添加 $nextTick

更新阶段：

- beforeUpdate
  - 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
  - 此时，数据是新的。但是DOM还没有更新

- updated
  - 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  - 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
  -注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，在 updated 中再添加 $nextTick

销毁阶段

- beforeDestroy
  - 实例销毁之前调用。在这一步，实例仍然完全可用。
  - 此时，还没有真正执行销毁

- destroyed
  - Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  - 此时，实例已经被完全销毁了。所有的数据、方法...都已经不可用了。


</details>




---




## 7 Vue 的父组件和子组件生命周期钩子函数执行顺序？



<details>
<summary>答案</summary>

无法保证父组件和子组件的生命周期钩子的调用顺序！
[mounted 不会承诺所有的子组件也都一起被挂载。](https://cn.vuejs.org/v2/api/?#mounted)。如果你希望等到整个视图都渲染完毕，需要在mounted中再使用 $nextTick
```js
mounted: function () {
  this.$nextTick(function () {
    // Code that will run only after the entire view has been rendered
  });
}
```


</details>




---



## 8 父组件可以监听子组件的生命周期吗？



<details>
<summary>答案</summary>

可以用`@hook`来监听生命周期事件

```html
<Child @hook:mounted="handleSonMounted" ></Child>
```

顺序：子组件触发 mounted -> 父组件监听到子组件的 mounted 


</details>




---




## 9 new Vue()的时候，data是一个对象。但是组件中 data 必须是一个函数，return一个对象。为什么这样设置？


<details>
<summary>答案</summary>

因为组件是为了复用，可能调用多次。
如果组件的data是一个对象，那么每个组件实例的data都指向这同一个对象，会互相影响。

</details>



---




## 10 组件间通信方式

<details>
<summary>答案</summary>

父子
- `props` `$emit`
- `$refs` `$parent` `$children`

祖先后代
- `$attrs`/`$listeners` 
  $attrs中包含了父作用域中除了class和style，其他所有不作为prop被识别的属性。  
  可以通过`v-bind="$attrs"`传入内部组件
- `provide` / `inject`
  祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。


任意关系
- EventBus （`$emit` / `$on`）  
  一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件
- vuex


</details>




---





## 11 "vue是双向绑定的。"这句话是什么意思？怎么实现的？




<details>
<summary>答案</summary>

双向：数据 - 视图

#### 数据变化时，视图会自动更新

原理：
- 监听器 observer：在vue实例初始化阶段（beforeCreate和created之间），对数据对象进行遍历，利用 `Object.defineProperty()` 给所有属性添加 getter setter。属性值修改的时候，会触发setter。这样就监听到了数据变化！
- 解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
- 订阅者 Watcher：是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
- 订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

https://juejin.im/post/5d421bcf6fb9a06af23853f1

#### 视图变化时，数据会自动更新。

这里指的视图变化，仅仅指表单元素 input select textarea 由用户操作而导致的变化，比如输入文字、勾选checkbox等。通过 v-model 可以实现。

原理：v-model仅仅是语法糖。监听用户的输入事件以更新数据。
- text 和 textarea:监听 `input` 事件，绑定 `value` 属性 
- checkbox 和 radio:监听 `change` 事件，绑定 `checked` 属性
- select:监听 `change` 事件，绑定 `value` 属性


```html
<input type="text" v-model='hobby'>
<input type="checkbox" v-model='flag'>
```

相当于

```html
<input type="text" :value='hobby' @input="hobby=$event.target.value">
<input type="checkbox" :checked="flag" @change="flag=$event.target.checked">
```

（用js修改文本框中的内容，不会触发input事件。所以flag值不会更新）

（用js修改checkbox的勾选状态，不会触发change事件。所以flag值不会更新）




</details>



---



## 12 vue-router 路由模式有几种？原理分别是什么？


<details>
<summary>答案</summary>

- hash：根据url中的hash来实现。
  - 监听页面的hashchange事件，hash值变化的时候重新渲染页面。
  - 用户点击a标签，可以触发hash值的改变。我们也可以通过js修改`location.hash`。
  - 当hash值变化时，会触发浏览器的历史管理。所以可以通过浏览器的回退、前进来控制页面中路由的回退、前进。

- history
  - pushState 和 replaceState 来实现 URL 的变化。因为这两个方法不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。
  - 使用 window.onpopstate  来监听 url 的变化，从而对页面进行跳转（渲染）；


</details>




---




## 13 虚拟DOM是什么？实现原理？


<details>
<summary>答案</summary>


https://www.jianshu.com/p/af0b398602bc
#### 虚拟DOM是什么

先说一下浏览器渲染页面的流程，大致分为如下几个步骤：
1. 创建DOM树
2. 分析css，生成样式表
3. 结合DOM树和样式表，生成render树
4. 为render树上的每一个节点计算出精确坐标
5. 调用每个节点paint方法，把它们绘制出来

直接操作真实DOM的代价：  
在一次操作中，我需要更新10个DOM节点。浏览器收到第一个更新请求的时候，会马上执行渲染流程。第一个请求执行完，会立刻执行下一个请求，最终执行10次。但是，前9次的渲染结结果都没用到，白白浪费了性能。

用虚拟DOM的好处：  
同样，我在一次操作中需要更新10个DOM节点。使用虚拟DOM的话，它会将10次更新的内容存到js对象中，在内存中计算出最终的DOM，然后只进行一次DOM更新。

#### 原理

- 用JS对象模拟真正的DOM树
- diff：对新旧两棵虚拟DOM树进行一个深度的遍历，获得所有的差异。
- patch：将所有差异应用到真正的DOM树中

（在Vue中，Virtual DOM 是用 VNode 这个 Class 去描述）
（key是vnode的唯一标记，key可以使diff操作更快更准）


</details>





---




## 14 vue中的key有什么用




<details>
<summary>答案</summary>

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速


</details>

---




## 15 vue项目优化



<details>
<summary>答案</summary>


- 代码层面的优化
  - v-if 和 v-show 区分使用场景
  - v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
  - 在销毁组件前（beforeDestroy中），移除定时器、监听器等


</details>