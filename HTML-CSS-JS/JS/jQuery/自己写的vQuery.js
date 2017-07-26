//构造函数 给elemtns属性赋值
function $(selector) {
   if (typeof selector == 'function') {
      bindEvent(window, 'load', selector);
      return;
   }
   var elements = []; //先设为空数组。
   if (typeof selector == 'string') {
      switch (selector.charAt(0)) {
         case '.': //自己写的getByClass()
            var arr = getByClass(selector.substring(1));
            for (var i = 0; i < arr.length; i++) {
               elements.push(arr[i]);
            }
            break;
         case '#': //id
            var obj = document.getElementById(selector.substring(1));
            elements.push(obj);
            break;
         default: //tag
            arr = document.getElementsByTagName(selector);
            for (i = 0; i < arr.length; i++) {
               elements.push(arr[i]);
            }
            break;
      }
   }
   if (typeof selector == 'object') {
      elements.push(selector);
   }
   return new vQuery(elements);
}

function vQuery(arr) {
   this.elements = arr;
}
vQuery.prototype.html = function(content) {
   if (content) {
      for (var i = 0; i < this.elements.length; i++) {
         this.elements[i].innerHTML = content;
      }
      return this;
   } else {
      return this.elements[0].innerHTML;
   }
};
vQuery.prototype.on = function(evName, fn) {
   for (var i = 0; i < this.elements.length; i++) {
      bindEvent(this.elements[i], evName, fn);
   }
   return this;
};

vQuery.prototype.click = function(fn) {
   this.on('click', fn);
   return this;
};
vQuery.prototype.mouseover = function(fn) {
   this.on('mouseover', fn);
   return this;
};
vQuery.prototype.mouseout = function(fn) {
   this.on('mouseout', fn);
   return this;
};
vQuery.prototype.hover = function(fn1, fn2) {
   this.on('mouseover', fn1);
   this.on('mouseout', fn2);
   return this;
};
vQuery.prototype.css = function() {
   if (arguments.length === 2) {
      for (var i = 0; i < this.elements.length; i++) {
         this.elements[i].style[arguments[0]] = arguments[1];
      }
   } else {
      if (typeof arguments[0] == 'string')
         return getStyle(this.elements[0], arguments[0]);
      else {
         for (key in arguments[0]) {
            for (var i = 0; i < this.elements.length; i++) {
               this.elements[i].style[key] = arguments[0][key];
            }
         }
      }
   }
   return this;
};
vQuery.prototype.show = function() {
   this.css('display', 'block');
   return this;
};
vQuery.prototype.hide = function() {
   this.css('display', 'none');
   return this;
};
vQuery.prototype.attr = function() {
   if (arguments.length === 2) {
      for (var i = 0; i < this.elements.length; i++) {
         this.elements[i][arguments[0]] = arguments[1];
      }
   } else {
      if (typeof arguments[0] == 'string')
         return this.elements[0][arguments[0]];
      else {
         for (key in arguments[0]) {
            for (var i = 0; i < this.elements.length; i++) {
               this.elements[i][key] = arguments[0][key];
            }
         }
      }
   }
   return this;
};
vQuery.prototype.eq = function(index) {
   return $(this.elements[index]);
};
vQuery.prototype.index = function() {
   var oParent = this.elements[0].parentNode;
   for (var i = 0; i < oParent.children.length; i++) {
      if (this.elements[0] == oParent.children[i])
         return i;
   }
};
vQuery.prototype.find = function(selector) {
   var aParent = this.elements;
   var elements = []; //先设为空数组。
   switch (selector.charAt(0)) {
      case '.': //自己写的getByClass() 
         for (var i = 0; i < aParent.length; i++) {
            var arr = getByClass(selector.substring(1), aParent[i]);
            for (var j = 0; j < arr.length; j++) {
               elements.push(arr[j]);
            }
         }
         break;
      case '#': //id
         var obj = document.getElementById(selector.substring(1));
         elements.push(obj);
         break;
      default: //tag
         for (i = 0; i < aParent.length; i++) {
            arr = aParent[i].getElementsByTagName(selector);
            for (var j = 0; j < arr.length; j++) {
               elements.push(arr[j]);
            }
         }
         break;
   }
   return new vQuery(elements);
};

function bindEvent(obj, evName, fn) {
   if (obj.addEventListener) {
      obj.addEventListener(evName, function(ev) {
         if (fn() === false) {
            ev.stopPropagation();
            ev.preventDefault();
         }
      }, false);

   } else {
      obj.attachEvent('on' + evName, function() {
         if (fn() === false) {
            window.event.cancelBubble = true;
            return false;
         }

      });
   }
}

function getByClass(sClass, oParent) {
   oParent = oParent || document;
   var re = new RegExp('\\b' + sClass + '\\b');
   var arr = [];
   var aObj = oParent.getElementsByTagName('*');
   for (var i = 0; i < aObj.length; i++) {
      if (re.test(aObj[i].className)) {
         arr.push(aObj[i]);
      }
   }
   return arr;
}

function getStyle(obj, style) {
   if (window.getComputedStyle) {
      return getComputedStyle(obj)[style];
   } else {
      return obj.currentStyle[style];
   }
}
$.extend = function() {
   for (var fName in arguments[0]) {
      $[fName] = arguments[0][fName];
   }
};
$.fn = {};
$.fn.extend = function() {
   for (var fName in arguments[0]) {
      vQuery.prototype[fName] = arguments[0][fName];
   }
};
