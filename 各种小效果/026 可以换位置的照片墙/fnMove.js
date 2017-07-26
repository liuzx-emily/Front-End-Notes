function fnMove(obj, json) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var allDone = true; //只要有一个没到目标，allDone就会被设成false，就不会停
        for (var attr in json) {
            var iTarget = json[attr];
            var iCur = parseInt(getStyle(obj, attr)) || 0;

            var iSpeed = (iTarget - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (iCur != iTarget) {
                allDone = false;
            }

            obj.style[attr] = iCur + iSpeed + 'px';

        }

        if (allDone) {
            clearInterval(obj.timer);
        }
    }, 30);

    function getStyle(obj, sAttr) {
        var oStyle = window.getComputedStyle ? getComputedStyle(obj) : obj.currentStyle;
        return oStyle[sAttr];
    }

}
