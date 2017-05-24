$("#bk-btn-ok").live("click", function() {	
	var idcard = $("#idcardipt").val();
	if(checkIdCard(idcard)==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url:appServer+"/bops/bkcheck/checkinterest.htm?t="+Math.round(Math.random()*100),
			dataType:'json',
			type:"POST",
			data:{"id":idcard},
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
	var idcard = $("#idcardipt").val();
	if(checkIdCard(idcard)==1){
		$(".bk-searching").show();
		$(".bk-result").hide();
		$.ajax({
			url:appServer+"/bops/bkcheck/checkinterestRN.htm?t="+Math.round(Math.random()*100),
			dataType:'json',
			type:"POST",
			data:{"id":idcard},
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

$("#bk-btn-reset").live("click", function() {
	$("#idcardipt").val("");
});

function checkIdCard(idcard){
	if(!br){
		hrHuTui.popout({type:"info",content:"求你了，别用低版本的IE了，请使用IE8及以上版本的浏览器。推荐使用Google Chrome！"});
		return;
	}
	
	var flag=1;
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
var pList;
var sList;
var fList;
function showView(resStr){
	var bkobj = JSON.parse(resStr);
	ss = bkobj;
	pList = bkobj.ryPosPerInfoList;
	sList = bkobj.ryPosShaInfoList;
	fList = bkobj.ryPosFrInfoList;
	
	$("#lastest").text(bkobj.date);
	
	if(pList.length!=0){
		$(".tb-pcontent").remove();
		for(var i=0;i<pList.length;i++){
			$(".bk-perinfo tbody").append(
					'<tr class="tb-pcontent">'+
			'<td>'+pList[i].ryName+'</td>'+
			'<td>'+pList[i].entName+'</td>'+
            '<td>'+pList[i].regNo+'</td>'+
			'<td>'+pList[i].entType+'</td>'+
			'<td>'+pList[i].regCap+'</td>'+
			'<td>'+pList[i].regCapCur+'</td>'+
			'<td>'+pList[i].entStatus+'</td>'+
			'<td>'+pList[i].position+'</td>'+
			'<td><a href="javascript:void(0)" id="checkf" onclick="checkPDetail('+i+')">查看</a></td>'+
			+'</tr>'
		);
		}
	}else{
		$(".tb-pcontent").remove();
		$(".bk-perinfo tbody").append('<tr class="tb-pcontent"><td colspan="9">无记录</td></tr>');
	}
	
	if(sList.length!=0){
		$(".tb-scontent").remove();
		for(var i=0;i<sList.length;i++){
			$(".bk-shainfo tbody").append(
					'<tr class="tb-scontent">'+
			'<td>'+sList[i].ryName+'</td>'+
			'<td>'+sList[i].entName+'</td>'+
            '<td>'+sList[i].regNo+'</td>'+
            '<td>'+sList[i].entType+'</td>'+
            '<td>'+sList[i].regCap+'</td>'+
            '<td>'+sList[i].regCapCur+'</td>'+
            '<td>'+sList[i].entStatus+'</td>'+
            '<td>'+sList[i].subConAmt+'</td>'+
            '<td>'+sList[i].currebcy+'</td>'+
            '<td><a href="javascript:void(0)" id="checkf" onclick="checkSDetail('+i+')">查看</a></td>'+
			'</tr>'
		);
		}
	}else{
		$(".tb-scontent").remove();
		$(".bk-shainfo tbody").append('<tr class="tb-scontent"><td colspan="10">无记录</td></tr>');
	}
	
	if(fList.length!=0){
		$(".tb-fcontent").remove();
		for(var i=0;i<fList.length;i++){
			$(".bk-frinfo tbody").append(
					'<tr class="tb-fcontent">'+
			'<td>'+fList[i].ryName+'</td>'+
			'<td>'+fList[i].entName+'</td>'+
            '<td>'+fList[i].regNo+'</td>'+
            '<td>'+fList[i].entType+'</td>'+
            '<td>'+fList[i].regCap+'</td>'+
            '<td>'+fList[i].regCapCur+'</td>'+
            '<td>'+fList[i].entStatus+'</td>'+
            '<td><a href="javascript:void(0)" id="checkf" onclick="checkFDetail('+i+')">查看</a></td>'+
			'</tr>'
		);
		}
	}else{
		$(".tb-fcontent").remove();
		$(".bk-frinfo tbody").append('<tr class="tb-fcontent"><td colspan="8">无记录</td></tr>');
	}
	$(".bk-result").show();
}

function checkSDetail(i){
	hrHuTui.popout({
		title:"企业股东",
		width:615,
		height:420,
		content:"<table class='courtdetail' style='border-collapse: collapse;'>" +
				"<tr><td class='bk-gray'>查询人姓名</td><td><div>"+sList[i].ryName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业名称</td><td><div>"+sList[i].entName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册号</td><td><div>"+sList[i].regNo+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业类型</td><td><div>"+sList[i].entType+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本(万元)</td><td><div>"+sList[i].regCap+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本币种</td><td><div>"+sList[i].regCapCur+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业状态</td><td><div>"+sList[i].entStatus+"</div></td></tr>" +
				"<tr><td class='bk-gray'>认缴出资额(万元)</td><td><div>"+sList[i].subConAmt+"</div></td></tr>" +
				"<tr><td class='bk-gray'>认缴出资币种</td><td><div>"+sList[i].currebcy+"</div></td></tr>" +
				"</table>"
	});
}

function checkPDetail(i){
	hrHuTui.popout({
		title:"企业主要管理人员",
		width:615,
		height:420,
		content:"<table class='courtdetail' style='border-collapse: collapse;'>" +
				"<tr><td class='bk-gray'>查询人姓名</td><td><div>"+pList[i].ryName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业名称</td><td><div>"+pList[i].entName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册号</td><td><div>"+pList[i].regNo+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业类型</td><td><div>"+pList[i].entType+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本(万元)</td><td><div>"+pList[i].regCap+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本币种</td><td><div>"+pList[i].regCapCur+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业状态</td><td><div>"+pList[i].entStatus+"</div></td></tr>" +
				"<tr><td class='bk-gray'>职务</td><td><div>"+pList[i].position+"</div></td></tr>" +
				"</table>"
	});
}

function checkFDetail(i){
	hrHuTui.popout({
		title:"企业法定代表人",
		width:615,
		height:420,
		content:"<table class='courtdetail' style='border-collapse: collapse;'>" +
				"<tr><td class='bk-gray'>查询人姓名</td><td><div>"+fList[i].ryName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业名称</td><td><div>"+fList[i].entName+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册号</td><td><div>"+fList[i].regNo+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业类型</td><td><div>"+fList[i].entType+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本(万元)</td><td><div>"+fList[i].regCap+"</div></td></tr>" +
				"<tr><td class='bk-gray'>注册资本币种</td><td><div>"+fList[i].regCapCur+"</div></td></tr>" +
				"<tr><td class='bk-gray'>企业状态</td><td><div>"+fList[i].entStatus+"</div></td></tr>" +
				"</table>"
	});
}