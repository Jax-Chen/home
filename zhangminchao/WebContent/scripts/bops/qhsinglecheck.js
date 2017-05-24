$(function(){
	
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$("input[name='sg-ckbox']").removeAttr("checked");
		$("#ordeript").val("");
	});
	
	$("#bk-btn-ok").live("click", function() {
		var checkbox = $("input[name='sg-ckbox']");

		var checkArray = [];
		for ( var i = 0; i < checkbox.length; i++) {
			if (checkbox[i].checked == true) {
				checkArray.push(checkbox[i].value);
			}
		}
		var name = $("#nameipt").val();
		var id = $("#idcardipt").val();
		var orderCode = $("#ordeript").val();
		if(checkArray.length==0){
			alert("请选择查询选项！");
			return;
		}
		var flag = checkData(name,id,orderCode);
		if(flag==1){
			$(".loadframe").show();
			$(".bk-result").hide();
			$.ajax({
				url : appServer + "/bops/bkcheck/qhsinglecheck.htm",
				type : "POST",
				data : {
					"name" : name,
					"id" : id,
					"orderCode" : orderCode,
					"type" : checkArray
				},
				success : function(res) {
					$(".loadframe").hide();
					if (res.meta.errorNO == 0) {
						hrHuTui.popout({type:"success",content:"查询成功"});
						showView(res.retObj);
					} else {
						alert(res.meta.errorInfo);
					}
				},error:function(xhr){
					$(".loadframe").hide();
					alert("网络错误！");
				}
			});
		}
	});
	
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$("#mobileipt").val("");
		$("#ordeript").val("");
		$(".bk-result").hide();
	});
	
});

function showView(resStr){
	var bkobj = resStr;
	var identity = bkobj.identity;
	var courtExcList = bkobj.courtExcList;
	var unHonestList = bkobj.unHonestList;
	
	
	if(unHonestList!=null){
		$(".bk-unhonest").show();
		if(unHonestList=="ERROR"){
			$(".tb-ucontent").remove();
			$(".bk-unhonest tbody").append('<tr class="tb-ucontent"><td colspan="6">查询接口出错</td></tr>');
		}else if(unHonestList.length==1 && unHonestList[0].status == 1){
			$(".tb-ucontent").remove();
			$(".bk-unhonest tbody").append('<tr class="tb-ucontent"><td colspan="6">无记录</td></tr>');
		}else{
			uList = unHonestList;
			$(".tb-ucontent").remove();
			for(var i=0;i<unHonestList.length;i++){
				$(".bk-unhonest tbody").append(
						'<tr class="tb-ucontent">'+
				'<td>'+unHonestList[i].buildDate+'</td>'+
				'<td>'+unHonestList[i].caseCode+'</td>'+
	            '<td>'+unHonestList[i].courtName+'</td>'+
	            '<td>'+unHonestList[i].fulfillInc+'</td>'+
				'<td><div style="height: 29px;word-break: keep-all;overflow: hidden;text-overflow: ellipsis;">'+unHonestList[i].lawerDuty+'</div></td>'+
				'<td><a onclick="checkUhDetail('+i+')" href="javascript:;">查看详情</a></td></tr>'
			);
			}
		}
	}else{
		$(".bk-unhonest").hide();
	}
	
	if(courtExcList!=null){
		$(".bk-courtexecute").show();
		if(courtExcList == "ERROR"){
			$(".tb-ccontent").remove();
			$(".bk-courtexecute tbody").append('<tr class="tb-ccontent"><td colspan="5">查询接口出错！</td></tr>');
		}else if(courtExcList.length==1 && courtExcList[0].status == 1){
			$(".tb-ccontent").remove();
			$(".bk-courtexecute tbody").append('<tr class="tb-ccontent"><td colspan="5">无记录</td></tr>');
		}else{
			$(".tb-ccontent").remove();
			for(var i=0;i<courtExcList.length;i++){
				$(".bk-courtexecute tbody").append(
						'<tr class="tb-ccontent">'+
				'<td>'+courtExcList[i].buildDate+'</td>'+
				'<td>'+courtExcList[i].caseCode+'</td>'+
	            '<td>'+courtExcList[i].courtName+'</td>'+
				'<td>'+courtExcList[i].execMoney+'</td>'+
				'<td>'+courtExcList[i].caseStatus+'</td></tr>'
			);
			}
		}
	}else{
		$(".bk-courtexecute").hide();
	}
	
	$(".bk-searching").hide();
	$(".bk-result").show();
	
}

