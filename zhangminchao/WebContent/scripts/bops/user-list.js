$(document).ready(function() {
	
	$(".userStop").on("click", function() {
		var self = $(this);
		var userId = self.attr("data-code");
		hrHuTui.popout({
			type:"info",
			title:"停用会员",
			content:"<span style='font-size:16px;padding-left:20px;'>确定停用该会员信息吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/user/delete.htm",
					type:"POST",
					data:{"id":userId},
					success:function(res){
						if (res.meta.success) {
							alert("删除成功！");
							self.closest("tr").find("#tdStatus").html("已停用");
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
	
    $(".setUserPassword").on("click", function() {
    	var self = $(this);
		var userId = self.attr("data-code");
    	var $table = $("<table width='100%'><tr><th>密码</th><td><input type='text' id='pwdset_password' style='height:25px;'/></td></tr><tr><th>确认密码</th><td><input type='text' id='pwdset_repassword' style='height:25px;'/></td></tr></table>");
    	hrHuTui.popout({
			title:"重置密码",
			width:300,
			height:200,
			content:$table,
			onOk : function(){
				var password = $("#pwdset_password").val();
				var rePassword = $("#pwdset_repassword").val();
				
				if (!password) {
					alert("请输入密码");
					return false;
				}
				
				if (!rePassword) {
					alert("请输入确认密码");
					return false;
				}
				
				if (password != rePassword) {
					alert("两次密码输入不一致");
					return false;
				}
				
				jQuery.ajax({
					 type: 'POST',
					 url:  appServer + '/bops/user/setUserPassword.htm',
					 data: {'id':userId,'password':password, 'rePassword':rePassword} ,
					 success: function(res){
						 if (res.meta.success) {
					 		alert("操作成功！");
					 		return true;
					 	} else {
					 		alert(res.meta.errorInfo);
					 		return false;
					 	}
					 },
					 error:function(){
					 	alert("呀！服务器好像睡着了！");
					 },
					 dataType: 'json'
				});
			}
		});
	});
    
	$("#pp").live("blur", function(){
    	var price = $("#pp").val();
    	if(price!=null && price<=0){
    		$(".invoiceinfo").remove();
    		$('#invoicesele option:eq(0)').attr('selected','selected');
    	}
    });
    
    $("#invoicesele").live("change", function(){
    	var money = $("#pp").val();
    	if(money!=null && money!="" && money<=0){
    		$('#invoicesele option:eq(0)').attr('selected','selected');
    		return;
    	}
    	if($(this).val()==1){
        	var comName = $("#cg-comname").text();
    		var str = "<tr class='invoiceinfo'><td align='right' width='30%'>开票金额：</td><td><input id='ivc-amount' value='"+money+"'/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>发票抬头：</td><td><input id='ivc-title' value='"+comName+"'/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>收票人：</td><td><input id='ivc-recvname' value=''/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>联系号码：</td><td><input id='ivc-contact' value=''/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>收票地址：</td><td><input id='ivc-address' value=''/></td></tr>";
    		$("#ifinvoice").after(str);
    	}else{
    		$(".invoiceinfo").remove();
    	}
    });

    $(".charge").on("click", function(){
    	$this = $(this);
    	var id = $(this).attr("data-code");
    	var comName = $(this).parents("td").siblings(".comname").text();
    	var mobile = $(this).parents("td").siblings(".td-mobile").text();
    	var account = $this.parents("td").siblings(".accountb").text();
    	var userName = $this.parents("td").siblings(".uname").text();
    	var ct = "<table width='100%'><tbody>" +
    			"<tr><td align='right' width='30%'>被充值用户ID：</td><td align='left' id='cg-id'><font color='red'>"+id+"</font></td></tr>" +
    			"<tr><td align='right' width='30%'>被充值用户公司：</td><td id='cg-comname'>"+comName+"</td></tr>" +
    			"<tr><td align='right' width='30%'>姓名：</td><td>"+userName+"</td></tr>" +
    			"<tr><td align='right' width='30%'>手机号：</td><td align='left'><font color='red'>"+mobile+"</font></td></tr>" +
    			"<tr><td align='right' width='30%'>充值金额(元)：</td><td align='left'><input id='pp' style='height: 22px;' type='text'></td></tr>" +
    			"<tr><td align='right' width='30%'>赠送金额(元)：</td><td align='left'><input id='sp' style='height: 22px;' type='text'></td></tr>" +
    			"<tr id='ifinvoice'><td align='right' width='30%'>发送提醒消息：</td><td align='left'>" +
    			"<select id='sendnotice'>" +
    				"<option value='0'>否</option>"+
    				"<option value='1'>是</option>"+
    			"</select>"+
    			"</td></tr>" +
    			"<tr id='ifinvoice'><td align='right' width='30%'>开发票：</td><td align='left'>" +
    			"<select id='invoicesele'>" +
    				"<option value='0'>无须开票</option>"+
    				"<option value='1'>开具</option>"+
    				"<option value='2'>暂不开</option>"+
    			"</select>"+
    			"</td></tr>" +
    			"<tr><td align='right' width='30%'>备注(可不写,128个字以内):</td>" +
    			"<td align='left'><textarea id='mark' style='width: 200px; min-height: 100px;' maxlength='128'></textarea></td></tr>" +
    			"</tbody></table>";
    	layer.open({
    		title:"充值",
    		type: 1,
    		shift: 3,
			area : ['400px' , '400px'],
    		btn:['确定', '取消'],
    		content:ct,
    		yes:function(index){
    			var amount = $("#pp").val();
    			var sendAmount = $("#sp").val();
    			var mark = $("#mark").val();
    			var invoice = $("#invoicesele").val();
    			var invoiceAmount = $("#ivc-amount").val();
    			var invoiceTitle = $("#ivc-title").val();
    			var invoicePerson = $("#ivc-recvname").val();
    			var invoiceContact = $("#ivc-contact").val();
    			var invoiceAddress = $("#ivc-address").val();
    			var sendnotice = $("#sendnotice").val();
    			
    			var a=/^[0-9]*(\.[0-9]{1,2})?$/;
    			if(!a.test(amount)||amount==""){
    				layer.alert('请输入正确的金额！');
    				return;
    			}
    			
    			if(!a.test(sendAmount)&&sendAmount!=""){
    				layer.alert('请输入正确的赠送金额！');
    				return;
    			}
    			
    			if(invoice==1){
    				if(invoiceAmount==null||!a.test(invoiceAmount)){
    					layer.alert('请输入正确的金额！');
        				return;
    				}else if(invoiceTitle==""||invoicePerson==""||invoiceContact==""||invoiceAddress==""){
    					layer.alert('请填写完整表单！');
        				return;
    				}
    			}
    			var loadIndex;
    			layer.confirm('确定充值？', {icon: 3, title:'提示'}, function(cindex){
    				$.ajax({
        				url:appServer+'/bops/user/charge.htm',
        				type:"POST",
        				data:{"id":id, "amount":amount, "mark":mark, "invoice":invoice, "invoiceAmount":invoiceAmount, 'invoiceTitle':invoiceTitle, 'invoicePerson':invoicePerson, 
        					"invoiceContact":invoiceContact, 'invoiceAddress':invoiceAddress, "sendAmount":sendAmount, "sendnotice":sendnotice},
        				beforeSend:function(){
        					loadIndex = layer.load(1);
        				},
        				success:function(res){
        					layer.close(loadIndex);
        					if(res.meta.success){
        						layer.msg("充值成功！");
        						layer.close(index);
        						$.ajax({
        							url:appServer+"/bops/money/finduseractblc.htm",
        							type:"GET",
        							data:{"id":id},
        							success:function(res){
        								if(res.meta.success){
        									var obj = res.retObj;
        									$this.parents("td").siblings(".accountb").text(obj.balance==""?0:obj.balance);
        									$this.parents("td").siblings(".uscore").text(obj.score==""?0:obj.score);
        									$this.parents("td").siblings(".ulv").text(obj.lv==""?0:obj.lv);
        								}
        							}
        						});
        					}else{
        						layer.alert(res.meta.errorInfo, {icon:2});
        					}
        				},
        				error:function(){
        					layer.close(laodIndex);
        					layer.msg('网络错误！');
        				}
        				
        			});
    			});
    		}
    		
    	});
    });
    
    
    $(".user-allocation").on("click", function(){
    	var id = $(this).attr("data-code");
		$this = $(this);
		$.ajax({
			url:appServer + "/bops/systemuser/getactivemarketuser.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var ctt = "<div style='width: 60%;margin: 20px auto;'>" +
							"<div>" +
							"<span>选择销售人员：</span>"+
							"<select id='deliver-select' class='selectpicker show-tick form-control' data-live-search='true'>"+
							"<option>请选择</option>"
							for(var i=0; i<obj.length; i++){
								ctt += "<option value='"+ obj[i].id +"'>"+ obj[i].nickName +"</option>";
							}
							ctt += "</select>"+
							"</div>"+
							"</div>"+
							"<script>" +
//							"$(function(){$('#deliver-select').selectpicker({noneSelectedText:'请选择', size:5}).selectpicker('val', '"+ $this.parent().siblings('.deliver-td').find('input').val() +"').selectpicker('refresh');});"+
							"</script>";
					layer.open({
					            type:1,
					            title:'分配订单',
					            btn:['确定', '取消'],
					            area:['400px','200px'],
					            content:ctt,
					            yes:function(index){
					                var v = $("#deliver-select").val();
					                if(v == ""){
					                	layer.msg('请选择交付人员');
					                	return;
					                }else{
					                	$.ajax({
					                		url:appServer + "/bops/user/setmarketuser.htm",
					                		data:{"userId":id, "deliverId":v},
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
    
    $(".allocation-all-box").on("click", function(){
    	if($(this).attr("checked") == "checked"){
    		$(".allocation-checkbox").attr("checked", "checked");
    	}else{
    		$(".allocation-checkbox").removeAttr("checked");
    	}
    });
    
    $(".batch-allocation").on("click", function(){
    	var arr = $(".allocation-checkbox:checked");
    	var valArr = [];
    	for(var i = 0; i<arr.length; i++){
    		valArr.push(arr[i].value);
    	}
    	
    	if(valArr.length != 0){
    		$.ajax({
    			url:appServer + "/bops/systemuser/getactivemarketuser.htm",
    			type:"GET",
    			success:function(res){
    				if(res.meta.success){
    					var obj = res.retObj;
    					var ctt = "<div style='width: 60%;margin: 20px auto;'>" +
    							"<div>" +
    							"<span>选择销售人员：</span>"+
    							"<select id='deliver-select' class='selectpicker show-tick form-control' data-live-search='true'>"+
    							"<option>请选择</option>"
    							for(var i=0; i<obj.length; i++){
    								ctt += "<option value='"+ obj[i].id +"'>"+ obj[i].nickName +"</option>";
    							}
    							ctt += "</select>"+
    							"</div>"+
    							"</div>"+
    							"<script>" +
//    							"$(function(){$('#deliver-select').selectpicker({noneSelectedText:'请选择', size:5}).selectpicker('val', '"+ $this.parent().siblings('.deliver-td').find('input').val() +"').selectpicker('refresh');});"+
    							"</script>";
    					layer.open({
    					            type:1,
    					            title:'分配订单',
    					            btn:['确定', '取消'],
    					            area:['400px','200px'],
    					            content:ctt,
    					            yes:function(index){
    					                var v = $("#deliver-select").val();
    					                if(v == ""){
    					                	layer.msg('请选择交付人员');
    					                	return;
    					                }else{
    					                	$.ajax({
    					                		url:appServer + "/bops/user/batchsetmarketuser.htm",
    					                		data:{"userIdList":valArr, "deliverId":v},
    					                		type:"POST",
    					                		success:function(res){
    					                			if(res.meta.success){
    					                				layer.msg("设置成功");
    					                				layer.close(index);
    					                				setTimeout("location.reload()", 1500);
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
    	}else{
    		layer.msg("请先选择用户");
    	}
    	
    	
    });
    
});