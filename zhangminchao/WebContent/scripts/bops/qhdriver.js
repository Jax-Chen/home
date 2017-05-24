$(function(){
	
	$("#bk-btn-ok").on("click",function(){
		var type = 1;
		var name = $("#nameipt").val();
		var cardNum = $("#idcardipt").val();
		var orderCode = $("#ordeript").val();
		var vts = $("#validtimestart").val();
		var vte = $("#validtimeend").val();
		
		$(".bk-result").hide();
		
		if(type=="" || name=="" || cardNum=="" || orderCode==""){
			alert("请输入正确的查询信息！");
			return;
		}
		
		$.ajax({
			url:appServer+"/bops/bkcheck/qhdrivercheck.htm",
			type:"POST",
			data:{"cardNum":cardNum, "type":type, "name":name, "orderCode":orderCode, "vts":vts, "vte":vte},
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					var resObj = res.retObj;
					if(resObj.status=="2"){
						alert("信息还在查询中，请等待几分钟再次查询！")
					}else{
						if(type==0){
							$("#qh-driver-name").text(name);
							$("#qh-driver-cardnum").text(cardNum);
							
							
							
							if(resObj.chkDriverNo==1){
								$("#qh-driver-cardnum-res").text("存在");
								if(resObj.chkName==1){
									$("#qh-driver-name-res").text("一致");
								}else{
									$("#qh-driver-name-res").text("不一致");
								}
							}else{
								$("#qh-driver-cardnum-res").text("不存在");
								$("#qh-driver-name-res").text("驾驶证不存在，无法比对");
							}
						
						
							$(".bk-driverinfo").show();
							$(".bk-status").hide();
							$(".bk-result").show();
						}else if(type==1){
							$("#qh-status-name").text(name);
							$("#qh-status-cardnum").text(cardNum);
							
							if(resObj.chkDriverNo==1){
								$("#qh-status-cardnum-res").text("存在");
								if(resObj.chkName==1){
									$("#qh-status-name-res").text("一致");
								}else{
									$("#qh-status-name-res").text("不一致");
								}
							}else{
								$("#qh-status-cardnum-res").text("不存在");
								$("#qh-status-name-res").text("驾驶证不存在，无法比对");
							}
							
							if(resObj.chkValidDateStart==1){
								$("#qh-valid-start").text("一致");
							}else{
								$("#qh-valid-start").text("不一致");
							}
							
							if(resObj.chkValidDateEnd==1){
								$("#qh-valid-end").text("一致");
							}else{
								$("#qh-valid-end").text("不一致");
							}
							
							if(resObj.chkStatus=="A"){
								$("#qh-status-status").text("正常");
							}else if(resObj.chkStatus=="B"){
								$("#qh-status-status").text("超分");
							}else if(resObj.chkStatus=="C"){
								$("#qh-status-status").text("转出");
							}else if(resObj.chkStatus=="D"){
								$("#qh-status-status").text("暂扣");
							}else if(resObj.chkStatus=="E"){
								$("#qh-status-status").text("撤销");
							}else if(resObj.chkStatus=="F"){
								$("#qh-status-status").text("吊销");
							}else if(resObj.chkStatus=="G"){
								$("#qh-status-status").text("注销");
							}else if(resObj.chkStatus=="H"){
								$("#qh-status-status").text("违法未处理");
							}else if(resObj.chkStatus=="I"){
								$("#qh-status-status").text("事故未处理");
							}else if(resObj.chkStatus=="J"){
								$("#qh-status-status").text("停止使用");
							}else if(resObj.chkStatus=="K"){
								$("#qh-status-status").text("协查");
							}else if(resObj.chkStatus=="L"){
								$("#qh-status-status").text("锁定");
							}else if(resObj.chkStatus=="M"){
								$("#qh-status-status").text("逾期未验证");
							}else if(resObj.chkStatus=="N"){
								$("#qh-status-status").text("延期换证");
							}else if(resObj.chkStatus=="P"){
								$("#qh-status-status").text("延期体检");
							}else if(resObj.chkStatus=="R"){
								$("#qh-status-status").text("逾期未体检");
							}else if(resObj.chkStatus=="S"){
								$("#qh-status-status").text("逾期未审");
							}else if(resObj.chkStatus=="U"){
								$("#qh-status-status").text("扣留");
							}else if(resObj.chkStatus=="Z"){
								$("#qh-status-status").text("其他");
							}else{
								$("#qh-status-status").text("无结果");
							}
							
							
							
							$(".bk-driverinfo").hide();
							$(".bk-status").show();
							$(".bk-result").show();
						}
					}
				}else{
					alert(res.meta.errorInfo);
				}
			},
			error:function(xhr){
				$(".loadframe").hide();
				alert("网络错误！");
			}
		});
		
	});
	
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$(".bk-result").hide();
	});
	
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
