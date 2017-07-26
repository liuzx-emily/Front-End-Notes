/**
 * 返回顶部缓动效果 * 
 * @return 无
 * 使用举例：oDiv.onclick=backToTop;
 * 详情看这里http://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/
 */
function backToTop() {

   var doc = document[document.body.scrollTop ? 'body' : 'documentElement'];
   Math.easeout(doc.scrollTop, 0, 10, function(value) {
      doc.scrollTop = value;
   });
}
/**
 * Math.easeout()
 * @param  {number}   A        起始位置
 * @param  {number}   B        目标位置,默认为0
 * @param  {number}   rate     缓动速率,默认为4
 * @param  {Function} callback 变化的位置回调,支持两个参数:value和isEnding
 *                             表示当前的位置值（数值）以及是否动画结束了（布尔值）；
 * @return 无
 */
Math.easeout = function(A, B, rate, callback) {
   if (A == B || typeof A != 'number') {
      return;
   }
   B = B || 0;
   rate = rate || 4;
   if (!window.requestAnimationFrame) {
      requestAnimationFrame = function(fn) {
         setTimeout(fn, 17);
      };
   }
   var step = function() {
      A = A + (B - A) / rate;
      if (A < 1) {
         callback(B, true);
         return;
      }
      callback(A, false);
      requestAnimationFrame(step);
   };

   step();
};
