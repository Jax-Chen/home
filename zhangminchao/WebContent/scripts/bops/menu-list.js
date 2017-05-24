$(document).ready(function() {
	
	$(".menuDel").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		hrHuTui.popout({
			type:"info",
			title:"删除套餐",
			content:"<span style='font-size:16px;padding-left:20px;'>确定删除该套餐吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/menu/delete.htm",
					type:"POST",
					data:{"id":id},
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
	
	$(".menuStop").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		hrHuTui.popout({
			type:"info",
			title:"停用套餐",
			content:"<span style='font-size:16px;padding-left:20px;'>确定停用该套餐吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/menu/stop.htm",
					type:"POST",
					data:{"id":id},
					success:function(res){
						if (res.meta.success) {
							alert("停用成功！");
							location.reload();
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
	
	$(".menuRestart").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		hrHuTui.popout({
			type:"info",
			title:"启用套餐",
			content:"<span style='font-size:16px;padding-left:20px;'>确定启用该套餐吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/menu/restart.htm",
					type:"POST",
					data:{"id":id},
					success:function(res){
						if (res.meta.success) {
							alert("启用成功！");
							location.reload();
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
	
	$(".menuAddExclusive").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		var name = self.parent("td").siblings(".menuName").text();
		var ctt = "<div style='width:80%;margin:10px auto;'>" +
				"<table>" +
					"<tr>" +
						"<th>套餐名:</th>" +
						"<td>"+ name +"</td>"+
					"</tr>"+
					"<tr>" +
						"<th style='width:20%;'>用户手机号：<p>（多个以英文 ; 分割）</p></th>" +
						"<td><textarea id='userMobile' style='height:100px;width:100%;'></textarea></td>"+
					"</tr>"+
				"</table>"+
				"</div>";
		layer.open({
            type:1,
            title:'添加专属用户',
            btn:['确定', '取消'],
            area:['600px'],
            content:ctt,
            yes:function(index) {
                var text = $("#userMobile").val();
                if(text == "") {
                	layer.alert("请填写手机号");
                } else {
                	$.ajax({
                		url: appServer + "/bops/menu/addexclusivetouser.htm",
                		type: "POST",
                		data: {"id": id, "mobile": text},
                		success:function(res) {
                			if(res.meta.success) {
                				var message="";
                				var obj="";
                				if(res.retObj != null){
                					var Datas = res.retObj;
                					for(var s in Datas){
                						obj=Datas[s];
                						message+=obj+";";
                					}
                				}
                				if(message != ""){
                					layer.open({
	                					  title:'提示',	
	                					  content: message+'已经存在其他同名的套餐中'
	                					  ,btn: ['确定']
	                					  ,yes: function(index, layero){
	                						  layer.msg("添加成功");
	                					  }
	                				});
                				}else{
                					layer.open({
                    					  title:'添加结果',	
                    					  content: "添加成功"
                    					  ,btn: ['确定']
                    					  ,yes: function(index, layero){
                    						  layer.msg("添加成功");
                    					  }
                    				});
                				}
                				
                				layer.close(index);
                			} else {
                				layer.alert(res.meta.errorInfo);
                			}
                		},
                		error:function() {
                			layer.msg("网络错误");
                		}
                	});
                }
            }
        });
		
	});
	
	$(".menuEdit").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		window.location.href = appServer + "/bops/menu/edit.htm?id="+id;
	});
	
	
	$(".setMenuRelate").on("click", function() {  // 设置套餐的关联信息
		var self = $(this);
		var menuId = self.attr("data-code");
		var $table = $("<table class='setRelateTable' width='100%' border='1px;' style='border-collapse:collapse;'><thead><th width='5%'></th><th width='13%'>调查项目</th><th width='18%'>调查方式</th><th width='10%'>工作日</th><th width='7%'>费用</th><th width='10%'>折扣费用</th><th width='7%'>单位</th><th width='10%'>是否多选</th><th>操作</th></thead><tbody></tbody></table>");
		
		$.ajax({
			url : appServer + "/bops/listAllMenuItems.htm",
			type : 'post',
			dataType : 'json',
			cache : false,
			data : {menuId:menuId},
			success : function(res) {
				if (res.meta.success) {
					var datas = res.data;
					var arr = [];
					for (var i in datas) {
						var tr = "<tr id='tr_"+menuId+"_"+datas[i].id+"'><td><input type='checkbox' class='checkMenuItem' value='"+datas[i].id+"'/></td><td>"+datas[i].surveyProject+"</td><td>"+(datas[i].surveyMethod || '')+"</td><td>"+datas[i].costDays+"</td><td>"+datas[i].fee+"</td><td>"+(datas[i].discountFee||'')+"</td><td>"+datas[i].unit+"</td><td>"+(datas[i].isMulti==0?'否':'是')+"</td><td><input type='checkbox' class='fixedItem' value='1'/>固定<input type='checkbox' class='optionItem' value='1'/>可选</td></tr>";
						arr.push(tr);
					}
					$table.find("tbody").append(arr.join(""));
					
					var relateDatas = res.retObj;
					
					for (var j in relateDatas) {
						var obj = relateDatas[j];
						var keyWord = "tr[id='tr_"+obj.menuId+"_"+obj.menuItemId+"']";
						var $trObj = $table.find(keyWord);
						
						if ($trObj[0]) {
							$trObj.find(".checkMenuItem").prop("checked",true);
							if (obj.nature == 1) {
								$trObj.find(".fixedItem").prop("checked", true);
							}
							if (obj.nature == 2) {
								$trObj.find(".optionItem").prop("checked", true);
							}
						} else {
							$trObj.find("input[type='checkbox']").prop("checked", false);
						}
					}
					
					hrHuTui.popout({
						title:"设置套餐关联",
						width:900,
						height:650,
						type:'table',
						content: $table,
						onOk:function(){
							var params = [];
							$table.find("tr[id^='tr_"+menuId+"']").each(function(){ // 遍历选中情况
								var self = $(this);
								var $item = self.find(".checkMenuItem:checked");  // 判断前面的checkbox是否选择
								if ($item.length > 0) {
									
									var $fixeditem = self.find(".fixedItem:checked");
									if ($fixeditem && $fixeditem.length > 0) {
										var obj = {
												menuId : menuId,
												menuItemId: $item.attr("value"),
												nature : 1
										}
										params.push(obj);
									}
									
									var $optionitem = self.find(".optionItem:checked");
									if ($optionitem && $optionitem.length > 0) {
										var obj = {
												menuId : menuId,
												menuItemId: $item.attr("value"),
												nature : 2
										}
										params.push(obj);
									}
								}
							});
							if (params.length <= 0) { // 没选择
								alert("请正确选择相关信息");
								return false;
							}
                            var isOk = false;
							$.ajax({
				    			url : appServer + "/bops/updateMenuRelate.htm",
				    			type : 'post',
				    			async : false,
				    			dataType : 'json',     
				    			data : {"data":JSON.stringify(params), "menuId": menuId},
				    			success : function(res) {
				    				if (res.meta.success) {
				    					alert("操作成功");
				    					isOk = true;
				    				} else {
				    					alert(res.meta.errorInfo);
				    				}
				    			}
				    		});
							return isOk;
						}
					});
				}
			},                
			error : function(xhr) { //请求出错处理
				alert("请求出错(请检查相关的网络状况.)");
			}
		});
		
		
	});
	
	
	$(".menuCopy").click(function(){
		var self = $(this);
		var menuId = self.attr("data-code");
		$.ajax({
			url : appServer + "/bops/menu/menuDetail.htm",
			type : 'GET',
			dataType : 'json',
			cache : false,
			data : {menuId:menuId},
			success : function(res) {
				if (res.meta.success) {
					//alert(res.data.name);
					//构建框
					var s=('<table ><tr><th><span class="required">*</span>套餐名字：</th><td><input id="menuName" type="text" style="width:200px;height:21px;" class="inp"  name="$!{status.expression}" value='+res.data.name+' maxlength="32"/></td></tr>');
						s+='<tr><th>套餐类型：</th> <td><select  id="selectType" class="select" style="width:200px;height:21px;"><option value="">请选择</option><option value=10';
						if(res.data.type ==10){
								s+=" selected=selected";					
						}
						s+=">通用</option><option value='20'";
						if(res.data.type ==20){
							s+="selected=selected";					
						}
						s+=">专属</option></select></td></tr>"
						s+='<tr><th><span class="required">*</span>套餐代码：</th><td><input id="menuCode" type="text" style="width:200px;height:21px;" class="inp" " value='+res.data.menuCode+' maxlength="32"/></td></tr>';	
						s+='<tr><th><span class="required">*</span>套餐前缀：</th><td><input  id="ordCodePrefix" type="text" style="width:200px;height:21px;" class="inp"  " value='+res.data.ordCodePrefix+' maxlength="32"/></td></tr>';
						s+='<tr><th>套餐总价（精确到分）：</th><td><input id="totalPrice" type="text" style="width:200px;height:21px;" class="inp"   value='+res.data.totalPrice+' maxlength="32"/></td></tr>';
						s+='<tr><th>套餐折扣价(精确到分)：</th><td><input id="buyPrice" type="text" style="width:200px;height:21px;" class="inp"   value='+res.data.buyPrice+' maxlength="32"/></td></tr>';
						s+='<tr><th><span class="required">*</span>实际反馈工作日：</th><td><input id="leadDays" type="text" style="width:200px;height:21px;" class="inp"   value='+res.data.leadDays+' maxlength="32"/></td></tr>';
						s+='<tr><th><span class="required">*</span>显示反馈工作日：：</th><td><input id="feedbackTime" type="text" style="width:200px;height:21px;" class="inp"   value='+res.data.feedbackTime+' maxlength="32"/></td></tr>';
						s+='<tr><th><span class="required">*</span>包含套餐项数：</th><td><input id="includeItemNum" type="text" style="width:200px;height:21px;" class="inp" value='+res.data.includeItemNum+' maxlength="32"/></td></tr>';
						s+='<tr><th>备注：</th><td><textarea type="text" id="remark" style="width:200px;height:60px;" id="" class="inp">'+res.data.remark+'</textarea></td></tr>';
						s+='<tr><th>排序值：</th><td><input type="text" id="ordering" style="width:200px;height:21px;" id="" class="inp"  }" value='+res.data.ordering+' maxlength="32"/></td></tr>';
						s+="</table>"
					 layer.open({
						    type: 1,
						    content: s, //注意，如果str是object，那么需要字符拼接。
						    area: ['400px', '70%'],
						    title:"套餐信息",
						    btn:['确定', '取消'],
						    yes:function(index) {
						    	layer.confirm('确定克隆吗？', {icon: 3, title:'提示'}, function(cindex){
						    		var menuName = $("#menuName").val();
					                var menuCode = $("#menuCode").val();
					                var selectType = $("#selectType").val();
					                var ordCodePrefix = $("#ordCodePrefix").val();
					                var totalPrice = $("#totalPrice").val() || 0;
					                var buyPrice = $("#buyPrice").val() || 0;
					                var leadDays = $("#leadDays").val();
					                var feedbackTime = $("#feedbackTime").val();
					                var remark = $("#remark").val() || "";
					                var ordering = $("#ordering").val() || 0;
					                var includeItemNum =$("#includeItemNum").val();
					                if(menuCode == res.data.menuCode){
					                	layer.alert("请修改套餐代码");
					                	return;
					                }
					               
					                if(menuName == "" || menuCode=="" || selectType=="" || ordCodePrefix=="" || leadDays=="" || feedbackTime=="" ||includeItemNum=="" ) {
					                	layer.alert("请填写完整参数");
					                	return;
					                }
					                if(!(isPositiveNum(leadDays) && isPositiveNum(includeItemNum) && isPositiveNum(ordering))){
					                	layer.alert("实际反馈工作日,包含套餐项数,排序值需要正整数");
					                	return;
					                }
					                	$.ajax({
					                		url: appServer + "/bops/menu/copyMenu.htm",
					                		type: "POST",
					                		data: {"menuId":res.data.id,"menuName":menuName,"menuCode":menuCode,"selectType":selectType,"ordCodePrefix":ordCodePrefix,"totalPrice":totalPrice,
					                			"buyPrice":buyPrice,"leadDays":leadDays,"feedbackTime":feedbackTime,"remark":remark,"ordering":ordering,"includeItemNum":includeItemNum},
					                		success:function(res) {
					                			if(res.meta.success) {
					                				layer.open({
					                					  title:'克隆结果',	
					                					  content: '克隆成功！'
					                					  ,btn: ['确定']
					                					  ,yes: function(index, layero){
					                						  window.location.reload();
					                					  }
					                				})
					                			} else {
					                				layer.alert(res.meta.errorInfo);
					                			}
					                		},
					                		error:function() {
					                			layer.msg("网络错误");
					                		}
					                	});
						    	});
						    	
						    	
						    		
						    	
				                
				            }
						  });
				}else {
					alert(res.meta.errorInfo);
				}
			},
			error : function(xhr) { //请求出错处理
				alert("请求出错(请检查相关的网络状况.)");
			}
				
		});
	});
	
	function isPositiveNum(s){//是否为正整数  
	    var re = /^[0-9]*[1-9][0-9]*$/ ;  
	    return re.test(s);  
	}
	
});