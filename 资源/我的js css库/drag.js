/**
 * 拖拽
 * @param   oBar     拖拽触柄
 * @param   oTarget  可拖动窗口
 * @param   bInWindow 为true时，只能在屏幕范围内拖拽
 * @return  无
 * 备注：
 * 1 oTarget = oTarget || oBar;
 *   oTarget默认为oBar
 * 2 bInWindow为true时，只能在屏幕范围内拖拽
 *   没写，或者为flase时，随便拖拽
 * 3 兼容全部浏览器 选中文字、图片时也可以拖拽
 * 4 obj不能是position:static
 * 
 * 使用举例：
 *    drag(oDiv);
 *    drag(oBar, oBox, true);
 */
function drag(oBar, oTarget, bInWindow) {
   oTarget = oTarget || oBar;
   oBar.onmousedown = function(ev) {
      var ev = ev || event;
      var disX = ev.clientX - oTarget.offsetLeft;
      var disY = ev.clientY - oTarget.offsetTop;
      if (oBar.setCapture) {
         oBar.setCapture();
      }
      document.onmousemove = function(ev) {
         var ev = ev || event;
         var L = ev.clientX - disX;
         var T = ev.clientY - disY;
         if (bInWindow) {
            if (L < 0) {
               L = 0;
            } else if (L > document.documentElement.clientWidth - oTarget.offsetWidth) {
               L = document.documentElement.clientWidth - oTarget.offsetWidth;
            }

            if (T < 0) {
               T = 0;
            } else if (T > document.documentElement.clientHeight - oTarget.offsetHeight) {
               T = document.documentElement.clientHeight - oTarget.offsetHeight;
            }
         }


         oTarget.style.left = L + 'px'; //这里容易忘记加'px'
         oTarget.style.top = T + 'px';
      };
      document.onmouseup = function() {
         document.onmousemove = document.onmouseup = null;
         if (oBar.releaseCapture) {
            oBar.releaseCapture();
         }
      };
      return false;
   };
}
