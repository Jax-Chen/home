$(document).ready(function() {
	
	$(".orderItemDel").on("click", function() {
		var self = $(this);
		var orderid = self.attr("data-orderid");
		hrHuTui.popout({
			type:"info",
			title:"删除订单",
			content:"<span style='font-size:16px;padding-left:20px;'>确定删除该订单吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/bgcheck/delete.htm",
					type:"POST",
					data:{"orderid":orderid},
					success:function(res){
						if (res.meta.success) {
							alert("删除成功！");
							self.closest("tr").remove();
							return true;
						}else{
							alert(res.meta.errorInfo);
							return false;
						}
					},
					error:function(xhr){
						alert("服务器连接失败！");
						return false;
					}
				});
			}
		});
	});
	
	$(".orderItemCancle").on("click", function() {
		var self = $(this);
		var orderid = self.attr("data-orderid");
		var code = self.parent().siblings(".orderCode").text();
		var status = self.parent().siblings(".orderStatus").text();
		var org = self.parent().siblings(".originPrice").text();
		var balance = self.parent().siblings(".balanceMoney").text().trim().replace("-", "");
		var discount = self.parent().siblings(".discountMoney").text().trim().replace(/-[支付宝微信未]*/g, "");
		var monthMoney = self.parent().siblings(".monthMoney").text().trim().replace("-", "");
		var m = 0;
		if(monthMoney != ""){
			m = "月结";
		}else{
			m = parseFloat(balance==""?0:balance) + parseFloat(discount==""?0:discount);
		}
		
		var ctt = "<div style='width:80%;margin:20px auto;'>" +
				"<div>订单编号："+ code +"</div>" +
				"<div>订单状态："+ status +"</div>"+
				"<div>订单金额："+ org +"</div>"+
				"<div>实际支付："+ m +"</div>"+
				"<div style='margin:10px auto;'>" +
				"<div><span style='font-size:14px;color:#000'>取消该订单，请确认原因:</span></div>"+
				"<div style='margin-top:10px;'><textarea id='cancelReason' style='width:100%;height:80px;'></textarea></div></div>";
		
		if(m!=0 && m != "月结"){
			ctt += "<div style='margin:10px auto;'><div><span style='font-size:14px;color:#000'>请确认退款金额: <a href='javascript:;' id='cancelAllMoney' data='"+ m +"'>全部</a></span></div>"+
			"<div style='margin-top:10px;'><input id='cancelMoney' style='width:150px;height:32px;'/></div>" +
			"<div style='margin-top:10px;'>确认取消后，款项将被退回至用户的账户余额</div>"+
			"</div>";
		}
				ctt += "<div><input type='checkbox' name='emailNotice' id='emailNotice'> 邮件通知用户</div>"+
				"<div><input type='checkbox' name='smsNotice' id='smsNotice'> 短信通知用户</div>"+
				"</div>";
		
		layer.open({
		            type:1,
		            title:'取消订单',
		            btn:['确定', '取消'],
		            area:['400px', '500px'],
		            content:ctt,
		            yes:function(index){
		                var reason = $("#cancelReason").val();
		                var cm = $("#cancelMoney").val();
		                var emailNotice = $("#emailNotice").attr("checked")=="checked"?1:0;
		                var smsNotice = $("#smsNotice").attr("checked")=="checked"?1:0;
		                
		                if(reason == ""){
		                	layer.msg("请输入取消原因");
		                	return;
		                }		
		                
		                if(m != "月结" && cm>m){
		                	layer.msg("退款金额不能大于付款金额");
		                	return;
		                }
		                
		                $.ajax({
							url:appServer + "/bops/bgcheck/cancle.htm",
							type:"POST",
							data:{"orderid":orderid, "cancelReason":reason, "cancelMoney":cm, "emailNotice":emailNotice, "smsNotice":smsNotice},
							success:function(res){
								if (res.meta.success) {
									layer.msg("取消订单成功！");
									self.closest("tr").remove();
									layer.close(index);
								}else{
									layer.alert(res.meta.errorInfo);
									return false;
								}
							},
							error:function(xhr){
								layer.msg("服务器连接失败！");
								return false;
							}
						});
		            }
		        });  
		
	});
	
	$("#cancelAllMoney").live("click", function(){
		var d = $(this).attr("data");
		$("#cancelMoney").val(d);
	});

	//excel表格导出
	$(".bt_add").live("click", function(){
		var param = $(this).attr("param");
		if(param=="y"){
			var d = new Date();
			d.setDate(1);
			var from = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate());
			
			
			var date=new Date();
			var currentMonth=date.getMonth();
			var nextMonth=++currentMonth;
			var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
			var oneDay=1000*60*60*24;
			var endDate = new Date(nextMonthFirstDay-oneDay);
			var end = endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+(endDate.getDate());
			
			$("#y-searchFromTime").val(from);
			$("#y-searchEndTime").val(end);
		}else if(param=="t"){
			var d = new Date();
			var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
			$("#t-searchFromTime").val(str);
			$("#t-searchEndTime").val(str);
		}else{
			$("#h-userName").val($("#s-userName").val());
			$("#h-companyName").val($("#s-companyName").val());
			$("#h-mobile").val($("#s-mobile").val());
			$("#h-email").val($("#s-email").val());
			if($("#s-menuName option:selected").text()=="请选择"){
				$("#h-menuName").val("");				
			}else{
				$("#h-menuName").val($("#s-menuName option:selected").text());
			}
			$("#h-orderCode").val($("#s-orderCode").val());
			$("#h-isUseCoupon").val($("#s-isUseCoupon").val());
			$("#h-orderStatus").val($("#s-orderStatus").val());
			$("#h-from").val($("#s-from").val());
			$("#h-isPaied").val($("#s-isPaied").val());
			$("#h-searchFromTime").val($("#s-searchFromTime").val());
			$("#h-searchEndTime").val($("#s-searchEndTime").val());
			$("#h-paymethod").val($("#s-paymethod").val());
			$("#h-auditStatus").val($("#s-auditStatus").val());
			$("#h-reportSearchFromTime").val($("#s-reportSearchFromTime").val());
			$("#h-reportSearchEndTime").val($("#s-reportSearchEndTime").val());
		}
		
		layer.alert('确定导出？', {icon:3,btn:['确定','取消']}, function(index){
			if(param=="y"){
				$("#yForm").submit();
			}else if(param=="t"){
				$("#tForm").submit();
			}else{
				$("#hidenForm").submit();
			}
			layer.closeAll();
		});
	});
	
	$(".orderprocess").on("click", function(){
	    $this = $(this);
	    var id = $this.attr("data-id");
	    $.ajax({
	        url: appServer + "/bops/bgcheck/orderprocess.htm",
	        type: "GET",
	        data: {"id": id},
	        success:function(res){
	            if(res.meta.success){
	                var obj = res.retObj;
	                var ctt = "";
	                for(var i=0; i<obj.length; i++){
	                    ctt += "<p style='margin:10px auto;'>"+ obj[i].processName +"<span style='padding-left:20px;'>"+ (obj[i].time==null?"进行中":obj[i].time) +"</span></p>"
	                }
	                layer.tips(ctt, $this.parent("td"), {
                        tips: [4, '#4898d5'],
                        area: ['300px'],
                        time: 5000
                      });
	            }else{
	                layer.tips('无数据', $this.parent("td"), {
	                    tips: [4, '#4898d5']
	                  });
	            }
	        }
	    });
	    
	});
	
});
