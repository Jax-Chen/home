$(function(){
	
	$("#bk-btn-ok").on("click",function(){

		var name = $("#nameipt").val();
		var cardNum = $("#idcardipt").val();
		var mobile = $("#mobileipt").val();
		var orderCode = $("#ordeript").val();
		
		$(".bk-result").hide();
		
		if(name=="" || cardNum=="" || mobile=="" || orderCode==""){
			alert("请输入正确的查询信息！");
			return;
		}
		
		$.ajax({
			url:"/bops/bkcheck/qhmobile.htm",
			type:"POST",
			data:{"cardNum":cardNum, "mobile":mobile, "name":name, "orderCode":orderCode},
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					var resObj = res.retObj;
					
						if(resObj.isOwnerMobileII==0){
							$("#qh-mobile-ver-res").text("手机号、证件号、姓名均一致");
						}else if(resObj.isOwnerMobileII==1){
							$("#qh-mobile-ver-res").text("手机号和证件号一致，姓名不一致");
						}else if(resObj.isOwnerMobileII==2){
							$("#qh-mobile-ver-res").text("手机号和证件号一致，姓名不做比对");
						}else if(resObj.isOwnerMobileII==3){
							$("#qh-mobile-ver-res").text("手机号一致，证件号不一致，姓名不做比对");
						}else if(resObj.isOwnerMobileII==9){
							$("#qh-mobile-ver-res").text("库中无数据");
						}
						
						if(resObj.ownerMobileStatusII==1){
							$("#qh-mobile-status-res").text("正常");
						}else if(resObj.ownerMobileStatusII==2){
							$("#qh-mobile-status-res").text("停机");
						}else if(resObj.ownerMobileStatusII==3){
							$("#qh-mobile-status-res").text("不可用");
						}else if(resObj.ownerMobileStatusII==4){
							$("#qh-mobile-status-res").text("已销号");
						}else if(resObj.ownerMobileStatusII==5){
							$("#qh-mobile-status-res").text("不明确");
						}
						
							$(".bk-driverinfo").show();
							$(".bk-result").show();
						
					
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
		$("#mobileipt").val("");
		$("#ordeript").val("");
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
