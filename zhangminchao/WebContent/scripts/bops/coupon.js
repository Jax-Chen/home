$(document).ready(function() {
	
	$(".back").on("click",function(){
		window.close();
	});
	
	$(".bt_add").on("click",function(){
		window.open (appServer + "/bops/coupon/addcoupon.htm", '添加优惠券', 'height=500,width=600', 'location=no');
	});
	
	$("#type").change(function(){
		if($(this).val()==0){
			$(".dis").show();
			$("#dw").text("元");
		}else if($(this).val()==1){
			$(".dis").show();
			$("#dw").text("%");
		}else if($(this).val()==2){
			$(".dis").hide();
			$("#dw").text("");
		}
	});
	
	
	$("#distype").change(function(){
		
		if($(this).val()!=""){
			$.ajax({
				url:appServer+"/bops/coupon/findmenu.htm",
				type:"POST",
				data:{"type":$("#distype").val()},
				success:function(res){
					if(res.meta.success){
						if($("#distype").val()==0 || $("#distype").val() == 20 || $("#distype").val() == 10){
							$("#dismenu").empty().append("<option value=''>请选择</opiton>");
							var obj = res.retObj;
							for(var i=0;i<obj.length;i++){
								if(obj[i].status == 0) {
									$("#dismenu").append("<option value='"+obj[i].id+"'>"+obj[i].name+"</option>");
								 }
							}
						}else if($("#distype").val()==1){
							$("#dismenu").empty().append("<option value=''>请选择</opiton>");
							var obj = res.retObj;
							for(var i=0;i<obj.length;i++){
								$("#dismenu").append("<option value='"+obj[i].id+"'>"+obj[i].surveyProject+"</option>");
							}
						}
					}
				}
			});
		}else{
			$("#dismenu").empty().append("<option value=''>请选择</opiton>");
		}
		
	});
	
	
	$("#sub").on("click",function(){
		var type = $("#type").val();
		var discount = $(".discount").val();
		var distype = $("#distype").val();
		var dismenu = $("#dismenu").val();
		var needmoney = $("#needmoney").val();
		var mark = $("#mark").val();
		var validtime = $("#validtime").val();
		
		if(type!=""){
			if(type==0){
				if(discount==""||!validate(discount)){
					alert("请输入优惠金额！");
					return;
				}
				
				if(distype!=""){
					if(dismenu==""){
						alert("请选择优惠项目！");
						return;
					}
				}
			}
			
			if(type==1){
				if(discount==""||(!validate(discount)||discount<0||discount>100)){
					alert("请输入优惠额度！");
					return;
				}
				
				if(distype!=""){
					if(dismenu==""){
						alert("请选择优惠项目！");
						return;
					}
				}
			}
			
			if(type==2){
				if(distype==""||dismenu==""){
					alert("请选择优惠项目");
					return;
				}
			}
			
			if(needmoney!=""&&!validate(needmoney)){
				alert("请输入正确的订单所需金额！");
				return;
			}
			
			$.ajax({
				url:appServer+"/bops/coupon/addcoupon.htm",
				type:"POST",
				data:{"type":type,"discount":discount,"distype":distype,"dismenu":dismenu,"needmoney":needmoney,"mark":mark},
				success:function(res){
					if(res.meta.success){
						alert("添加成功！");
						window.close();
					}else{
						alert("添加失败！");
						return;
					}
				}
			});
			
		}else{
			alert("请选择优惠券类型！");
			return;
		}
		
	});
	
	$("#save").on("click",function(){
		var type = $("#type").val();
		var discount = $(".discount").val();
		var distype = $("#distype").val();
		var dismenu = $("#dismenu").val();
		var needmoney = $("#needmoney").val();
		var mark = $("#mark").val();
		var validtime = $("#validtime").val();
		var id = $("#cid").val();
		
		if(type!=""){
			if(type==0){
				if(discount==""||!validate(discount)){
					alert("请输入优惠金额！");
					return;
				}
				
				if(distype!=""){
					if(dismenu==""){
						alert("请选择优惠项目！");
						return;
					}
				}
			}
			
			if(type==1){
				if(discount==""||(!validate(discount)||discount<0||discount>100)){
					alert("请输入优惠额度！");
					return;
				}
				
				if(distype!=""){
					if(dismenu==""){
						alert("请选择优惠项目！");
						return;
					}
				}
			}
			
			if(type==2){
				if(distype==""||dismenu==""){
					alert("请选择优惠项目");
					return;
				}
			}
			
			if(needmoney!=""&&!validate(needmoney)){
				alert("请输入正确的订单所需金额！");
				return;
			}
			
			
			
			$.ajax({
				url:appServer+"/bops/coupon/editcoupon.htm",
				type:"POST",
				data:{"id":id,"type":type,"discount":discount,"distype":distype,"dismenu":dismenu,"needmoney":needmoney,"mark":mark},
				success:function(res){
					if(res.meta.success){
						alert("修改成功！");
						window.close();
					}else{
						alert("添加失败！");
						return;
					}
				}
			});
			
		}else{
			alert("请选择优惠券类型！");
			return;
		}
	});
	
});

