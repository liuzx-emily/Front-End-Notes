// 获取url后面的参数： getUrlParam("pid")
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]); //用decodeURI来解码。所以如果参数名是中文，那么存的时候要用encodeURI()
    return null;
}

// 添加cookie：setCookie('性别', '男', 10);
function setCookie(key, value, t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t); // 存t天
    // oDate.setHours(oDate.getHours() + t); // 存t小时
    document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString();
}

// 获取cookie：getCookie('性别')
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0] == key) {
            return decodeURI(arr2[1]);
        }
    }
}

// 删除cookie：removeCookie('性别');
function removeCookie(key) {
    setCookie(key, '', -1); //将expires设置为前一天，来立刻删除cookie
}