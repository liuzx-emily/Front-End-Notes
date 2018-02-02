/*使用举例：
    fnMove({
        obj: aSpan[0],
        json: {
            width: 200,
            height: 80,
            left: 50,
            top: 80,
            opacity: 10
        },
        k:50,
        endFn: function() {
            fnMove({
                obj: aSpan[1],
                json: {width: 200}
            });
        }

    });

*/
function fnMove(move) {
    var obj = move.obj;
    var json = move.json;
    var k = move.k || 100;
    var endFn = move.endFn;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bStop = true;
        for (var attr in json) {
            var iTarget = json[attr];
            var iCurrent;
            //虽然IE8-对opacity没反应，但是currentStyle能取到opacity的值
            if (attr == "opacity") {
                iCurrent = Math.round(getStyle(obj, attr) * 100); //'0.1'变成10
            } else {
                iCurrent = parseInt(getStyle(obj, attr)); //100px转成100
            }
            var iSpeed = (iTarget - iCurrent) / k;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            iCurrent = iCurrent + iSpeed;
            if (attr == "opacity") {
                obj.style[attr] = iCurrent / 100;
                obj.style.filter = "alpha(opacity=" + iCurrent + ")";
            } else {
                obj.style[attr] = iCurrent + 'px';
            }

            if (iCurrent !== iTarget) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            endFn && endFn();
        }
    }, 1000 / 60);
}

function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}