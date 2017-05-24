$("#addChannel").on("click", function(){
		$this = $(this);
    	var str ="";
    	var ct = "<table width='100%'><tbody>" +
    			"<tr><td align='right' width='30%'>商户账号</td><td align='left'><input id='account' style='height: 22px;' type='text' value=''></td></tr>" +
    			"<tr><td align='right' width='30%'>密码</td><td align='left'><input type='password' id='password' style='height: 22px;' type='text' value=''></td></tr>" +
    			"<tr><td align='right' width='30%'>公司名称</td><td align='left'><input id='companyName' style='height: 22px;' type='text' value=''></td></tr>" +
    			"<tr><td align='right' width='30%'>IP地址(多个,隔开)</td><td align='left'><input id='ips' style='height: 22px;' type='text' value=''></td></tr>" +
    			"<tr><td align='right' width='30%'>常量串</td><td align='left'><input id='signCode' style='height: 22px;' type='text' value=''></td></tr>" +
    			"<tr><td align='right' width='30%'>域名</td><td align='left'><input id='domainName' style='height: 22px;' type='text' value=''></td></tr>" +
    			"</tbody></table>";
		layer.open({
    		title:"添加用户",
    		type: 1,
    		shift: 3,
			area : ['400px' , '400px'],
    		btn:['确定', '取消'],
    		content:ct,
    		yes:function(index){
    			var account = $("#account").val() || "";
    			var password = $("#password").val() || "";
    			var companyName = $("#companyName").val()||""; 
    			var ips = $("#ips").val()||"";
    			var signCode = $("#signCode").val()||"";
    			var domainName = $("#domainName").val()||""; 
    			
    			if(account=="" || password=="" || companyName=="" || ips=="" || signCode=="" || domainName==""){
    				layer.alert('参数不全！');
    				return;
    			}
    			layer.confirm('确定添加？', {icon: 7, title:'提示'}, function(cindex){ 
    				$.ajax({
        				url:appServer+'/bops/merchant/addChannel.htm',
        				type:"POST",
        				data:{ "account" : account, "password" :password, "companyName":companyName,"ips" : ips,"signCode" :signCode , "domainName":domainName},
        				success:function(res){
        					if(res.meta.success){
        						layer.msg("添加成功！");
        						layer.close(index);
        						location.reload();
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

$(".setMenuRelate").on("click", function() { 
	var self = $(this);
	var channelcooperationId = self.attr("data-code");
	var $table = $("<table class='setRelateTable' width='100%' border='1px;' style='border-collapse:collapse;'><thead><th width='5%'></th><th width='13%'>套餐名</th><th width='18%'>套餐类型</th><th width='10%'>反馈工作日</th><th width='7%'>费用</th><th width='10%'>折扣费用</th><th width='7%'>所含调查项</th></thead><tbody></tbody></table>");
	$.ajax({
		url : appServer + "/bops/merchant/listAllMenu.htm",
		type : 'post',
		dataType : 'json',
		cache : false,
		data : {"channelcooperationId":channelcooperationId},
		success : function(res) {
			if (res.meta.success) {
				var datas = res.data;
				var arr = [];
				for (var i in datas) {
					var tr = "<tr id='tr_"+channelcooperationId+"_"+datas[i].id+"'><td><input type='checkbox' class='checkMenu' value='"+datas[i].id+"'/></td><td>"+datas[i].name+"</td><td>";
					if(datas[i].type ==10){
						tr+="通用";
					}else if(datas[i].type ==20){
						tr+="专属";
					}
					tr+="</td><td>"+datas[i].feedbackTime+"</td><td>"+(datas[i].totalPrice || '')+"</td><td>"+(datas[i].discountPrice||'')+"</td><td>"+datas[i].includeItemNum+"</td></tr>";
					arr.push(tr);
				}
				$table.find("tbody").append(arr.join(""));
				
				var relateDatas = res.retObj;
				
				for (var j in relateDatas) {
					var obj = relateDatas[j];
					var keyWord = "tr[id='tr_"+obj.channelcooperationId+"_"+obj.menuId+"']";
					var $trObj = $table.find(keyWord);
					
					if ($trObj[0]) {
						$trObj.find(".checkMenu").prop("checked",true);
					} else {
						$trObj.find("input[type='checkbox']").prop("checked", false);
					}
				}
				
				hrHuTui.popout({
					title:"设置套餐关联",
					width:900,
					height:300,
					type:'table',
					content: $table,
					onOk:function(){
						var params = [];
						$table.find("tr[id^='tr_"+channelcooperationId+"']").each(function(){ // 遍历选中情况
							var self = $(this);
							var $item = self.find(".checkMenu:checked");  // 判断前面的checkbox是否选择
							if ($item.length > 0) {
									var obj = {
											channelcooperationId : channelcooperationId,
											menuId: $item.attr("value")
									}
									params.push(obj);
							}
						});
						if (params.length <= 0) { // 没选择
							alert("请正确选择相关信息");
							return false;
						}
                        var isOk = false;
						$.ajax({
			    			url : appServer + "/bops/merchant/updateMenuRelate.htm",
			    			type : 'post',
			    			async : false,
			    			dataType : 'json',     
			    			data : {"data":JSON.stringify(params), "channelcooperationId": channelcooperationId},
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
