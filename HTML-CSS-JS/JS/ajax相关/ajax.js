/**
 * ajax封装函数
 * @param  {Object} ajaxInfo 
 * @return undefined
 * 
使用:必须要在服务器环境下测试（三个文件都放在www文件夹中，并且在浏览器地址栏中输入http://localhost/html文件名）。点击按钮。
之后再修改php文件时，html中的新闻无需手动刷新就会自动更新。
备注：
 1 考虑了ajax创建对象时，IE6-的兼容性问题。
 2 对于IE7-没有JSON对象的问题：记得下载json2.js文件，然后引入<script src="json2.js"></script>
 3 注意路径问题：假设这3个文件都在"www/ajax获取新闻"文件夹中；那么html代码中的链接：
   1 <script src="ajax.js"></script>不用改
   2 var ajaxInfo中的url: 'getNews.php'不需要改：
   3 但是php文件在中文路径中读不出来？？

ajaxInfo格式：（method和data可选）
var ajaxInfo = {
   url: 'getNews.php',
   fn: function(sData) {
      var data = JSON.parse(sData);
      var oUl = document.getElementById('ul1');
      var html = '';
      for (var i = 0; i < data.length; i++) {
         html += '<li><a href="">' + data[i].title + '</a> [<span>' + data[i].date + '</span>]</li>';
      }
      oUl.innerHTML = html;
   }
   method:'get',
   data:''
};

 */
function ajax(ajaxInfo) {
   var url = ajaxInfo.url;
   var fn = ajaxInfo.fn;
   var method = ajaxInfo.method || 'get';
   var data = ajaxInfo.data || '';
   var xhr = null;
   try {
      xhr = new XMLHttpRequest();
   } catch (e) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
   }

   if (method == 'get' && data) {
      url += '?' + data;
   }

   xhr.open(method, url, true);
   if (method == 'get') {
      xhr.send();
   } else {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(data);
   }

   xhr.onreadystatechange = function() {

      if (xhr.readyState == 4) {
         if (xhr.status == 200) {
            fn && fn(xhr.responseText);
         } else {
            console.log('出错了,Err：' + xhr.status);
         }
      }
   };
}