function validate(num)
{
  var reg = /^\d+(?=\.{0,1}\d+$|$)/;
  if(reg.test(num)) return true;
  return false;  
}

function validateIsNum(num){
	var reg = /^[0-9]*[1-9][0-9]*$/;
	if(reg.test(num)) return true;
	return false;
}

function del(id){
	if(confirm("确定删除该优惠券？")){
		$.ajax({
			url:appServer+"/bops/coupon/deletecoupon.htm",
			type:"POST",
			data:{"id":id},
			success:function(res){
				if(res.meta.success){
					alert("删除成功！");
					location.reload();
				}else{
					alert("操作失败！")
				}
			},
			error:function(xhr){
				alert("网络连接错误！");
			}
		});
	}else{
		return;
	}
}



function edit(id){
	window.open (appServer+"/bops/coupon/editcoupon.htm?id="+id, '修改优惠券', 'height=500,width=600', 'location=no');
}

function send(id){
	var str = "<table style='width:60%;margin-left:auto;margin-right:auto;'>"+
					"<tr><th width='40%'><span style='color:red'>*</span>用户手机号：</th><td width='80%'><input id='userMobile' style='float:left'></td></tr>"+
					"<tr><th width='40%'><span style='color:red'>*</span>发放数量：</th><td width='60%'><input id='sendCount' style='float:left'></td></tr>"+
					"<tr><th width='40%'>来源：</th><td width='60%'><input id='fromSource' style='float:left'></td></tr>"+
					"<tr><th width='40%'>有效期：</th><td width='60%'><div style='float: left;'>从</div><input id='fromDate' style='float:left;width: 39%;' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'><div style='float: left;'>至</div><input id='toDate' style='float:left;width: 39%;' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'></td></tr>"+
				"</table>";
	hrHuTui.popout({
		title:"发送优惠券",
		width:500,
		content:str,
		onOk:function(callback){
			var um = $("#userMobile").val();
			var sc = $("#sendCount").val();
			var fs = $("#fromSource").val();
			var fd = $("#fromDate").val();
			var td = $("#toDate").val();
			
			if(um==""||sc==""){
				alert("用户手机号或发放数量不能为空！");
				return false;
			}
			
			if(!validateIsNum(sc)){
				alert("请输入正确的发放数量！");
				return false;
			}
			
			if(fd!=""&&td!=""&&fd>td){
				alert("开始时间不能大于结束时间！");
				return false;
			}
			
			$.ajax({
				url:appServer+"/bops/coupon/sendcoupon.htm",
				type:"POST",
				data:{"id":id,"userMobile":um,"sendCount":sc,"fromSource":fs,"fromDate":fd,"toDate":td},
				success:function(res){
					if(res.meta.success){
						alert("发送成功！");
						return true;
					}else{
						alert(res.meta.errorInfo);
						return false;
					}
				},
				error:function(xhr){
					alert("网络连接错误！");
					return true;
				}
			});
		}
	});
}