/// <reerence path="jquery-1.9.1.js" />

var __ajax__count = '';
$(function () {
    initDataTable();

    bindTime();

    initIWB();

    initInputWithBTN();

    if ($('div.shadow-ajax').length == 0) {
        $('body').append('<div class="shadow-ajax"></div>');
    }
});

function initInputWithBTN() {
    $('.input-withbutton').initInputWithButton();
}


//数据类型 客户端验证表达式
var dtype = {};

dtype["normal"] = '000';
dtype["000"] = {};
dtype["000"].validexp = /^[a-zA-Z0-9_\u4e00-\u9fa5_\-、。.,，:：;；"“”\/（）+()*\s*]+$/;
dtype["000"].errormsg = '不能包含特殊字符';

dtype["normalstren"] = '001';//字符串只能包含数字字母和下划线
dtype["001"] = {};
dtype["001"].validexp = /^\w+$/gi;
dtype["001"].errormsg = '不能包含特殊字符';

dtype["normalstr"] = '002';
dtype["002"] = {};
dtype["002"].validexp = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
dtype["002"].errormsg = '不能包含特殊字符';

dtype["novalid"] = '009';//不验证
dtype["009"] = {};
dtype["009"].validexp = '';
dtype["009"].errormsg = '';

dtype["num"] = '010';//数字
dtype["010"] = {};
dtype["010"].validexp = /^[0-9]+$/;//验证表达式
dtype["010"].errormsg = '必须为数字';

dtype["int"] = '011';//整数
dtype["011"] = {};
dtype["011"].validexp = /^-?\d+$/;//验证表达式
dtype["011"].errormsg = '必须为整数';

dtype["intOverZero"] = '012';//正整数
dtype["012"] = {};
dtype["012"].validexp = /^[0-9]*[1-9][0-9]*$/;//验证表达式
dtype["012"].errormsg = '必须为正整数';

dtype["intBelowZero"] = '013';//负整数
dtype["013"] = {};
dtype["013"].validexp = /^-[0-9]*[1-9][0-9]*$/;//验证表达式
dtype["013"].errormsg = '必须为负整数';

dtype["intWithZero"] = '014';//正整数加0
dtype["014"] = {};
dtype["014"].validexp = /^\d+$/;//验证表达式
dtype["014"].errormsg = '必须为非负整数';

dtype["decimal"] = '015';//小数
dtype["015"] = {};
dtype["015"].validexp = /^(-?\d+)(\.\d+)?$/;//验证表达式 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
dtype["015"].errormsg = '必须为小数';

dtype["double"] = '016';//双精度浮点小数
dtype["016"] = {};
//dtype["016"].validexp = /^[-\+]?\d+(\.\d+)?$/;//验证表达式
dtype["016"].validexp = /^[0-9]+(\.[0-9]{2})?$/;//验证表达式0
dtype["016"].errormsg = '必须为小数';

dtype["floatOverZero"] = '017';//正浮点数 包括0
dtype["017"] = {};
dtype["017"].validexp = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//dtype["017"].validexp = /^([1-9]*\d*[.]\d*)|^([0-9]+)$/;//验证表达式
dtype["017"].errormsg = '必须非负的整数或小数';

dtype["phone"] = '030';//电话号码
dtype["030"] = {};
dtype["030"].validexp = /^(\d{3,4}\-)?[1-9]\d{6,7}$/;
dtype["030"].errormsg = '必须为座机号码';

dtype["cellphone"] = '031';//手机
dtype["031"] = {};
dtype["031"].validexp = /^(\+\d{2,3}\-)?1[3,5,8,7]\d{9}$/;///^(\+\d{2,3}\-)?\d{11}$/;
dtype["031"].errormsg = '必须为手机号码';

dtype["phoneOrCellphone"] = '032';//手机或电话
dtype["032"] = {};
dtype["032"].validexp = /^(\d{3,4}\-)?[1-9]\d{6,7}$|^(\+\d{2,3}\-)?^(\+\d{2,3}\-)?1[3,5,8,7]\d{9}$/;
dtype["032"].errormsg = '格式不正确';

dtype["netAddress"] = '040';//网址
dtype["040"] = {};
dtype["040"].validexp = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
dtype["040"].errormsg = '必须为网址';

dtype["dateOnly"] = '051';//时间-精确到日
dtype["051"] = {};
dtype["051"].validexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
dtype["051"].errormsg = '必须为日期格式（yyyy-MM-dd）';

dtype["dateAndTime"] = '052';//时间-精确到秒
dtype["052"] = {};
dtype["052"].validexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
dtype["052"].errormsg = '必须为日期格式（yyyy-MM-dd HH:mm:ss）';

dtype["dateAndMinute"] = '053';//时间-精确到分钟
dtype["053"] = {};
dtype["053"].validexp = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
dtype["053"].errormsg = '必须为日期格式（yyyy-MM-dd HH:mm）';

dtype["email"] = '060';//邮箱
dtype["060"] = {};
dtype["060"].validexp = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
dtype["060"].errormsg = '必须为邮箱格式';

dtype["zipcode"] = '061';//邮政编码
dtype["061"] = {};
dtype["061"].validexp = /^\d{6}$/;
dtype["061"].errormsg = '必须为邮政编码格式';

dtype["ip"] = '070';//IP地址
dtype["070"] = {};
dtype["070"].validexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
dtype["070"].errormsg = '必须为ipv4地址格式';

dtype["idcard"] = '072';//身份证
dtype["072"] = {};
dtype["072"].validexp = /^\d{6}\d{4}((0[1-9])|(1[0-2]))(([0-2]\d)|3[0-1])\d{1}(\d{2}[x|X0-9;])?$/;    //月份在12之内，日期在31之内
dtype["072"].errormsg = '必须为身份证格式';

//js生成guid方法
function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }

    return guid;
}
//客户端绑定列对象
function Dcol() {
    this.colname = '';
    this.classname = '';
    this.titlename = '';
    this.maxlen = ''
    this.notcut = true;
    this.coltype = 'text';
    this.sortcol = '';
    this.defaultvalue = '';
    this.vldexp = '';
    this.titlecontent = '';
}

//机柜中设备类
function ItemInCabinet(pDisplayName, pDeviceId, pUStartPosition, pUEndPosition, IsCurrent) {
    this.DisplayName = pDisplayName;
    this.DeviceId = pDeviceId;
    this.UStartPosition = pUStartPosition;
    this.UEndPosition = pUEndPosition;
    this.IsCurrent = IsCurrent;
}

//构造没有数据html
function noDataShow(message) {
    var html = '';
    if (message) {
        html = '<div class="noDataImg">' + message + '</div>';
    } else {
        html = '<div class="noDataImg">暂无数据</div>';
    }
    return html;
}

//数据项
function DataItem(value) {
    this.Val = value != null ? value : '';//值
    this.DataType = '';//数据类型（从验证表达式获得，用于在服务器端验证时使用）
    this.CanBeNull = 1;//1-可为空；0-不可为空；
    this.CHS = '';//中文含义（从err自定义属性中获得，用于服务器端验证不通过时提示使用）
    this.ErrorMsg = '';//错误信息，用户客户端验证提示显示
    this.ValidHtml = '1';//是否验证html标记
    this.MaxLength = -1;
}

//初始化数据表格方法
function initDataTable() {
    $('table.dataTable').each(function () {
        $(this).find('thead > tr:first > th').each(function () {
            var sortcol = ($.trim($(this).attr('sortcol')) == undefined || $.trim($(this).attr('sortcol')) == '') ? '' : $.trim($(this).attr('sortcol'));
            if (sortcol != '') {
                $(this).addClass('sortAble');
                $(this).click(function () {
                    $(this).siblings().removeClass('sortAsc').removeClass('sortDesc');

                    if (!$(this).hasClass('sortAsc') && !$(this).hasClass('sortDesc')) {
                        $(this).addClass('sortAsc');
                    }
                    else if ($(this).hasClass('sortAsc') && !$(this).hasClass('sortDesc')) {
                        $(this).removeClass('sortAsc').addClass('sortDesc');
                    }
                    else if (!$(this).hasClass('sortAsc') && $(this).hasClass('sortDesc')) {
                        $(this).removeClass('sortDesc').addClass('sortAsc');
                    }

                    if ($(this).parents('table').data('ControlType') === 'DataTable') {
                        var _fn = $(this).parents('table').data('SortFunc');
                        if ($.isFunction(_fn)) {
                            _fn();
                        }
                        else {
                            throw '没有绑定排序方法';
                        }
                    }
                });
            }

        });
        $(this).data('defaultSwitcherData', {
            dataItem: [
                new ItemOfSwitcher('0', '否', '#f00', '#fff')
                , new ItemOfSwitcher('1', '是', '#4cff00')
            ],
            defaultValue: '1'
            ,
            callback: null
        });
    });
}

//判断是否为正整数
function IsPInt(num) {
    if (num === undefined || num === null || num === '') {
        return false;
    }

    if (!isNaN(num)) { //判断是否为数字
        if (num.toString().indexOf(".") > -1) { //判断是否有小数点
            return false;
        }
        if (num.toString().indexOf("-") > -1) { //判断是否有负号
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}

//对话框关闭按钮事件
function fn_CloseDialog(obj) {
    $(obj).parents('div.dialogFrame').hide();
    if ($('.dialog:visible').length == 0) {
        $('.shadow').hide();
    }
}

//处理ajax请求
function handleAjaxFlag(IsReturn) {
    if (IsReturn) {
        __ajax__count = __ajax__count.substr(1);
        if (__ajax__count.length == 0) {
            $('div.shadow-ajax:visible').hide().html('');
        }
    }
    else {
        __ajax__count += '1';
        if ($('div.shadow-ajax:visible').length == 0) {
            $('div.shadow-ajax').html('<div style="color:#fff; display:table-row;"><div style="display:table-cell;vertical-align:middle;text-align:center;">正在处理数据，请稍后...<br /><div class="loadingImg"></div></div></div>').css({ 'display': 'table' });

        }
    }
}

//*************************************分页相关*****************************************************************
//分页对象
function PagerObj(pgid, pagerInfo, pgsizeArr, fn, isloadbigpgsize) {
    // 每页指定默认值是否为指定数组的值
    var mpgsizeArr = ["10", "20", "30", "40", "50", "100"];
    this.isPgSize = false;
    this.isLoadBigPgSize = isloadbigpgsize;
    // 绑定对象的id
    this.pgId = pgid;
    if (!isloadbigpgsize) {
        this.pgSizeArr = pgsizeArr;
    } else {
        this.pgSizeArr = mpgsizeArr;
    }
    //每页多少条记录
    //判断size是不是vpgsize 数组中的一个
    for (var i = 0; i < this.pgSizeArr.length; i++) {
        if (this.pgSizeArr[i] == pagerInfo.pageSize) {
            this.isPgSize = true;
        }
    }
    if (this.isPgsize) {
        this.pgSize = pagerInfo.pageSize;
    } else {
        this.pgSize = this.pgSizeArr[0];
    }
    // 填充select下拉框
    var str = "";
    for (var i = 0; i < this.pgSizeArr.length; i++) {
        str += "<option value='" + this.pgSizeArr[i] + "'>" + this.pgSizeArr[i] + "</option>";
    }
    $('#' + this.pgId).find('select.pager_pgsize').empty();
    $('#' + this.pgId).find('select.pager_pgsize').append(str);

    //当前页
    if (pagerInfo.pgindex !== undefined && pagerInfo.pgindex !== "") {
        this.pgindex = pagerInfo.pgindex;
    } else {
        this.pgindex = 1;
    }
    this.pgSum = 0;
    //多少条数据
    this.count = 0;
    // 赋值
    this.SetObj = function (ServerObj) {
        // 总记录条数
        if (ServerObj.count !== undefined && ServerObj.count !== "") {
            this.count = ServerObj.count;
        }
        if (ServerObj.pageSize !== undefined && ServerObj.pageSize !== "") {
            var ispageSize = false;
            for (var i = 0; i < this.pgSizeArr.length; i++) {
                if (this.pgSizeArr[i] == ServerObj.pageSize) {
                    ispageSize = true;
                }
            }
            if (ispageSize) {
                this.pgSize = ServerObj.pageSize;
            } else {
                this.pgSize = this.pgSizeArr[0];
            }
        } else {
        }
        // 共多少页
        if (ServerObj.pageSum !== undefined && ServerObj.pageSum !== "") {
            this.pgSum = ServerObj.pageSum;
        } else {
            this.pgSum = Math.ceil(Math.floor(this.count) / Math.floor(this.pgSize));
        }
        if (ServerObj.pgindex !== undefined && ServerObj.pgindex !== "") {
            if (Math.floor(ServerObj.pgindex) > Math.floor(this.pgSum)) {
                if (this.pgSum == 0) {
                    this.pgindex = 1;
                } else {
                    this.pgindex = Math.floor(this.pgSum);
                }

            } else if (Math.floor(ServerObj.pgindex) > 0) {
                this.pgindex = Math.floor(ServerObj.pgindex);
            }
        } else {
            if (this.pgindex > this.pgSum) {
                if (this.pgSum == 0) {
                    this.pgindex = 1;
                } else {
                    this.pgindex = this.pgSum;
                }

            }
        }
        this.SetPagerText();
    }
    // 初始化分页的内容
    this.SetPagerText = function () {
        // 当前是多少页
        $('#' + this.pgId).find('.pager_curr').val(this.pgindex);
        // $('#' + pgid).find('.txt_pager_curr').val(this.curr);
        //共多少条记录
        $('#' + this.pgId).find('.pager_rowcount').text(this.count);
        //共多少页
        $('#' + this.pgId).find('.pager_totalpage').text(this.pgSum);
        //每页多少条记录
        $('#' + this.pgId).find('.pager_pgsize').val(this.pgSize);
    }
    //清除设置
    this.Reset = function () {
        this.pgindex = 1;
        this.count = 0;
        this.pgSum = 0;
    }
    var _self = this;
    // 设置每页多少条数据
    $('#' + this.pgId).find('select.pager_pgsize').val(this.pgSize);
    // 上一页
    $('#' + this.pgId).find('div.img_prev').click(function () { ChangePage(_self, -1, fn); }); //绑定上一页
    // 下一页
    $('#' + this.pgId).find('div.img_next').click(function () { ChangePage(_self, -2, fn); }); //绑定下一页
    // 第一页
    $('#' + this.pgId).find('div.img_first').click(function () { ChangePage(_self, 1, fn); }); //绑定上一页
    // 最后一页
    $('#' + this.pgId).find('div.img_last').click(function () { ChangePage(_self, 0, fn); }); //绑定下一页
    //跳转按钮
    $('#' + this.pgId).find('a.pager_jump').click(function () {
        var jump_pg = $('#' + this.pgId).find('.pager_curr').val();
        //判断不是正整数时
        if (!IsPInt(jump_pg)) {
            //$.MsgBox.Alert('fail', '请输入正整数作为跳转页码');
            return false;
        }
        ChangePage(_self, jump_pg, fn);
    });//绑定跳转事件
    $('#' + this.pgId).find('select.pager_pgsize').change(function () { ChangePageSize(this, _self, fn); });
}
//翻页方法
function ChangePage(pg, flag, fn) {

    if (flag == '-1') { //向前翻页
        var nextindex = pg.pgindex - 1;
        if (!(nextindex > 0 && nextindex <= pg.pgSum)) {
            //$.MsgBox.Alert('error', '您输入的页码有误！');
            return;
        }
        if (nextindex > 0) {
            pg.pgindex = nextindex;
            pg.SetPagerText();
            fn();

        }
    }
    else if (flag == '-2') { //向后翻页
        var nextindex = pg.pgindex + 1;
        if (!(nextindex > 0 && nextindex <= pg.pgSum)) {
            //$.MsgBox.Alert('error', '您输入的页码有误！');
            return;
        }
        if (nextindex <= pg.pgSum) {
            pg.pgindex = nextindex;
            pg.SetPagerText();
            fn();

        }
        // 第一页
    } else if (flag == "1") {
        pg.pgindex = 1;

        pg.SetPagerText();
        fn();
        // 最后一页
    } else if (flag == "0") {
        if (pg.pgSum == 0) {
            pg.pgindex = 1;
        } else {
            pg.pgindex = pg.pgSum;
        }


        pg.SetPagerText();
        fn();
    }
    else {//跳转
        if (IsPInt(flag)) {//首先保证数字
            var nextindex = parseInt(flag);
            if (!(nextindex > 0 && nextindex <= pg.pgSum)) {
                //$.MsgBox.Alert('error', '您输入的页码有误！');
                return;
            }

            if (nextindex > 0 && nextindex <= pg.pgSum) {
                pg.pgindex = nextindex;

                pg.SetPagerText();
                fn();
            }
            else {
                //$.MsgBox.Alert('fail', '输入页码超出最大范围');
            }
        }
        else {
            throw '输入的页码不正确';
            //$.MsgBox.Alert('fail', '请输入正整数作为跳转页码');
        }
    }
}
//重新设置每页显示条数方法
function ChangePageSize(obj, pg, fn) {
    var PageSizeNew = $(obj).val();
    if (PageSizeNew == '-1') {
        var objContainer = $(obj).parent();
        PageSizeNew = parseInt(objContainer.find('select:pager_pgsize').val());
    }
    else {
        PageSizeNew = parseInt(PageSizeNew);
    }
    pg.pgSize = PageSizeNew;
    pg.pgSum = Math.ceil(pg.count / pg.pgSize);
    pg.pgindex = 1;
    pg.SetPagerText();
    fn();
}
//*************************************分页相关结束*****************************************************************

//客户端单项验证方法
//验证数据项是否符合所属类型
function ValidDataItem(ditem) {
    if (ditem.CanBeNull == 0 && $.trim(ditem.Val) == '') {//如果不能为空，值为空，则报错“应该不能为空”，返回FALSE
        ditem.ErrorMsg = ditem.CHS + '不能为空';
        return false;
    }
    else if (ditem.CanBeNull == 1 && ditem.Val == '') {//如果能为空，并且值已经为空，则返回TRUE
        return true;
    }

    //长度限制验证
    if (ditem.MaxLength > 0 && ditem.MaxLength < ditem.Val.length) {
        ditem.ErrorMsg = ditem.CHS + '不能超过' + ditem.MaxLength + '字';
        return false;
    }
    var reg = dtype[ditem.DataType].validexp;
    var errmsg = ditem.CHS + dtype[ditem.DataType].errormsg;
    ditem.ErrorMsg = errmsg;
    if (reg == '') {
        return true;
    }
    else {
        return reg.test(ditem.Val);
    }
}

//开关控件接收数据类型构造函数
function ItemOfSwitcher(pVal, pText, pBgcolor, pTextcolor) {
    this.val = pVal;
    this.text = pText;
    this.bgcolor = $.isNullOrUndefinedOrEmpty(pBgcolor) ? '#ccc' : pBgcolor;
    this.textcolor = $.isNullOrUndefinedOrEmpty(pTextcolor) ? '#000' : pTextcolor;
}

//初始化日期控件方法
function bindTime() {
    $(".input-date-time").addClass("Wdate");
    $(".input-date-time").attr('onclick', "WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm:ss'})");
    $(".input-date").addClass("Wdate");
    $(".input-date").attr('onclick', "WdatePicker({el:this,dateFmt:'yyyy-MM-dd'})");
    $(".input-date-mini").addClass("Wdate");
    $(".input-date-mini").attr('onclick', "WdatePicker({el:this,dateFmt:'yyyy-MM-dd HH:mm'})");
}

//初始化InputWithButton
function initIWB() {
    $('.input.input-withbutton').initInputWithButton();
}

//***************************************************************为数组和字符串添加扩展方法**************************************************************************
Array.prototype.removeByValue = function (propertyName, targetValue) {
    var v_delIndex = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][propertyName] == targetValue) {
            v_delIndex = i;
            break;
        }
    }

    if (v_delIndex > -1) {
        this.splice(v_delIndex, 1);
    }
}
Array.prototype.hasValue = function (propertyName, targetValue) {
    var v_delIndex = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][propertyName] == targetValue) {
            v_delIndex = i;
            break;
        }
    }
    if (v_delIndex > -1) {
        return true;
    }
    else {
        return false;
    }
}
Array.prototype.getItemByValue = function (propertyName, targetValue) {
    var v_delIndex = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i][propertyName] == targetValue) {
            v_delIndex = i;
            break;
        }
    }
    if (v_delIndex > -1) {
        this[v_delIndex].OwnIndex = v_delIndex;
        return this[v_delIndex];
    }
    else {
        return null;
    }
}
Array.prototype.findMutliByValue = function (propertyName, targetValue) {
    var retArr = [];
    for (var i = 0; i < this.length; i++) {
        if (this[i][propertyName] == targetValue) {
            retArr.push(this[i]);
        }
    }
    return retArr;
}
Array.prototype.findMutliByValueArr = function (sourceArrItemCol, targetArr, targetArrItemColToFind) {
    var retArr = [];
    for (var i = 0; i < this.length; i++) {
        var sourceItem = this[i];
        for (var j = 0; j < targetArr.length; j++) {
            var targetItem = targetArr[j];

            if (sourceItem[sourceArrItemCol] == targetItem[targetArrItemColToFind]) {
                retArr.push(sourceItem);
                break;
            }
        }
    }
    return retArr;
}
String.prototype.formatDateString = function (len) {

    return this.replace(/T/g, ' ').substr(0, len);
}

