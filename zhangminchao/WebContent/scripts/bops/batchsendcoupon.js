$(document).ready(function(){

	$("input:radio[name='sendType']").click(function(){
		if (this.value == 1) { // 特定对象
			$("#mobSendTr").show();
			$("#batchSendTr").hide();
			$("input:checkbox[name='batchSendTarget']").each(function(e){
			   this.checked = false;
			});
		} else { // 目录
			$("#mobSendTr").hide();
			$("#batchSendTr").show();
			$("#mobSendTr").val("");
		}
	});
	
   $(".massMailing").click(function(e){
      var sendType = $("input:radio[name='sendType']:checked").val();
	  if (!sendType) {
	     alert("请选择发送类型");
		 return false;
	  }
	  var mailAdrrs,arr = [];
	  if (1 == sendType) { // 特定对象
	     mailAdrrs = $("#mailAddrs").val();
		 if (!mailAdrrs) {
		    alert("手机不能为空");
			return false;
		 }
	  } else {
	     $("input:checkbox[name='batchSendTarget']:checked").each(function(e){
		   arr.push(this.value);
		 });
		 if (arr.length <= 0) {
		    alert("请选择批量发送对象");
			return false;
		 }
	  }
	  
	  var coupon = $("#couponsel").val();
	  if(!coupon){
		  alert("请选择优惠券");
		  return false;
	  }
	  
	  var count = $("#sendcount").val();
	  if(isNaN(count)){
		  alert("请输入数量！");
		  return false;
	  }
	  
	  var fromtime = $("#fromtime").val();
	  var totime = $("#totime").val();
	  if(fromtime!=null && totime!=null && fromtime>totime){
		  alert("失效日期不可小于生效日期！");
		  return false;
	  }

	  var btn = $(this);
	  btn.prop("disabled", true);
	  jQuery.ajax({
			async : true, 
			url : appServer + "/bops/coupon/batchsendcoupon.htm",
			type : 'post',
			dataType : 'json',     
			data : {"sendType":sendType,"source":$("#source").val(),"mailAdrrs":mailAdrrs,"arr":arr,"coupon":coupon,"count":count,"fromtime":fromtime,"totime":totime},
			success : function(res) {
				if(res.meta.success){
					alert(res.retObj);
				}else{
					alert(res.meta.errorInfo);
				}
				 
				btn.prop("disabled", false);
			},                
			error : function(xhr) {
				alert("请求出错");
			}
		});
   });
});