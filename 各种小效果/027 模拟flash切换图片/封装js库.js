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
   if (oParent === undefined)
      oParent = document.body;
   if (oParent.getElementsByClassName) {
      //IE6 7 8不支持getElementsByClassName
      return oParent.getElementsByClassName(sClass);
   } else {
      var aEle = oParent.getElementsByTagName('*');
      var re = new RegExp(' ' + sClass + ' ', 'i');
      var aWantedEles = [];
      for (var i = 0; i < aEle.length; i++) {
         if (re.test(' ' + aEle[i].className + ' ')) {
            aWantedEles.push(aEle[i]);
         }
      }
      return aWantedEles;
   }
}

/**
 * (原生js没有添加class的方法)
 * 添加class  无兼容问题
 * @param {[HTML元素]} obj
 * @param {[string]}   sNewClass
 * @return 无
 * 优点：完美兼容所有
 * 缺点：可能重复添加，不过不care
 */
function addClass(obj, sNewClass) {
   var obj_class = obj.className, //获取class的内容；
      blank = (obj_class !== '') ? ' ' : ''; //判断获取的class是否为空，如果不为空，则添加空格；
   added = obj_class + blank + sNewClass; //组合原来的class和需要添加的class，中间加上空格；
   obj.className = added; //替换原来的class；
}


/**
 * (原生js没有移除class的方法)
 * 移除class  
 * @param  {[HTML元素]} obj
 * @param  {[string]}   sClass
 * @return 无
 * 优点：完美兼容所有
 *       没有该class时用也不会报错，只不过什么都不删
 * 缺点：只能移除1个：class='big round big'用一次只能变成class='round big'，再用一次变成class='round'
 */
function removeClass(obj, sClass) {
   var obj_class = '' + obj.className + ''; //获取class的内容，并在首尾各加一个空格；'abc    bcd' -> ' abc    bcd '
   obj_class = obj_class.replace(/(\s+)/gi, ' '); //将多余的空字符替换成一个空格；' abc    bcd ' -> ' abc bcd '
   var removed = obj_class.replace(' ' + sClass + ' ', ' '); //在原来的class，替换掉首尾加了空格的class  ' abc bcd ' -> 'bcd '
   removed = removed.replace(/(^\s+)|(\s+$)/g, ''); //去掉首尾空格；'bcd ' -> 'bcd'
   obj.className = removed; //替换原来的class；
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
   var obj_class = obj.className, //获取class的内容；
      obj_class_lst = obj_class.split(/\s+/); //通过split空字符将sClass转换成数组
   for (var x in obj_class_lst) {
      if (obj_class_lst[x] == sClass) {
         return true;
      }
   }
   return false;
}


/**
 * 获取元素相对于整个html页面的位置
 * @param  {object} obj 
 * @return {object} pos
 * 使用：getPos(oSpan).left，得到的是number
 * 兼容：完美兼容all浏览器，
 *       position取任何值都行static absolute relative fixed(除了IE6-不支持fixed)   
 */
function getPos(obj) {
   var pos = { left: 0, top: 0 };
   while (obj) {
      pos.left += obj.offsetLeft;
      pos.top += obj.offsetTop;
      obj = obj.offsetParent;
   }
   return pos;
}

/**
 * 运动函数(变速，或者叫缓冲)
 * @param  {HTML元素} obj     
 * @param  {string}  sAttr   [属性]：'width'
 * @param  {整数}   iTarget [目标值]
 * @return undefined
 * 使用：fnMove(this, 'width', 500); fnMove(this, 'fontSize', 10);
 * 缺陷：1 里面的单位是px，所以单位不是px结尾的属性不能用。
         2 有兼容性问题的属性不能用
            1 比如float：cssFloat和styleFloat.
            2 比如border-width有兼容性问题 FF chrome IE中显示都不同，所以得到的iCurrent不一样，不能用
            3 比如relative的元素没有设置top时，获取iCurrent有的是0，有的是auto，所以没设置top时不能用
         3 函数中专门处理了一下有兼容性问题的透明度，但还是有问题：iCurrent只能获取用标准opacity方式设置的，所以IE6 7 8用不了
 */
