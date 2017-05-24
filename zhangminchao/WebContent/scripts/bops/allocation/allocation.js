$(function(){
	
	$("#pgi-1").page("/bops/bgcheck/configset", {"status":3}, createOrderData);
	
	$("#pgi-2").page(
			"/bops/systemuser/getdeliveruser", 
			null, 
			createDeliverData
	);
/*	aa();
	function getactivedeliveruser(){
		$.ajax({
			url:appServer + "/bops/systemuser/getactivedeliveruser.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
			
		})
	}*/
	$("#od-search").on("click", function(){
		var code = $("#o-code").val();
		var subuser = $("#o-subuser").val();
		var comname = $("#o-comname").val();
		var menu = $("#o-menu").val();
		var deliver = $("#o-deliver").val();
		var surveyuser = $("#o-surveyuser").val();
		var status = $("#o-status").val();
		var marketId = $("#o-marketName").find("option:selected").val();
		var auditStatus = $("#o-auditStatus").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchEndTime").val();
		var deliverId = $("#o-deliverId").find("option:selected").val();
		$("#pgi-1").page(
				"/bops/bgcheck/configset", 
				{"code":code, "subuser":subuser, "comname":comname, "menu":menu, "deliver":deliver, "surveyUser":surveyuser, "status":status,"marketId":marketId,"auditStatus":auditStatus,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime,"deliverId":deliverId}, 
				createOrderData
		);
	});
	
	$("#deliver-tab").on("click", function(){
		$("#pgi-2").page(
				"/bops/systemuser/getdeliveruser", 
				{"pageNo":$("#pgi-2").find("li[class='active']").text()}, 
				createDeliverData
		);
	});
	
	$("#order-tab").on("click", function(){
		var code = $("#o-code").val();
		var subuser = $("#o-subuser").val();
		var comname = $("#o-comname").val();
		var menu = $("#o-menu").val();
		var deliver = $("#o-deliver").val();
		var surveyuser = $("#o-surveyuser").val();
		var num = $("#pgi-1").find("li[class='active']").text();
		var status = $("#o-status").val();
		var marketName = $("#o-marketName").val();
		var auditStatus = $("#o-auditStatus").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchEndTime").val();
		var deliverId = $("#o-deliverId").find("option:selected").val();
		$("#pgi-1").page(
				"/bops/bgcheck/configset", 
				{"code":code, "subuser":subuser, "comname":comname, "menu":menu, "deliver":deliver, "surveyuser":surveyuser, "pageNo":num, "status":status,"marketName":marketName,"auditStatus":auditStatus,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime,"deliverId":deliverId}, 
				createOrderData
		);
	});
	
	
	$(document).on("click", ".fp-btn", function(){
		var id = $(this).attr("data-code");
		$this = $(this);
		$.ajax({
			url:appServer + "/bops/systemuser/getactivedeliveruser.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var ctt = "<div><div class='ibox-content'>" +
							"<div class='form-group'>" +
							"<label class='col-sm-3 control-label'>选择交付人员</label>"+
							"<div class='col-sm-8'><select id='deliver-select' class='selectpicker show-tick form-control' data-live-search='true'>"+
							"<option>请选择</option>"
							for(var i=0; i<obj.length; i++){
								ctt += "<option value='"+ obj[i].id +"'>"+ obj[i].nickName +"</option>";
							}
							ctt += "</select></div>"+
							"</div>"+
							"</div></div>"+
							"<script>" +
							"$(function(){$('#deliver-select').selectpicker({noneSelectedText:'请选择', size:5}).selectpicker('val', '"+ $this.parent().siblings('.deliver-td').find('input').val() +"').selectpicker('refresh');});"+
							"</script>";
					layer.open({
					            type:1,
					            title:'分配订单',
					            btn:['确定', '取消'],
					            area:['400px','400px'],
					            content:ctt,
					            yes:function(index){
					                var v = $("#deliver-select").val();
					                if(v==""){
					                	layer.msg('请选择交付人员');
					                	return;
					                }else{
					                	$.ajax({
					                		url:appServer + "/bops/bgcheck/setdeliver.htm",
					                		data:{"orderId":id, "deliverId":v},
					                		type:"POST",
					                		success:function(res){
					                			if(res.meta.success){
					                				layer.msg("设置成功");
					                				$this.parent().siblings('.deliver-td').text($("#deliver-select").find('option:selected').text());
					                				layer.close(index);
					                			}else{
					                				layer.msg(res.meta.errorInfo);
					                			}
					                		},
					                		error:function(){
					                			layer.msg("网络错误");
					                		}
					                	});
					                }
					            }
					        });    
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	});
	
	$(document).on("click", ".add-log-btn", function(){
		var id = $(this).attr("data-orderid");
		var ctt = "<textarea id='logtext' style='width:100%;height:100%;'></textarea>"
		layer.open({
            type:1,
            title:'添加服务记录',
            btn:['确定', '取消'],
            area:['400px', '300px'],
            content:ctt,
            yes:function(index){
                var text = $("#logtext").val();
                if(text != ""){
	                $.ajax({
	                    url:appServer+'/bops/bgcheck/addorderservicelog.htm',
	                    type:"POST",
	                    data:{"id":id, "log":text},
	                    beforeSend:function(){
	                        loadIndex = layer.load(1);
	                    },
	                    success:function(res){
	                        layer.close(loadIndex);
	                        if(res.meta.success){
	                            layer.msg("添加成功！");
	                            setTimeout("location.reload()", 1000)
	                        }else{
	                            layer.alert(res.meta.errorInfo, {icon:2});
	                        }
	                    },
	                    error:function(){
	                        layer.close(laodIndex);
	                        layer.msg('网络错误！');
	                    }
	                    
	                });
                }
            }
        });
	});
	
});

/**
 * 构建表格数据
 * @param obj
 * @param pg
 */
function createOrderData(obj, pg){
	$tb = $("#orderlist").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":""); 
		str+= ">"+
	      "<td class='orderCode'>"+ nobj.orderCode +"</td>"+
	      "<td>"+ (nobj.orderDate==""?"":parseTime(nobj.orderDate)) +"</td>";
		if(nobj.thirdName != ""){
			str += "<td>"+ nobj.thirdName +"</td>"+
			  "<td>"+ nobj.thirdComName +"</td>";
		}else{
			str += "<td>"+ nobj.userName +"</td>"+
			  "<td>"+ nobj.companyName+"</td>";
		}
		  str += "<td>"+ nobj.menuName+"</td>";
		  
		  if(nobj.orderStatus==3||nobj.orderStatus==4){
			  str += "<td>"+ (nobj.reportDate==""?("预计" + parseTime(nobj.bopsReportDate)):parseTime(nobj.reportDate)) +"</td>";
		  }else{
			  str += "<td>-</td>";
		  }
		  
		  str += "<td>"+ nobj.surveyedUserName+"</td>"+
		  "<td>";
		  if(nobj.auditStatus==0){
			  str += "待提交";
		  }else if(nobj.auditStatus==10){
			  str += "待质检";
		  }else if(nobj.auditStatus==20){
			  str += "质检通过，待发布";
		  }else if(nobj.auditStatus==30){
			  str += "质检未通过";
		  }else if(nobj.auditStatus==40){
			  str += "发布通过";
		  }else if(nobj.auditStatus==50){
			  str += "发布未通过已退回";
		  }
		  str += "</td>"+
		  "<td class='deliver-td'>"+ nobj.deliverName+"<input type='hidden' value='"+ nobj.deliverId +"'/></td>"+
		  "<td class='deliver-td'>"+ nobj.marketName+"<input type='hidden' value='"+ nobj.marketName +"'/></td>"+
	      "<td>";
		  if(nobj.thirdName != ""){
			 str += "<a href='"+ appServer +"/bops/bgcheck/edit.htm?id="+nobj.orderId+ "&edittype=td' target='_blank' style='display:inline-block;'>查看</a>"; 
		  }else{
			  str += "<a href='"+ appServer +"/bops/bgcheck/edit.htm?id="+nobj.orderId+ "' target='_blank' style='display:inline-block;'>查看</a>";
		  }
			
			str += "<a href='javascript:void(0)' style='display:inline-block;margin-left:5px;' data-code='"+ nobj.orderId +"' class='fp-btn'>分配</a>"+
			"<a style='display:inline-block;margin-left:5px;' href='javascript:;' data-orderid='"+ nobj.orderId +"' class='cancel-btn'>取消</a>"+
			"<a style='display:inline-block;margin-left:5px;' href='javascript:;' data-orderid='"+ nobj.orderId +"' class='add-log-btn'>添加服务记录</a>"+
			"<input type='hidden' value='"+ nobj.totalMoney +"' class='originPrice'/>" +
			"<input type='hidden' value='"+ nobj.discountMoney +"' class='discountMoney'/>"+
			"<input type='hidden' value='"+ nobj.balanceMoney +"' class='balanceMoney'/>"+
			"<input type='hidden' value='"+ nobj.monthMoney +"' class='discountMoney'/>";
		 "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}

function createDeliverData(obj, pg){
	$tb = $("#deliverlist").find("tbody");
	$tb.empty();
	var str = "";
	var count = 0;
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":"") +"#end>"+
	      "<td>"+ nobj.workId +"</td>"+
	      "<td>"+ nobj.name +"</td>"+
	      "<td>"+ nobj.nickName +"</td>";
		if(nobj.workStatus==0){
			str += "<td>在职</td>";
			count++;
		}else if(nobj.workStatus==1){
			str += "<td>离职</td>";
		}else{
			str += "<td>休假</td>";
		}
	      
	      str += "<td>"+ nobj.reportCount +"</td>"+
	   "</tr>";
	}

	$tb.append(str);
	$("#deliverCount").text(count);
	deliverReportData();
}

function deliverReportData(){
	$.ajax({
		url: appServer + "/bops/allocation/getdeliverdata.htm",
		type: "GET",
		success:function(res){
			if(res.meta.success){
				var obj = res.retObj;
				$("#totalCount").text(obj.queryingOrder);
				$("#needSubmit").text(obj.needSubmitCount);
				$("#outCount").text(obj.outCount);
			}else{
				layer.msg(res.meta.errorInfo);
			}
		},
		error:function(){
			layer.msg("网络错误");
		}
	});
}

$(document).on("click", "#cancelAllMoney",function(){
	var d = $(this).attr("data");
	$("#cancelMoney").val(d);
});

$(document).on("click", ".cancel-btn",function() {
	var self = $(this);
	var orderid = self.attr("data-orderid");
	var code = self.parent().siblings(".orderCode").text();
	var org = self.siblings(".originPrice").val();
	var balance = self.siblings(".balanceMoney").val();
	var discount = self.siblings(".discountMoney").val();
	var monthMoney = self.siblings(".monthMoney").val();
	var m = 0;
	if(monthMoney != null && monthMoney != ""){
		m = "月结";
	}else{
		m = (parseFloat(balance==""?0:balance) + parseFloat(discount==""?0:discount))/100.00;
	}
	
	var ctt = "<div style='width:80%;margin:20px auto;'>" +
			"<div>订单编号："+ code +"</div>" +
			"<div>订单状态：调查中</div>"+
			"<div>订单金额："+ org/100.00 +"</div>"+
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
								$("#od-search").click();
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