//调用switcher的点击后事件
function switcherClickEvent(obj, pEvent, fnCall) {
    var _switcher = $(obj);
    pEvent.stopPropagation();
    if (_switcher.hasClass('left')) {
        var currRight = _switcher.outerWidth(true);
        _switcher.css('right', currRight + 'px').css('left', '');
        _switcher.removeClass('left');
        _switcher.animate({
            right: '4px'
        }, 'fast', function () {
            _switcher.addClass('right');
            if ($.isFunction(fnCall)) {
                var __controlData = _self.data('controlData');
                fnCall(__controlData[0].val, obj);
            }
            else if (typeof fnCall == 'string') {
                var callExp = fnCall + '("' + __controlData[0].val + '", obj)';
                eval(callExp);
            }
        });
    }
    else if (_switcher.hasClass('right')) {
        var currLeft = _switcher.outerWidth(true);
        _switcher.css('left', currLeft + 'px').css('right', '');
        _switcher.removeClass('right');
        _switcher.animate({
            left: '4px'
        }, 'fast', function () {
            _switcher.addClass('left');
            if ($.isFunction(fnCall)) {
                var __controlData = _self.data('controlData');
                fnCall(__controlData[1].val, obj);
            }
            else if (typeof fnCall == 'string') {
                var callExp = fnCall + '("' + __controlData[1].val + '", obj)';
                eval(callExp);
            }
        });
    }
}

//清除带按钮的输入框取值方法
function clearValueOfInputWithButton(obj) {
    $(obj).parents('div.input').find('input.input-withbutton').val('');
    $(obj).parents('div.input').find('input.input_val').val('');
}

//调用带按钮的输入框的按钮点击事件方法

$.extend({
    //通用AJAX调用方法
    rajax: function (_url, _data, _successFn, _isDataToString) {

        var _ajaxItems = null;
        if (_isDataToString === true) {
            _ajaxItems = {
                url: _url
                , data: JSON.stringify(_data)
                , type: 'POST'
                , cache: false
                , dataType: 'json'
                , contentType: "application/json"
                , success: function (retobj) {
                    //处理ajax请求效果
                    handleAjaxFlag(true);

                    if (retobj.flag == '-1') {
                        top.$.MsgBoxInShow('error', retobj.data, false);
                        return false;
                    }
                    else if (retobj.flag == '-9') {
                        top.$.MsgBoxInShow('error', retobj.data, false);
                        return false;
                    }
                    else if (retobj.flag == '-7') {//用户缓存过期
                        top.window.location.reload();
                    }

                    //成功后的处理（自定义函数）
                    return _successFn(retobj);
                }
                , error: function (e1, e2, e3) {
                    handleAjaxFlag(true);

                    var msg = e1.responseText || '请求发生错误，请从控制台里查看错误对象的JSON字符串';
                    top.$.MsgBoxInShow('error', msg, false);
                    console.log('【错误对象1】');
                    console.log(e1);
                    console.log('【错误对象2】');
                    console.log(e2);
                    console.log('【错误对象3】');
                    console.log(e3);
                    //if (e1.readyState != '0') {
                    //$.MsgBox.Alert('fail', '请求异常');
                    //}

                    //if (__ajax__count.length == 0) {
                    //    $.MsgBox.Alert('fail', '请求异常');
                    //}
                    //alert('请求异常');
                }
            };
        }
        else {
            _ajaxItems = {
                url: _url
                , data: _data
                , type: 'POST'
                , cache: false
                , dataType: 'json'
                , success: function (retobj) {
                    //处理ajax请求效果
                    handleAjaxFlag(true);

                    if (retobj.flag == '-1') {
                        top.$.MsgBoxInShow('error', retobj.data, false);
                        return false;
                    }
                    else if (retobj.flag == '-9') {
                        top.$.MsgBoxInShow('error', retobj.data, false);
                        return false;
                    }
                    else if (retobj.flag == '-7') {//用户缓存过期
                        top.window.location.reload();
                    }

                    //成功后的处理（自定义函数）
                    return _successFn(retobj);
                }
                , error: function (e1, e2, e3) {
                    handleAjaxFlag(true);

                    var msg = e1.responseText || '请求发生错误，请从控制台里查看错误对象的JSON字符串';
                    top.$.MsgBoxInShow('error', msg, false);
                    console.log('【错误对象1】');
                    console.log(e1);
                    console.log('【错误对象2】');
                    console.log(e2);
                    console.log('【错误对象3】');
                    console.log(e3);
                    //if (e1.readyState != '0') {
                    //$.MsgBox.Alert('fail', '请求异常');
                    //}

                    //if (__ajax__count.length == 0) {
                    //    $.MsgBox.Alert('fail', '请求异常');
                    //}
                    //alert('请求异常');
                }
            };
        }

        handleAjaxFlag(false);
        $.ajax(_ajaxItems);
    }
    ,

    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    ,
    //判断是否为空串或者是否为NULL或者是否为undefined
    isNullOrUndefinedOrEmpty: function (_value) {
        if (_value == undefined || _value == null || _value == '') {
            return true;
        }
        else {
            return false;
        }
    }
    ,
    /******************************************信息提示框、确认框********************************************************/
    //iconType:yes/error/warn/ask
    MsgBoxShow: function (iconType, message, fnSure, fnCancel) {
        if ($("#box") != 'undefined' && this.length >= 1) {
            $("#box").remove();
            var htl = '<div class="box" id="box"><div class="box_title"><h3></h3><div class="close"></div><div class="clear"></div></div><div class="box_content"><div class="box_icon"></div><div class="box_cont"></div><div class="clear"></div></div><div class="box_anniu"></div></div>';
            $("body").append(htl);
            $('.box').css('display', 'block');
            //标题
            var texth3 = "";
            texth3 = "系统提示";
            $(".box .box_title h3").text(texth3);

            //左侧图标
            $('.box_icon').addClass('box_icon_' + iconType);

            //提示内容
            var strCont = "";
            strCont = '<p>' + message + '</p>';
            $('.box_cont').html(strCont);

            //按钮
            var str = "";
            if (iconType == 'yes' || iconType == 'error') {
                str = '<button class="anniu yes">确 定</button>';

                $(".box_anniu").html(str);
                $('.yes').click(function () {
                    $('.box').hide();
                    return true;
                });
                $('.close').click(function () {
                    $('.box').hide();
                    return false;
                });
            }
            else if (iconType == 'warn' || iconType == 'ask') {
                str = '<button class="anniu yes">确 定</button><button class="anniu cancel">取 消</button>';
                $(".box_anniu").html(str);
                $('#box .yes').click(function () {
                    if ($.isFunction(fnSure)) {
                        fnSure();
                    }

                    $('.box').hide();
                    return true;
                });
                $('#box .cancel').click(function () {
                    if ($.isFunction(fnCancel)) {
                        fnCancel();
                    }

                    $('.box').hide();
                    return false;
                });
                $('#box .close').click(function () {
                    if ($.isFunction(fnCancel)) {
                        fnCancel();
                    }

                    $('.box').hide();
                    return false;
                });
            }

            var win_width = $(window).width();
            var box_width = $('.box_information').width();
            var box_left = win_width / 2 - box_width / 2 + 'px';
            $('.box_information').css({ position: 'fixed', left: box_left });

        } else {
            var htl = '<div class="box"><div class="box_title"><h3></h3><div class="close"></div><div class="clear"></div></div><div class="box_content"><div class="box_icon"></div><div class="box_cont"></div><div class="clear"></div></div><div class="box_anniu"></div></div>';
            $("body").append(htl);
            $('.box').css('display', 'block');
            //标题
            var texth3 = "";
            texth3 = title;
            $(".box .box_title h3").text(texth3);

            //左侧图标
            $('.box_icon').addClass('box_icon_' + iconType);

            //提示内容
            var strCont = "";
            strCont = '<p>' + message + '</p>';
            $('.box_cont').html(strCont);

            //按钮
            var str = "";
            if (iconType == 'yes' || iconType == 'error') {
                str = '<button class="anniu yes">确 定</button>';

                $(".box_anniu").html(str);
                $('.close').click(function () {
                    $('.box').hide();
                    return true;
                });
                $('.close').click(function () {
                    $('.box').hide();
                    return false;
                });
            }
            else if (iconType == 'warn' || iconType == 'ask') {
                str = '<button class="anniu yes">确 定</button><button class="anniu cancel">取 消</button>';
                $(".box_anniu").html(str);
                $('.yes').click(function () {
                    if ($.isFunction(fnSure)) {
                        fnSure();
                    }
                    $('.box').hide();
                    return true;
                });
                $('.cancel').click(function () {
                    if ($.isFunction(fnCancel)) {
                        fnCancel();
                    }
                    $('.box').hide();
                    return false;
                });
                $('.close').click(function () {
                    if ($.isFunction(fnCancel)) {
                        fnCancel();
                    }
                    $('.box').hide();
                    return false;
                });
            }
        }
    }
    ,
    MsgBoxInShow: function (iconType, message, autoDisappear, showingMillisecond) {
        if ($("#box_in") != 'undefined' && this.length >= 1) {
            $("#box_in").remove();
            var htl = '<div class="box_information" id="box_in"><div class="box_icon_in"></div><div class="box_contentIn"></div><div class="box_information_clone"></div></div>';
            $("body").append(htl);
            $('#box_in').css('display', 'block');
            //左侧图标
            $('.box_icon_in').addClass('box_icon_' + iconType);
            //提示内容
            var strCont = "";
            strCont = '<p>' + message + '</p>';
            $('.box_contentIn').html(strCont);
            if (arguments.length == 4) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, showingMillisecond);
            } else if (arguments.length == 3 && autoDisappear === true) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, 2000);
            } else if (arguments.length == 3 && autoDisappear === false) {
                $('.box_information_clone').css("display", "block");
                $('.box_information_clone').click(function () {
                    $('.box_information').hide();
                });
            } else if (arguments.length == 2) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, 2000);
            }

            var win_width = $(window).width();
            var box_width = $('.box_information').width();
            var box_left = win_width / 2 - box_width / 2 + 'px';
            $('.box_information').css({ position: 'fixed', left: box_left })

        } else {
            var htl = '<div class="box_information" id="box_in"><div class="box_icon_in"></div><div class="box_content"></div><div class="box_information_clone">/div></div>';
            $("body").append(htl);
            $('#box_in').css('display', 'block');
            //左侧图标
            $('.box_icon_in').addClass('box_icon_' + iconType);
            //提示内容
            var strCont = "";
            strCont = '<p>' + message + '</p>';
            $('.box_contentIn').html(strCont);
            if (arguments.length == 4) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, showingMillisecond);
            } else if (arguments.length == 3 && autoDisappear === true) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, 2000);
            } else if (arguments.length == 3 && autoDisappear === false) {
                $('.box_information_clone').css("display", "block");
                $('.box_information_clone').click(function () {
                    $('.box_information').hide();
                });
            } else if (arguments.length == 2) {
                $('.box_information_clone').css("display", "none");
                setTimeout(function () {
                    $('.box_information').hide();
                }, 2000);
            }
        };

    }

    /******************************************信息提示框、确认框结束********************************************************/

    /******************************************创建开关的html****************************************************/
    ,
    createSwitchHtml: function (ItemData, fnCall, ValDefault, IsCanClick) {

        if (!($.isArray(ItemData)) && ItemData != null) {
            throw 'createSwitchHtml方法：绑定的ItemData参数不正确，如果想用默认的样式初始化第一个参数请传null';
            return false;
        }

        if ($.isArray(ItemData)) {
            if (ItemData.length == 2) {
                if (!(ItemData[0].constructor == ItemOfSwitcher && ItemData[1].constructor == ItemOfSwitcher)) {
                    throw 'createSwitchHtml方法：请用ItemOfSwitcher函数初始化绑定样式的对象';
                }
            }
            else {
                throw 'createSwitchHtml方法：绑定样式数组元素个数只能是2';
                return false;
            }
        }
        else if (ItemData == null) {
            ItemData = [
                new ItemOfSwitcher('0', '否', '#f00', '#fff')
                , new ItemOfSwitcher('1', '是', '#4cff00')
            ];
        }
        else {
            throw 'createSwitchHtml方法：方法第一个参数必须是数组或者null';
        }

        var TextDefault = ItemData[0].text;
        var ClassDefault = 'right'
        if (!$.isNullOrUndefinedOrEmpty(ValDefault)) {
            TextDefault = ValDefault == ItemData[0].val ? ItemData[0].text : ItemData[1].text;
            ClassDefault = ValDefault == ItemData[0].val ? 'right' : 'left';
        }

        var clickExp = IsCanClick === true && $.isFunction(fnCall) ? 'onclick = "switcherClickEvent(this, event,\'' + fnCall.name + '\')"' : '';
        var vhtml = '<div class="LittleSwith">'
            + '<div class="SwitchBack" bindval = "' + ItemData[0].val + '" style = "background-color:' + ItemData[0].bgcolor + '; color:' + ItemData[0].textcolor + ';" > ' + ItemData[0].text + '</div> '
            + '<div class="SwitchBack" bindval="' + ItemData[1].val + '" style="background-color:' + ItemData[1].bgcolor + '; color:' + ItemData[1].textcolor + ';">' + ItemData[1].text + '</div>'
            + '<div style="clear:both;"></div>'
            + '<div class="Switcher ' + ClassDefault + '" ' + clickExp + ' >' + TextDefault + '</div></div>';

        return vhtml;
    }
    /******************************************创建开关的html结束*************************************************/
    ,
    createInputWithButtonHtml: function () {
        var vhtml = '<div class="input"><input class="input-withbutton" type="text"><input class="input_val" value="" type="hidden"><span class="input_delete" onclick="clearValueOfInputWithButton(this)"><a>X</a></span><span class="input_btn">...</span></div>';
        return vhtml;
    }
});

