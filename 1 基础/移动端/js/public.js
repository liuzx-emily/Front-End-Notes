initRem();
window.onresize = function() {
    initRem();
};
$(function() {
    // 点点点（页面中只需放一个#dot-container，会自动加入内容和js）
    dotdotdot();
    // 返回上一页
    $('#simplebackBtn').click(function() {
        history.go(-1);
    });
});

function initRem() {
    var html = document.documentElement;
    var hWidth = html.getBoundingClientRect().width;
    html.style.fontSize = hWidth / 10.8 + "px";
}


// 添加公共底部
function public_foot(index) {
    var html = `
        <a class="foot-box" href="index.html">
            <div class="foot-img">
                <img src="img/foot-logo11.png" class="notactive">
                <img src="img/foot-logo12.png" class="active">
            </div>
            <div class="foot-title">首页</div>
        </a>
        <a class="foot-box" href="javascript:void(0);">
            <div class="foot-img">
                <img src="img/foot-logo31.png" class="notactive">
                <img src="img/foot-logo32.png" class="active">
            </div>
            <div class="foot-title">分类</div>
        </a>
        <a class="foot-box" href="javascript:void(0);">
            <div class="foot-img">
                <img src="img/foot-logo21.png" class="notactive">
                <img src="img/foot-logo22.png" class="active">
            </div>
            <div class="foot-title">联系我们</div>
        </a>
        <a class="foot-box" href="javascript:void(0);">
            <div class="foot-img">
                <img src="img/foot-logo41.png" class="notactive">
                <img src="img/foot-logo42.png" class="active">
            </div>
            <div class="foot-title">我的</div>
        </a>`;
    $("#public-foot").html(html);
    // 当前选中的变红
    setTimeout(function(index) {
        $("#public-foot a.foot-box").eq(index - 1).addClass('active');
    }, 0, index);
}
// 点点点
function dotdotdot() {
    if ($("#dot-container").length !== 0) {
        var html = `
            <ul id="dot-ul">
                <li>
                    <a href="index.html">首页</a>
                </li>
                <li>
                    <a href="category.html">分类</a>
                </li>
                <li>
                    <a href="javascript:void(0)">我的</a>
                </li>
            </ul>
            <div id="dot-cover"></div>`;
        $("body").append(html);
        $("#dot-container").html(`<img src="img/dian.png" id="dot-img">`);
        setTimeout(function() {
            $("#dot-img").click(function() {
                $('#dot-ul').css('display', 'block');
                $('#dot-cover').css('display', 'block');
                $('#dot-cover').click(function() {
                    $('#dot-ul').slideUp('20');
                    $('#dot-cover').css('display', 'none');
                });
            });
        }, 0);
    }
}