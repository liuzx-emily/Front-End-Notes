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