node中的顶层对象：global（根本没有window）




---



## 模块加载
 CommonJS规范：加载模块是同步的（因为Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑异步加载）

 `require` ：读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。

- 路径
  ```js
  require('./hello.js');// 相对地址
  require('/hello.js');	// 绝对地址
  require('hello.js');	// 加载核心模块（位于Node的系统安装目录中）或者node_modules目录下的模块
  ```

- 查找顺序
	`require('./hello')`
	查找顺序 ： hello -> hello.js -> hello.json -> hello.node

- 在一个模块中定义的变量，其作用域范围是当前模块。



---




## module.exports
module对象 : 当前模块的一些信息，有exports属性。require()返回引入模块的module.exports。  
在每个模块的作用域下，还有一个内置的对象叫做exports，它和module.exports指向一个地址。
```js
//world.js
const PI = 3.14;
const name = 'emily';
exports.PI = PI;
module.exports.name = name;

//hello.js
const world = require('./world.js');
console.log(world); 	//{ PI: 3.14, name: 'emily' }
```

注意：下面修改了引用关系，exports和module.exports不再指向一个地址。所以用exports无效了。
```js
module.exports={name,PI};
```
下面也是改了引用，这样根本exports不出去。
```js
exports={name,PI};
```



---



## 控制台中的输入、输出
```js
let name;
process.stdout.write('请输入name：');
process.stdin.on('readable', () => {
   const chunk = process.stdin.read();
   if (chunk != null) {
       console.log(`输入了${chunk}`); //自动调用了toString()
       name = chunk.toString().slice(0, -2);//回车占2个字符
       process.stdin.emit('end');
   }
});
process.stdin.on('end', () => {
   process.stdout.write(`It s'over now.\nname=${name}`);
});
```



---



## Buffer类

用于操作二进制数据流。大小在被创建时确定，且无法调整。  
Buffer类在Node.js中是一个全局变量，因此无需require  
new Buffer() 构造函数已被废弃，并由from alloc allocUnsafe方法替代




---




## fs文件系统
是核心模块，需要require引入。
文件的编码记得改为utf-8

***注意：如果是相对路径，是相对于当前进程所在的路径（process.cwd()），而不是相对于当前脚本所在的路径。***

所有的方法都有异步和同步的形式，下面列出的都是异步

 - `fs.writeFile` "写入"数据到文件，如果文件已经存在，则替代文件

 - `fs.appendFile` "追加"数据到一个文件，如果文件不存在则创建文件。

 - `fs.readFile` 读取一个文件的全部内容

 - `fs.unlink` delete a name and possibly the file it refers to

 - `fs.rename` 改名

 - `fs.stat` get file status
 
 - `fs.watch` 监听 'rename' 或 'change'。在大多数平台，当一个文件出现或消失在一个目录里时，'rename' 会被触发

 - `fs.mkdir` 创建文件夹
 - `fs.readdir` 读取目录的内容   	

 - `fs.rmdir` 删除文件夹





