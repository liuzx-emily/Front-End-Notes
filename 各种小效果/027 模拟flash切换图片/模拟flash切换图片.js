var aPics = [];
var iPicLength = 15; //方便的更改图片总数量，下面的代码完全不用改
var oDivBigPic = getByClass('big')[0];
var oDivSmallPic = getByClass('small')[0];
var oDivOut = getByClass('out')[0];
var iZIndex = 1; //大图共用的z-index
var iCurrentPic = 2; //初始为2，可以随便设成任意数，就是初始图片。下面的代码完全不用改
var oPrev = document.getElementById('left');
var oNext = document.getElementById('right');
/*给大图展示区动态添加图片*/
for (var i = 0; i < iPicLength; i++) {
   aPics.push('../../../image/' + (i + 1) + '.jpg');
   var oImg = document.createElement('img');
   oImg.src = aPics[i];
   oImg.alt = '图片轮换:图片' + (i + 1);
   oImg.index = i; //自定义属性
   if (i === iCurrentPic)
   //第一张添加的图片层级设为最高
      oImg.style.zIndex = iZIndex;

   oDivBigPic.appendChild(oImg);
}
//不能把同一个oImg分别appendChild到两处去，因为后者会把前者刚添加好的oImg抢走。

/*给缩略图区动态添加图片*/
for (var i = 0; i < iPicLength; i++) {
   aPics.push('../image/' + (i + 1) + '.jpg');
   var oImg = document.createElement('img');
   oImg.src = aPics[i];
   oImg.alt = '图片缩略图:图片' + (i + 1);
   if (i === iCurrentPic)
   //不透明度100%
      fnChangeOpacity(oImg, 100);
   var oDiv = document.createElement('div');
   oDiv.appendChild(oImg);
   oDivSmallPic.appendChild(oDiv);
}


/*靠近左右箭头位置，才显示箭头*/

oDivBigPic.onmousemove = function(ev) {
   var ev = ev || event;
   /*鼠标位置、oPrev的位置都是相对整个文档的。所以有滚动条也不影响*/
   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
   var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
   var iMousePosLeft = ev.clientX + scrollLeft;
   var iMousePosTop = ev.clientY + scrollTop;
   oPrev.posLeft = getPos(oPrev).left;
   oPrev.posTop = getPos(oPrev).top;
   oNext.posLeft = getPos(oNext).left;
   oNext.posTop = getPos(oNext).top;
   fnNear(oPrev);
   fnNear(oNext);

   function fnNear(obj) {
      //距离“规则”随便弄了个简单好写的
      var iDistance = Math.abs(obj.posLeft - iMousePosLeft) +
         Math.abs(obj.posTop - iMousePosTop);
      if (iDistance < 150) { //距离要求可以自己改
         obj.style.visibility = 'visible';
         //改display或者zIndex应该也行（没试过）
      } else
         obj.style.visibility = 'hidden';
   }
};


/*按左右“箭头”切换图片*/
oPrev.onclick = function(argument) {
   iCurrentPic = (iCurrentPic - 1 + iPicLength) % iPicLength;
   fnChangePics();
};
oNext.onclick = function(argument) {
   iCurrentPic = (iCurrentPic + 1) % iPicLength;
   fnChangePics();
};



/*为了不让缩略图在一行排不开，而分行显示：同态设置缩略图区的长度
缩略图区能在一行包含下所有图片，别忘了在CSS中给外层div.out设置overflow:hidden*/
var iDivWidth = oDivSmallPic.getElementsByTagName('div')[0].offsetWidth;
//下面的右式不能用style.width，必须用offsetWidth
//1因为设置了border-box时，FF和chrome返回的width是包括p b的，而IE的不包括。
//2style.width只能获取行间的，扩展性低。
oDivSmallPic.style.width = iDivWidth * iPicLength + 'px'; //别忘了+ 'px'


/*动态添加图片上面已经完成，现在获取*/
var aBigImg = oDivBigPic.getElementsByTagName('img');
var aSmallImg = oDivSmallPic.getElementsByTagName('img');


/*小图悬浮，改变透明度*/
for (let i = 0; i < iPicLength; i++) {
   aSmallImg[i].onmouseenter = function() {
      if (i === iCurrentPic) return;
      fnMove(this, 'opacity', 100, 50);

   };
   aSmallImg[i].onmouseleave = function() {
      if (i === iCurrentPic) return;
      //易错：这里必须先清除timer，因为mouseenter开了定时器来改变透明度
      clearInterval(this.timer);
      fnChangeOpacity(this, 30);
   };
}


/*点击小图，大图也切换到相应图片*/
for (let i = 0; i < iPicLength; i++) {
   aSmallImg[i].onclick = function() {
      if (i === iCurrentPic) return;
      iCurrentPic = i;
      fnChangePics();
   };
}
fnAutoPlay();
oDivOut.onmouseover = function() {
   clearInterval(oDivBigPic.autoPlayTimer);
};
oDivOut.onmouseout = fnAutoPlay;

//自动切换
function fnAutoPlay() {
   clearInterval(oDivBigPic.autoPlayTimer);
   oDivBigPic.autoPlayTimer = setInterval(function(argument) {
      iCurrentPic = (iCurrentPic + 1) % iPicLength;
      fnChangePics();
   }, 2000);
}

//切换图片
function fnChangePics() {
   //当前的大图z-index设为最高【++iZIndex】
   aBigImg[iCurrentPic].style.zIndex = ++iZIndex;
   //大图展开效果【height先设为0，再逐渐变大】
   aBigImg[iCurrentPic].style.height = '0';
   fnMove(aBigImg[iCurrentPic], 'height', 300);
   //小图区“跟上”
   fnSmallPicsRoll();
   //改变小图的透明度
   for (let j = 0; j < iPicLength; j++) {
      fnChangeOpacity(aSmallImg[j], 30);
   }
   fnChangeOpacity(aSmallImg[iCurrentPic], 100);

   //封装函数：小图区“跟上”
   function fnSmallPicsRoll() {
      var iRoll;
      if (iCurrentPic < 2)
         iRoll = 0;
      else if (iCurrentPic >= iPicLength - 3) {
         iRoll = (iPicLength - 4) * iDivWidth;
      } else {
         iRoll = (iCurrentPic - 2) * iDivWidth;
      }
      oDivSmallPic.style.left = -iRoll + 'px';
   }
}

//封装函数：改变透明度，兼容标准和IE8
function fnChangeOpacity(obj, iTarget) {
   obj.style.opacity = iTarget / 100;
   obj.style.filter = 'Alpha(opacity=' + iTarget + ');';
}
