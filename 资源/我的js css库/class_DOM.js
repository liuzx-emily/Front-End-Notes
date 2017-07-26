//所有函数都完美兼容IE6+


/**
 * 根据class获取元素们
 * @param  {[string]}   sClass      class名称
 * @param  {[HTML元素]} oParent        父元素 可选参数，默认为document.body
 * @return {[数组]}     aWantedEles   含有特定class的元素集合
 * 
 * 使用例子：var array = getByClass('big',oDiv); 
 * 优点：完美兼容所有
 */

function getByClass(sClass, oParent) {
   oParent = oParent || document.body;
   if (oParent.getElementsByClassName) {
      return oParent.getElementsByClassName(sClass);
   } else {
      var aEle = oParent.getElementsByTagName('*');
      var re = new RegExp('\\b' + sClass + '\\b');
      //正则中需要传参sClass，所以只能用new方法定义。而且注意\b要写成\\b
      var aWantedEles = [];
      for (var i = 0; i < aEle.length; i++) {
         if (re.test(aEle[i].className)) {
            aWantedEles.push(aEle[i]);
         }
      }
      return aWantedEles;
   }
}

/**
 * 添加class
 * @param {[HTML元素]} obj
 * @param {[string]}   sNewClass
 * @return 无
 * 优点：完美兼容所有
 *       如果已经有了class，就不会重复添加了
 */
function addClass(obj, sNewClass) {
   if (hasClass(obj, sNewClass))
      return;
   var added = obj.className + ' ' + sNewClass; //组合原来的class和需要添加的class，中间加上空格；
   added = trim(added); //格式化
   obj.className = added; //替换原来的class；
}


/**
 * 移除class  
 * @param  {[HTML元素]} obj 
 * @param  {[string]}   sClass
 * @return 无
 * 优点：完美兼容所有
 *       没有该class时用也不会报错，只不过什么都不删
 *       class写重复了也没事，一次全都移走
 */
function removeClass(obj, sClass) {
   //if (!hasClass(obj, sClass)) return;
   var thisRe = new RegExp('\\b' + sClass + '\\b', 'g');
   var removed = obj.className.replace(thisRe, ' ');
   removed = trim(removed); //格式化
   obj.className = removed;
}

/**
 * 判断是否存在class
 * @param  {[HTML元素]}   obj 
 * @param  {[string]}     sClass 
 * @return {Boolean}
 * 优点：完美兼容所有
 *      
 */
function hasClass(obj, sClass) {
   var aClassName = obj.className.split(/\s+/); //通过split空格将sClass转换成数组
   for (var x in aClassName) {
      if (aClassName[x] == sClass) {
         return true;
      }
   }
   return false;
}


//修剪空格，规范化str
//1 首先，去掉首尾所有连续空格
//2 之后，去掉将所有连续空格变为一个空格（这是首尾已经没有空格了，所有选中的空格肯定不会是首尾）
function trim(str) {
   var re = /^\s+|\s+$/g;
   var newStr = str.replace(re, '');
   re = /\s{2,}/g;
   newStr = newStr.replace(re, ' ');
   return newStr;
}
