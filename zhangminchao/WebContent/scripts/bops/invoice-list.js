$(document).ready(function() {

	
	$(".cancleOper").on("click", function(){
		var obj = $(this), invoiceId = obj.attr("data-code");
		window.location.href = appServer + '/bops/invoice/cancle.htm?invoiceId='+invoiceId;
	})
		
	$(".signedOper").on("click", function(){
		var obj = $(this), invoiceId = obj.attr("data-code");
		window.location.href = appServer + '/bops/invoice/signed.htm?invoiceId='+invoiceId;
	})

	$(".resendOper,.sendOper").on("click", function(){
		var obj = $(this), invoiceId = obj.attr("data-code");
		window.location.href = appServer + '/bops/invoice/send.htm?invoiceId='+invoiceId;
	})

	$(".invoiceSendBtn").on("click", function(){
		var tmp = $("#expressCompany").val();
		if (!tmp) {
			alert("快递公司不能为空");
			return false;
		}
		
		tmp = $("#expressNumber").val();
		if (!tmp) {
			alert("快递单号不能为空");
			return false;
		}
		
		tmp = $("#sendOutTime").val();
		if (!tmp) {
			alert("寄出时间不能为空");
			return false;
		}
		
		$("#myForm").submit();
	})
	
	$(".viewOper").on("click", function(){
		var obj = $(this), invoiceId = obj.attr("data-code");
		var url =  appServer+"/bops/invoice/view.htm?invoiceId="+invoiceId;
	    window.open(url,"_blank");
		return false;
	});
	
	
});