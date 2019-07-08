$(function() {
    // 搜索
    search();
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