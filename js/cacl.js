//定义cacl对象
var diaLogIds = {
    1: "shopEnoughDialog",
    2: "memberTypeDialog",
    3: "shopAmountDialog",
    4: "fullReductionDialog",
    5: "couponDialog",
    6: "giftDialog"
};

function cacl() {}

//优惠券
var coupon = {};
$(function () {
    $(".right select").on('change', function () {
        var selectVal = $(this).val();
        var context;
        var area;
        switch (selectVal) {
            case "1":
                $('#shopEnoughDialog input').val("");
                $('#shopEnoughDialog input[type=checkbox]').attr("checked", false);
                context = "shopEnoughDialog";
                area = ['400px', '300px'];
                break;
            case "2":
                $("#memberTypeDialog input[type=text]").val("");
                $("#memberTypeDialog input[type=checkbox]").attr("checked", false);
                context = "memberTypeDialog";
                area = ['400px', '300px'];
                break;
            case "3":
                $("#shopAmountDialog input[type=tel]").val("");
                context = "shopAmountDialog"
                area = ['400px', '300px'];
                break;
            case "4":
                area = ['400px', '300px'];
                context = 'fullReductionDialog';
                break;
            case "5":
                area = ['1000px', 'auto'];
                context = 'couponDialog';
                break;
            case "6":
                area = ['400px', '300px'];
                context = 'giftDialog';
                break;
            default:
                break;
        }
        layer.open({
            type: 1,
            shade: false,
            title: false,
            area: area,
            moveType: 1,
            content: $('#' + context),
            btn: ['确认', '取消'],
            yes: function (index) {
                //确认的回调
                if(selectVal == 5) {
                    
                }
                createJson(selectVal);
                addTag(selectVal);
                layer.close(index);
            },
            bt2: function () {
                //取消的回调
                alert('取消');
            },
            btnAlign: 'c',
            success: function () {
                $('#shopEnoughDialog input[type=checkbox]').attr("checked", false);
            }
        });
    });
});
var i = 0;

function addAlertDialog() {

    var condition = new cacl();
    var result = new cacl();
    var action = new cacl();

    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        shade: false,
        title: false,
        area: ['auto', 'auto'],
        content: $('#cacl'),
        cancel: function () {

        },
        btn: ['确认', '取消'],
        yes: function (index, layero) {
            //确认的回调
            if ($('#caclResult').html() != '') {
                i++;
                $('#condition').css('display', 'block');
                addConditionTag(i);
            }

            //将拼接好的json字符串 赋值给隐藏域

            layer.close(index);
        },
        bt2: function () {
            //取消的回调
            alert('取消');
        },
        btnAlign: 'c',
        success: function () {
            $('#caclResult').html("");
            $("#conditionSelect option:first").prop("selected", 'selected')
            $("#resultSelect option:first").prop("selected", 'selected')
        }
    });
}
/**
 * 1 购物满X件
 * 2 会员类型
 * 3 购物金额设置
 * 4 直接满减打折
 * 5 优惠券活动
 * 6 送赠品
 */
function addTag(selectVal) {
    var id = 'tag_' + selectVal;
    var tag = $("#" + id);
    if (tag != null && tag.attr('id') == (id)) {
        return;
    }
    var cacl = $("#caclResult");
    var title;
    switch (selectVal) {
        case "1":
            //购物满X件
            title = '购物满X件';
            break;
        case "2":
            title = '会员类型';
            break;
        case "3":
            title = '购物金额设置';
            break;
        case "4":
            title = "直接满减打折";
            break;
        case "5":
            title = "优惠券活动";
            break;
        case "6":
            title = "送赠品";
            break;
        default:
            break;
    }
    var tagSpan = "<span class ='tag' id='tag_" + selectVal + "' selectVal='" + selectVal + "' data-val='' coupon-val=''><span onClick='showDialog(" + selectVal + ")'>" +
        title + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + selectVal + ")'>x</a></span></span>";
    cacl.append(tagSpan);
    $('#tag_' + selectVal).attr('data-val', JSON.stringify(result))
    if(selectVal == 5) {
        $('#tag_' + selectVal).attr('coupon-val', JSON.stringify(result))
    }
    console.log("addTag", JSON.stringify(result))
}

//移除tag
function removeTag(selectVal) {
    switch (selectVal) {
        case 1:
            //购物满X件
            delete condition.quantity;
            break;
        case 2:
            //会员类型
            delete condition.nikeVipLevel;
            break;
        case 3:
            //购物金额设置
            delete condition.amountExtTotalDiscount;
            break;
        case 4:
            //直接满减打折
            delete action.discount;
            break;
        case 5:
            //优惠券活动
            break;
        case 6:
            //送赠品
            delete condition.giftCheck;
            delete condition.giftType;
            break;
        default:
            break;
    }
    result.c = condition;
    result.a = action;
    $('#tag_' + selectVal).remove();
    console.log(JSON.stringify(action));
}

