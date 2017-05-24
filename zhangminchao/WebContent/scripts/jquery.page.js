﻿/*
 * 分页相关的jQuery脚本。
 * author: www.soft-on-line.com
 * date: 2010-12-7
 */
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
			$("#" + _data).load(_action, $("#" + _form).serialize());
		} else {
			$("#" + _form).submit();
		}	
	}
}
function bindPager() {
	$("#_page a[id=_pre_page],#_page a[id=_next_page]").bind("click", function() {
		paginate($.trim($(this).next().val()));
	});
	$("#_page a[id=_none_pre_page],#_page a[id=_none_next_page]").bind("click", function() {
		return false;
	});
	$("#_page a[id=_page_no]").bind("click", function() {
		paginate($.trim($(this).text()));
	});
	$("#_page a[id=_go]").bind("click", function() {
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