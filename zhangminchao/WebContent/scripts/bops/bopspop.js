(function($) {

 if (!window.hrHuTui) {
	hrHuTui = {};
 }
  hrHuTui.popout = function(options){
	if($("#popall").length>0){
		return;
	}
	
	var defaults = { 
		type:"text",
		title:"Title",
		nttext:[],//当type为input或者select时用来提示的文字
		content:"",
		width:400,
		height:"auto",
		mask:true,
		background:"#fff",
		btn: "ok", //按钮,默认单按钮事件
		onOk: $.noop,//点击确定的按钮回调
		onCancel: $.noop,//点击取消的按钮回调
		onClose: $.noop//弹窗关闭的回调,返回触发事件
	};
	var options = $.extend(defaults,options);
	
	switch(options.type){
		case "input":
			options.content ="<span id='nttext' class='nttext'>"+options.nttext[0]+"</span><input id='popinput' class='popinput' type='text' />";
			options.btn = "okcancel";
			break;
		case "error":
			options.title = "错误提示";
			options.content = "<span class='pop-icon' style='background-position:-60px 0'></span><span class='pop-con-text'>"+options.content+"</span>";
			options.btn = "ok";
			break; 
		case "success":
			options.title = "成功";
			options.content = "<span class='pop-icon' style='background-position:-30px 0'></span><span class='pop-con-text'>"+options.content+"</span>";
			options.btn = "ok";
			break; 
		case "info":
			options.title = "提示";
			options.content = "<span class='pop-icon' style='background-position:0 0'></span><span class='pop-con-text'>"+options.content+"</span>";
			options.btn = "okcancel";
			break;
		case "select":  
			options.content = "<span id='nttext' class='nttext'>"+options.nttext[0] +"</span><select id='pop-select' class='pop-select'>"+options.content+"</select>";
			options.btn = "okcancel";
			break;
		case "selandinput":
			options.content = "<span id='nttext' class='nttext'>"+options.nttext[0]+"</span><input id='popinput' class='popinput' type='text'>"+"<span id='nttext' class='nttext'>"+options.nttext[1] +"</span><select id='pop-select' class='pop-select'>"+options.content+"</select>";
			options.btn = "okcancel";
			break;
		case "table":
			options.btn = "savecancel";
			break;
    }
	
	if(options.mask){
		$("body").append("<div id='mask' class='mask'></div>");
		var $blank = $("#mask"); //背景遮罩层
	}
	$("body").append(
		"<div id='popall' class='popall'>"
		+"<div id='poptitle' class='poptitle'><h4></h4><span id='popcloseDialog' class='popcloseDialog'></span></div>"
		+"<div id='popcontent' class='popcontent'></div>"
		+"<div id='popfooter' class='popfooter'></div>"
		+"</div>"
	);
	
	var $btnSave = $("<a>").addClass("popbtnok").addClass("popbtn").text("保存");//确定按钮
	var $btnOK = $("<a>").addClass("popbtnok").addClass("popbtn").text("确定");//确定按钮
	var $btnCancel = $("<a>").addClass("popbtncancel").addClass("popbtn").text("取消");//取消按钮
	var btnType={
		ok: "ok", //确定按钮
		cancel: "cancel", //取消按钮
		okcancel: "okcancel", //确定&&取消
		savecancel:'savecancel'
	};	
	var $this = $(this);
	var $title = $("#poptitle h4");//标题
	var $content = $("#popcontent");//内容
	var $foot = $("#popfooter");//底部
	var $dialog = $("#popall");//窗体
	var $close = $("#popcloseDialog");//关闭按钮
	//按钮选项
	var $btn = {
		ok:$btnOK,
		cancel:$btnCancel,
		save : $btnSave
	};
	
	init();
	
	function init(){
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {//判断IE6
			$blank.css({height:$(document).height(),width:$(document).width()});
		}
		$title.html(options.title);
		$close.live("click",closeForm);
		
		createBtn();
		bind();
		
		$content.append(options.content);
		if(options.mask){
			$blank.live("click",closeForm);
			$blank.show();
		}
		var itop;
		var iheight;
		if(options.height == "auto"){
			itop =(($(window).height()- $dialog.height())/2)/$(window).height()*100+"%";
			iheight = "auto";
		}else{
			itop = (($(window).height()- parseInt(options.height))/2)/$(window).height()*100+"%";
			iheight = options.height;
			$content.css({height:iheight-90});
		}
		
		
		
		$dialog.css({display:"block",
			left:(($(window).width()- parseInt(options.width))/2)/$(window).width()*100+"%",
			top:itop,
			width:options.width,
			height:iheight,
			background:options.background,
			float:"left"
		});
		
		
	}
	
	//添加按钮
	function createBtn(){
		if( options.btn == btnType.ok ){
			$foot.append($btnOK);
		}else if( options.btn == btnType.cancel ){
			$foot.append($btnCancel);
		} else if( options.btn == btnType.savecancel ){
			$foot.append($btnCancel).append($btnSave);
		} else{
			$foot.append($btnCancel).append($btnOK);
		}
	}

	//按钮事件绑定
	function bind(){
			//点击确认按钮
		$btnOK.click(doOk);			
			//点击取消按钮		
		$btnCancel.click(doCancel);
		
		$btnSave.click(doOk);	
	}
	
	function doOk(){
		var $o = $(this);
		var v;
		if(options.type=="input"){
			v = $.trim($("#popinput").val());
		}else if(options.type=="select"){
			v = $("#pop-select").val();
		}
		
		var r = true;
		res = options.onOk(v);
		if(res!=undefined){
			r = res;
		}
		
		
		if(r===true){
			closeForm();
		}
		
	}
	
	function doCancel(){
		options.onCancel();
		closeForm();
	}
	
	//移除遮罩层和弹出框
	function closeForm(){
		$("#mask").remove();
		$("#popall").remove();
	}
	
  };
})(jQuery);