$(document).ready(function(){

	$(".bt_add").on("click",function(){
		var robj;
		$.ajax({
			url:appServer+'/bops/coupon/ajaxgetcoupons.htm',
			async:false,
			type:"GET",
			success:function(res){
				if(res.meta.success){
					robj = res.retObj;
				}
			}
		});
		var str = "<table id='smaptb'>" +
				"<tr>" +
					"<th><span style='color:red;'>*</span>关联类型：</th>"+
					"<td>" +
						"<select id='typeselect'>" +
							"<option value=''>请选择</option>"+
							"<option value='0'>订单满就送</option>"+
							"<option value='1'>会员赠送</option>"+
						"</select>" +
					"</td>"+
				"</tr>"+
				"<tr>" +
					"<th><span style='color:red;'>*</span>项目类型：</th>"+
					"<td>" +
						"<select id='btypeselect'>" +
							"<option value=''>请选择</option>"+
							"<option value='10'>通用套餐</option>"+
							"<option value='20'>专属套餐</option>"+
							"<option value='1'>自定义项</option>"+
						"</select>" +
					"</td>"+
				"</tr>"+
				"<tr>" +
					"<th><span style='color:red;'>*</span>项目：</th>"+
					"<td>" +
						"<select id='bitemselect'>" +
							"<option value=''>请选择</option>"+
						"</select>" +
					"</td>"+
				"</tr>"+
				"<tr>" +
					"<th>所需金额：</th>"+
					"<td><input id='money' value=''/><span>(不填默认为0，会员赠送不填)</span></td>"+
				"</tr>"+
				"<tr>" +
					"<th><span style='color:red;'>*</span>优惠券：</th>"+
					"<td>" +
						"<select id='couponId'>" +
							"<option value=''>请选择</option>";
							if(robj!=null){
								for(var i=0;i<robj.length;i++){
									str+="<option value='"+robj[i].id+"'>"+robj[i].businessName+"-"+robj[i].name;
									if(robj[i].needCount!=null){
										str += "-满"+robj[i].needCount+"可用";
									}
									str+="</option>";
								}
							}	
						str+="</select>"+
					"</td>"+
				"</tr>"+
				"<tr>" +
					"<th>数量：</th>"+
					"<td><input id='count' value=''/>(会员赠送不填)</td>"+
				"</tr>"+
				"<tr>" +
					"<th>来源：</th>"+
					"<td><input id='source' value=''/></td>"+
				"</tr>"+
				"<tr>" +
					"<th>有效时间：</th>"+
					"<td><input id='validTime' value=''/>月</td>"+
				"<tr>"+
				"</table>";
		
		hrHuTui.popout({
			title:"新增关联",
			width:500,
			content:str,
			btn:"okcancel",
			onOk:function(callback){
				
				var type = $("#typeselect").val();
				var businessType = $("#btypeselect").val();
				var businessId = $("#bitemselect").val();
				var money = $("#money").val();
				var couponId = $("#couponId").val();
				var count = $("#count").val();
				var source = $("#source").val();
				var validTime = $("#validTime").val();
				
				if(type==""){
					alert("请选择关联类型");
					return false;
				}
				
				if(businessType==""){
					alert("请选择项目类型");
					return false;
				}
				
				if(businessId==""){
					alert("请选择项目");
					return false;
				}
				
				if(money!=""&&isNaN(money)){
					alert("请输入正确的金额");
					return false;
				}
				
				if(couponId==""){
					alert("请选择正确的优惠券");
					return false;
				}
				
				if(type==0 && (count==""||isNaN(count))){
					alert("请输入正确的数量");
					return false;
				}
				
				$.ajax({
					url:appServer+'/bops/coupon/addcouponmap.htm',
					type:'POST',
					data:{"type":type,"businessType":businessType,"businessId":businessId,"money":money,"couponId":couponId,"count":count,"source":source, "validTime":validTime},
					success:function(res){
						if(res.meta.success){
							alert("添加成功！");
							location.reload();
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
		
	});
	
	$('#btypeselect').live("change",function(){
		if($(this).val()!=""){
			$.ajax({
				url:appServer+"/bops/coupon/findmenu.htm",
				type:"POST",
				data:{"type":$("#btypeselect").val()},
				success:function(res){
					if(res.meta.success){
						if($("#btypeselect").val() == 10 || $("#btypeselect").val() == 20){
							$("#bitemselect").empty().append("<option value=''>请选择</opiton>");
							var obj = res.retObj;
							for(var i=0;i<obj.length;i++){
								$("#bitemselect").append("<option value='"+obj[i].id+"'>"+obj[i].name+"</option>");
							}
						}else if($("#btypeselect").val()==1){
							$("#bitemselect").empty().append("<option value=''>请选择</opiton>");
							var obj = res.retObj;
							for(var i=0;i<obj.length;i++){
								$("#bitemselect").append("<option value='"+obj[i].id+"'>"+obj[i].surveyProject+"</option>");
							}
						}
					}
				}
			});
		}else{
			$("#bitemselect").empty().append("<option value=''>请选择</opiton>");
		}
	});
	
});

function del(id){
	if(confirm("确定删除？")){
		$.ajax({
			url:appServer+'/bops/coupon/delcouponmap.htm',
			type:"POST",
			data:{"id":id},
			success:function(res){
				if(res.meta.success){
					alert("删除成功！");
					location.reload();
				}else{
					alert(res.meta.errorInfo);
				}
			},error:function(xhr){
				alert("网络错误");
			}
		});
	}
	
}

function edit(id){
	
	var robj;
	$.ajax({
		url:appServer+'/bops/coupon/ajaxgetcoupons.htm',
		async:false,
		type:"GET",
		success:function(res){
			if(res.meta.success){
				robj = res.retObj;
			}
		}
	});
	
	var dobj;
	$.ajax({
		url:appServer+"/bops/coupon/findcouponmap.htm",
		async:false,
		type:"GET",
		data:{"id":id},
		success:function(res){
			if(res.meta.success){
				dobj = res.retObj;
			}
		}
	});
	
	if(dobj==null){
		alert("错误！");
	}else{
		var str = "<table id='smaptb'>" +
		"<input value='"+ dobj.businessId +"' id='did' type='hidden'>"+
		"<tr>" +
			"<th>关联类型：</th>"+
			"<td>" +
				"<select id='typeselect'>" +
					"<option value=''>请选择</option>";
		if(dobj.type==0){
			str+="<option value='0' selected='selected'>订单满就送</option>"+
			"<option value='1'>会员赠送</option>";
		}else{
			str+="<option value='0'>订单满就送</option>"+
			"<option value='1' selected='selected'>会员赠送</option>";
		}
					
				str+="</select>" +
			"</td>"+
		"</tr>"+
		"<tr>" +
			"<th>项目类型：</th>"+
			"<td>" +
				"<select id='btypeselect'>" +
					"<option value=''>请选择</option>";
				if(dobj.businessType == 10){
					str+="<option value='10' selected='selected'>通用套餐</option>"+
					"<option value='20'>专属套餐</option>"+
					"<option value='1'>自定义项</option>";
				}else if(dobj.businessType == 20){
					str+="<option value='10'>通用套餐</option>"+
					"<option value='20' selected='selected'>专属套餐</option>"+
					"<option value='1'>自定义项</option>";
				}else{
					str+="<option value='10'>通用套餐</option>"+
					"<option value='20'>专属套餐</option>"+
					"<option value='1' selected='selected'>自定义项</option>";
				}
					
				str+="</select>" +
			"</td>"+
		"</tr>"+
		"<tr>" +
			"<th>项目：</th>"+
			"<td>" +
				"<select id='bitemselect'>" +
					"<option value=''>请选择</option>"+
				"</select>" +
			"</td>"+
		"</tr>"+
		"<tr>" +
			"<th>所需金额：</th>"+
			"<td><input id='money' value='"+dobj.money+"'/></td>"+
		"</tr>"+
		"<tr>" +
			"<th>优惠券：</th>"+
			"<td>" +
				"<select id='couponId'>" +
					"<option value=''>请选择</option>";
					if(robj!=null){
						for(var i=0;i<robj.length;i++){
							str+="<option value='"+robj[i].id+"'";
							if(dobj.couponId == robj[i].id){
								str+="selected='selected'";
							}
							str+=">"+robj[i].businessName+"-"+robj[i].name;
							if(robj[i].needCount!=null){
								str += "-满"+robj[i].needCount+"可用";
							}
							str+="</option>";
						}
					}	
				str+="</select>"+
			"</td>"+
		"</tr>"+
		"<tr>" +
			"<th>数量：</th>"+
			"<td><input id='count' value='"+(dobj.count==null?"":dobj.count)+"'/></td>"+
		"</tr>"+
		"<tr>" +
			"<th>来源：</th>"+
			"<td><input id='source' value='"+dobj.source+"'/></td>"+
		"</tr>"+
		"<tr>" +
			"<th>有效日期：</th>" +
			"<td><input id='validTime' value='"+ (dobj.validTime == null?"":dobj.validTime) +"'>月</td>"+
		"</tr>"+
		"</table>";
				
				str += "<script>" +
					"cg();"
				"</script>";
				
		hrHuTui.popout({
			title:"修改关联",
			width:500,
			content:str,
			btn:'okcancel',
			onOk:function(res){
				var type = $("#typeselect").val();
				var businessType = $("#btypeselect").val();
				var businessId = $("#bitemselect").val();
				var money = $("#money").val();
				var couponId = $("#couponId").val();
				var count = $("#count").val();
				var source = $("#source").val();
				var id = dobj.id;
				var validTime = $("#validTime").val();
				
				if(type==""){
					alert("请选择关联类型");
					return false;
				}
				
				if(businessType==""){
					alert("请选择项目类型");
					return false;
				}
				
				if(businessId==""){
					alert("请选择项目");
					return false;
				}
				
				if(money!=""&&isNaN(money)){
					alert("请输入正确的金额");
					return false;
				}
				
				if(couponId==""){
					alert("请选择正确的优惠券");
					return false;
				}
				
				if(type==0 && (count==""||isNaN(count))){
					alert("请输入正确的数量");
					return false;
				}
				
				$.ajax({
					url:appServer+'/bops/coupon/editcouponmap.htm',
					type:'POST',
					data:{"id":id, "type":type, "businessType":businessType, "businessId":businessId, "money":money, "couponId":couponId, "count":count, "source":source, "validTime":validTime},
					success:function(res){
						if(res.meta.success){
							alert("修改成功！");
							location.reload();
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
}

function cg(){
	$.ajax({
		url:appServer+"/bops/coupon/findmenu.htm",
		type:"POST",
		data:{"type":$("#btypeselect").val()},
		success:function(res){
			if(res.meta.success){
				if($("#btypeselect").val() == 10 || $("#btypeselect").val() == 20){
					$("#bitemselect").empty().append("<option value=''>请选择</opiton>");
					var obj = res.retObj;
					for(var i=0;i<obj.length;i++){
						if(obj[i].id == $("#did").val()){
							$("#bitemselect").append("<option value='"+obj[i].id+"' selected='selected'>"+ obj[i].name +"</option>");
						}else{
							$("#bitemselect").append("<option value='"+obj[i].id+"'>"+ obj[i].name +"</option>");
						}
					}
				}else if($("#btypeselect").val() == 1){
					$("#bitemselect").empty().append("<option value=''>请选择</opiton>");
					var obj = res.retObj;
					for(var i=0;i<obj.length;i++){
						if(obj[i].id == $("#did").val()){
							$("#bitemselect").append("<option value='"+ obj[i].id +"' selected='selected'>"+ obj[i].surveyProject +"</option>");
						}else{
							$("#bitemselect").append("<option value='"+ obj[i].id +"'>"+ obj[i].surveyProject +"</option>");
						}
					}
				}
			}
		}
	});
}
