[官方的指南](https://webpack.docschina.org/guides/)写的非常详细了，这里只列一些重点和难点


换源：`npm config set registry http://registry.npm.taobao.org`

[npm文档](https://docs.npmjs.com/files/package.json)




---





## 安装

本地安装 webpack 和 CLI：
`npm i --save-dev webpack webpack-cli`

#### 为什么选用本地安装webpack，而不是全局安装呢？  
本地安装，也就是每个项目内部安装自己的webpack。这样每个项目的webpack是完全独立的。当webpack升级到有breaking change版本时，可以一个个项目分别升级。  
而且多人合作开发一个项目时，可以保证用的webpack版本一致。





---





## 起步


1. `npm init` 初始化项目，创建 package.json
2. 在 package.json 中设置 `private` 为 true ，并移除 main 入口。这可以防止意外发布你的代码。


#### 为什么要使用 webpack ？
设想一个场景：

页面中需要一个图片轮播的效果。我们找到了一个图片轮播插件 scroll.js ，这个插件是基于 jQuery 的。

所以我们需要依次引入：jQuery、scroll.js、业务js。

这样做的问题是：
- 无法直接体现js文件之间的依赖关系。
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。



#### 用 webpack 的话，是怎么处理上面的问题的呢？

先通过 npm 安装依赖library，然后在业务代码 src/index.js 中引入依赖。

这样设置，index.js 显式要求引入的依赖必须存在，然后将它绑定在模块内部作用域中（没有全局作用域污染）。

通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个会以正确顺序执行的优化 bundle。
而且可以避免打包未使用的模块！



#### webpack可以让老旧浏览器支持 ES6 的模块语法 import 和 export !

webpack 会将代码进行 transpile(转译)，ES6、commonJS、AMD等模块语法都会转成webpack的模块语法，因此旧版本浏览器也可以执行。

*注意，webpack 不会更改除模块语法之外的部分。如果你在使用其它 ES2015 特性，必须使用 Babel 等transpiler(转译器)。*



---






## 管理资源

在起步阶段中，我们知道了：每个js模块都显示地声明了自身的依赖，webpack会动态打包所有依赖（创建所谓的依赖图），可以避免打包未使用的模块。

webpack的这种动态打包，默认只支持js。但是通过相应的loader，其它类型的文件也可以这样处理！

1. 配置多个loader时的处理顺序：数组中从右到左。


#### 加载css

`css-loader`：让webpack能处理css资源。此时只在打包文件bundle.js中有。但对于引入了bundle.js的html文件，css不会自动加入到html中。

`style-loader`：把css-loader处理完的内容添加到html>head>style标签中

`postcss-loader`

安装：
`npm i --save-dev style-loader css-loader`

配置：

```js
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	}
```


#### 加载less

安装：`npm i --save-dev less-loader less`

配置：
```js
    { test: /\.less$/, use: ['style-loader', 'css-loader','less-loader'] },
```

按照上面的配置，在js文件中通过 import 引入的less文件，可以被正确识别和处理。
但是在css中通过 @import 引入的 less文件，不会被处理。

#### 加载images
css中的背景图片，或者在js文件中import进来的图片文件，怎么处理呢？

安装：
`npm i --save-dev file-loader`

配置：
```js
    { test: /\.(png|jpg)$/, use: ['file-loader'] },
```

这样，webpack知道要用 file-loader 处理 .png和.jpg 文件了。图像会被添加到 output 目录，并且会将css文件中和js文件的图片地址，替换为 output 目录中图像的最终目录！

进一步，可以使用 url-loader 来优化：

url-loader：works like file-loader, but can return a DataURL if the file is smaller than a byte limit.

```js
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 20480
					}
				}]
			},
```




---





## 管理输出

entry：webpack打包的入口，可以是 string | array | object
- 单入口：string array 输出可以直接用给定名字 （注意：array是单入口，会打包成一个bundle.js。用途：array中的文件互相依赖）
- 多入口：object 多入口就要多输出,输出用占位符

output：输出
- 单入口时，单输出：filename直接指定名字  
- 多入口时，多输出：filename要用替换方式，来自动给每个bundle一个唯一的名称 [name] [hash] [chunkhash]

#### 设置 HtmlWebpackPlugin
问题来了，当使用 `[chunkhash]`或者`[hash]`，每次打包出来文件名称都不确定。在html中引入bundle的时候，如果每次都手动修改，岂不是很麻烦！

这时候就要用到 HtmlWebpackPlugin 了，效果：自动生成一个html文件，并且引入打包好的bundle文件。

安装：
`npm i --save-dev html-webpack-plugin`

配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
  ...
	plugins: [
		new HtmlWebpackPlugin({
			title: '管理输出',
			template: "./src/template/index.html"
		})
	],
  ...
```


配置项：title filename template minify等，具体看[官方API](https://github.com/jantimon/html-webpack-plugin#options)

#### HtmlWebpackPlugin怎么设置多页面？
每一个htmlWebpackPlugin对象自动生成一个html文件。  
所以new多个HtmlWebpackPlugin对象。如果不显式指定，那么每一个htmlWebpackPlugin对象中都默认包含entry中的所有chunk。可以用chunks和excludeChunks来指定




#### 清理输出文件夹

安装 
`npm install --save-dev clean-webpack-plugin`

配置：

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');
  ...
	plugins: [
		new CleanWebpackPlugin(),
	],
  ...
```



#### manifest

还没有看！！！




---




## 开发环境


1. 将 `mode` 设置为 `development`
    ```js
    // webpack.config.js中
    module.exports={
      ...
      mode:"development",
      ...
    };
    ```


#### 使用 source map

source map：将编译后的代码，映射回源代码。

devtool 选项控制是否生成，以及如何生成 source map。
不同的值会明显影响到构建(build)和重新构建(rebuild)的速度，具体看[官网](https://webpack.docschina.org/configuration/devtool)



```js
// webpack.config.js中
module.exports={
  ...
  devtool: 'inline-source-map',
  ...
};
```

#### 热刷新，使用 webpack-dev-server

用途：监测到源文件变化后，会自动重新编译，并刷新页面！

说明：webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 publicPath 选项进行修改。


安装 `npm i --save-dev  webpack-dev-server`

设置：
```js
// webpack.config.js中
module.exports={
  ...
  devServer:{
    // 将 dist 目录下的文件 serve 到 localhost:8080 下。
    // serve：将资源作为 server 的可访问文件
    contentBase: './dist'
  },
  ...
};
```

在 package.json 中添加配置：

```json
{
  "scripts":{    
		"start": "webpack-dev-server --open"
  }
}
```



---




## 模块热替换

#### 修改文件内容后，页面居然会自动刷新！这也太炫酷了吧！是怎么实现的呢？

在用 devServer 开发时，当我们修改模块A时，不需要手动F5，浏览器中的页面就会自己刷新！

这种效果是怎么实现的呢？

原来，devServer 密切监视依赖图中所有的模块，当某一个模块的内容发生变化时，devServer 通过 websocket 告诉页面，让页面执行更新操作。默认情况下，更新操作是通过简单粗暴的 reload 页面来实现的。

但是，用reload页面来实现刷新，并不是好的解决方案。


#### 为什么说reload页面不好？

假设页面中有一个表格，表格中每一行都有查看按钮，此时你点击了一个查看按钮，弹出了查看弹窗。  
这个时候，你发现弹窗里面有一个按钮的颜色不好看。于是你找到对应的 css 文件，改完之后点击保存。

吧嗒！页面reload了！

刚才辛辛苦苦点出来的弹窗没了！想要看效果，还得自己再点开！

好吧，说“辛辛苦苦”有点夸张。但表达的意思大家都懂了。页面reload之后，所有的状态、变量都初始化了。

如果可以局部更新的话，该多好呀！


#### 模块热替换

模块热替换：在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。

webpack 内置了 HMR 功能。首先我们需要开启这个功能：

```js
const webpack = require('webpack');
module.exports = {
    // ...
    devServer: {
     hot: true
    },
    plugins: [
     new webpack.HotModuleReplacementPlugin()
    ],
    // ...
  };
```
然后 accept 你需要使用热替换功能的模块：

```js
// 在 ./src/main.js 中：
if (module.hot) {
  module.hot.accept('./hello.js', function() {
    // 当 ./hello.js 的内容变化时，会执行这个处理函数
    // 处理逻辑，需要我们自己在这里写
  });
}
```


#### 热替换功能，需要先开启，再 accept 模块
这次试验的小白鼠是 hello.js 和 hi.js这两个文件。

首先，我们开启了 HMR 功能，但是只accept hello.js 。

这样的结果就是：
- 修改 hello.js 时，会执行我们自己写的处理函数，不会触发页面整体的reload
- 修改 hi.js 时，devServer 发现我们没有 accept 这个模块，所以还是会触发页面reload。在浏览器中可以看到信息：
  > Cannot apply update. Need to do a full reload!  
  > [HMR] Error: Aborted because ./src/hi.js is not accepted


#### 热替换功能只是提供一个API，具体的替换逻辑需要自己处理


修改 css 文件时，发现是热替换，这是因为 style-loader 做了处理：style-loader 在内部使用了 module.hot.accept ，当 css 文件更新后，会将其 patch 到 `<style>` 标签中。

修改 .vue 文件时，也是热替换，是因为 vue-loader 做了处理。具体可以看[说明](https://vue-loader.vuejs.org/zh/guide/hot-reload.html#%E7%8A%B6%E6%80%81%E4%BF%9D%E7%95%99%E8%A7%84%E5%88%99)


注：通常开发中，不需要自己给某个模块写热替换处理函数。这里只是介绍一下这个概念。





---





## tree shaking

> 你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

“摇树”之后，多余的代码被去掉， bundle 的体积就更小啦！

想要使用 tree shaking 必须注意：

- tree shaking 依赖于ES2015 的模块语法的 静态化 特性。所以想用这个功能的必须使用 import 和 export 语法，并且要确保没有 compiler 将 ES2015 模块语法转换为 CommonJS 模块语法（注意：@babel/preset-env 默认就会这么转）

- 在项目 package.json 文件中，添加 "sideEffects" 属性
  
- 运行 tree shaking 需要 ModuleConcatenationPlugin。通过设置 mode 为 production 可以添加此插件。也可以不设置 mode ，手动添加这个插件。


#### 什么是 dead-code ？

文件 utils.js export 了三个方法： func1() func2() func3() 

在入口文件 index.js 中引入 func1, func2。但是只使用 func1：
```js
import { func1, func2 } from './utils.js'
func1();
```

func2 和 func3 都被认为是 dead-code。

查看打包后的 bundle.js 可以证明这一点：
```js
  ...

  /* unused harmony export func2 */
  /* unused harmony export func3 */
  function func1() {}
  function func2() {}
  function func3() {}

  ...
```



#### 什么是 sideEffects

> side effect：副作用。在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。
> 例如 polyfill，它影响全局作用域，并且通常不提供 export。

> 注意，所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

package.json ：
```json
{
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

---






## 生产环境


#### 为development 和 production 写不同的配置

development：
- 强大的 source map
- 有 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。

production : 
- 压缩 bundle
- 更轻量的 source map
- 资源优化

（利用 `webpack-merge` 来避免写重复的配置）

#### mode

可选值有三种：
- none
- development
- production （默认）


mode 设置为 development 或者 production 时，webpack会执行一些默认的优化：
- 启用 DefinePlugin ，设置 `process.env.NODE_ENV` 的值
- production 中，启用压缩插件 TerserPlugin
- production 中，设置 optimization.minimize 为 true

具体的可以看[官网说明](https://webpack.docschina.org/concepts/mode/)



#### NODE_ENV

许多 library 通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。

例如，当不处于 production 时，某些 library 会添加额外的 log 和 test 功能。

> 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量  

位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量

在 App.vue 中：
```js
created() {
  console.log("process.env.NODE_ENV 的值为", process.env.NODE_ENV);
},
```

在开发环境、打包后，可以看到不同的输出。





---





## 代码分割 SplitChunksPlugin

> 代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。  
> 
> 常用的代码分离方法有三种： 
> 
> - 入口起点：使用 entry 配置手动地分离代码。
> - 防止重复：使用 SplitChunksPlugin 去重和分离 chunk。
> - 动态导入：通过模块中的内联函数调用来分离代码。


#### SplitChunksPlugin 

模块有两种引入方式：
- 初始加载：肯定要加载的依赖，所以在页面初始化时就加载。一般开发中用的都是这种。
- 按需加载：on-demand 存在条件判断，使用 `import()` 来加载的模块。如果没有满足触发条件，则永远不会用到的模块。也称作“懒加载”


默认情况下， SplitChunksPlugin 只对按需加载的模块起作用。原因如下：

> By default it only affects on-demand chunks, because changing initial chunks would affect the script tags the HTML file should include to run the project.

根据以下原则，进行split：（下面是默认配置，可以自己修改）
- New chunk can be shared OR modules are from the node_modules folder
- New chunk would be bigger than 30kb (before min+gz)
- 确保 split 之后，并行的按需加载 <=5
- 确保 split 之后，并行的初始加载 <=3 （大概是说：页面初始加载的 bundle 数量必须 <=3 ！）

策略优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize

```js
module.exports = {
  // SplitChunksPlugin 的默认配置：
  optimization: {
    splitChunks: {
      /* chunks
      可选值：initial async all，或者函数
			initial 会分开优化打包异步和非异步模块。all 会把异步和非异步同时进行优化打包。
      */
      chunks: 'async',
      // 太小的没必要拆成一个 bundle 
      minSize: 30000,
      // 一个 bundle 太大也不行
      maxSize: 0,
      // 至少被引用多少次才能提成 bundle？
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
			// 拆分出来块的名字，默认为true，代表由块名和hash值自动生成
			// 这里设置的名字对应 output.chunkFilename 中的 [name]
      name: true,
			// cacheGroups : inherit 或者 override splitChunks.* 的所有设置。并且多出来三个设置项：test, priority, reuseExistingChunk
			// 默认的 cacheGroup 中有 vendors 和 default，如果想把它们都禁用，需要设置 splitChunks.cacheGroups.default 为 false
			// 默认的 cacheGroup 的 priority 是负的。自定义的 cacheGroup 的 priority 默认是0 。
      cacheGroups: {
        vendors: {
          // node_modules 下的代码，都放进这里
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // 引用数>=2的代码，都放进这里
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```


#### 动态导入（也叫懒加载、按需加载、on-demand）

```js
// src/index.js
button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
  var print = module.default;
  print();
});

```

```js
// src/print.js

console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

（说明：只有 splitChunks.chunks 设置为 "async" 时才能看到效果。
不然这个 print.js 内容太少了，会和 node_modules 或者其他公共依赖打包在一起了）





---




进度：https://webpack.docschina.org/guides/caching/

## 创建library





---






## shim预置依赖





---





## 渐进式网络应用程序





---





## TypeScript





---





## 环境变量





---





## 构建性能





---





## 内容安全策略






---





## 开发 - Vagrant





---





## 管理依赖





---





## 公共路径





---





## 集成






---
