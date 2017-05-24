$(function(){
	$("#bk-btn-ok").on("click",function(){
		var name = $("#nameipt").val();
		var id = $("#idcardipt").val();
		var orderCode = $("#ordeript").val();
		
		if(id=="" || name=="" || orderCode==""){
			alert("请填写身份证号,姓名,订单编号！");
			return;
		}
		
		$.ajax({
			url:appServer+"/bops/bkcheck/qhrisk.htm",
			type:"POST",
			data:{"name":name, "id":id, "orderCode":orderCode},
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					var obj = res.retObj;
					
					if(obj.sourceId=="A"){
						$("#bk-risk-sourceId").text("信贷逾期风险");
					}else if(obj.rskScore=="B"){
						$("#bk-risk-sourceId").text("行政负面风险");
					}else if(obj.rskScore=="C"){
						$("#bk-risk-sourceId").text("欺诈风险");
					}else if(obj.rskScore=="99"){
						$("#bk-risk-sourceId").text("权限不足");
					}
					if(obj.rskScore!="-1"){
						$("#bk-risk-rskScore").text(obj.rskScore);
					}else{
						$("#bk-risk-rskScore").text("权限不足");
					}
					
					if(obj.rskMark=="B2"){
						$("#bk-risk-rskMark").text("被执行人");
					}else if(obj.rskMark=="B1"){
						$("#bk-risk-rskMark").text("失信被执行人");
					}else if(obj.rskMark=="B3"){
						$("#bk-risk-rskMark").text("交通严重违章");
					}else if(obj.rskMark=="C1"){
						$("#bk-risk-rskMark").text("手机号存在欺诈风险");
					}else if(obj.rskMark=="C2"){
						$("#bk-risk-rskMark").text("卡号存在欺诈风险");
					}else if(obj.rskMark=="C3"){
						$("#bk-risk-rskMark").text("身份证号存在欺诈风险");
					}else if(obj.rskMark=="C4"){
						$("#bk-risk-rskMark").text("IP存在欺诈风险");
					}else if(obj.rskMark=="99"){
						$("#bk-risk-rskMark").text("权限不足");
					}
					
					if(obj.dataBuildTime!="99"){
						$("#bk-risk-dataBuildTime").text(obj.dataBuildTime);
					}else{
						$("#bk-risk-dataBuildTime").text("权限不足");
					}
					
					if(obj.dataStatus=="1"){
						$("#bk-risk-dataStatus").text("已验证");
					}else if(obj.dataStatus=="2"){
						$("#bk-risk-dataStatus").text("未验证");
					}else if(obj.dataStatus=="3"){
						$("#bk-risk-dataStatus").text("异议中");
					}else if(obj.dataStatus=="99"){
						$("#bk-risk-dataStatus").text("权限不足");
					}
					
					$(".bk-result").show();
					
				}else{
					alert(res.meta.errorInfo);
					return;
				}
			},
			error:function(xhr){
				$(".loadframe").hide();
				alert("网络错误！");
				return;
			}
			
		});
	});
	
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$("#ordeript").val("");
		$(".bk-result").hide();
	});
});