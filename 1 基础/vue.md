## 知识点

- `$el`：挂载元素
- `$parent`、`$root`、`$children`、`$refs`
- `$attrs`
  - 包含了父作用域中除了class和style，其他所有不作为prop被识别的属性。
  - 可以通过`v-bind="$attrs"`传入内部组件。用于祖先-后代组件之间的通信

- 使用`v-html` 时，如果内容是用户自己输入的，要小心被攻击

- `v-pre`中的内容不会被编译

- `v-cloak`这个指令保持在元素上直到关联实例结束编译。和如下CSS一起用时，可以隐藏未编译完成的的元素：
    [v-cloak]{
        display: none;
    }

- `v-once`：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

- `filters`：filters里面的this不指向vue实例




---




## computed methods
computed：计算属性可以依赖其他计算属性；计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据

每次触发重新渲染时：

- computed：基于依赖进行缓存的。只在相关依赖发生改变时才会重新求值。如果依赖没有变化，那么多次访问都会立即返回之前的计算结果，不会执行计算函数。
- methods：每次都会执行函数，重新计算
  ```js
  computed:{
      // 每次触发重新渲染，不会重新计算，而是返回之前缓存的值
      now(){
          return Date.now();
      }
  }
  ```




---




## 给组件传递prop
父组件father给子组件son传递prop——settings，并且settings是个对象。  
在father中修改了settings的地址。son中要nextTick才能获取到settings的变化。（xTable组件内部就处理了这个问题）




---