$.fn.extend({
    /*******************************************表格控件********************************************************/
    //绑定列表开关类型列的样式和回调方法
    bindTableSwitcher: function (colName, ItemData, fnCallback) {
        $(this).each(function () {
            var _self = $(this);
            if (!_self.hasClass('dataTable')) {
                throw 'bindTableSwitcher方法：要绑定开关控件数据的对象不是Table';
            }

            if (_self.find('thead tr:first th[datacol=' + colName + ']').length == 0) {
                throw 'bindTableSwitcher方法：您绑定的列' + colName + '不在数据表绑定列中';
            }

            $(this).data(colName + 'SwitcherData', { dataItem: ItemData, defaultValue: null, callback: fnCallback });
        });
    }
    ,
    //给可编辑的dataTable指定inputwithbutton的点击方法
    bindTableIWBClickFunc: function (colName, fnInputWithButtonClick) {
        $(this).each(function () {
            var _self = $(this);

            _self.data(colName + 'IWBFn', fnInputWithButtonClick);
        });
    }
    ,
    //给可编辑的dataTable的单选列指定选项
    bindTableSelectOptions: function (colName, optionsArr) {
        $(this).each(function () {
            var _self = $(this);

            _self.data(colName + 'Options', optionsArr);
        });
    }
    ,
    //数据表绑定数据方法
    databind: function (clientTable, fnCallback, isNotBindRowClick) {

        var _self = $(this);
        var _hasChildTable = typeof _self.data("ChildCol") == 'string' && _self.data("ChildCol") != '' ? true : false;
        var _ChildCol = _hasChildTable ? _self.data("ChildCol") : '';
        _self.find('tbody > tr').remove();

        if (!$.isArray(clientTable)) {
            throw 'databind方法：数据源绑定错误，给列表绑定的数据源不是数组';
            return false;
        }

        if (_hasChildTable) {
            _self.find('thead').find('th:first').before('<th></th>');
        }

        var arrCols = [];
        var arrSwitcherCol = [];
        var arrInputWithButtonCol = [];
        //取得行头遍历绑定的列名
        _self.find('thead > tr:first').find('th').each(function () {
            if ($(this).attr('datacol') != undefined && $.trim($(this).attr('datacol')) != '') {
                var tmp = new Dcol();
                tmp.colname = $.trim($(this).attr('datacol'));
                tmp.titlename = $.isNullOrUndefinedOrEmpty($.trim($(this).attr('titlecol'))) ? '' : $.trim($(this).attr('titlecol'));
                tmp.classname = ($(this).attr('cls') != undefined && $.trim($(this).attr('cls')) != '') ? $.trim($(this).attr('cls')) : '';
                tmp.coltype = ($(this).attr('coltype') == undefined || $(this).attr('coltype') == '') ? 'text' : $(this).attr('coltype');
                tmp.maxlen = ($(this).attr('maxlen') == undefined || $(this).attr('maxlen') == '' || /^[0-9]*[1-9][0-9]*$/.test($(this).attr('maxlen')) == false) ? 15 : parseInt($(this).attr('maxlen'));
                tmp.notcut = $(this).attr('notcut') == '0' ? false : true;
                tmp.sortcol = ($.trim($(this).attr('sortcol')) == undefined || $.trim($(this).attr('sortcol')) == '') ? '' : $.trim($(this).attr('sortcol'));
                tmp.defaultvalue = ($.trim($(this).attr('defval')) == undefined || $.trim($(this).attr('defval')) == '') ? '' : $.trim($(this).attr('defval'));
                tmp.vldexp = ($.trim($(this).attr('vldstr')) == undefined || $.trim($(this).attr('vldstr')) == '') ? 'novalid1' : $.trim($(this).attr('vldstr'));
                tmp.titlecontent = $(this).text();
                arrCols.push(tmp);
            }
        });

        //将开关列遍历出来单存另一个数组
        for (var j = 0; j < arrCols.length; j++) {
            if (arrCols[j].coltype == 'switcher') {
                arrSwitcherCol.push({ colName: arrCols[j].colname, colIndex: j });
            }
            else if (arrCols[j].coltype == 'inputwithbutton') {
                arrInputWithButtonCol.push({ colName: arrCols[j].colname, colIndex: j });
            }
        }

        var vhtml = '';
        _self.data('ControlType', 'DataTable');
        if (clientTable != null && clientTable.length > 0) {
            vhtml = '';
            for (var i = 0; i < clientTable.length; i++) {
                var rowClass = (i % 2 == 0) ? 'even' : 'odd';
                vhtml += '<tr class="' + rowClass + '">';

                var row = clientTable[i];

                var v_isClildTableHasData = false;
                var childNo = newGuid(0);
                if (_hasChildTable) {
                    var v_tdOpenFlagHtml = $.isArray(clientTable[i][_ChildCol]) && clientTable[i][_ChildCol].length > 0 ? '<a href="javascript:void(0)" controlno="' + childNo + '" onclick="_f_switch_state(this)"><img src="/img/arrowblue2.png" /></a>' : '';
                    vhtml += '<td>' + v_tdOpenFlagHtml + '</td>';
                    v_isClildTableHasData = $.isArray(clientTable[i][_ChildCol]) && clientTable[i][_ChildCol].length > 0;
                }

                for (var j = 0; j < arrCols.length; j++) {
                    var dataItemExp = ' iname="' + arrCols[j].colname + j + '" vld="' + arrCols[j].vldexp + '" chs="' + arrCols[j].titlecontent + '" ';
                    var vClassNameExp = arrCols[j].classname != '' ? arrCols[j].classname : '';
                    var vColTypeExp = '';
                    if (arrCols[j].coltype == 'chk') {
                        vColTypeExp = '<input type="checkbox" value="' + row[arrCols[j].colname] + '" />';
                    }
                    else if (arrCols[j].coltype == 'switcher') {
                        vColTypeExp = '<div class="LittleSwith"></div>';
                    }
                    else if (arrCols[j].coltype == 'textbox') {
                        vColTypeExp = '<input type="text" value="' + row[arrCols[j].colname] + '" ' + dataItemExp + ' />';
                    }
                    else if (arrCols[j].coltype == 'textarea') {
                        vColTypeExp = '<textarea ' + dataItemExp + ' class="width95percent">' + row[arrCols[j].colname] + '</textarea>';
                    }
                    else if (arrCols[j].coltype == 'inputwithbutton') {
                        vColTypeExp = '<input type="text" ' + dataItemExp + ' class="input-withbutton" />';
                    }

                    if (arrCols[j].coltype == 'chk') {
                        vhtml += '<td class="' + vClassNameExp + '">' + vColTypeExp + '</td>';
                    }
                    else if (arrCols[j].coltype == 'switcher') {
                        vhtml += '<td class="' + vClassNameExp + '">' + vColTypeExp + '</td>';
                    }
                    else if (arrCols[j].coltype == 'textbox') {
                        vhtml += '<td class="' + vClassNameExp + '">' + vColTypeExp + '</td>';
                    }
                    else if (arrCols[j].coltype == 'textarea') {
                        vhtml += '<td class="' + vClassNameExp + '">' + vColTypeExp + '</td>';
                    }
                    else if (arrCols[j].coltype == 'inputwithbutton') {
                        vhtml += '<td class="' + vClassNameExp + '">' + vColTypeExp + '</td>';
                    }
                    else if (arrCols[j].coltype == 'button-delete') {
                        vhtml += '<td class="' + vClassNameExp + '"><a onclick="$(this).parents(\'tr\').remove();"><img src="../img/1_41.png" /></a></td>';
                    }
                    else {
                        /*if (arrCols[j].classname.indexOf('showtitle') > 1) {
                            
                        } else {
                            vhtml += '<td class="' + vClassNameExp + '">' + row[arrCols[j].colname] + '</td>';
                        }*/

                        if (row[arrCols[j].colname] === null) {
                            row[arrCols[j].colname] = '';
                        }

                        if (row[arrCols[j].titlename] != "" && row[arrCols[j].titlename] != undefined && row[arrCols[j].titlename] != null) {
                            if (row[arrCols[j].colname] === undefined) {
                                vhtml += '<td class="' + vClassNameExp + '">绑定错误</td>';
                            }
                            else {
                                //vhtml += '<td class="' + vClassNameExp + '" title="' + row[arrCols[j].titlename] + '">' + (row[arrCols[j].colname].length > arrCols[j].maxlen ? row[arrCols[j].colname].substr(0, arrCols[j].maxlen) + '...' : row[arrCols[j].colname]) + '</td>';
                                vhtml += '<td class="' + vClassNameExp + '" title="' + row[arrCols[j].titlename] + '">' + (!arrCols[j].notcut && row[arrCols[j].colname].length > arrCols[j].maxlen && vClassNameExp != 'noshow' ? row[arrCols[j].colname].substr(0, arrCols[j].maxlen) + '...' : row[arrCols[j].colname]) + '</td>';
                            }
                        } else {
                            if (row[arrCols[j].colname] === undefined) {
                                vhtml += '<td class="' + vClassNameExp + '">绑定错误</td>';
                            }
                            else {
                                if (!v_isClildTableHasData) {
                                    vhtml += '<td class="' + vClassNameExp + '" title="' + (!arrCols[j].notcut ? row[arrCols[j].colname] : '') + '">' + (!arrCols[j].notcut && row[arrCols[j].colname].length > arrCols[j].maxlen && vClassNameExp != 'noshow' ? row[arrCols[j].colname].substr(0, arrCols[j].maxlen) + '...' : row[arrCols[j].colname]) + '</td>';
                                }
                                else {
                                    vhtml += '<td class="' + vClassNameExp + '">' + row[arrCols[j].colname] + '</td>';
                                }
                            }
                        }
                    }
                }
                vhtml += '</tr>';
                if (v_isClildTableHasData) {
                    var v_childTableData = clientTable[i][_ChildCol];
                    var v_childTableFormatData = _self.data('ChildFormat');
                    var v_tableTemplete = '<table class="tab"><thead><tr>';
                    //生成表头
                    for (var m = 0; m < v_childTableFormatData.length; m++) {
                        var ro = v_childTableFormatData[m];
                        v_tableTemplete += '<th>' + ro.name + '</th>';
                    }
                    v_tableTemplete += '</tr></thead><tbody>';
                    //生成数据
                    for (var m = 0; m < v_childTableData.length; m++) {
                        var ro = v_childTableData[m];
                        var v_class = (m % 2 == 0) ? 'even' : 'odd';
                        v_tableTemplete += '<tr class="' + v_class + '">';
                        for (var n = 0; n < v_childTableFormatData.length; n++) {
                            var pName = v_childTableFormatData[n].col;
                            v_tableTemplete += '<td>' + ro[pName] + '</td>';
                        }
                        v_tableTemplete += '</tr>';
                    }

                    v_tableTemplete += '</tbody></table>';

                    vhtml += '<tr id="child_' + childNo + '" class="childtr"><td></td><td colspan="' + arrCols.length + '">' + v_tableTemplete + '</td></tr>';
                }
            }

            //绑定数据
            _self.find('tbody').html(vhtml);

            //如果有开关控件列，循环初始化并赋值
            if (arrSwitcherCol.length > 0) {

                for (var i = 0; i < arrSwitcherCol.length; i++) {
                    //先查询数据列绑定的数据信息
                    if (_self.data(arrSwitcherCol[i].colName + 'SwitcherData') != null && _self.data(arrSwitcherCol[i].colName + 'SwitcherData') != undefined) {
                        //如果找到了绑定信息
                        var tempSwitchData = _self.data(arrSwitcherCol[i].colName + 'SwitcherData');
                        $(this).find('tbody tr').each(function () {
                            var tempRowIndex = $(this).index();
                            $(this).find('td').eq(arrSwitcherCol[i].colIndex).find('div.LittleSwith').initSwitch(tempSwitchData.dataItem, tempSwitchData.callback, clientTable[tempRowIndex][arrSwitcherCol[i].colName], true);
                        });
                    }
                    else {
                        //如果没找到，则用默认初始化开关控件并赋值
                        var tempSwitchData = _self.data('defaultSwitcherData');
                        $(this).find('tbody tr').each(function () {
                            var tempRowIndex = $(this).index();
                            $(this).find('td').eq(arrSwitcherCol[i].colIndex).find('div.LittleSwith').initSwitch(tempSwitchData.dataItem, tempSwitchData.callback, clientTable[tempRowIndex][arrSwitcherCol[i].colName], true);
                        });
                    }
                }
            }

            //初始化带按钮的文本框并赋值
            if (arrInputWithButtonCol.length > 0) {

                //先将全部初始化
                _self.find('input.input-withbutton').initInputWithButton();

                $(this).find('tbody tr').each(function () {
                    var ro = $(this);
                    for (var i = 0; i < arrInputWithButtonCol.length; i++) {
                        var tempColName = arrInputWithButtonCol[i].colName;
                        var tempIndex = arrInputWithButtonCol[i].colIndex;

                        ro.find('td').eq(tempIndex).find('input.input-withbutton').setInputWithButtonValue(clientTable[ro.index()][tempColName]);

                        if ($.isFunction(_self.data(tempColName + 'IWBFn'))) {

                            ro.find('td').eq(tempIndex).find('input.input-withbutton').parents('div.input').children(".input_btn").click(function () {
                                _self.data(tempColName + 'IWBFn')();
                            });
                        }
                    }
                });
            }

            //将数据源与控件绑定
            _self.data('DataSource', clientTable);

            if (!isNotBindRowClick === true) {
                //绑定点击事件
                _self.find('tbody > tr').click(function () {
                    $(this).siblings('.selected').removeClass('selected');
                    $(this).toggleClass('selected');
                });
            }
        }
        else if (clientTable == null || clientTable == undefined || clientTable.length == 0) {
            var v_colspan = _self.find('thead > tr:first > th:visible').length;
            vhtml = '<tr class="noData"><td colspan="' + v_colspan + '">' + noDataShow('暂无数据') + '</td></tr>';
            _self.find('tbody').html(vhtml);
            _self.data('DataSource', []);
        }
        else {
            throw '绑定列表数据源错误';
        }

        if ($.isFunction(fnCallback)) {
            fnCallback();
        }
    }
    ,
    //绑定treetable //, idCol, parentCol, rootValue, isOpened, sortCol, widthCheckbox, checkedCol, forCheck
    bindTreeTable: function (clientTable, setOptions) {
        var _self = $(this);
        _self.data('flag', 'tree');
        _self.data('dataSource', clientTable);
        var _attributes = {
            IdCol: 'id'
            , ParentCol: 'pid'
            , RootValue: ''
            , IsOpened: false
            , SortCol: ''
            , WidthCheckbox: false
            , CheckedCol: ''
            , IsReadOnly: true
            , BgStateCol: null
        }
        $.extend(_attributes, setOptions);
        console.log(_attributes);

        if ($.isNullOrUndefinedOrEmpty(_attributes.SortCol)) {
            _attributes.SortCol = _attributes.IdCol;
        }

        _self.data('Attributes', _attributes);


        var _v_hasCheckbox = _attributes.WidthCheckbox === true ? true : false;
        var _v_readOnly = _attributes.IsReadOnly === true ? true : false;

        if (_v_hasCheckbox === true) {
            _self.data('hasCheckbox', '1');
        }
        else {
            _self.data('hasCheckbox', '0');
        }

        _self.find('tbody > tr').remove();

        if (!$.isArray(clientTable)) {
            return false;
        }

        var arrCols = [];
        //取得行头遍历绑定的列名
        _self.find('thead > tr:first').find('th').each(function () {
            if ($(this).attr('datacol') != undefined && $.trim($(this).attr('datacol')) != '') {
                var tmp = new Dcol();
                tmp.colname = $.trim($(this).attr('datacol'));
                tmp.titlename = $.trim($(this).attr('titlecol'));
                tmp.classname = ($(this).attr('cls') != undefined && $.trim($(this).attr('cls')) != '') ? $.trim($(this).attr('cls')) : '';
                tmp.coltype = ($(this).attr('coltype') == undefined || $(this).attr('coltype') == '') ? 'text' : $(this).attr('coltype');

                arrCols.push(tmp);
            }
        });

        //定义要层层循环的遍历的数组
        var LayerDataArr = [];
        var Layer1DataArr = null;
        Layer1DataArr = clientTable.findMutliByValue(_attributes.ParentCol, _attributes.RootValue);
        var vhtml = '';
        if ($.isArray(Layer1DataArr) && Layer1DataArr.length > 0) {
            LayerDataArr.push(Layer1DataArr);

            var vParentNodes = Layer1DataArr;
            while ($.isArray(vParentNodes) && vParentNodes.length > 0) {
                var vNextLayerNodes = clientTable.findMutliByValueArr(_attributes.ParentCol, vParentNodes, _attributes.IdCol);
                if ($.isArray(vNextLayerNodes) && vNextLayerNodes.length > 0) {
                    LayerDataArr.push(vNextLayerNodes);
                }
                vParentNodes = vNextLayerNodes;
            }
        }

        var foldOpenedClass = _attributes.IsOpened ? 'opened':'';

        for (var i = 0; i < LayerDataArr.length; i++) {
            var layerData = LayerDataArr[i];
            for (var k = 0; k < layerData.length; k++) {
                var item = layerData[k];
                if (i == 0) {
                    item.ParentStr = '';
                }
                else {
                    var vParentItem = LayerDataArr[i - 1].getItemByValue(_attributes.IdCol, item[_attributes.ParentCol]);
                    if (vParentItem != null) {
                        item.ParentStr = vParentItem.ParentStr + ',\'' + vParentItem[_attributes.IdCol] + '\'';
                    }
                }
            }
        }

        if (LayerDataArr.length > 0) {
            var nLayer = 0;

            for (var i = 0; i < LayerDataArr.length; i++) {
                var layerData = LayerDataArr[i];
                var nextLv = i < LayerDataArr.length - 1 ? LayerDataArr[i + 1] : null;
                if (i == 0) {
                    layerData = layerData.sort(function (a, b) {
                        return a[_attributes.SortCol] > b[_attributes.SortCol];
                    });
                }
                else {
                    layerData = layerData.sort(function (a, b) {
                        return a[_attributes.SortCol] < b[_attributes.SortCol];
                    });
                }

                var v_tmpHtml = '';
                for (var k = 0; k < layerData.length; k++) {
                    v_tmpHtml = '';
                    var row = layerData[k];
                    var myChild = [];
                    if (nextLv != null) {
                        myChild = nextLv.findMutliByValue(_attributes.ParentCol, row[_attributes.IdCol]);
                    }

                    var bgColorClassExp = '';
                    if (row[_attributes.BgStateCol] == '1') {
                        bgColorClassExp = ' bg-lightRed';
                    }
                    else if (row[_attributes.BgStateCol] == '2') {
                        bgColorClassExp = ' bg-lightYellow';
                    }
                    else if (row[_attributes.BgStateCol] == '3') {
                        bgColorClassExp = ' bg-lightBlue';
                    }

                    var openedClssExp = myChild.length > 0 ? (_attributes.IsOpened ? '_tree_opened' : '_tree_closed') : '';
                    if (i > 0 && !_attributes.IsOpened) {
                        openedClssExp += ' noshow';
                    }

                    v_tmpHtml += '<tr lv="' + i + '" cid="' + row[_attributes.IdCol] + '" fatherid="' + row[_attributes.ParentCol] + '" childcount="' + myChild.length + '" class="' + openedClssExp + bgColorClassExp + '" parentStr="' + row.ParentStr + '">';
                    for (var j = 0; j < arrCols.length; j++) {
                        var vClassNameExp = arrCols[j].classname != '' ? arrCols[j].classname : '';
                        var OpFoldExp = myChild.length > 0 && j == 0 ? '<a href="javascript:void(0)" class="__flodLink ' + foldOpenedClass +'" onclick="_f_switch_tree_open_close(this)"></a>' : '';
                        var vFirstTdPaddingLeftExp = j == 0 ? 'style="padding-left:' + ((i * 20) + (i == 0 ? 0 : i * 10) + (myChild.length == 0 ? 17.3 : 0)) + 'px;"' : '';

                        var vCheckedExp = typeof _attributes.CheckedCol === 'string' ? (row[_attributes.CheckedCol] === '1' ? 'checked="checked"' : '') : '';
                        var vReadOnlyExp = _v_readOnly ? 'disabled="disabled"' : '';
                        var vCheckboxExp = _v_hasCheckbox && j == 0 ? '<input type="checkbox" onchange="_f_switch_checkbox_state(this)" value="' + row[_attributes.IdCol] + '" class="__tree_checkbox" ' + vCheckedExp + ' ' + vReadOnlyExp + ' />' : '';
                        
                        if (arrCols[j].classname.indexOf('showtitle') > 1) {
                            if (row[arrCols[j].titlename] != "" && row[arrCols[j].titlename] != undefined && row[arrCols[j].titlename] != null) {
                                v_tmpHtml += '<td class="' + vClassNameExp + '" title="' + row[arrCols[j].titlename] + '" ' + vFirstTdPaddingLeftExp + '>' + OpFoldExp + vCheckboxExp + row[arrCols[j].colname] + '</td>';
                            } else {
                                v_tmpHtml += '<td class="' + vClassNameExp + '" title="' + row[arrCols[j].colname] + '" ' + vFirstTdPaddingLeftExp + '>' + OpFoldExp + vCheckboxExp + row[arrCols[j].colname] + '</td>';
                            }
                        } else {
                            v_tmpHtml += '<td class="' + vClassNameExp + '" ' + vFirstTdPaddingLeftExp + '>' + OpFoldExp + vCheckboxExp + row[arrCols[j].colname] + '</td>';
                        }
                    }
                    v_tmpHtml += '</tr>';
                    v_tmpHtml += 'pid_' + row[_attributes.IdCol];

                    if (i > 0) {
                        var v_ParentId = row[_attributes.ParentCol];
                        var v_ToReplace = 'pid_' + v_ParentId;
                        vhtml = vhtml.replace(v_ToReplace, v_ToReplace + v_tmpHtml);
                    }
                    else {
                        vhtml += v_tmpHtml;
                    }
                }
            }

            while (vhtml.indexOf('pid_') > -1) {
                var v_toReplace = vhtml.substr(vhtml.indexOf('pid_'), 40);
                vhtml = vhtml.replace(v_toReplace, '');
            }
        }
        else {
            var v_colspan = _self.find('thead > tr:first > th').length;
            vhtml = '<tr><td colspan="' + v_colspan + '" style="text-align:center; vertical-align:middle; background-color:#f8f8f8;">' + noDataShow('暂无数据') + '</td></tr>'
        }

        _self.find('tbody').html(vhtml);
    }
    ,
    //在dataTable中添加一行
    addDataRow: function () {
        var _self = $(this);

        if ($(_self).find('tbody tr.noData').length > 0) {
            $(_self).find('tbody tr').remove();
        }

        var arrInputWithButtonCol = [];
        //var arrInputTextCol = [];
        //var arrSwitcherCol = [];
        //var arrCheckboxCol = [];
        var arrCols = [];
        _self.find('thead > tr:first').find('th').each(function () {
            if ($(this).attr('datacol') != undefined && $.trim($(this).attr('datacol')) != '') {
                var tmp = new Dcol();
                tmp.colname = $.trim($(this).attr('datacol'));
                tmp.titlename = $.isNullOrUndefinedOrEmpty($.trim($(this).attr('titlecol'))) ? '' : $.trim($(this).attr('titlecol'));
                tmp.classname = ($(this).attr('cls') != undefined && $.trim($(this).attr('cls')) != '') ? $.trim($(this).attr('cls')) : '';
                tmp.coltype = ($(this).attr('coltype') == undefined || $(this).attr('coltype') == '') ? 'text' : $(this).attr('coltype');
                tmp.maxlen = ($(this).attr('maxlen') == undefined || $(this).attr('maxlen') == '' || /^[0-9]*[1-9][0-9]*$/.test($(this).attr('maxlen')) == false) ? 15 : parseInt($(this).attr('maxlen'));
                tmp.notcut = $(this).attr('notcut') == '0' ? false : true;
                tmp.sortcol = ($.trim($(this).attr('sortcol')) == undefined || $.trim($(this).attr('sortcol')) == '') ? tmp.colname : $.trim($(this).attr('sortcol'));
                tmp.defaultvalue = ($.trim($(this).attr('defval')) == undefined || $.trim($(this).attr('defval')) == '') ? '' : $.trim($(this).attr('defval'));
                tmp.vldexp = ($.trim($(this).attr('vldstr')) == undefined || $.trim($(this).attr('vldstr')) == '') ? 'novalid1' : $.trim($(this).attr('vldstr'));
                tmp.titlecontent = $(this).text();
                arrCols.push(tmp);
            }
        });

        var vhtml = '<tr>';

        for (var j = 0; j < arrCols.length; j++) {
            var dataItemExp = ' iname="' + arrCols[j].colname + j + '" vld="' + arrCols[j].vldexp + '" chs="' + arrCols[j].titlecontent + '" ';

            if (arrCols[j].coltype == 'switcher') { //是否启用
                //arrSwitcherCol.push({ colName: arrCols[j].colname, colIndex: j });
                var tempSwitcherData = _self.data(arrCols[j].colname + 'SwitcherData') != undefined && _self.data(arrCols[j].colname + 'SwitcherData') != null ? _self.data(arrCols[j].colname + 'SwitcherData') : _self.data('defaultSwitcherData');
                vhtml += '<td class="' + arrCols[j].classname + '">' + $.createSwitchHtml(tempSwitcherData.dataItem, tempSwitcherData.callback, tempSwitcherData.defaultValue, true) + '</td>';

            }
            else if (arrCols[j].coltype == 'inputwithbutton') {
                arrInputWithButtonCol.push({ colName: arrCols[j].colname, colIndex: j });
                vhtml += '<td class="' + arrCols[j].classname + '">' + $.createInputWithButtonHtml() + '</td>';
                //vhtml += '<td class="' + arrCols[j].classname + '"><input type="text" ' + dataItemExp +' class="input-withbutton" /></td>';
            }
            else if (arrCols[j].coltype == 'textbox') {
                //arrInputTextCol.push({ colName: arrCols[j].colname, colIndex: j });
                vhtml += '<td class="' + arrCols[j].classname + '"><input class="width90percent" type="text" ' + dataItemExp + ' /></td>';
            }
            else if (arrCols[j].coltype == 'textarea') {
                //arrInputTextCol.push({ colName: arrCols[j].colname, colIndex: j });
                vhtml += '<td class="' + arrCols[j].classname + '"><textarea class="width90percent" ' + dataItemExp + ' ></textarea></td>';
            }
            else if (arrCols[j].coltype == 'chk') {
                //arrCheckboxCol.push({ colName: arrCols[j].colname, colIndex: j });
                vhtml += '<td class="' + arrCols[j].classname + '"><input type="checkbox" /></td>';
            }
            else if (arrCols[j].coltype == 'select') {
                var optionsArr = _self.data(arrCols[j].colname + 'Options');
                var optionsHtml = '<select ' + dataItemExp + '>';
                if ($.isArray(optionsArr) && optionsArr.length > 0) {
                    for (var k = 0; k < optionsArr.length; k++) {
                        optionsHtml += '<option value="' + optionsArr[k].val + '">' + optionsArr[k].text + '</option>'
                    }
                }
                optionsHtml += '</select>';
                vhtml += '<td class="' + arrCols[j].classname + '">' + optionsHtml + '</td>';
            }
            else if (arrCols[j].coltype == 'button-delete') {
                vhtml += '<td class="' + arrCols[j].classname + '"><a onclick="$(this).parents(\'tr\').remove();"><img src="../img/1_41.png" /></a></td>';
            }
            else {
                vhtml += '<td class="' + arrCols[j].classname + '">' + arrCols[j].defaultvalue + '</td>';
            }
        }

        vhtml += '</tr>';

        _self.find('tbody').append(vhtml);

        if (arrInputWithButtonCol.length > 0) {

            var lastTr = _self.find('tbody tr:last');
            for (var i = 0; i < arrInputWithButtonCol.length; i++) {
                var item = arrInputWithButtonCol[i];
                var tempFn = _self.data(item.colName + 'IWBFn') != undefined && _self.data(item.colName + 'IWBFn') != null ? _self.data(item.colName + 'IWBFn') : null;
                if ($.isFunction(tempFn)) {
                    lastTr.find('td').eq(item.colIndex).find('input.input-withbutton').bindInputWithButtonClickEvent(tempFn);
                }
            }
        }
        arrInputWithButtonCol = null;
    }
    ,
    //根据索引删除dataTable行方法
    deleteDataRow: function (rowIndex) {
        var _self = $(this);

        _self.find('tbody tr').eq(rowIndex).remove();
    }
    ,
    //dataTable取值方法
    getTableData: function () {
        var _self = $(this);

        var _result = [];

        if (_self.find('tbody tr.noData').length > 0) {
            return _result;
        }

        var arrCols = [];
        _self.find('thead > tr:first').find('th').each(function () {
            if ($(this).attr('datacol') != undefined && $.trim($(this).attr('datacol')) != '') {
                var tmp = new Dcol();
                tmp.colname = $.trim($(this).attr('datacol'));
                tmp.titlename = $.isNullOrUndefinedOrEmpty($.trim($(this).attr('titlecol'))) ? '' : $.trim($(this).attr('titlecol'));
                tmp.classname = ($(this).attr('cls') != undefined && $.trim($(this).attr('cls')) != '') ? $.trim($(this).attr('cls')) : '';
                tmp.coltype = ($(this).attr('coltype') == undefined || $(this).attr('coltype') == '') ? 'text' : $(this).attr('coltype');
                tmp.maxlen = ($(this).attr('maxlen') == undefined || $(this).attr('maxlen') == '' || /^[0-9]*[1-9][0-9]*$/.test($(this).attr('maxlen')) == false) ? 15 : parseInt($(this).attr('maxlen'));
                tmp.notcut = $(this).attr('notcut') == '0' ? false : true;
                tmp.sortcol = ($.trim($(this).attr('sortcol')) == undefined || $.trim($(this).attr('sortcol')) == '') ? tmp.colname : $.trim($(this).attr('sortcol'));
                tmp.defaultvalue = ($.trim($(this).attr('defval')) == undefined || $.trim($(this).attr('defval')) == '') ? '' : $.trim($(this).attr('defval'));
                arrCols.push(tmp);
            }
        });

        _self.find('tbody tr').each(function (i) {
            var currTr = $(this);
            var tempItem = {};

            for (var j = 0; j < arrCols.length; j++) {
                if (arrCols[j].coltype == 'switcher') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('div.LittleSwith').getSwitchValue();
                }
                else if (arrCols[j].coltype == 'inputwithbutton') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('input.input-withbutton').getInputWithButtonValue();
                }
                else if (arrCols[j].coltype == 'textbox') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('input[type=text]').val();
                }
                else if (arrCols[j].coltype == 'textarea') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('textarea').val();
                }
                else if (arrCols[j].coltype == 'chk') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('input[type=checkbox]').is(':checked') ? '1' : '0';
                }
                else if (arrCols[j].coltype == 'select') {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).find('select').val();
                }
                else if (arrCols[j].coltype == 'button-delete') {
                    continue;
                }
                else {
                    tempItem[arrCols[j].colname] = currTr.find('td').eq(j).text();
                }
            }

            _result.push(tempItem);
        });

        return _result;

    }
    ,
    //获得当前排序列和排序
    getSortCol: function () {
        var _self = $(this);
        if (_self.find('thead > tr > th.sortAsc').length > 0) {
            return _self.find('thead > tr > th.sortAsc').attr('sortcol') + " asc";
        }
        else if (_self.find('thead > tr > th.sortDesc').length > 0) {
            return _self.find('thead > tr > th.sortDesc').attr('sortcol') + " desc";
        }
        else {
            return null;
        }
    }
    ,
    //从绑定数据的表中获取选中行的某列值
    getSelectedRowValue: function (_colName) {
        var _self = $(this);
        if (_self.data('ControlType') === 'DataTable') {
            var _targetCol = _self.find('thead tr th[datacol=' + _colName + ']');
            var _selectedTr = _self.find('tbody > tr.selected');
            if (_selectedTr.length == 0) {
                return null;
            }
            if (_targetCol.length > 0) {
                var _targetIndex = _targetCol.first().index();
                return _self.find('tr.selected').find('td').eq(_targetIndex).text();
            }
            else {
                throw '要取值的列不包含在列表中';
            }
        }
        else {
            throw '取值的目标对象不是数据表';
        }
    }
    ,
    //从绑定的数据表中获取数据源的某行某属性值
    getSourceValueByIndex: function (rowIndex, propertyName) {
        var _self = $(this);
        var DataTable = _self.data('DataSource');
        if ($.isArray(DataTable)) {
            if (DataTable.length > 0) {
                if (rowIndex < DataTable.length) {
                    if (DataTable[rowIndex].hasOwnProperty(propertyName)) {
                        return DataTable[rowIndex][propertyName];
                    }
                    else {
                        throw '数据源中不包含属性：' + propertyName;
                    }
                }
                else {
                    throw rowIndex + '超出了数据源最大行数';
                }
            }
            else {
                throw '当前数据源为空数组';
            }
        }
        else {
            throw '当前数据源不是对象数组';
        }
    }
    ,
    //获得数据表选择行索引
    getSelectedRowIndex: function () {
        var _self = $(this);
        if (_self.data('ControlType') === 'DataTable') {
            return _self.find('tbody > tr.selected').index();
        }
        else {
            throw '取值对象不是数据表';
        }
    }
    ,
    //数据表绑定排序方法方法
    bindTableSortFn: function (func) {
        var _self = $(this);
        if ($.isFunction(func)) {
            _self.data('SortFunc', func);
        }
        else {
            throw '绑定的方法不是有效的js方法';
        }
    }

    /*******************************************表格控件结束*********************************************************/
    /*******************************************弹出窗口*********************************************************/
    ,
    //弹出模态框参数（标题，窗口宽度，窗口高度，是否可以关闭）
    showDialog: function (dia_title, dia_width, dia_height, isShowClose) {
        if (!$(this).hasClass('dialog')) {
            return false;
        }

        if ($('.shadow').length == 0) {
            $('body').append('<div class="shadow"></div>');
            $('.shadow').width(window.screen.availWidth).height(window.screen.availHeight);
        }
        var _dialogID = '';
        if ($(this).parents('div.dialogFrame').length == 0) {
            var _dialogID = 'dialog_' + newGuid(Math.random());

            var _dialogContent = '<div class="dialogContent" style=" width:' + dia_width + 'px; height:' + dia_height + 'px;"></div>';
            //          var _dialogContent = '<div class="dialogContent" style=" width:' + dia_width + 'px;"></div>';
            var _dialogHtml = '<div id="' + _dialogID + '" class="dialogFrame"><div class="dialogTitle"><span unselectable="on" style="-webkit-user-select: none;-moz-user-select: none;font-weight:bold;">' + dia_title + '</span><a class="closeDialog" onclick="fn_CloseDialog(this)">×</a></div><div class="clear"></div>' + _dialogContent + '</div>';
            $('body').append(_dialogHtml);
            $(this).appendTo($('#' + _dialogID).find('div.dialogContent'));

            var _dialogObj = $('#' + _dialogID);

            $('#' + _dialogID).find('div.dialogTitle').mousedown(function (e) {

                var MouseWinX = e.clientX;
                var MouseWinY = e.clientY;

                var DiaWinX = _dialogObj.position().left - $(document).scrollLeft();
                var DiaWinY = _dialogObj.position().top;

                var MouseDiaX = MouseWinX - DiaWinX;
                var MouseDiaY = MouseWinY - DiaWinY;

                _dialogObj.mousemove(function (e) {

                    var DiaLeft = e.clientX - MouseDiaX;
                    var DiaTop = e.clientY - MouseDiaY;

                    //DiaLeft = DiaLeft <= 0 ? 0 : (DiaLeft >= ($(window).width() - dia_width) ? ($(window).width() - dia_width) : DiaLeft);
                    //DiaTop = DiaTop <= 0 ? 0 : (DiaTop >= ($(window).height() - dia_height - 35) ? ($(window).height() - dia_height - 35) : DiaTop);

                    _dialogObj.css({ 'left': DiaLeft + 'px', 'top': DiaTop + 'px' });
                });

            }).mouseup(function () {
                _dialogObj.unbind('mousemove');
            }).mouseout(function () {
                _dialogObj.unbind('mousemove');
            });
        }
        else {
            _dialogID = $(this).parents('div.dialogFrame').attr('id');
            $(this).parents('div.dialogFrame').find('.dialogTitle > span:first').text(dia_title);
        }

        var centerPosition = ($(window).width() - dia_width) / 2;
        var middlePosition = ($(window).height() - dia_height - 35) / 2;
        if (middlePosition < 0) {
            middlePosition = 0;
        }
        $('#' + _dialogID).css({ 'left': centerPosition + 'px', 'top': middlePosition + 'px' });
        if (!isShowClose) {
            $('#' + _dialogID).find('.closeDialog').hide();
        }
        else {
            $('#' + _dialogID).find('.closeDialog').show();
        }
        $('.shadow').show();
        $(this).show();
        $(this).data('dialogId', _dialogID);
        $('#' + _dialogID).show();
    }
    ,
    //关闭弹窗
    closeDialog: function () {

        var dialogId = $(this).data('dialogId');
        if (!$.isNullOrUndefinedOrEmpty(dialogId)) {
            $('#' + dialogId).hide();
            if ($('.dialog:visible').length == 0) {
                $('.shadow').hide();
            }
        }
        else {
            throw '没有显示的弹窗';
        }
    }
    ,
    /*******************************************弹出窗口结束*********************************************************/

    /******************************************开关控件********************************************************/
    //初始化开关控件
    initSwitch: function (ItemData, fnCall, ValDefault, IsCanClick) {

        var __IsCanClick = true;
        if (IsCanClick === true || IsCanClick === false) {
            __IsCanClick = IsCanClick;
        }

        if (!$.isArray(ItemData)) {
            throw 'initSwitch方法：开关控件绑定数据错误';
            return false;
        }

        if (ItemData.length != 2) {
            throw 'initSwitch方法：开关控件绑定数据错误，应该有2个数据对象';
            return false;
        }

        //当传入开关显示的默认数值与传入的两个参数不匹配时。比如，传入两个数据分别是‘我的’，‘你的’,但是开关初始化时默认值为‘他的’。则执行下面语句
        if (ValDefault != ItemData[0].val && ValDefault != ItemData[1].val) {
            throw 'initSwitch方法：开关控件默认值指定错误';
            return false;
        }

        if (ItemData[0].val == ItemData[1].val) {
            throw '开关控件切换的两个值应该不同';
            return false;
        }

        $(this).each(function () {

            var _self = $(this);
            if (!_self.hasClass('LittleSwith')) {
                throw 'initSwitch方法：开关控件绑定错误';
                return false;
            }

            var TextDefault = ItemData[0].text;
            var ClassDefault = 'right'
            if (!$.isNullOrUndefinedOrEmpty(ValDefault)) {
                TextDefault = ValDefault == ItemData[0].val ? ItemData[0].text : ItemData[1].text;
                ClassDefault = ValDefault == ItemData[0].val ? 'right' : 'left';
            }

            var vhtml = '<div class="SwitchBack" bindval="' + ItemData[0].val + '" style="background-color:' + ItemData[0].bgcolor + '; color:' + ItemData[0].textcolor + ';">' + ItemData[0].text + '</div>'
                + '<div class="SwitchBack" bindval="' + ItemData[1].val + '" style="background-color:' + ItemData[1].bgcolor + '; color:' + ItemData[1].textcolor + ';">' + ItemData[1].text + '</div>'
                + '<div style="clear:both;"></div>'
                + '<div class="Switcher ' + ClassDefault + '">' + TextDefault + '</div>';

            _self.html(vhtml);

            _self.data('controlData', ItemData);

            var _switcher = _self.find('div.Switcher');
            if (__IsCanClick === true) {
                _self.find('div.Switcher').click(function (ev) {
                    ev.stopPropagation();
                    if (_switcher.hasClass('left')) {
                        var currRight = _switcher.outerWidth(true);
                        _switcher.css('right', currRight + 'px').css('left', '');
                        _switcher.removeClass('left');
                        _switcher.animate({
                            right: '4px'
                        }, 'fast', function () {
                            _switcher.addClass('right');
                            if ($.isFunction(fnCall)) {
                                var __controlData = _self.data('controlData');
                                fnCall(__controlData[0].val, this);
                            }
                        });
                    }
                    else if (_switcher.hasClass('right')) {
                        var currLeft = _switcher.outerWidth(true);
                        _switcher.css('left', currLeft + 'px').css('right', '');
                        _switcher.removeClass('right');
                        _switcher.animate({
                            left: '4px'
                        }, 'fast', function () {
                            _switcher.addClass('left');
                            if ($.isFunction(fnCall)) {
                                var __controlData = _self.data('controlData');
                                fnCall(__controlData[1].val, this);
                            }
                        });
                    }
                });
            }

            _self.data('controlType', 'Switch');
        });
    }
    ,
    //获得当前开关控件的值
    getSwitchValue: function () {
        var _self = $(this);
        //if (_self.data('controlType') !== 'Switch') {
        //    throw 'getSwitchValue方法:调用的对象不是开关控件或者开关控件尚未初始化';
        //    return false;
        //}

        //var __controlData = _self.data('controlData');
        if (_self.find('div.Switcher').hasClass('left')) {
            return _self.find('div.SwitchBack:last').attr('bindval');
        }
        else if (_self.find('div.Switcher').hasClass('right')) {
            return _self.find('div.SwitchBack:first').attr('bindval');
        }
        else {
            throw 'getSwitchValue方法:开关控件状态异常';
        }
    }
    ,
    //获得当前开关控件数据选中项
    getSwitchSelectItem: function () {
        var _self = $(this);
        var __controlData = _self.data('controlData');
        if (_self.find('div.Switcher').hasClass('left')) {
            return __controlData[1];
        }
        else if (_self.find('div.Switcher').hasClass('right')) {
            return __controlData[0];
        }
        else {
            throw 'getSwitchSelectItem方法:开关控件状态异常';
        }
    }
    ,
    //设置开关控件数据值
    setSwitchValue: function (pValue) {
        var _self = $(this);
        if (_self.data('controlType') !== 'Switch') {
            throw 'setSwitchValue方法:调用的对象不是开关控件或者开关控件尚未初始化';
            return false;
        }

        var __controlData = _self.data('controlData');
        if (__controlData[0].val != pValue && __controlData[1].val != pValue) {
            throw 'setSwitchValue方法:调用的对象不是开关控件或者开关控件尚未初始化';
            return false;
        }

        _switcher = _self.find('div.Switcher');
        _switcher.css({ 'left': '', 'right': '' });
        if (__controlData[0].val == pValue) {
            if (_switcher.hasClass('left')) {
                _switcher.removeClass('left');
            }
            if (!_switcher.hasClass('right')) {
                _switcher.addClass('right');
            }
        }
        else if (__controlData[1].val == pValue) {
            if (_switcher.hasClass('right')) {
                _switcher.removeClass('right');
            }
            if (!_switcher.hasClass('left')) {
                _switcher.addClass('left');
            }
        }
        else {
            throw 'setSwitchValue方法:设置开关控件的值不对';
        }
    }
    ,
    /******************************************开关控件结束********************************************************/

    /******************************************取值、赋值、验证********************************************************/

    //快速获取iname绑定的属性的数据项
    getVal: function () {
        var _self = $(this);
        var tmpItem = new DataItem();
        if (_self.find('input[type=radio]').length > 0) {
            if (_self.find('input[type=radio]:checked').length > 0) {
                tmpItem.Val = $(this).find('input[type=radio]:checked').val();
            }
            else {
                tmpItem.Val = '';
            }
        }
        else if (_self.find('input[type=checkbox]').length > 0) {

        }
        else if ($(this).is('label')) {
            tmpItem.Val = $(this).attr('value');
        }
        else if ($(this).is('span')) {
            tmpItem.Val = $(this).text();
        }
        else if ($(this).is('input.input-withbutton')) {
            tmpItem.Val = $(this).getInputWithButtonValue();
        }
        else if ($(this).is('input.selectWithCheckbox')) {
            //获得选中项或者选中值数组
            tmpItem.Val = $(this).getSelectCheckboxChecked();
        }
        else {
            if ($(this).hasClass('input-select')) {
                tmpItem.Val = $(this).getInputSelectValue();
            }
            else {
                tmpItem.Val = $(this).val();
            }
        }

        if (_self.prop('maxlength') != undefined && _self.prop('maxlength') != null && _self.prop('maxlength') != '') {
            tmpItem.MaxLength = parseInt(_self.prop('maxlength'));
        }
        tmpItem.CHS = $(this).attr('chs');
        var vtype = $(this).attr('vld');
        if (vtype != undefined && vtype != '') {
            if (vtype.length == 1) {
                tmpItem.DataType = dtype['normal'];
                tmpItem.CanBeNull = vtype;
            }
            else {
                tmpItem.DataType = dtype[vtype.substr(0, vtype.length - 1)];
                tmpItem.CanBeNull = vtype.substr(vtype.length - 1);
            }
        }

        if (_self.attr('trimed') == '1') {
            tmpItem.Val = $.trim(tmpItem.Val);
        }

        return tmpItem.Val;
    }
    ,
    //获得某区域下的所有标记有iname属性的值
    getPostData: function (IsBackValidData) {
        var __v_data = {};
        $(this).each(function () {
            $(this).find('[iname]').each(function () {
                if ($(this).attr('iname') != undefined) {

                    var __tempVal = $(this).getVal();

                    if (!($(this).attr('mustinfo') == '1' && $.isNullOrUndefinedOrEmpty(__tempVal))) {
                        __v_data[$(this).attr('iname')] = __tempVal;
                    }
                }
            });

            if (IsBackValidData === true) {
                __v_data['validateParamFlg'] = '1';
            }
        });

        return __v_data;
    }
    ,
    //绑定某区域下所有标记有iname属性的控件值
    bindInameValue: function (_data, callback) {
        var _self = $(this);
        _self.find('[iname]').each(function () {
            var v_iname = $(this).attr('iname');
            if (_data[v_iname] != undefined && _data[v_iname] != null) {
                if ($(this).is('select') || $(this).is('input[type=text]') || $(this).is('input[type=password]') || $(this).is('input[type=hidden]') || $(this).is('textarea')) {

                    if ($(this).hasClass('input-date')) {
                        _data[v_iname] = _data[v_iname].substr(0, 10);
                    }

                    $(this).val(_data[v_iname]);
                }
                else {
                    $(this).text(_data[v_iname]);
                }
            }
        });

        if (typeof (callback) == 'function') {
            callback();
        }
    }
    ,
    //验证时候取值方法
    getDataItem: function () {
        var _self = $(this);
        var tmpItem = new DataItem();
        if (_self.find('input[type=radio]').length > 0) {
            if (_self.find('input[type=radio]:checked').length > 0) {
                tmpItem.Val = $(this).find('input[type=radio]:checked').val();
            }
            else {
                tmpItem.Val = '';
            }
        }
        else if (_self.find('input[type=checkbox]').length > 0) {

        }
        else if ($(this).is('label')) {
            tmpItem.Val = $(this).attr('value');
        }
        else if ($(this).is('span')) {
            tmpItem.Val = $(this).text();
        }
        else {
            if ($(this).hasClass('input-select')) {
                tmpItem.Val = $(this).getInputSelectValue();
            }
            else {
                tmpItem.Val = $(this).val();
            }
        }

        if (_self.prop('maxlength') != undefined && _self.prop('maxlength') != null && _self.prop('maxlength') != '') {
            tmpItem.MaxLength = parseInt(_self.prop('maxlength'));
        }
        tmpItem.CHS = $(this).attr('chs');
        var vtype = $(this).attr('vld');
        if (vtype != undefined && vtype != '') {
            //vtype.length为vld属性的长度
            if (vtype.length == 1) {
                tmpItem.DataType = dtype['normal'];
                tmpItem.CanBeNull = vtype;
            }
            else {
                tmpItem.DataType = dtype[vtype.substr(0, vtype.length - 1)];
                //取attr('vld')最后一个字符
                tmpItem.CanBeNull = vtype.substr(vtype.length - 1);
            }
        }
        return tmpItem;
    }
    ,
    //客户端验证
    ClientValid: function () {
        //return true;

        //if($(jqObjShowError).length > 0){

        //}

        var throughValid = true;

        $(this).find('[vld]').each(function () {
            var vitem = $(this).getDataItem();
            if (!ValidDataItem(vitem)) {
                throughValid = false;

                //界面上显示错误效果
                //alert(vitem.ErrorMsg);
                //$.MsgBox.Alert('fail', vitem.ErrorMsg);

                //if($(jqObjShowError).length > 0){

                //}
                //else {
                //    if ($(this).nextAll('span.__errorInfo').length == 0) {
                //        $(this).after('<span class="__errorInfo">' + vitem.ErrorMsg + '</span>');
                //    }
                //    else {
                //        $(this).next('span.__errorInfo').text(vitem.ErrorMsg);
                //    }
                //}
                $.MsgBoxInShow('error', vitem.ErrorMsg, false);

                return false;
            }
            else {
                //if (_msgbox != undefined && _msgbox != null && _msgbox != '1' && $.trim(_msgbox) != '') {
                //    if ($(_msgbox).length > 0) {
                //        $(_msgbox).text('');
                //    }
                //}
                //else if (_msgbox == '1') {

                //}
                //else {
                //    $(this).nextAll('span.__errorInfo').remove();
                //}
            }
        });

        return throughValid;
    }
    ,
    /******************************************取值、赋值、验证结束********************************************************/

    /******************************************TAB页（页签）********************************************************/
    /*
        
    */
    //初始化tab页
    handleTabs: function (FnAfterClickCallback, IsVertical, IsContainNoPadding) {
        $(this).each(function () {
            var _self = $(this);
            if (IsVertical === true && !_self.hasClass('vertical')) {
                _self.addClass('vertical');
            }
            if (IsContainNoPadding === true && !_self.find('div.tab-contents').hasClass('nopadding')) {
                _self.find('div.tab-contents').addClass('nopadding');
            }

            if ($.isFunction(FnAfterClickCallback)) {
                _self.data('Callback', FnAfterClickCallback);
            }

            var currIndex = -1;
            _self.find('ul.tab-cards > li').unbind().click(function () {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                currIndex = $(this).index();
                _self.find('div.tabcontent.active').removeClass('active');
                _self.find('div.tabcontent').eq(currIndex).addClass('active');
                if ($.isFunction(_self.data('Callback'))) {
                    _self.data('Callback')(currIndex);
                }
            });

            _self.data('controlType', 'tab');
        });
    }
    ,
    //获得当前选中tab的索引
    getTabSelectIndex: function () {
        var _self = $(this);
        var currIndex = -1;
        if (_self.find('ul.tab-cards > li.active').length > 0) {
            currIndex = _self.find('ul.tab-cards > li.active').index();
        }

        return currIndex;
    }
    ,
    //给tab页绑定回调方法
    bindTabCallback: function (FnAfterClickCallback) {
        var _self = $(this);
        if ($.isFunction(FnAfterClickCallback)) {
            _self.data('Callback', FnAfterClickCallback);
        }
        else {
            throw 'bindTabCallback方法：绑定函数错误';
        }
    }
    ,
    //重置选中状态
    resetTabSelectState: function () {
        $(this).each(function () {
            var _self = $(this);
            _self.find('ul.tab-cards li.active').removeClass('active');
            _self.find('ul.tab-cards li:first').addClass('active');
            _self.find('div.tabcontent.active').removeClass('active');
            _self.find('div.tabcontent:first').addClass('active');
        });
    }
    ,
    /******************************************TAB页（页签）结束********************************************************/

    /******************************************分页********************************************************/
    initPaging: function (pagerInfo, fnGetData, pgsizeArr) {
        var htl = "<div class='paging-img'><div class='img_first'></div><div class='img_prev'></div><div class='img_next'></div><div class='img_last'></div></div><label class='fuhao'>|</label><div class='paging-input'><input type='text' class='pager_curr'/><span>/<label class='pager_totalpage'>50</label>页</span><a class='pager_jump'>跳转</a></div><label class='fuhao'>|</label><div class='paging-select'><span>每页</span><select class='pager_pgsize'></select><span>条记录</span></div><label class='fuhao'>|</label><div class='paging-record'><span>共</span><span class='pager_rowcount'>20</span><span>条记录</span></div>";
        $(this).append(htl);

        if (arguments.length == 2) {
            paging = new PagerObj($(this).attr('id'), pagerInfo, ['10', '15', '30', '50'], fnGetData, false);
        } else if (arguments.length == 3) {
            paging = new PagerObj($(this).attr('id'), pagerInfo, pgsizeArr, fnGetData, false);
        }
        paging.SetPagerText();
        $(this).data({ "controlData": paging });
        //return paging;
    }
    ,
    setPaging: function (pagerInfo) {
        var data = { count: "", pageSize: "", pageindex: "", pageSum: "" };
        var pageData = $.extend(data, pagerInfo);
        this.data("controlData").SetObj(pageData);
    }
    ,
    getPaging: function () {
        return this.data("controlData");
    }
    ,
    /******************************************分页结束********************************************************/

    //比较两个输入框的日期值方法
    //判断当前对象输入框输入的日期是否小于另一个输入框
    isSmallerDateThan: function (anotherDateInput) {
        var _self = $(this);
        var _another = $(anotherDateInput);
        if (_self.val() != '' && _another.val() != '') {
            var _self_date = new Date(_self.val());
            var _another_date = new Date(_another.val());
            if (_self_date <= _another_date) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    },    /******************************************文本框带按钮插件********************************************************/
    /*操作文本框的方法*/
    initInputWithButton: function (fnButtonClick) {

        $(this).each(function () {
            //生成需要的html代码
            if (!$(this).parent("div.input").length > 0) {
                $(this).wrap("<div class='input'></div>");
                $(this).after("<span class='input_delete' onclick='clearValueOfInputWithButton(this)'><a>X</a></span>");
                $(this).after("<input type='hidden' class='input_val'>");
                $(this).parent("div.input").append("<span class='input_btn'>...</span>");
                $(this).val("");
                $(this).siblings(".input_val").val("");
            }
            //$(this).siblings("span.input_delete").unbind("click");
            //$(this).siblings("span.input_delete").click(function () {
            //    var _self = this;
            //    $(_self).siblings(".input-withbutton").val("");
            //    $(_self).siblings(".input_val").val("");
            //});
            $(this).data("controlType", "inputWithButton");
            if ($.isFunction(fnButtonClick)) {
                $(this).parents('div.input').children(".input_btn").unbind("click");
                $(this).parents('div.input').children(".input_btn").click(function () {
                    fnButtonClick();
                });
            };
        });
    }
    ,
    bindInputWithButtonClickEvent: function (fnButtonClick) {
        $(this).each(function () {
            if ($.isFunction(fnButtonClick)) {
                $(this).parents('div.input').children(".input_btn").unbind("click");
                $(this).parents('div.input').children(".input_btn").click(function () {
                    fnButtonClick(this);
                });
                //$(this).data('controlData', { text: '', val: '' });
            }
            else {
                throw 'bindInputWithButtonClickEvent方法：给input-withbutton绑定的方法传入参数不是方法';
            }
        });
    }
    ,
    setInputWithButtonValue: function (valueObj) {
        // $(this).data("controlData", valueObj);
        if (!$.isNullOrUndefinedOrEmpty(valueObj)) {
            if (valueObj.text == undefined) {
                throw 'setInputWithButtonValue方法：给inputWithButton控件赋值的对象没有text属性';
                return false;
            }

            if (valueObj.val == undefined) {
                throw 'setInputWithButtonValue方法：给inputWithButton控件赋值的对象没有val属性';
                return false;
            }

            $(this).val(valueObj.text);
            $(this).siblings(".input_val").val(valueObj.val);
        }
        else {
            $(this).val('');
            $(this).siblings(".input_val").val('');
        }
    }
    ,
    getInputWithButtonValue: function () {
        var txt = $(this).val();
        var value = $(this).siblings(".input_val").val();
        return { text: txt, val: value };
    },

    /******************************************文本框带按钮插件结束********************************************************/
    /*******************************************下拉多选插件开始******************************************************************/
    /*不带checkbox的多选 */
    initMultipleChoice: function (data) {
        //["ssss","ssssssss","sdsdfsdf","ksjdjkfhskdfhk"]
        var _self = this;
        var htl = "";
        if (!$(_self).parents(".multipleChoice").length > 0) {
            $(this).wrap("<div class='multipleChoice'></div")
            $(this).parent(".multipleChoice").append("<ul class='multipleChoice_ul'></ul>");
            $(this).click(function () {
                if ($(_self).siblings(".multipleChoice_ul").css("display") === "none") {
                    $(_self).css("border-radius", "5px 5px 0 0");
                    $(_self).siblings(".multipleChoice_ul").css("display", "block");
                } else if ($(_self).siblings(".multipleChoice_ul").css("display") === "block") {
                    $(_self).siblings(".multipleChoice_ul").css("display", "none");
                    $(_self).css("border-radius", "5px");
                }
            });
        }

        //禁止键盘输入
        $(_self).unbind("keydown");
        $(_self).keydown(function () {
            return false;
        });
        $(this).siblings(".multipleChoice_ul").unbind("hover");
        $(this).siblings(".multipleChoice_ul").hover(function () { }, function () {
            $(_self).siblings(".multipleChoice_ul").css("display", "none");
        });
        if (arguments.length == 1) {
            if ($.isArray(data) && data.length > 0) {
                if ($(_self).siblings(".multipleChoice_ul").children("li").length > 0) {
                    $(_self).siblings(".multipleChoice_ul").empty();
                }
                for (var i = 0; i < data.length; i++) {
                    htl += "<li><input type='hidden' class='li_hidden' value='" + data[i].val + "'>" + data[i].text + "</li>";
                }
                $(this).siblings(".multipleChoice_ul").html(htl);
            } else {
                throw 'data参数不是数组';
            }
        }
    },
    setMultipleChoice: function (data, fn, item) {
        var _self = this;
        var htl = "";
        var dataindexs = [];
        var dataInput = "";
        var dataItem = [];
        //赋值data
        if ($.isArray(data) && data.length > 0) {
            if ($(_self).siblings(".multipleChoice_ul").children("li").length > 0) {
                $(_self).siblings(".multipleChoice_ul").empty();
            }
            for (var i = 0; i < data.length; i++) {
                htl += "<li><input type='hidden' class='li_hidden' value='" + data[i].val + "'>" + data[i].text + "</li>";
            }
            $(this).siblings(".multipleChoice_ul").html(htl);
        }

        if (arguments.length === 3) {
            //设置默认值
            if ($.isArray(item) && item.length > 0) {
                $(_self).siblings(".multipleChoice_ul").children("li").each(function () {
                    $(this).hasClass("active") ? $(this).removeClass("active") : "";
                })
                for (var x = 0; x < item.length; x++) {
                    var index = item[x];

                    dataInput += $(_self).siblings(".multipleChoice_ul").children("li").eq(index).text() + ",";
                    dataItem.push({ text: $(_self).siblings(".multipleChoice_ul").children("li").eq(index).text(), val: $(_self).siblings(".multipleChoice_ul").children("li").eq(index).children(".li_hidden").val() });
                    $(_self).siblings(".multipleChoice_ul").children("li").eq(index).addClass("active");
                }
                if (dataInput === "") {
                    $(_self).val(dataInput);
                } else {
                    var dataString = dataInput.substr(0, dataInput.length - 1);
                    $(_self).val(dataString);
                }


                $(_self).data("dataValue", dataItem);
            } else {
                throw '第三个参数不是arrary类型';
            }
            //设置默认值结束
            $(this).siblings(".multipleChoice_ul").children("li").unbind("click");
            $(this).siblings(".multipleChoice_ul").children("li").click(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    dataindexs = [];
                    $(_self).siblings(".multipleChoice_ul").children("li").each(function (index) {
                        if ($(this).hasClass("active")) {
                            dataindexs.push(index);
                        };
                    });
                    dataInput = "";
                    dataItem = [];
                    for (var j = 0; j < dataindexs.length; j++) {
                        dataInput += $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text() + ",";
                        dataItem.push({ text: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text(), val: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).children(".li_hidden").val() });
                    }
                    if (dataInput === "") {
                        $(_self).val(dataInput);
                    } else {
                        var dataString = dataInput.substr(0, dataInput.length - 1);
                        $(_self).val(dataString);
                    }
                    $(_self).data("dataValue", dataItem);


                } else {
                    $(this).addClass("active");
                    dataindexs = [];
                    $(_self).siblings(".multipleChoice_ul").children("li").each(function (index) {

                        if ($(this).hasClass("active")) {
                            dataindexs.push(index);
                        };
                    });

                    dataInput = "";
                    dataItem = [];
                    for (var j = 0; j < dataindexs.length; j++) {
                        dataInput += $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text() + ",";
                        dataItem.push({ text: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text(), val: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).children(".li_hidden").val() });
                    }
                    if (dataInput === "") {
                        $(_self).val(dataInput);
                    } else {
                        var dataString = dataInput.substr(0, dataInput.length - 1);
                        $(_self).val(dataString);
                    }
                    $(_self).data("dataValue", dataItem);
                }
                fn();
            });
        } else if (arguments.length === 2) {
            $(_self).siblings(".multipleChoice_ul").children("li").each(function () {
                $(this).hasClass("active") ? $(this).removeClass("active") : "";
            });
            $(this).siblings(".multipleChoice_ul").children("li").unbind("click");
            $(this).siblings(".multipleChoice_ul").children("li").click(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    dataindexs = [];
                    $(_self).siblings(".multipleChoice_ul").children("li").each(function (index) {
                        if ($(this).hasClass("active")) {
                            dataindexs.push(index);
                        };
                    });

                    dataInput = "";
                    dataItem = [];
                    for (var j = 0; j < dataindexs.length; j++) {
                        dataInput += $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text() + ",";
                        dataItem.push({ text: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text(), val: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).children(".li_hidden").val() });
                    }
                    if (dataInput === "") {
                        $(_self).val(dataInput);
                    } else {
                        var dataString = dataInput.substr(0, dataInput.length - 1);
                        $(_self).val(dataString);
                    }

                    $(_self).data("dataValue", dataItem);


                } else {
                    $(this).addClass("active");
                    dataindexs = [];
                    $(_self).siblings(".multipleChoice_ul").children("li").each(function (index) {

                        if ($(this).hasClass("active")) {
                            dataindexs.push(index);
                        };
                    });
                    dataInput = "";
                    dataItem = [];
                    for (var j = 0; j < dataindexs.length; j++) {
                        dataInput += $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text() + ",";
                        dataItem.push({ text: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).text(), val: $(_self).siblings(".multipleChoice_ul").children("li").eq(dataindexs[j]).children(".li_hidden").val() });
                    }
                    if (dataInput === "") {
                        $(_self).val(dataInput);
                    } else {
                        var dataString = dataInput.substr(0, dataInput.length - 1);
                        $(_self).val(dataString);
                    }

                    $(_self).data("dataValue", dataItem);
                }
                fn();
            });

        }
    },
    getMultipleChoice: function () {
        return $(this).data("dataValue");
    },

    //带 CheckBox的下拉多选框
    initSelectCheckbox: function (data, fnCallback) {

        $(this).each(function () {
            var _self = this;

            //绑定点击后回调事件数据到控件上
            if ($.isFunction(fnCallback)) {
                $(_self).data('fnAfterClick', fnCallback);
            }

            var htl = "";
            if (!$(_self).parent(".selectCheckbox_div").length > 0) {
                $(this).wrap("<div class='selectCheckbox_div'></div")
                //$(this).parent(".selectCheckbox_div").wrap("<div class='selectCheckbox'></div>")
                $(_self).parent(".selectCheckbox_div").append("<ul class='selectCheckbox_ul'></ul>");
                $(_self).parent(".selectCheckbox_div").prepend("<input type='checkbox' class='checkSum' />")
            }
            $(_self).parent(".selectCheckbox_div").unbind("click");
            $(_self).parent(".selectCheckbox_div").click(function () {
                if ($(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").css("display") === "none") {
                    $(_self).parent(".selectCheckbox_div").css("border-radius", "5px 5px 0 0");
                    $(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").css("display", "block");
                } else if ($(_self).parent(".selectCheckbox_div").siblings(".selectCheckbox_ul").css("display") === "block") {
                    $(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").css("display", "none");
                    $(_self).parent(".selectCheckbox_div").css("border-radius", "5px");
                }
            });
            //禁止键盘输入
            $(_self).unbind("keydown");
            $(_self).keydown(function () {
                return false;
            });
            $(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").unbind("hover");
            $(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").hover(function () { }, function () {
                $(_self).parent(".selectCheckbox_div").find(".selectCheckbox_ul").css("display", "none");
            });

            $(_self).parent().find('input[type=checkbox].checkSum').unbind().change(function () {
                if ($(this).is(':checked')) {
                    $(_self).siblings(".selectCheckbox_ul").find('li').addClass('active');
                    $(_self).siblings(".selectCheckbox_ul").find('input[type=checkbox]').prop('checked', 'checked');

                }
                else {
                    $(_self).siblings(".selectCheckbox_ul").find('li').removeClass('active');
                    $(_self).siblings(".selectCheckbox_ul").find('input[type=checkbox]').removeProp('checked');

                }
                var finallText = '';
                $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li.active").each(function (i) {
                    //如果只有一个值的时候，就不用加 ,
                    if (i == 0) {
                        finallText += $(this).text();
                    }
                    else {
                        finallText += ',' + $(this).text();
                    }
                });
                $(_self).val(finallText);
            });

            if ($.isArray(data)) {
                //如果已经有选项，清空值
                if ($(_self).siblings(".selectCheckbox_ul").children("li").length > 0) {
                    $(_self).siblings(".selectCheckbox_ul").empty();
                    $(_self).val('');
                }

                if (data.length > 0) {
                    //拼接选项HTML
                    for (var i = 0; i < data.length; i++) {
                        htl += "<li bindval='" + data[i].val + "'><input type='checkbox' class='checkItem' value='" + data[i].val + "'>" + data[i].text + "</li>";
                    }
                    //将选项加入DOM
                    $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul").html(htl);

                    //给选项绑定点击事件
                    $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li").click(function () {
                        if ($(_self).parent().find('input[type=checkbox].checkSum').is(':checked')) {
                            $(_self).parent().find('input[type=checkbox].checkSum').removeProp("checked");
                        }

                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active');
                            $(this).find('input[type=checkbox]').prop('checked', 'checked');
                            var finallText = '';
                            $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li.active").each(function (i) {
                                //如果只有一个值的时候，就不用加 ,
                                if (i == 0) {
                                    finallText += $(this).text();
                                }
                                else {
                                    finallText += ',' + $(this).text();
                                }
                            });
                            $(_self).val(finallText);
                        }
                        else {
                            $(this).removeClass('active');
                            $(this).find('input[type=checkbox]').removeProp('checked');
                            var finallText = '';
                            $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li.active").each(function (i) {
                                //如果只有一个值的时候，就不用加 ,
                                if (i == 0) {
                                    finallText += $(this).text();
                                }
                                else {
                                    finallText += ',' + $(this).text();
                                }
                            });
                            $(_self).val(finallText);
                        }

                        //给文本框填入值
                        var finallText = '';
                        $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li.active").each(function (i) {
                            //如果只有一个值的时候，就不用加 ,
                            if (i == 0) {
                                finallText += $(this).text();
                            }
                            else {
                                finallText += ',' + $(this).text();
                            }
                        });
                        $(_self).val(finallText);

                        if ($.isFunction($(_self).data('fnAfterClick'))) {
                            var currItems = $(_self).getSelectCheckboxChecked('item');
                            $(_self).data('fnAfterClick')(currItems);
                        }
                    });
                }

            } else {
                throw 'data不是数组';
            }

        });
    },

    //给下拉多选绑定点击后回调函数
    bindSelectClickFn: function (fnCallback) {
        if ($.isFunction(fnCallback)) {
            $(this).data('fnAfterClick', fnCallback);
        }
        else {
            throw 'bindSelectClickFn方法：传输的参数不是方法';
        }
    },

    //给下拉多选框赋值
    setSelectCheckboxValue: function (data) {
        var _self = $(this);
        if ($.isArray(data)) {
            //先清空所有选择值
            _self.parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li.active").removeClass('active');
            _self.parent(".selectCheckbox_div").find("ul.selectCheckbox_ul input[type=checkbox]:checked").removeProp('checked');
            _self.val('');

            //循环数据赋值
            var finallText = '';
            for (var i = 0; i < data.length; i++) {
                var targetLI = $(_self).parent(".selectCheckbox_div").find("ul.selectCheckbox_ul > li[bindval=" + data[i] + "]");
                if (targetLI.length > 0) {
                    targetLI.addClass('active');
                    targetLI.find('input[type=checkbox]').prop('checked', 'checked');
                    finallText += (finallText == '' ? targetLI.text() : ',' + targetLI.text());
                }
            }

            _self.val(finallText);
        }
        else {
            throw 'setSelectCheckboxValue方法：给下拉多选插件绑定的值必须是数组类型';
        }
    },

    //获得选中项或者选中值数组
    getSelectCheckboxChecked: function (dataType) {
        var _self = $(this);
        var _result = [];
        if (dataType === 'item') {

            _self.parent().find('ul.selectCheckbox_ul > li.active').each(function () {
                _result.push({ text: $(this).text(), val: $(this).attr('bindval') });
            });
        }
        else {
            _self.parent().find('ul.selectCheckbox_ul > li.active').each(function () {
                _result.push($(this).attr('bindval'));
            });
        }

        return _result;
    }


    /******************************************下拉多选插件结束****************************************************************************/


    /********************************************机柜插件开始*******************************************************************************/
    ,
    initCabinetTable: function (totalUCount, deviceArr, isEdit, fnAfterClick) {
        var _self = $(this);
        var vhtml = '';
        //根据U数绘制机柜
        for (var i = totalUCount; i >= 1; i--) {
            var usedStr = '';
            var titleStr = '';
            vhtml += '<tr>'
                + '<td class="UPosition"></td>'
                + '<td class="UText">' + i + 'U</td>'
                + '</tr>';
        }
        _self.html(vhtml);

        _self.attr('ucount', totalUCount);

        var currDevice = null;

        if ($.isArray(deviceArr)) {
            //初始化数据
            for (var i = 0; i < deviceArr.length; i++) {
                //item是循环出来的每个设备
                var item = deviceArr[i];

                var className = item.IsCurrent ? 'select' : 'otherDevice';
                currDevice = item;
                if (item.UStartPosition > 0 && item.UEndPosition > 0) {
                    //处理每一个设备的位置
                    for (var j = item.UStartPosition; j <= item.UEndPosition; j++) {
                        //获取tr的索引值
                        var trRealIndex = totalUCount - j;

                        if (!_self.find('tr').eq(trRealIndex).find('td.UPosition').hasClass(className)) {
                            _self.find('tr').eq(trRealIndex).find('td.UPosition').addClass(className).prop('title', item.DisplayName).attr('deviceId', item.DeviceId);;
                        }
                    }
                }
            }
        }

        //如果可编辑，绑定Click事件
        if (isEdit === true) {
            _self.find('td.UPosition').click(function () {
                var v_currTd = $(this);//当前点击的单元格
                var v_tr = $(this).parent();//当前点击单元格的行对象
                var v_trIndex = v_tr.index();//当前点击的单元格所在行索引
                var selectedMinIndex = 0;
                var selectedMaxIndex = 0;
                if (_self.find('td.select').length > 0) { //如果表格里面已经加载了绿色区域

                    //确定当前绿色区域的范围
                    selectedMinIndex = _self.find('td.select:first').parent().index();//绿色所在位置最小行索引
                    selectedMaxIndex = _self.find('td.select:last').parent().index();//绿色所在位置最大行索引

                    //如果当前页面上没有被点击过的单元格
                    if (_self.find('td.UPosition.clicked').length == 0) {
                        //v_currTd.addClass('clicked');
                    }
                    else {//如果当前页面上有被点击过的单元格
                        var alreadyClickedIndex = _self.find('td.UPosition.clicked').parent().index();//已有被点击的单元格行索引

                        //去掉原来的红框，给新点击的框加红
                        //_self.find('td.UPosition.clicked').removeClass('clicked');
                        //v_currTd.addClass('clicked');

                        //如果当前点击之前，已经变红边框的单元格在绿色范围之内
                        if (selectedMinIndex <= alreadyClickedIndex && alreadyClickedIndex <= selectedMaxIndex) {
                            //判断当前点击的单元格行索引是不是也在绿色范围之内
                            if (selectedMinIndex <= v_trIndex && v_trIndex <= selectedMaxIndex) {
                                //这种情况是当前点击的单元格也在绿色区域内，判断两次点击的单元格行索引是否相同，如果相同并且都在绿色区域边缘，则当前单元格变为白色
                                if (v_trIndex == alreadyClickedIndex && (v_trIndex == selectedMinIndex || v_trIndex == selectedMaxIndex)) {
                                    v_currTd.removeClass('select').removeProp('title');
                                }
                                //else if (v_trIndex == alreadyClickedIndex && !(v_trIndex == selectedMinIndex || v_trIndex == selectedMaxIndex)) {
                                //不做任何操作
                                //}
                                //else {//两个单元格行索引不等，且都在绿色区域范围内，则取消之前的红框，本次点击的添加红框

                                //}
                            }
                            else {
                                //说明当前点击的单元格索引在已有绿色区域之外，那么需要判断点击的这个位置和绿色区域之间是否有蓝色区域
                                //，如果没有，则跟原来已有绿色区域相连，如果有，则取消绿色区域内的红框，给现在点击的单元格加红框
                                if (v_trIndex > selectedMaxIndex) {
                                    //点击位置在绿色区域下方
                                    var IsClickThroughBlue = false;
                                    for (var i = selectedMaxIndex; i <= v_trIndex; i++) {
                                        if (_self.find('tr').eq(i).find('td.otherDevice').length > 0) {
                                            //说明跨越了蓝色区域，则退出循环
                                            IsClickThroughBlue = true;
                                            break;
                                        }
                                    }
                                    if (IsClickThroughBlue) {//跨越蓝色，当前红框取消，新点击的位置加红框
                                        //_self.find('td.UPosition.clicked').removeClass('clicked');
                                        //v_currTd.addClass('clicked');
                                    }
                                    else {
                                        //不跨蓝色区域，则跟原来绿色连成一片
                                        for (var i = selectedMaxIndex + 1; i <= v_trIndex; i++) {
                                            //_self.find('td.UPosition.clicked').removeClass('clicked');//去掉原来红框
                                            _self.find('tr').eq(i).find('td.UPosition').addClass('select').prop('title', currDevice != null ? currDevice.DisplayName : '');
                                        }
                                    }
                                }
                                else if (v_trIndex < selectedMinIndex) {
                                    var IsClickThroughBlue = false;
                                    for (var i = v_trIndex; i <= selectedMinIndex; i++) {
                                        if (_self.find('tr').eq(i).find('td.otherDevice').length > 0) {
                                            //说明跨越了蓝色区域，则退出循环
                                            IsClickThroughBlue = true;
                                            break;
                                        }
                                    }
                                    if (IsClickThroughBlue) {//跨越蓝色，当前红框取消，新点击的位置加红框
                                        //_self.find('td.UPosition.clicked').removeClass('clicked');
                                        //v_tr.find('td.UPosition').addClass('clicked');
                                    }
                                    else {
                                        //不跨蓝色区域，则跟原来绿色连成一片
                                        for (var i = v_trIndex; i <= selectedMinIndex - 1; i++) {

                                            _self.find('tr').eq(i).find('td.UPosition').addClass('select').prop('title', currDevice != null ? currDevice.DisplayName : '');;
                                        }
                                    }
                                }
                                //*****************************************第二次点击不在绿色区域判断结束************************************************
                            }
                        }
                        //如果当前点击之前点击的单元格红框在绿色范围之外
                        else {
                            if (v_trIndex == alreadyClickedIndex) {
                                v_currTd.addClass('select').prop('title', currDevice != null ? currDevice.DisplayName : '');;
                            }
                            else {
                                //判断当前点击和之前点击的单元格之间是否有绿色，是否有蓝色，如果只有绿色没有蓝色，则取消绿色，如果即有绿色也有蓝色，则不做任何操作
                                var tempStartIndex = v_trIndex > alreadyClickedIndex ? alreadyClickedIndex : v_trIndex;
                                var tempEndIndex = v_trIndex > alreadyClickedIndex ? v_trIndex : alreadyClickedIndex;
                                var IsThroughGreen = false;
                                var IsThroughBlue = false;
                                for (var i = tempStartIndex; i <= tempEndIndex; i++) {
                                    if (_self.find('tr').eq(i).find('td.UPosition.select').length > 0) {
                                        IsThroughGreen = true;
                                    }
                                    if (_self.find('tr').eq(i).find('td.UPosition.otherDevice').length > 0) {
                                        IsThroughBlue = true;
                                    }
                                }

                                if (IsThroughGreen && !IsThroughBlue) {
                                    for (var i = tempStartIndex; i <= tempEndIndex; i++) {
                                        _self.find('tr').eq(i).find('td.UPosition.select').removeClass('select').removeProp('title');
                                    }
                                }
                            }
                        }
                    }
                }
                //当表格没有加载绿色区域；如果没有/有绿色背景的，则添加/删除绿色背景
                else {
                    v_currTd.addClass('select').prop('title', currDevice != null ? currDevice.DisplayName : '');
                }
                //清除之前点击添加的红框,只给当前点击的那一行添加红框
                _self.find('td.clicked').removeClass('clicked');
                v_currTd.addClass('clicked');

                if ($.isFunction(fnAfterClick)) {
                    if (_self.find('td.select').not('.otherDevice').length > 0) {
                        selectedMinIndex = _self.find('td.select').not('.otherDevice').first().parent().index();//绿色所在位置最小行索引
                        selectedMaxIndex = _self.find('td.select').not('.otherDevice').last().parent().index();//绿色所在位置最大行索引
                        var v_endU = totalUCount - selectedMinIndex;
                        var v_startU = totalUCount - selectedMaxIndex;
                        if (v_endU == v_startU && v_startU > totalUCount) {
                            v_endU = '';
                            v_startU = '';
                        }
                    }
                    else {
                        v_startU = '';
                        v_endU = '';
                    }

                    fnAfterClick({ StartU: v_startU, EndU: v_endU });
                }
            });
        }
    },

    /********************************************机柜插件结束*******************************************************************************/

    /***********************************************下拉单选开始**************************************** */
    initInput_Select: function (data, fn) {
        $(this).each(function () {
            var _self = this;
            if (!$(_self).parent(".selectRadio").length > 0) {
                $(_self).wrap("<div class='selectRadio'></div>")
                $(_self).parent(".selectRadio").append("<ul class='selectRadio_ul'></ul>");
            }
            $(_self).unbind("focus")
            $(_self).focus(function () {
                $(this).siblings(".selectRadio_ul").css("display", "block");
                $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
            })
            var isBlur = false;
            $(_self).siblings(".selectRadio_ul").unbind("hover");
            $(_self).siblings(".selectRadio_ul").hover(function () {
                isBlur = true;
            }, function () {
                isBlur = false;
            })
            $(_self).unbind("blur");
            $(_self).blur(function () {
                if (!isBlur) {
                    $(this).siblings(".selectRadio_ul").css("display", "none");
                }
            })
            $(document).unbind("click");
            $(document).click(function () {
                $(this).siblings(".selectRadio_ul").css("display", "none");
            })
            $(_self).attr("data_val", "");
            //设置值
            if ($.isArray(data)) {
                if ($(this).siblings(".selectRadio_ul").children("li").length > 0) {
                    $(this).siblings(".selectRadio_ul").empty();
                }
                var htl = "";
                for (var i = 0; i < data.length; i++) {
                    htl += "<li data_val='" + data[i].val + "'>" + data[i].text + "</li>";
                }
                $(this).siblings(".selectRadio_ul").html(htl);
            }
            $(this).siblings(".selectRadio_ul").children("li").unbind('click');
            $(this).siblings(".selectRadio_ul").children("li").click(function () {
                $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                $(this).addClass("active");
                $(_self).val($(this).text());
                $(_self).attr("data_val", $(this).attr("data_val"));
                if ($(_self).siblings(".selectRadio_ul").css("display") == "block") {
                    $(_self).siblings(".selectRadio_ul").css("display", "none");
                }
                if ($.isFunction(fn)) {
                    var callData = $(_self).getInputSelectValue('item');
                    fn(callData);
                }
            });
            $(_self).unbind('input propertychange');
            $(_self).bind('input propertychange', function () {

                var inputText = $(_self).val();
                //输入值是否在列表中存在
                var sein = false;

                //$(this).attr("data_val", "");
                $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                    if ($(this).text().indexOf(inputText) >= 0) {
                        sein = true;
                    }
                });
                if (sein) {
                    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                        if ($(this).text().indexOf(inputText) >= 0) {
                            var __self = this;
                            $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                            $(__self).addClass("active");

                            return false;
                        }
                    });
                    if (inputText == "") {
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                    }
                    $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);

                } else {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                }
                if ($.isFunction(fn)) {
                    var callData = $(_self).getInputSelectValue('item');
                    fn(callData);
                }
            });
            //解绑keydown事件
            $(_self).unbind('keydown');
            $(_self).keydown(function (event) {
                var keynum = (event.keyCode ? event.keyCode : event.which);
                $(_self).attr("data_val", "");
                if (keynum == '39' || keynum == '40') {
                    var index = 0;
                    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                        var __self = this;
                        if ($(__self).hasClass("active")) {
                            index = $(__self).index() + 1;
                            if (index >= $(_self).siblings(".selectRadio_ul").children("li").length - 1) {
                                index = $(_self).siblings(".selectRadio_ul").children("li").length - 1;
                            }
                            return false;
                        }
                    });
                    if (index == 0) {
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                        $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                        $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                    } else {
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                        $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                        $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);

                    }
                };
                if (keynum == '37' || keynum == '38') {
                    var index = 0;
                    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                        var __self = this;
                        if ($(__self).hasClass("active")) {
                            index = $(__self).index() - 1;
                            if (index <= 0) {
                                index = 0;
                            }
                            return false;
                        }
                    });
                    if (index == 0) {
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                        $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                        $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                    } else {
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                        $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                        $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                    }
                }
                if (keynum == '13') {
                    var index = "";
                    if ($(_self).siblings(".selectRadio_ul").css("display") == "block") {
                        $(_self).siblings(".selectRadio_ul").css("display", "none");
                    }
                    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                        if ($(this).hasClass("active")) {
                            index = $(this).index();
                            return false;
                        }
                    })
                    if ($(_self).val() == "") {
                        $(_self).attr("data_val", "");
                    } else if (index !== "") {
                        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                        $(_self).attr("data_val", $(_self).siblings(".selectRadio_ul").children("li").eq(index).attr("data_val"));
                    }
                    if ($.isFunction(fn)) {
                        var callData = $(_self).getInputSelectValue('item');
                        fn(callData);
                    }
                }
            });

        });

    },
    setInput_SelectData: function (data) {
        var _self = this;
        if ($.isArray(data) && data.length > 0) {
            if ($(this).siblings(".selectRadio_ul").children("li").length > 0) {
                $(this).siblings(".selectRadio_ul").empty();
            }
            var htl = "";
            for (var i = 0; i < data.length; i++) {
                htl += "<li data_val='" + data[i].val + "'>" + data[i].text + "</li>";
            }
            $(this).siblings(".selectRadio_ul").html(htl);
            $(this).siblings(".selectRadio_ul").children("li").unbind('click');
            $(this).siblings(".selectRadio_ul").children("li").click(function () {

                $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                $(this).addClass("active");
                $(_self).val($(this).text());
                $(_self).attr("data_val", $(this).attr("data_val"));
                if ($(_self).siblings(".selectRadio_ul").css("display") == "block") {
                    $(_self).siblings(".selectRadio_ul").css("display", "none");
                }
            });
            $(_self).val("");
            $(_self).attr("data_val", "");

        } else if (data === null) {
            if ($(this).siblings(".selectRadio_ul").children("li").length > 0) {
                $(this).siblings(".selectRadio_ul").empty();
            }
            $(_self).val("");
            $(_self).attr("data_val", "");
        }
    },
    setInput_SelectValue: function (valueItem) {
        var _self = this;
        //if (!isNaN(item)) {
        //    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
        //        $(this).hasClass("active") ? $(this).removeClass("active") : "";
        //    });
        //    $(_self).siblings(".selectRadio_ul").children("li").eq(Math.floor(item)).addClass("active");
        //    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(Math.floor(item)).text());
        //    $(_self).attr("data_val", $(_self).siblings(".selectRadio_ul").children("li").eq(Math.floor(item)).attr("data_val"));
        //} else if (item === null) {
        //    $(_self).siblings(".selectRadio_ul").children("li").each(function () {
        //        $(this).hasClass("active") ? $(this).removeClass("active") : "";
        //    });
        //    $(_self).val("");
        //    $(_self).attr("data_val", "");
        //} else if (typeof item == object) {
        //    var index = null;
        //    $(_self).siblings("selectRadio_ul").children("li").each(function () {
        //        if ($(this).attr("data_val") == item.val) {
        //            index = $(this).index();
        //        }
        //    });
        //    if (!index === null) {
        //        $(_self).siblings(".selectRadio_ul").children("li").each(function () {
        //            $(this).hasClass("active") ? $(this).removeClass("active") : "";
        //        });
        //        $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
        //        $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
        //        $(_self).attr("data_val", $(_self).siblings(".selectRadio_ul").children("li").eq(index).attr("data_val"));
        //    }
        //}

        $(_self).siblings(".selectRadio_ul").find('li.active').removeClass('active');
        if ($.isNullOrUndefinedOrEmpty(valueItem)) {

            $(_self).attr("data_val", '');
            $(_self).val('');
        }
        else {
            if ($(_self).siblings(".selectRadio_ul").find('li[data_val=' + valueItem + ']').length > 0) {
                var selectedLI = $(_self).siblings(".selectRadio_ul").find('li[data_val=' + valueItem + ']').first();
                selectedLI.addClass('active');
                $(_self).attr('data_val', selectedLI.attr('data_val'));
                $(_self).val(selectedLI.text());
            }
            else {
                $(_self).attr("data_val", '');
                $(_self).val('');
            }
        }
    },
    setInput_SelectFn: function (fn) {
        var _self = this;
        $(this).siblings(".selectRadio_ul").children("li").unbind('click');
        $(this).siblings(".selectRadio_ul").children("li").click(function () {
            $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
            $(this).addClass("active");
            $(_self).val($(this).text());
            $(_self).attr("data_val", $(this).attr("data_val"));
            if ($(_self).siblings(".selectRadio_ul").css("display") == "block") {
                $(_self).siblings(".selectRadio_ul").css("display", "none");
            }
            if ($.isFunction(fn)) {
                var callData = $(_self).getInputSelectValue('item');
                fn(callData);
            }
        });
        $(_self).unbind('input propertychange');
        $(_self).bind('input propertychange', function () {

            var inputText = $(_self).val();
            //输入值是否在列表中存在
            var sein = false;
            $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                if ($(this).text().indexOf(inputText) >= 0) {
                    sein = true;
                }
            });
            if (sein) {
                $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                    if ($(this).text().indexOf(inputText) >= 0) {
                        var __self = this;
                        $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                        $(__self).addClass("active");
                        return false;
                    }
                });
                if (inputText == "") {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                }
                $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);

            } else {
                $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
            }
            if ($.isFunction(fn)) {
                var callData = $(_self).getInputSelectValue('item');
                fn(callData);
            }
        });
        //解绑keydown事件
        $(_self).unbind('keydown');
        $(_self).keydown(function (event) {
            var keynum = (event.keyCode ? event.keyCode : event.which);
            $(_self).attr("data_val", "");
            if (keynum == '39' || keynum == '40') {
                var index = 0;
                $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                    var __self = this;
                    if ($(__self).hasClass("active")) {
                        index = $(__self).index() + 1;
                        if (index >= $(_self).siblings(".selectRadio_ul").children("li").length - 1) {
                            index = $(_self).siblings(".selectRadio_ul").children("li").length - 1;
                        }
                        return false;
                    }
                });
                if (index == 0) {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                    $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                    $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                } else {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                    $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                    $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);

                }
            };
            if (keynum == '37' || keynum == '38') {
                var index = 0;
                $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                    var __self = this;
                    if ($(__self).hasClass("active")) {
                        index = $(__self).index() - 1;
                        if (index <= 0) {
                            index = 0;
                        }
                        return false;
                    }
                });
                if (index == 0) {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                    $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                    $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                } else {
                    $(_self).siblings(".selectRadio_ul").children("li.active").removeClass("active");
                    $(_self).siblings(".selectRadio_ul").children("li").eq(index).addClass("active");
                    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                    $(_self).siblings(".selectRadio_ul").scrollTop(($(_self).siblings(".selectRadio_ul").children("li.active").index() - 1) * 30);
                }
            }
            if (keynum == '13') {
                var index = "";
                if ($(_self).siblings(".selectRadio_ul").css("display") == "block") {
                    $(_self).siblings(".selectRadio_ul").css("display", "none");
                }
                $(_self).siblings(".selectRadio_ul").children("li").each(function () {
                    if ($(this).hasClass("active")) {
                        index = $(this).index();
                        return false;
                    }
                })
                if ($(_self).val() == "") {
                    $(_self).attr("data_val", "");
                } else if (index !== "") {
                    $(_self).val($(_self).siblings(".selectRadio_ul").children("li").eq(index).text());
                    $(_self).attr("data_val", $(_self).siblings(".selectRadio_ul").children("li").eq(index).attr("data_val"));
                }
                if ($.isFunction(fn)) {
                    var callData = $(_self).getInputSelectValue('item');
                    fn(callData);
                }
            }
        });
    },
    getInputSelectValue: function (valueType) {
        var _self = this;
        var index = null;
        $(_self).siblings(".selectRadio_ul").children("li").each(function () {
            if ($(this).hasClass("active")) {
                index = $(this).index();
            }

        });

        if (valueType === 'item') {
            if (index !== null) {
                var txt = $(_self).siblings(".selectRadio_ul").children("li").eq(index).text();
                var value = $(_self).siblings(".selectRadio_ul").children("li").eq(index).attr("data_val");
                return { text: txt, val: value };
            } else {
                var txt = $(this).val();
                var value = $(this).attr("");
                return { text: txt, val: value };
            }

        }
        else {
            if (index !== null) {
                return $(_self).siblings(".selectRadio_ul").children("li").eq(index).attr("data_val");

            } else {
                return "";
            }
        }
    },

    /*******************************************下拉单选结束************************************************* */


    /*******************************************时间轴控件开始************************************************* */
    timeAxis: function (obj) {
        var self = $(this);
        var num = obj.length;
        var html = '';
        if (obj.constructor === Array) {
            if (!num) {
                throw 'timeAxis方法：当前数据源为空数组';
                return false;
            }
            for (var i = 0; i < num; i++) {
                if (!obj[i].date) {
                    throw 'timeAxis方法：当前数据源为date对象为空';
                    return false;
                } else if (!obj[i].pic) {
                    throw 'timeAxis方法：当前数据源为pic对象为空';
                    return false;
                } else if (!obj[i].title) {
                    throw 'timeAxis方法：当前数据源为title对象为空';
                    return false;
                } else if (!obj[i].content) {
                    throw 'timeAxis方法：当前数据源为content对象为空';
                    return false;
                }
            }
        } else {
            throw 'timeAxis方法：当前数据源不是一个数组';
            return false;
        }
        html += "<div class='time-container'><div class='time-row'><div class='time-12'><div class='main-timeline'>";
        for (var i = 0; i < num; i++) {
            if (obj[i].content.length > 175) {
                obj[i].content = obj[i].content.substr(0, 170) + '...';
            }
            if (obj[i].content.length < 150) {
                var k = obj[i].content.length;
                for (var j = 0; j < 150 - k; j++) {
                    obj[i].content += " ";
                }
                obj[i].content = obj[i].content.substr(0, 170);
            }
            html += "<div class='timeline'><div class='timeline-content'><div class='timeline-circle'>";
            //circle部分
            if (obj[i].pic === 'bf') {
                html += "<span><i class='tb_baofei'></i></span></div>";
            }
            else if (obj[i].pic === 'cg') {
                html += "<span><i class='tb_caigou'></i></span></div>";
            }
            else if (obj[i].pic === 'ck') {
                html += "<span><i class='tb_chuku'></i></span></div>";
            }
            else if (obj[i].pic === 'csdj') {
                html += "<span><i class='tb_chushidengji'></i></span></div>";
            }
            else if (obj[i].pic === 'rk') {
                html += "<span><i class='tb_ruku'></i></span></div>";
            }
            else if (obj[i].pic === 'sj') {
                html += "<span><i class='tb_shangjia'></i></span></div>";
            }
            else if (obj[i].pic === 'wx') {
                html += "<span><i class='tb_weixiu'></i></span></div>";
            }
            else {
                html += "<span><i class='tb_xiajia'></i></span></div>";
            }
            //内容部分
            html += "<div class='time-content'><span class='time-content-year'>" + obj[i].date + "</span>";
            html += "<h4 class='time-content-title'>" + obj[i].title + "</h4>";
            html += "<p class='time-content-description'>" + obj[i].content + "</p>";
            html += "<div class='time-content-icon'><span></span></div></div>"
            html += "</div></div>"

        }
        if (num === 1) {
            html += "<div class='timeline'><div class='timeline-content'></div></div>";
        }
        html += "</div></div></div></div>";
        $(self).addClass('encapsulation');
        $(self).html(html);
        $(self).find('*').addClass('encapsulation');
    }

    /*******************************************时间轴控件结束************************************************* */


});