function checkData(name,idcard,orderCode){
	if(!br){
		hrHuTui.popout({type:"info",content:"求你了，别用低版本的IE了，请使用IE8及以上版本的浏览器。推荐使用Google Chrome！"});
		return;
	}
	
	var flag=1;
	if (name == "") {
		hrHuTui.popout({
			type : "info",
			title : "提示消息",
			content : "姓名不能为空！"
		});
		flag=0;
	}else if (name.length<2||name.length>10||name.match("[\u4e00-\u9fa5]{2,10}||[\u4e00-\u9fa5]*·[\u4e00-\u9fa5]")==null){
		hrHuTui.popout({
			type : "info",
			title : "提示消息",
			content : "请输入正确格式的姓名！"
		});
		flag=0;
	}
	if (idcard == "") {
		hrHuTui.popout({
			type : "info",
			title : "提示消息",
			content : "身份证号不能为空"
		});
		flag=0;
	} else if(idcard.length<15||idcard.length>18||idcard.match("\\d{15}||\\d{18}||\\d{17}[0-9Xx]")==null){
		hrHuTui.popout({
			type : "info",
			title : "提示消息",
			content : "身份证号格式错误！"
		});
		flag=0;
	}
	
	if(orderCode == ""){
		hrHuTui.popout({
			type : "info",
			title : "提示消息",
			content : "订单号不能为空"
		});
		flag=0;
	}
	return flag;
}

var br = brower();

//判断浏览器
function brower(){
	var userAgent = navigator.userAgent;
	var isOpera = userAgent.indexOf("Opera") > -1;
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; 
	if (isIE) {
      var IE5 = IE55 = IE6 = IE7 = IE8 = false;
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      IE55 = fIEVersion == 5.5;
      IE6 = fIEVersion == 6.0;
      IE7 = fIEVersion == 7.0;
      IE8 = fIEVersion == 8.0;
      if (IE55||IE6||IE7) {
          hrHuTui.popout({type:"info",content:"求你了，别用低版本的IE了，请使用IE8及以上版本的浏览器。推荐使用Google Chrome！"});
          return false;
      }
      
  }
	return true;
}

var uList;
function checkUhDetail(i){
	hrHuTui.popout({
		title:"详细信息",
		width:615,
		height:600,
		content:"<table class='courtdetail' style='border-collapse: collapse;'>" +
				"<tr><td class='bk-gray'>案号</td><td>"+uList[i].caseCode+"</td></tr>" +
				"<tr><td class='bk-gray'>性别</td><td>"+uList[i].gender+"</td></tr>" +
				"<tr><td class='bk-gray'>法律文书确定的义务</td><td><div  style='word-break: keep-all;overflow: scroll;text-overflow: ellipsis;'>"+uList[i].lawerDuty+"</div></td></tr>" +
				"<tr><td class='bk-gray'>执行情况</td><td>"+uList[i].fulfillInc+"</td></tr>" +
				"<tr><td class='bk-gray'>失信被执行人行为具体情形</td><td>"+uList[i].distrustType+"</td></tr>" +
				"<tr><td class='bk-gray'>立案时间</td><td>"+uList[i].buildDate+"</td></tr>" +
				"<tr><td class='bk-gray'>发布时间</td><td>"+uList[i].publishDate+"</td></tr>" +
				"<tr><td class='bk-gray'>做出执行依据单位</td><td>"+uList[i].exedOrg+"</td></tr>" +
				"<tr><td class='bk-gray'>执行法院</td><td>"+uList[i].courtName+"</td></tr>" +
				"<tr><td class='bk-gray'>执行依据文号</td><td>"+uList[i].gistId+"</td></tr>" +
				"<tr><td class='bk-gray'>执行省份</td><td>"+uList[i].province+"</td></tr>" +
				"</table>"
	});
}