//拼接cacl的json字符串
function createJson(selectVal) {

    switch (selectVal) {
        case "1":
            //购物满X件
            //判断是否选中了是否商品凑单
            var flag = false;
            if ($('.addOnNums').prop("checked")) {
                flag = true;
            }
            var nums = $("#quantity").val();
            if (nums == "") {
                nums = 2;
            }
            if (flag) {
                condition.add_on_item = Number(nums);
            }
            condition.quantity = Number(nums);
            break;
        case "2":
            //会员类型
            var flag = false;
            var arrStr = new Array();
            $('.memberTypeClass').each(function (index, v) {
                if ($(this).prop('checked')) {
                    arrStr.push($(this).val());
                    flag = true;
                }
            })
            if (flag) {
                var memberType = getTextByJquery(arrStr);
                condition.nikeVipLevel = memberType;
            }
            break;
        case "3":
            //购物金额设置
            var nums = $("#amountExtTotalDiscount").val();
            if (nums != '' || nums != 'undefined') {
                condition.amountExtTotalDiscount = Number(nums);
            }
            break;
        case "4":
            title = "直接满减打折";
            //直接满减打折
            var nums = $('#discount').val();
            if (nums != '' || nums != 'undefined') {
                action.discount = Number(nums);
            }
            break;
        case "5":
            title = "优惠券活动";
            coupon.pwd = $('#pwd').val();
            coupon.pwdLength = $('#pwdLength').val();
            coupon.isCycle = $('#isCycle :checked').val();
            coupon.isMulti = $('#isMulti :checked').val();
            coupon.useLimit = $('#useLimit').val();
            coupon.nums = $('#nums').val();
            coupon.effectiveTime = $('#effectiveTime').val();
            coupon.expireTime = $('#expireTime').val();
            coupon.chinaName = $('#chinaName').val();
            coupon.englishName = $('#englishName').val();
            break;
        case "6":
            //送赠品
            var gift = $('#gift :checked').val();
            var arrStr = new Array();
            if (gift != "0") {
                //选中了赠品
                condition.giftCheck = true;
            }
            $('.gift').each(function (index, v) {
                if ($(this).prop('checked')) {
                    arrStr.push($(this).val());
                }
            });
            if (arrStr.length > 0) {
                var giftType = getTextByJquery(arrStr);
                condition.giftType = giftType;
            }
            break;
        default:
            break;
    }
    if (objectIsNotNull(condition)) {
        result.c = condition;
    }
    if (objectIsNotNull(action)) {
        result.a = action;
    }
    console.log(JSON.stringify(result));
}

//遍历数组，获取逗号分隔的字符
function getTextByJquery(arr) {
    var str = "";
    $.each(arr, function (index, v) {
        str += v + ",";
    });
    if (str.length > 0) {
        str = str.substr(0, str.length - 1);
    }
    return str;
}

//活动新增页面添加标签
function addConditionTag(index) {
    var json = JSON.stringify(result);
    var couponJson = JSON.stringify(coupon);
    var conditionhtml = $('#condition');
    var tagSpan = "<span class ='conditionTag' id='conditionTag_" + index + "' data-val='' coupon-val=''><span>" + "条件" +
        index + "</span><a href='#' onClick='removeConditionTag(" + index + ")'>x</a></span>";
    conditionhtml.append(tagSpan);

    $('#conditionTag_' + index).on('click', function () {
        conditionDialog(this);
    });
    $('#conditionTag_' + index).attr('data-val', json);
    $('#conditionTag_' + index).attr('coupon-val', couponJson);
    action = new cacl();
    condition = new cacl();
    result = new cacl();
    coupon={};
}

//更新活动新增页面的标签内容
//{"c":{"add_on_item":222,"quantity":222}}
function updateConditionTag() {
    var oldJsonStr = $('#conditionTag_' + i).attr('data-val');
    if (objectIsNotNull(result)) {
        var oldJson = JSON.parse(oldJsonStr);
        var newJson = updateTagData(oldJson, JSON.parse(JSON.stringify(result)));
        $("#caclResult").attr('data-val', oldJson);
        var json = JSON.stringify(newJson);
        $('#conditionTag_' + i).attr('data-val', json)

    }
    action = new cacl();
    condition = new cacl();
    result = new cacl();

}

//活动新增页面添加标签
function removeConditionTag(index) {
    $('#conditionTag_' + index).remove();
    //移除隐藏域的值
}

