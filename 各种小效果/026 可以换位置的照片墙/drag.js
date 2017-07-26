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
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].style.borderColor = 'transparent';
            }
            if (findNearest(oTarget) !== false) { //有相撞
                aImg[findNearest(oTarget)].style.borderColor = 'red';
            }
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            for (var i = 0; i < aImg.length; i++) {
                aImg[i].style.borderColor = 'transparent';
            }
            if (findNearest(oTarget) !== false) { //有相撞，obj和img交换位置
                var oImg = aImg[findNearest(oTarget)];
                var tmp = oTarget.index;
                oTarget.index = oImg.index;
                oImg.index = tmp;
                console.log(oTarget.index);
                console.log(oImg.index);
                fnMove(oTarget, { left: aPos[oTarget.index][0], top: aPos[oTarget.index][1] });
                fnMove(oImg, { left: aPos[oImg.index][0], top: aPos[oImg.index][1] });
            } else { //没有相撞，obj回原位
                fnMove(oTarget, { left: aPos[oTarget.index][0], top: aPos[oTarget.index][1] });
            }
            if (oBar.releaseCapture) {
                oBar.releaseCapture();
            }


        };
        return false;
    };
}
