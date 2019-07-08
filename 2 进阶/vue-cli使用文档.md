# 安装了router插件后，使用router报错：

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