function fnMove(obj, sAttr, iTarget, k = 10) {
   clearInterval(obj.timer);

   var iCurrent;
   obj.timer = setInterval(function() {
      if (sAttr === 'opacity') {
         //专门处理透明度
         iCurrent = Math.round((parseFloat(getStyle(obj, sAttr)) * 100));
         //iCurrent = parseInt(parseFloat(getStyle(obj, sAttr)) * 100);不行
         //parseInt只能拯救类似7.00001，不能拯救6.99999。所以用round四舍五入
      } else {
         iCurrent = parseInt(getStyle(obj, sAttr));
      }
      var iSpeed = (iTarget - iCurrent) / k; //可能是小数
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //防止速度小于1
      if (iCurrent === iTarget) {
         clearInterval(obj.timer);
         return;
      }
      if (sAttr === 'opacity') { //专门处理透明度
         obj.style.filter = 'alpha(opacity:' + (iCurrent + iSpeed) + ')';
         obj.style.opacity = (iCurrent + iSpeed) / 100;
      }
      obj.style[sAttr] = iCurrent + iSpeed + 'px';

   }, 10);

   function getStyle(obj, sAttr) {
      var oStyle = window.getComputedStyle ? getComputedStyle(obj) : obj.currentStyle;
      return oStyle[sAttr];
   }
}
//var a=parseInt(parseFloat(getStyle(aSmallImg[1], 'opacity')) * 100);

/**
 * 抖起来
 * 【！重要！】需要属性shakeNum来监控
 * @param  {object} obj 要抖的东西
 * @param  {String} sDir     方向，默认为'x'
 * @param  {Number} iRange   抖得范围，默认为5（-5px,5px）
 * @return 暂无
 *  
 * 距离：想要元素x抖动：
 * x.shakeNum = 0;
 * x.onmouseenter = function() {
 *    shakeIt(this,'x',2);
 * };
 * 备注：没有设置top和left的relative和absolute元素在有的浏览器中是auto，会有兼容问题。
 */
function shakeIt(obj, sDir, iRange) {
   //如果shakeNum不是0，说明前面正在抖的还没停下来，则不能新抖
   if (obj.shakeNum !== 0)
      return;
   if (getStyle(obj, 'position') == 'static') {
      //static定位元素改成relative'
      obj.style.position = 'relative';
      obj.style.left = '0px';
      obj.style.top = '0px';
   }
   var aRange = [];
   for (var i = iRange; i >= 0; i -= 0.5) {
      aRange.push(i, -i);
   }

   var position_x = parseFloat(getStyle(obj, 'left'));
   var position_y = parseFloat(getStyle(obj, 'top'));

   if (sDir == 'x') { //水平晃
      clearInterval(obj.shakeTimerX);
      obj.shakeTimerX = setInterval(function() {
         obj.style.left = position_x + aRange[obj.shakeNum] + 'px';
         obj.shakeNum++;
         if (obj.shakeNum === aRange.length) {
            clearInterval(obj.shakeTimerX);
            obj.shakeNum = 0;
         }
      }, 100);
   } else { //垂直晃
      clearInterval(obj.shakeTimerY);
      obj.shakeTimerY = setInterval(function() {
         obj.style.top = position_y + aRange[obj.shakeNum] + 'px';
         obj.shakeNum++;
         if (obj.shakeNum === aRange.length) {
            clearInterval(obj.shakeTimerY);
            obj.shakeNum = 0;
         }
      }, 100);
   }

   function getStyle(obj, sAttr) {
      var oStyle = window.getComputedStyle ? getComputedStyle(obj) : obj.currentStyle;
      return oStyle[sAttr];
   }
}
