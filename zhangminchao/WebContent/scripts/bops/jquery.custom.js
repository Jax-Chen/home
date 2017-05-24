/*
 * jQuery自定义脚本。
 * 提供整个系统中通用jQuery自定义脚本代码。
 * 
 * author: zhengdd
 * date: 2010-4-15
 */

//  =================================================================================
// ~ 通用函数
/*
 * 登录页面淡入与输入框方法。
 * date: 2010-4-15
 */
function login() {
	$(".login-box").hide();
	$(".login-box").fadeIn(1000);
	$(".inp").bind("focus", function() {
		$(this).addClass("inp2");
	});
	$(".inp").bind("blur", function() {
		$(this).removeClass("inp2");
	});
}
/*
 * 登录页面淡入与输入框方法。 author: zhengdd date: 2010-4-15
 */
function welcome() {
	$(".wel-bg").animate( {
		left : "150px",
		top : "60px",
		height : "250px",
		width : "500px"
	}, 800, function() {
		$(".wel-nr").show(400);
	});
}
/*
 * 重新调整id为"main"的iframe的大小，用于解决该iframe内部如果通过Javascript动态加入html代码后，
 * iframe的大小发生了变化而外部的父iframe却没有重新调整过大小，导致该iframe的部分内容被遮挡。 
 * date:2010-4-15
 */
function resizeMainIframe() {
	var mainIframe = jQuery("#main", parent.document.body)[0];
	jQuery("#main", parent.document.body).attr("height",
			mainIframe.contentWindow.document.documentElement.scrollHeight);
}

//=================================================================================
//~ 通用加载脚本
/*
 * 返回前一页。 
 * 注：返回按钮的id必须为“back”。
 * date: 2010-4-15
 */
$(function() {
	$("#back").click(function() {
		history.back(-1);
		return false;
	});
});
/*
 * 菜单展开和收缩。 
 * date: 2010-4-15
 */
$(function() {
	$("div .menu :header").click(function() {
		$(this).next("ul").slideToggle("normal", function() {
			$(this).prev(":header").toggleClass("menu-closed");
		});
		window.name = $(this).prevAll("#modules :header").length;
		if ($(this).hasClass("menu-closed")) {
			$(this).siblings(":header").each(function(i, e) {
				if (!$(e).hasClass("menu-closed")) {
					$(e).next("ul").slideUp("normal", function() {
						$(this).prev(":header").toggleClass("menu-closed");
					});
				}
			});
		}
	});
});
/*
 * 左侧菜单显示。 
 * date: 2010-4-15
 */
$(function() {
	jQuery.loadMenu = function(tabnum, menunum) {
		$("div .menu").each(function(i, e) {
			if (tabnum == i) {
				$(e).show();
				$(e).find(":header").each(function(i2, e2) {
					if (i2 == menunum) {
						$(this).removeClass("menu-closed");
						$(this).next("ul").show();
					} else {
						$(this).addClass("menu-closed");
						$(this).next("ul").hide();
					}
				});
			} else {
				$(e).hide();
			}
		});
	};
});
/*
 * 全选checkbox的全选功能。 
 * date: 2010-4-15
 */
$(function() {
	$(".list-table .all-checkbox").click(function() {
		if ($(".list-table .all-checkbox").is(":checked")) {
			$(".list-table .row-checkbox").each(function() {
				$(this).attr("checked", "checked");
			});
		} else {
			$(".list-table input[type=checkbox]").each(function() {
				$(this).removeAttr("checked");
			});
		}
	});
});