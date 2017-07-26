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
 *    shake(this,'x',2);
 * };
 * 备注：没有设置top和left的relative和absolute元素在有的浏览器中是auto，会有兼容问题。
 */
function shake(obj, sDir, iRange) {
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
