$(function() {
    // 搜索
    search();
    // 排序部分固定
    navFixed();
    $("#nav input").click(function() {
        $("#filter-container").css("display", "block");
        // 用body溢出隐藏需要给body定高，而且会突然弹回顶部
        // 用html溢出隐藏，不需要给谁定高，会固定在当前
        $("html").css("overflow", "hidden");
    });
    $("#filter-cover").click(function() {
        $("#filter-container").css("display", "none");
        $("html").css("overflow", "auto");
    });
});
// 搜索
function search() {
    $('#search_input').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            var content = $(this).val();
            if (/^\s*$/.test(content) === false) {
                alert(content);
            }
        }
    });
}
// 排序部分固定
function navFixed() {
    var top = $("#simple-public-head").outerHeight(true);
    $(window).scroll(function() {
        var now = $(window).scrollTop();
        if (now > top) {
            $("#nav").addClass('navFixed');
        } else {
            $("#nav").removeClass('navFixed');
        }
    });
}