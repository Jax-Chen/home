$(function(){
	$(".addrole-btn").on("click", function(){
		var ctt = "<div class='pout-frame'>"
			+"<div class='row frame-row'><div class='col-md-12'><span>角色名称：</span><input id='pout-rolename' /></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='vertical-align: top'>角色描述：</span><textarea id='pout-roledes'></textarea></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span>角色状态：</span>"
			+"<select id='pout-rolestatus'>"
			+"<option value='1'>启用</option>"
			+"<option value='0'>停用</option>"
			+"</select></div></div>"
		+"</div>";
		layer.open({
			type: 1,
			title: '添加岗位',
			btn: ['确定', '取消'],
			area: ['600px', '300px'],
			content: ctt,
			yes: function(index) {
				var name = $("#pout-rolename").val();
				var des = $("#pout-roledes").val();
				var status = $("#pout-rolestatus").val();
				
				$.ajax({
					url:appServer + "/bops/systemrole/add.htm",
					type:"POST",
					data:{"name":name, "des":des, "status":status},
					beforeSend:function(){
	                    loadIndex = layer.load(1);
	                },
	                success:function(res){
	                    layer.close(loadIndex);
	                    if(res.meta.success){
	                        layer.msg("添加成功！");
	                        layer.close(index);
	                        setTimeout("location.reload()", 1000);
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
		});
	});

	$(".role-detail").on("click", function(){
		$this = $(this);
		var roleId = $this.attr("data-code");
		
		$.ajax({
			url:appServer + "/bops/systemrole/findroledetail.htm",
			type:"GET",
			data:{"roleId":roleId},
			success:function(res){
				if(res.meta.success){
					var obj = replaceNull(res.retObj);
					var ctt = "<div class='pout-frame'>"
						+"<div class='row frame-row'><div class='col-md-6'><span>角色名称：</span><input id='pout-rolename' value='"+ obj.name +"' disabled/></div><div class='col-md-6'><span>岗位ID：</span><span>"+ roleId +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span style='vertical-align: top'>角色描述：</span><textarea id='pout-roledes' disabled style='width:300px;height:75px;'>"+ obj.description +"</textarea></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span>角色状态：</span>"
						+"<span>"+ (obj.status==1?"启用":"停用") +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-6'><span>创建时间：</span><span>"+ parseTime(obj.createTime) +"</span></div><div class='col-md-6'><span>创建者：</span><span>"+ obj.operatorName +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-6'><span>更新时间：</span><span>"+ parseTime(obj.modifyTime) +"</span></div><div class='col-md-6'><span>更新者：</span><span>"+ obj.updaterName +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><a href='javascript:void(0);' id='editrole'><span class='glyphicon glyphicon-pencil' ></span> 修改</a></div></div>"
					+"</div>"
					+"<script>"
					+'$("#editrole").on("click", function(){'
							+'$(".pout-frame").find("input").removeAttr("disabled");'
							+'$(".pout-frame").find("textarea").removeAttr("disabled");'
							+'$(".pout-frame").find("select").removeAttr("disabled");'
							+'$(this).hide();'
						+'});'
					+"</script>";
					layer.open({
						type: 1,
						title: '角色详情',
						btn: ['确定', '取消'],
						area: ['650px', '400px'],
						content: ctt,
						yes: function(index) {
							if($("#editrole").css("display") == "none"){
								var name = $("#pout-rolename").val();
								var des = $("#pout-roledes").val();
								
								$.ajax({
									url:appServer + "/bops/systemrole/editrole.htm",
									type:"POST",
									data:{"name":name, "des":des, "id":roleId},
									beforeSend:function(){
					                    loadIndex = layer.load(1);
					                },
					                success:function(res){
					                    layer.close(loadIndex);
					                    if(res.meta.success){
					                        layer.msg("修改成功！");
					                        setTimeout("location.reload()", 1000);
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
							layer.close(index);
						}
					});
				}else{
					layer.msg("系统错误！");
				}
			},
			error:function(){
				layer.msg('网络错误！');
			}
		});
		
		
	});


	$(".role-ban").on("click", function(){
		$this = $(this);
		layer.alert("确定停用？", {icon: 3, title:'停用角色', btn:['确定', '取消']}, function(cindex){
			var opUserId = $("#adminUserId").val();
			var roleId = $this.attr("data-code");
			$.ajax({
                url:appServer+'/bops/systemrole/stop.htm',
                type:"GET",
                data:{"roleid":roleId, "operatorid":opUserId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("停用成功！");
                        layer.close(cindex);
                        setTimeout("location.reload()", 1000);
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

	});
	
	$(".role-restart").on("click", function(){
		$this = $(this);
		layer.alert("确定启用？", {icon: 3, title:'启用角色', btn:['确定', '取消']}, function(cindex){
			var opUserId = $("#adminUserId").val();
			var roleId = $this.attr("data-code");
			$.ajax({
                url:appServer+'/bops/systemrole/restart.htm',
                type:"GET",
                data:{"roleid":roleId, "operatorid":opUserId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("启用成功！");
                        layer.close(cindex);
                        setTimeout("location.reload()", 1000);
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

	});
	
	$(".role-delete").on("click", function(){
		$this = $(this);
		layer.alert("确定删除（不可恢复）？", {icon: 3, title:'删除角色', btn:['确定', '取消']}, function(cindex){
			var opUserId = $("#adminUserId").val();
			var roleId = $this.attr("data-code");
			$.ajax({
                url:appServer+'/bops/systemrole/delete.htm',
                type:"GET",
                data:{"roleid":roleId, "operatorid":opUserId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("删除成功！");
                        layer.close(cindex);
                        setTimeout("location.reload()", 1000);
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

	});
	
	$("#role-search").on("click", function(){
		$("#roleform").submit();
	});
 
	
});