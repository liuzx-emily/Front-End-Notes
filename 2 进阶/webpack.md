## 换源
`npm config set registry http://registry.npm.taobao.org`


## 介绍
1. for JS的打包文件，把很多modules打包成少量的bundled assets
2. [特点]代码分割code splitting：按需加载，不是全部加载
3. loaders：加载非JS文件（CSS LESS 图片 commonJS ES6 .vue .jsx等）  
	webpack只支持js类型，其他所有类型都需要loader来处理。  
	loader需要先安装，再指定
4. 源文件中引入其他文件：用commonJS的require语法，或者ES6的import语法都行。最终都会转成webpack自己的打包命令
---
 



## 初始化
```js
npm init -y
npm install webpack webpack-cli
```

在根目录下新建index.html，其中引入 <script src="bundle.js"></script>
在根目录下新建配置文件webpack.config.js



---




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



## loader
webpack只支持js类型，其他所有类型都需要loader来处理。  
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



---



## 热更新
webpack-dev-server
