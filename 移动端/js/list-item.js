$(function() {
    // 搜索
    search();
    // 排序部分固定
    navFixed();
    $("#nav input").click(function() {
        $("#filter-container").css("display", "block");
        // 不允许滚动
        $(document).on('touchmove', function(e) {
            e.preventDefault();
        });
    });
    $("#filter-cover").click(function() {
        $("#filter-container").css("display", "none");
        // 允许滚动
        $(document).off('touchmove');
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