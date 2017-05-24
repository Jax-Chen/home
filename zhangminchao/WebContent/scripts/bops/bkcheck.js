$("#bk-btn-ok").live("click", function() {	
	var name = $("#nameipt").val();
	var idcard = $("#idcardipt").val();
	var flag = checkData(name,idcard);
	if(flag==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url:appServer+"/bops/bkcheck/check.htm?t="+Math.round(Math.random()*100),
			dataType:'json',
			type:"POST",
			data:{"entityName":encodeURI(encodeURI(name)),"id":idcard,"type":1},
			success:function(res){
				if(res.errorNO!=0){
					hrHuTui.popout({type:"error",content:res.errorInfo});
				}else{
					$(".bk-searching").hide();
					hrHuTui.popout({type:"success",content:"查询成功"});
					showView(res.jsonResult);
				}
			}
		});
	}
});

$("#bk-btn-checkRN").live("click",function(){
	var name = $("#nameipt").val();
	var idcard = $("#idcardipt").val();
	var flag = checkData(name,idcard);
	if(flag==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url:appServer+"/bops/bkcheck/check.htm?t="+Math.round(Math.random()*100),
			dataType:'json',
			type:"POST",
			data:{"entityName":encodeURI(encodeURI(name)),"id":idcard,"type":2},
			success:function(res){
				if(res.errorNO!=0){
					hrHuTui.popout({type:"error",content:res.errorInfo});
				}else{
					$(".bk-searching").hide();
					hrHuTui.popout({type:"success",content:"查询成功"});
					showView(res.jsonResult);
				}
			}
		});
	}
});

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
});
var cList;
var uList;
var fList;
function showView(resStr){
	var bkobj = JSON.parse(resStr);
	ss = bkobj;
	cList = bkobj.cList;
	uList = bkobj.uList;
	fList = bkobj.fList;
	$("#bk-info-name").text(bkobj.entityName);
	$("#bk-info-id").text(bkobj.entityId);
	if(bkobj.gender==1){
		$("#bk-info-gender").text("男");
	}else if(bkobj.gender== 0){
		$("#bk-info-gender").text("女");
	}
	$("#bk-info-birthcity").text(bkobj.birthCity);
	$("#lastest").text(bkobj.modifyTime);
	if(bkobj.schoolName!=""){
		$("#bk-edu-schname").text(bkobj.schoolName);
		$("#bk-edu-major").text(bkobj.major);
		$("#bk-edu-edu").text(bkobj.education);
		$("#bk-edu-edutype").text(bkobj.educationType);
		$("#bk-edu-enroll").text(bkobj.enrollDate);
		$("#bk-edu-grad").text(bkobj.graduateDate);
		$("#bk-edu-status").text(bkobj.educationStatus);
		$(".bk-education").show();
		$(".bk-noeducation").hide();
	}else{
		$(".bk-education").hide();
		$(".bk-noeducation").show();
	}
	
	
	if(cList.length!=0){
		$(".tb-ccontent").remove();
		for(var i=0;i<cList.length;i++){
			$(".bk-courtexecute tbody").append(
					'<tr class="tb-ccontent">'+
			'<td>'+cList[i].regDate+'</td>'+
			'<td>'+cList[i].caseId+'</td>'+
            '<td>'+cList[i].execCourtName+'</td>'+
			'<td>'+cList[i].execMoney+'</td>'+
			'<td>'+cList[i].caseState+'</td></tr>'
		);
		}
	}else{
		$(".tb-ccontent").remove();
		$(".bk-courtexecute tbody").append('<tr class="tb-ccontent"><td colspan="5">无记录</td></tr>');
	}
	
	if(uList.length!=0){
		$(".tb-ucontent").remove();
		for(var i=0;i<uList.length;i++){
			$(".bk-unhonest tbody").append(
					'<tr class="tb-ucontent">'+
			'<td>'+uList[i].regDate+'</td>'+
			'<td>'+uList[i].caseId+'</td>'+
            '<td>'+uList[i].execCourtName+'</td>'+
            '<td>'+uList[i].performance+'</td>'+
			'<td><div style="height: 29px;word-break: keep-all;overflow: hidden;text-overflow: ellipsis;">'+uList[i].duty+'</div></td>'+
			'<td><a onclick="checkUhDetail('+i+')" href="javascript:void(0)">查看详情</a></td></tr>'
		);
		}
	}else{
		$(".tb-ucontent").remove();
		$(".bk-unhonest tbody").append('<tr class="tb-ucontent"><td colspan="6">无记录</td></tr>');
	}
	
	if(fList.length!=0){
		$(".tb-fcontent").remove();
		for(var i=0;i<fList.length;i++){
			$(".bk-finblack tbody").append(
					'<tr class="tb-fcontent">'+
			'<td>'+fList[i].area+'</td>'+
			'<td>'+fList[i].loanDate+'</td>'+
            '<td>'+fList[i].money+'</td>'+
            '<td>'+fList[i].thisMoney+'</td>'+
			'</tr>'
		);
		}
	}else{
		$(".tb-fcontent").remove();
		$(".bk-finblack tbody").append('<tr class="tb-fcontent"><td colspan="4">无记录</td></tr>');
	}
	$(".bk-result").show();
}

var res;

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