/**
 * 获取元素相对于整个html页面的位置
 * @param  {object} obj 
 * @return {object} pos
 * 使用：getPos(oSpan).left，得到的是number
 * 兼容：完美兼容所有
 *       position取任何值都行static absolute relative fixed(除了IE6-不支持fixed)
 *       没算边框，有边框时不对
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
