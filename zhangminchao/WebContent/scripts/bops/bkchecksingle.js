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
	if(checkArray.length==0){
		alert("请选择查询选项！");
		return;
	}
	var flag = checkData(name,id);
	if(flag==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url : appServer + "/bops/bkcheck/singlecheck.htm",
			type : "POST",
			data : {
				"name" : name,
				"id" : id,
				"type" : checkArray
			},
			success : function(res) {
				if (res.errorNO == 0) {
					$(".bk-searching").hide();
					hrHuTui.popout({type:"success",content:"查询成功"});
					showView(res.jsonResult);
				} else {
					alert(res.errorInfo);
				}
			}
		});
	}
});

$("#bk-btn-checkRN").live("click",function(){
	var checkbox = $("input[name='sg-ckbox']");

	var checkArray = [];
	for ( var i = 0; i < checkbox.length; i++) {
		if (checkbox[i].checked == true) {
			checkArray.push(checkbox[i].value);
		}
	}
	var name = $("#nameipt").val();
	var id = $("#idcardipt").val();
	if(checkArray.length==0){
		alert("请选择查询选项！");
		return;
	}
	var flag = checkData(name,id);
	if(flag==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url : appServer + "/bops/bkcheck/singlecheckrn.htm",
			type : "POST",
			data : {
				"name" : name,
				"id" : id,
				"type" : checkArray
			},
			success : function(res) {
				if (res.errorNO == 0) {
					$(".bk-searching").hide();
					hrHuTui.popout({type:"success",content:"查询成功"});
					showView(res.jsonResult);
				} else {
					alert(res.errorInfo);
				}
			}
		});
	}
});

function showView(resStr){
	var bkobj = JSON.parse(resStr);
	var identity = bkobj.identity;
	var courtExcList = bkobj.courtExcList;
	var education = bkobj.education;
	var finBlackList = bkobj.finBlackList;
	var unHonestList = bkobj.unHonestList;
	
	if(identity!=null){
		if(identity.identityCheck==0){
			$(".bk-baseinfo").hide();
			$(".bk-nullinfo").show();
		}else if(identity.identityCheck==1){
			$(".bk-nullinfo").hide();
			$("#bk-info-name").text(identity.identityName);
			$("#bk-info-id").text(identity.identityId);
			if(identity.gender==1){
				$("#bk-info-gender").text("男");
			}else if(identity.gender==0){
				$("#bk-info-gender").text("女");
			}
			$("#bk-info-birthcity").text(identity.cityName);
			$(".bk-baseinfo").show();
		}
	}else{
		$(".bk-baseinfo").hide();
		$(".bk-nullinfo").hide();
	}
	
	if(education!=null){
		if(education.responseCode=="1000"){
			$("#bk-edu-schname").text(education.data.schoolName);
			$("#bk-edu-major").text(education.data.major);
			$("#bk-edu-edu").text(education.data.education);
			$("#bk-edu-edutype").text(education.data.educationType);
			$("#bk-edu-enroll").text(education.data.enrollDate);
			$("#bk-edu-grad").text(education.data.graduateDate);
			$("#bk-edu-status").text(education.data.educationStatus);
			$(".bk-education").show();
			$(".bk-noeducation").hide();
		}else{
			if(education.responseCode=="1001"){
				$("#eduinfo").text("无记录");
			}else if(education.responseCode=="1002"){
				$("#eduinfo").text("身份证号和姓名不符");
			}
			$(".bk-education").hide();
			$(".bk-noeducation").show();
		}
		
	}else{
		$(".bk-education").hide();
		$(".bk-noeducation").hide();
	}
	
	if(unHonestList!=null){
		$(".bk-unhonest").show();
		if(unHonestList.responseCode==1002){
			$(".tb-ucontent").remove();
			$(".bk-unhonest tbody").append('<tr class="tb-ucontent"><td colspan="6">身份证号与姓名不符</td></tr>');
		}else if(unHonestList.responseCode==1001){
			$(".tb-ucontent").remove();
			$(".bk-unhonest tbody").append('<tr class="tb-ucontent"><td colspan="6">无记录</td></tr>');
		}else{
			uList = unHonestList.data;
			$(".tb-ucontent").remove();
			for(var i=0;i<unHonestList.data.length;i++){
				$(".bk-unhonest tbody").append(
						'<tr class="tb-ucontent">'+
				'<td>'+unHonestList.data[i].regDate+'</td>'+
				'<td>'+unHonestList.data[i].caseId+'</td>'+
	            '<td>'+unHonestList.data[i].execCourtName+'</td>'+
	            '<td>'+unHonestList.data[i].performance+'</td>'+
				'<td><div style="height: 29px;word-break: keep-all;overflow: hidden;text-overflow: ellipsis;">'+unHonestList.data[i].duty+'</div></td>'+
				'<td><a onclick="checkUhDetail('+i+')" href="javascript:void(0)">查看详情</a></td></tr>'
			);
			}
		}
	}else{
		$(".bk-unhonest").hide();
	}
	
	if(courtExcList!=null){
		$(".bk-courtexecute").show();
		if(courtExcList.responseCode==1002){
			$(".tb-ccontent").remove();
			$(".bk-courtexecute tbody").append('<tr class="tb-ccontent"><td colspan="5">身份证号与姓名不符</td></tr>');
		}else if(courtExcList.responseCode==1001){
			$(".tb-ccontent").remove();
			$(".bk-courtexecute tbody").append('<tr class="tb-ccontent"><td colspan="5">无记录</td></tr>');
		}else{
			$(".tb-ccontent").remove();
			for(var i=0;i<courtExcList.data.length;i++){
				$(".bk-courtexecute tbody").append(
						'<tr class="tb-ccontent">'+
				'<td>'+courtExcList.data[i].regDate+'</td>'+
				'<td>'+courtExcList.data[i].caseId+'</td>'+
	            '<td>'+courtExcList.data[i].execCourtName+'</td>'+
				'<td>'+courtExcList.data[i].execMoney+'</td>'+
				'<td>'+courtExcList.data[i].caseState+'</td></tr>'
			);
			}
		}
	}else{
		$(".bk-courtexecute").hide();
	}
	
	if(finBlackList!=null){
		$(".bk-finblack").show();
		if(finBlackList.responseCode==1002){
			$(".tb-fcontent").remove();
			$(".bk-finblack tbody").append('<tr class="tb-fcontent"><td colspan="4">身份证号与姓名不符</td></tr>');
		}else if(finBlackList.responseCode==1001){
			$(".tb-fcontent").remove();
			$(".bk-finblack tbody").append('<tr class="tb-fcontent"><td colspan="4">无记录</td></tr>');
		}else{
			$(".tb-fcontent").remove();
			for(var i=0;i<finBlackList.data.length;i++){
				$(".bk-finblack tbody").append(
				'<tr class="tb-fcontent">'+
				'<td>'+finBlackList.data[i].area+'</td>'+
				'<td>'+finBlackList.data[i].loanDate+'</td>'+
	            '<td>'+finBlackList.data[i].money+'</td>'+
	            '<td>'+finBlackList.data[i].thisMoney+'</td>'+
				'</tr>'
			);
			}
		}
	}else{
		$(".bk-finblack").hide();
	}
	
	$(".bk-searching").hide();
	$(".bk-result").show();
	
}



