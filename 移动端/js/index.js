$(function() {
    // 添加公共底部
    public_foot(1);
    // 图片轮播
    swiper();
    // 导航：屏幕滑到下面时，导航fixed到最上面
    navFixed();
    // 搜索
    search();
});
// 图片轮播
function swiper() {
    // 调用js
    setTimeout(function() {
        var mySwiper = new Swiper("#swiper-container1", {
            /*横向滑动*/
            direction: "horizontal",
            /*形成环路（即：可以从最后一张图跳转到第一张图*/
            loop: true,
            /*分页器*/
            pagination: {
                el: ".swiper-pagination"
            },
            /*每隔1.5秒自动播放*/
            autoplay: {
                delay: 1500,
                stopOnLastSlide: true,
                disableOnInteraction: true
            }
        });
    }, 0);
}
// 导航：屏幕滑到下面时，导航fixed到最上面
function navFixed() {
    var top = parseInt($('#navUpper').css('height'));
    $(window).scroll(function() {
        var now = $(window).scrollTop();
        if (now >= top) {
            $("#nav").addClass('navfixed');
        } else {
            $("#nav").removeClass('navfixed');
        }
    });
}
// 搜索
function search() {
    $('#search_input').bind('keypress', function(event) {
        if (event.keyCode == "13") {
            var content = $(this).val();
            if (/^\s*$/.test(content) === false) {
                alert(content);
                // 下面是ajax
            }
        }
    });
}