//{"c":{"add_on_item":222,"quantity":222}}
function conditionDialog(obj) {
    $("#caclResult").html("");
    var bindEm = $("#caclResult");
    layer.open({
        type: 1,
        skin: 'layui-layer-molv',
        shade: false,
        title: false,
        area: ['auto', 'auto'],
        content: $('#cacl'),
        cancel: function () {

        },
        btn: ['确认', '取消'],
        yes: function (index, layero) {
            updateConditionTag();
            layer.close(index);
        },
        bt2: function () {
            //取消的回调
            alert('取消');
        },
        btnAlign: 'c',
        success: function () {
            var data = JSON.parse($(obj).attr('data-val'));
            for (var p in data.c) {
                switch (p) {
                    case 'add_on_item':
                        if ($('#tag_1').length == 0) {
                            var tagSpan = "<span class ='tag' id='tag_" + 1 + "' selectVal='" + 1 + "' data-val=''><span onClick='showDialog(" + 1 + ")'>" +
                                '购物满X件' + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + 1 + ")'>x</a></span></span>";
                            bindEm.append(tagSpan);
                        }
                        break;
                    case 'quantity':
                        if ($('#tag_1').length == 0) {
                            var tagSpan = "<span class ='tag' id='tag_" + 1 + "' selectVal='" + 1 + "' data-val=''><span onClick='showDialog(" + 1 + ")'>" +
                                '购物满X件' + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + 1 + ")'>x</a></span></span>";
                            bindEm.append(tagSpan);
                        }

                        break;
                    case 'nikeVipLevel':
                        var tagSpan = "<span class ='tag' id='tag_" + 2 + "' selectVal='" + 2 + "' data-val=''><span onClick='showDialog(" + 2 + ")'>" +
                            '会员类型' + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + 2 + ")'>x</a></span></span>";
                        bindEm.append(tagSpan);
                        break;
                    case 'amountExtTotalDiscount':
                        var tagSpan = "<span class ='tag' id='tag_" + 3 + "' selectVal='" + 3 + "' data-val=''><span onClick='showDialog(" + 3 + ")'>" +
                            '购物金额设置' + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + 3 + ")'>x</a></span></span>";
                        bindEm.append(tagSpan);
                        break;
                    case 'giftCheck':
                        var tagSpan = "<span class ='tag' id='tag_" + 4 + "' selectVal='" + 4 + "' data-val=''><span onClick='showDialog(" + 4 + ")'>" +
                            '送赠品' + "</span>&nbsp;&nbsp;<span><a href='#' onClick='removeTag(" + 4 + ")'>x</a></span></span>";
                        bindEm.append(tagSpan);
                        break;
                    default:
                        break;
                }
            }
            // for (var p in data.a) {

            // }
            $("#conditionSelect option:first").prop("selected", 'selected')
            $("#resultSelect option:first").prop("selected", 'selected')
        }
    });

}

//将json字符串放在隐藏域中
function createHidenSpace() {

}

//回显dialog框
function showDialog(selectVal) {
    var area;
    layer.open({
        type: 1,
        shade: false,
        title: false,
        area: area,
        moveType: 1,
        content: $('#' + diaLogIds[selectVal]),
        btn: ['确认', '取消'],
        yes: function (index, layero) {
            //确认的回调
            createJson(selectVal);
            addTag(selectVal);
            layer.close(index);
        },
        bt2: function () {
            //取消的回调
            alert('取消');
        },
        btnAlign: 'c',
        success: function () {
            switch (selectVal) {
                case "1":
                    //购物满X件
                    area = ['400px', '300px'];
                    var obj = $('#tag_' + selectVal).attr('data-val');

                    break;
                case "2":
                    //会员类型
                    area = ['400px', '300px'];
                    break;
                case "3":
                    //购物金额设置
                    area = ['400px', '300px'];

                    break;
                case "4":
                    //直接满减打折
                    area = ['400px', '300px'];
                    break;
                case "5":
                    //优惠券活动";
                    area = ['1000px', 'auto'];
                    break;
                case "6":
                    //送赠品
                    area = ['400px', '300px'];
                    break;
                default:
                    break;
            }
        }
    });
}

function objectIsNotNull(obj) {
    if (JSON.stringify(obj) === '{}') {
        return false
    }
    return true
}

/**
 * {"c":{"add_on_item":123,"quantity":123}}
 * {"c":{"nikeVipLevel":"guest,normal,employee"}}
 * 
 * @param {*} jsonbject1 
 * @param {*} jsonbject2 
 */
function mergeJsonObject(jsonbject1, jsonbject2) {
    var resultJsonObject = {};

    for (var attr in jsonbject1) {
        resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
        resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
};


function updateTagData(jsonbject1, jsonbject2) {
    var cFlag = false;
    var aFlag = false;
    var c_1;
    var c_2;
    var c;
    var a;
    var a_1;
    var a_2;
    var resultJsonObject = {};
    if (objectIsNotNull(jsonbject1.c)) {
        cFlag = true;
        c_1 = jsonbject1.c;
    }
    if (objectIsNotNull(jsonbject2.c)) {
        cFlag = true;
        c_2 = jsonbject2.c;
    }
    if (cFlag) {
        c = mergeJsonObject(c_1, c_2);
        resultJsonObject.c = c;
    }

    if (objectIsNotNull(jsonbject1.a)) {
        aFlag = true;
        a_1 = jsonbject1.a;
    }
    if (objectIsNotNull(jsonbject2.a)) {
        aFlag = true;
        a_2 = jsonbject2.a;
    }
    if (aFlag) {
        a = mergeJsonObject(a_1, a_2);
        resultJsonObject.a = a;
    }
    return resultJsonObject
}
/**
 * 1.更新的时候，把每个小标签的内容绑在自己 身上，在确认的时候 重新拼装json字符串
 * 
 */