//更新树的折叠展开状态
function _f_switch_tree_open_close(obj) {
    var v_parentTr = $(obj).parents('tr');
    var v_table = $(obj).parents('table');
    if (v_parentTr.hasClass('_tree_opened')) {
        var v_level = parseInt(v_parentTr.attr('lv'));
        var v_allChild = v_table.find("tr[parentStr*='" + v_parentTr.attr('cid') + "']");
        if (v_allChild.length > 0) {
            v_allChild.hide();
            v_allChild.find('a.__flodLink').parents('tr').removeClass('_tree_opened').addClass('_tree_closed');
            v_allChild.find('a.__flodLink').removeClass('opened'); //find('img:first').prop('src', '/img/arrowblue2.png');
            v_allChild.find('a.__flodLink').parents('tr').removeClass('_tree_opened').addClass('_tree_closed');
        }
        $(obj).removeClass('opened');//.find('img:first').prop('src', '/img/arrowblue2.png');
        v_parentTr.removeClass('_tree_opened').addClass('_tree_closed');
    }
    else {
        var v_tbody = $(obj).parents('table');
        var v_straightChildren = v_tbody.find('tr[fatherid=' + v_parentTr.attr('cid') + ']');
        if (v_straightChildren.length > 0) {
            //v_straightChildren.find('a.__flodLink img').prop('src', '/img/arrowblue2.png');
            v_straightChildren.show();
        }
        $(obj).addClass('opened');//.find('img:first').prop('src', '/img/arrowblue.png');
        v_parentTr.removeClass('_tree_closed').addClass('_tree_opened');
    }
}
