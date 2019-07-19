## Symbol

`sequelize` 中搜索参数用到了Symbol，写 `rawQuery()` 时需要处理。所以把经验记录下来。



```js
var s1 = Symbol();
var s2 = Symbol("222");
typeof s1 === "symbol"	// true
```

#### symbol作为属性名

- 写法一  
	```js
	let obj={};
	var s1 = Symbol();
	var s2 = Symbol("222");	
  	// 必须用[]，不能用.，不然会被当成字符串，报错：`Cannot convert a Symbol value to a string`
	obj[s1]="hello";
	obj[s2]="world";
	```

- 写法二  
	```js
	let obj={};
	var s1 = Symbol();
	var s2 = Symbol("222");	
	obj={
  		// 必须用[]括起来，不然会被当作字符串！
		[s1]:"hello",
		[s2]:"world",
	}; 
	```

Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。

但是，它也不是私有属性，有一个 **`Object.getOwnPropertySymbols`** 方法，可以获取指定对象的所有 Symbol 属性名。



---





## 多表联查

需求：返回list时，给每一项添加parentName：

1. 一开始，想用sequelize的 belongsTo 等方法。但是查父级时会报错。 

2. 然后，我想到了用程序循环取父级。  

	```js
	const inelegentQuery = async (whereParam) => {
		// utils函数 copyByAttributes
		const copyByAttributes = (origin) => {
			let obj = {};
			attributes.forEach(key => {
				obj[key] = origin[key];
			});
			return obj;
		};
		// utils函数 getParentName
		const getParentName = async (parentId) => {
			let parent = await MainModel.findByPk(parentId);
			let parentName;
			if (parent) {
				parentName = parent.name;
			} else {
				parentName = "顶级";
			}
			return parentName;
		};
		// 
		let result = await MainModel.findAll({
			attributes: attributes,
			where: whereParam,
			order: [
				["order", 'asc']
			],
		});
		let data = [];
		for (let i = 0; i < result.length; i++) {
			let obj = copyByAttributes(result[i]);
			obj.parentName = await getParentName(obj.parentId);
			data.push(obj);
		}
		return data;
	}
	```

	Q：`copyByAttributes()`的意义何在？  
	A：`result[i]`是一个class的示例，`parentName`这个属性反不回去。（后端debug时发现ctx.response.body中的每一个item都加上了`parentName`这个属性，但是前端接口中看不到这个属性。原因未知！）

	虽然实现了功能，但这个方法效率太低，被我否决了。

3. 最后，我决定手动拼sql。
   
   封装了 `rawQuery()` 和 `rawQueryUtils`

	```js
	const rawQuery = async (params) => {
		params.attributes = attributes;
		let { str_attriutes, str_where, str_paging } = rawQueryUtils.getStr(params);
		let str = `
		SELECT
			${str_attriutes},
			t_parent.NAME parentName 
		FROM
			t_dept t
			LEFT JOIN t_dept t_parent ON t.parentId = t_parent.id 
		${str_where}`;
		let result = await sequelize.query(str, { type: sequelize.QueryTypes.SELECT });
		return JSON.parse(JSON.stringify(result));
	}
	```



---




## 经典table查询
有分页、模糊查询、日期范围查询

难点在于：
- `whereParam`不仅要传给自己封装的`rawQuery()`，也要传给sequelize提供的`count()`。
- 所以，`whereParam`的格式要按照sequelize的传参格式。
- 难点来了：修改自己封装的`rawQuery()`，让它能“翻译”这种格式
  
```js
const findAll = async (ctx, nect) => {
    // ---------------------------------------------- whereParam
    let whereParam = { isDelete: 0, };
    if (ctx.requestparam.title) {
        whereParam.title = {
            [Op.like]: '%' + ctx.requestparam.title + '%',
        };
    }
    if (ctx.requestparam.publisher) {
        whereParam.publisher = {
            [Op.like]: '%' + ctx.requestparam.publisher + '%',
        };
    }
    if (ctx.requestparam.startTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.gte] = ctx.requestparam.startTime;
    }
    if (ctx.requestparam.endTime) {
        whereParam.publishTime = whereParam.publishTime || {};
        whereParam.publishTime[Op.lte] = ctx.requestparam.endTime;
    }
    if (ctx.requestparam.state && ctx.requestparam.state != "-1") {
        whereParam.state = ctx.requestparam.state;
    }
    // ---------------------------------------------- pagingParam
    let pagingParam = { page: ctx.requestparam.page, row: ctx.requestparam.row };
    let data = await rawQuery({ whereParam, pagingParam });
    let count = await MainModel.count({ where: whereParam });
    ctx.response.body = { code: 1, data: data, count: count, };
};
```
`rawQuery()`中处理 `whereParam` 的方法：
```js
const getStr_where = (whereParam) => {
    let arr_where = [];
    for (let prop in whereParam) {
        let value = whereParam[prop];
        if (typeof value == 'object') {
            /*注意：
                Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
                但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
            */
            let symbolList = Object.getOwnPropertySymbols(value);
            symbolList.forEach(symbol => {
                // nodejs 不支持 symbol.description，只能用 toString 判断
                switch (symbol.toString()) {
                    case "Symbol(not)":
                        arr_where.push(`t.${prop} != '${value[symbol]}'`);
                        break;
                    case "Symbol(like)":
                        arr_where.push(`t.${prop} LIKE '${value[symbol]}'`);
                        break;
                    case "Symbol(gte)":
                        arr_where.push(`t.${prop} >= '${value[symbol]}'`);
                        break;
                    case "Symbol(lte)":
                        arr_where.push(`t.${prop} <= '${value[symbol]}'`);
                        break;
                }
            });
        } else {
            arr_where.push(`t.${prop}='${value}'`);
        }
    }
    let str_where = arr_where.length > 0 ? (" WHERE " + arr_where.join(" and ")) : "";
    return str_where;
}
```