/*
 * jQuery自定义脚本
 * 提供整个系统中通用jQuery自定义脚本代码
 * 
 * author: xsq
 * date: 2013-8-27
 */

/*
 * 清空日期
 */
$(function() {
	$("a[id=delDate]").click(function() {
		$(this).siblings("input").each(function(i, e) {
			$(e).val("");
		});
	});
});
var _form;
var _data;
var _action;
var _expression;
function paginate(p) {
	if (_form == "" && _action == "" && _expression == "") {
		var url = window.location.href;
		if (url.indexOf("?") != -1) {
			if (url.charAt(url.length - 1) != "&") {
				window.location.href = url + "&pageNo=" + p;
			} else {
				window.location.href = url + "pageNo=" + p;
			}
		} else {
			window.location.href = url + "?pageNo=" + p;
		}
	} else if (_form != "") {
		if (_action != "") {
			// TODO;
		}
		if (_expression != "") {
			$("#" + _form).append("<input type='hidden' name='" + _expression + "' value='" + p + "' />");
		} else {
			$("#" + _form + " input[type=hidden][name=pageNo]").remove();
			$("#" + _form).append("<input type='hidden' name='pageNo' value='" + p + "' />");
		}
		if (_data != "") {
			$("#" + _data).load(_action, $("#" + _form).serializeArray());
		} else {
			$("#" + _form).submit();
		}	
	}
}
function bindPager() {
	$("#_page a[id=_pre_page],#_page a[id=_next_page]").on("click", function() {
		paginate($.trim($(this).next().val()));
	});
	$("#_page a[id=_none_pre_page]").on("click", function() {
		var page = $("#_cur_page").val() - 1;
		if (page <=0)  page = 1;
		paginate(page);
	});
	$("#_page a[id=_none_next_page]").on("click", function() {
		var page = parseInt($("#_cur_page").val()) + 1;
		if (page > $("#_total_page").val()){
			page =  $("#_total_page").val();
		}
		paginate(page);
	});
	$("#_page a[id=_page_no]").on("click", function() {
		paginate($.trim($(this).text()));
	});
	$("#_page a[id=_go]").on("click", function() {
		var p = $.trim($("#_page input[id=_go_page]").val());
		var pTotal = $.trim($("#_page input[id=_total_page]").val());
		if (p.isBlank()) {
			alert("请输入页数");
			return;
		}
		if (isNaN(p)) {
			alert("请输入正确的页数");
			return;
		}
		if (parseInt(p) <= 0) {
			p = "1";
		} else if (parseInt(p) >= parseInt(pTotal) ) {
			p = pTotal;
		}
		paginate(p);
		return false;
	});
}
$(function() {
	bindPager();
});