function checkData(name,idcard){
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
	return flag;
}

$("#bk-btn-reset").live("click", function() {
	$("#nameipt").val("");
	$("#idcardipt").val("");
	$("input[name='sg-ckbox']").removeAttr("checked");
});

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
				"<tr><td class='bk-gray'>案号</td><td>"+uList[i].caseId+"</td></tr>" +
				"<tr><td class='bk-gray'>性别</td><td>"+uList[i].gender+"</td></tr>" +
				"<tr><td class='bk-gray'>法律文书确定的义务</td><td><div  style='word-break: keep-all;overflow: scroll;text-overflow: ellipsis;'>"+uList[i].duty+"</div></td></tr>" +
				"<tr><td class='bk-gray'>执行情况</td><td>"+uList[i].performance+"</td></tr>" +
				"<tr><td class='bk-gray'>失信被执行人行为具体情形</td><td>"+uList[i].disruptTypeName+"</td></tr>" +
				"<tr><td class='bk-gray'>立案时间</td><td>"+uList[i].regDate+"</td></tr>" +
				"<tr><td class='bk-gray'>发布时间</td><td>"+uList[i].pubDate+"</td></tr>" +
				"<tr><td class='bk-gray'>做出执行依据单位</td><td>"+uList[i].courtName+"</td></tr>" +
				"<tr><td class='bk-gray'>执行法院</td><td>"+uList[i].execCourtName+"</td></tr>" +
				"<tr><td class='bk-gray'>执行依据文号</td><td>"+uList[i].gistId+"</td></tr>" +
				"<tr><td class='bk-gray'>执行省份</td><td>"+uList[i].areaName+"</td></tr>" +
				"</table>"
	});
}