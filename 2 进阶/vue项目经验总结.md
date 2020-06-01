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


---


  
## 修改 webpack 配置

#### 审查项目的webpack配置
[具体看这里](https://cli.vuejs.org/zh/guide/webpack.html#%E5%AE%A1%E6%9F%A5%E9%A1%B9%E7%9B%AE%E7%9A%84-webpack-%E9%85%8D%E7%BD%AE)  

将 production 模式下的配置，输出到文件production.config.js中

`vue inspect --mode production > production.config.js`





---




## 引入前端单元测试 jest

1. 在已创建的项目中安装 `vue add @vue/unit-jest`
2. jest不支持ES6的import语法。查阅资料后发现：Since jest runs in node, we also don't have to transpile anything that uses modern ECMAScript features as Node >=8 already supports these features, so it's a sensible default. cli-plugin-jest also doesn't respect the transpileDependencies option in vue.config.js for the same reason.
  1. Usage of ES6 import/export statements, which have to be compiled to commonjs module.exports
  2. Single File Components (.vue files) which have to be run through vue-jest
  3. Typescript code

看 jest.config.js 文件：




---




## vue-cli的浏览器兼容性

babel.config.js 文件：
```js
module.exports = {
	presets: [
		'@vue/app',
	]
}
```
其中的`@vue/app`是`@vue/babel-preset-app`提供的。这个包通过 `@babel/preset-env` 和 `browserslist` 配置来决定项目需要的 polyfill。



#### 1.[@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) 是什么？

`@babel/preset-env` is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!



#### 2.[browserslist](https://github.com/browserslist/browserslist) 是什么？

package.json 文件里的 browserslist 字段，或一个单独的 .browserslistrc 文件，指定了项目的目标浏览器的范围。

这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀。

#### [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)是什么？




---


## 开发经验

1 页面中里层view的跳转，也走路由跳转，参数都放到地址栏上。
  如果把参数放到内存中，以后加新需求想要从别的地方直接跳到这个里层view的话，就麻烦了！
  比如：岩石云5.0开发中，我的收藏页面：外面第一层是那种普通的带分页数据表格，展示所有收藏的文件、文件夹。
  当点击文件夹时，会进入二级页面，显示文件夹中的内容，这时候是特殊的文件列表（我封装的通用的modules）。

  前期的需求中，这个二级页面，只会从我的收藏页面点进来。
  但是后期加了新需求：在文档检索页面，检索结果需要显示每个文件的位置，并且点击后可以直接跳转过来。

  这个时候就是从检索页面空降到我的收藏页面中的二级页面了。只能通过路由跳转。



路由中，前面的字段可以专门用来处理导航高亮！！！