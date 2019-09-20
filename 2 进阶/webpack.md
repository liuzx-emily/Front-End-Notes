## 换源
`npm config set registry http://registry.npm.taobao.org`




---




## 介绍
1. for JS的打包文件，把很多modules打包成少量的bundled assets
2. [特点]代码分割code splitting：按需加载，不是全部加载
3. loaders：加载非JS文件（CSS LESS 图片 commonJS ES6 .vue .jsx等）  
	webpack只支持js类型，其他所有类型都需要loader来处理。  
	loader需要先安装，再指定
4. 源文件中引入其他文件：用commonJS的require语法，或者ES6的import语法都行。最终都会转成webpack自己的打包命令



---
 



## 起步
[官网的教程，非常清晰](https://webpack.docschina.org/guides/getting-started)

```
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

webpack-cli用于在命令行中运行 webpack  

调整 package.json 文件，以便确保我们安装包是 private(私有的)，并且移除 main 入口。这可以防止意外发布你的代码。


#### 为什么用webpack处理依赖很好？

场景：src/index.js文件中需要用到lodash依赖  
- 先在本地安装library : `npm i lodash --save`  
- 然后在 src/index.js 文件中引用 : `import _ from lodash`  

为什么这样好：在这个设置中，index.js 显式要求引入的 lodash 必须存在，然后将它绑定为 _（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个会以正确顺序执行的优化 bundle。



#### webpack可以让老旧浏览器支持 ES6 的模块语法 import 和 export !

webpack 会将代码进行 transpile(转译)，ES6、commonJS、AMD等模块语法都会转成webpack的模块语法，因此旧版本浏览器也可以执行。

*注意，webpack 不会更改除模块语法之外的部分。如果你在使用其它 ES2015 特性，必须使用 Babel 等transpiler(转译器)。*


#### 配置文件

默认配置文件是 webpack.config.js，可以通过 --config 指定配置文件

#### npm scripts
在 package.json 中的 scripts 添加npm命令，方便操作




---




## 管理资源
在起步阶段中，我们知道了：js文件之间的依赖是显示声明的，webpack构建出依赖图。

这样非常好，因为现在每个模块都可以明确表述它自身的依赖，可以避免打包未使用的模块。


webpack默认只支持js类型，其他所有类型都需要loader来处理。  
使用了loader之后，这些其它类型的资源文件的依赖也可以这样处理。


loader需要先安装，再指定

#### 处理js：ECMA6转5
babel

#### 处理css

- `css-loader` 让webpack能处理.css文件。此时只在打包文件bundle.js中有。但对于引入了bundle.js的html文件，css不会自动加入到html中。
- `style-loader` 把css-loader处理完的内容添加到html>head>style标签中
- `postcss-loader`
- `less-loader less`
在配置文件中设置
- loader的处理顺序是数组中从右到左

#### 资源处理：图片等
file-loader url-loader



## 配置文件
- entry：webpack打包的入口，所有的文件都要在这个"入口文件"中引入。  
  entry可以是：string | array | object
	- 单入口：string array 输出可以直接用给定名字  
    	注意：array是单入口，会打包成一个bundle.js。用途：array中的文件互相依赖
    - 多入口：object 多入口就要多输出,输出用占位符

- output：输出
  单入口时，单输出：filename直接指定名字  
  多入口时，多输出：filename要用替换方式，来自动给每个bundle一个唯一的名称： 
    - 入口名称：[name] 
    - 每次打包的hash值：[hash]
    - 基于chunk内容的 hash：[chunkhash]



---


 
## html-webpack-plugin
如果用`[chunkhash]`或者`[hash]`，每次打包出来文件名称都不确定。在html中引入bundle的时候，不能每次都手动改吧？

这时候可以用插件：`html-webpack-plugin`。效果：自动生成一个html文件，并且引入打包好的bundle文件。

配置项：title filename template minify等，具体看官方API
https://github.com/jantimon/html-webpack-plugin#options


#### 多页面
每一个htmlWebpackPlugin对象自动生成一个html文件。  
所以new多个HtmlWebpackPlugin对象。如果不显式指定，那么每一个htmlWebpackPlugin对象中都默认包含entry中的所有chunk。可以用chunks和excludeChunks来指定





---



## 热更新
webpack-dev-server
