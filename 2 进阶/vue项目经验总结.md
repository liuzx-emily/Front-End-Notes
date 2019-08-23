## 开发思路小tip

#### 问题描述
进入页面a后，需要立刻执行判断：根据用户角色不同，跳转到不同的页面。

用户角色信息是在`App.vue`中获取并存到`store`中的。

问题在于：如果直接访问页面a，那么在执行判断的时候，可能角色信息还没有获取到，此时判断会出现问题。

一种笨方法是，页面a中判断角色信息不通过全局的store，而是独立获取角色信息并在ajax的success回调中进行判断。



#### 聪明的解决方法

- 思路：确保进入页面a时，所有公共的初始化信息都获取并存到store了。

- 方式：  
  在`App.vue`中设置变量`initDone`初始化为false。只有值变为true时，才记载`#app`中的内容。  
  所有需要存到store中的都存好了之后，才把这个变量设置为`true`





---




## vue-cli项目：安装了router插件后，使用router报错：

> You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build

 解决方法：在vue.config.js中添加：
```js
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', ".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  }
}
```



---




## 引用本地图片，但是图片的地址是变量
```html
<img :src="imgUrl">
```

写法一：
```js
import img from '~/images/bg.jpg'
export default {
  data() {
    return {
      imgUrl: img,
    }
  },
};
```

写法二：
```js
export default {
  data() {
    return {
      imgUrl:require("~/images/bg.jpg"),
    }
  },
};
```



---



## bug排查
vue路由从a->b，销毁a和创建b哪个先执行？

https://blog.csdn.net/tangran0526/article/details/99729768