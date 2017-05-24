$(function(){
	$(".addposition-btn").on("click", function(){
		var ctt = "<div class='pout-frame'>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='color:red'>*</span><span>岗位名称：</span><input id='pout-departname' /></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span>所属部门：</span><input id='pout-depart' style='width:70%;'/><input id='pout-fatherdepartval' type='hidden'></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span>岗位权限：</span><input id='pout-positionpermission' style='width:70%;'/><input id='pout-departpermissionval' type='hidden'></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='vertical-align: top'>岗位描述：</span><textarea id='pout-departdes'></textarea></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='color:red'>*</span><span>部门状态：</span>"
			+"<select id='pout-departstatus'>"
			+"<option value='1'>启用</option>"
			+"<option value='2'>停用</option>"
			+"</select></div></div>"
		+"</div>"
		+"<script>"
		+"$('#pout-depart').on('click', function(){"
				+"pout();"
			+"});"
		+"</script>";
		layer.open({
			type: 1,
			shift: 2,
			title: '添加岗位',
			btn: ['确定', '取消'],
			area: ['600px', '400px'],
			content: ctt,
			yes: function(index) {
				var name = $("#pout-departname").val();
				var depart = $("#pout-fatherdepartval").val();
				var role = $("#pout-departpermissionval").val();
				var des = $("#pout-departdes").val();
				var status = $("#pout-departstatus").val();
				if(name=="" || status==""){
					layer.alert("请填写完整表单");
					return;
				}
				
				$.ajax({
					url:appServer + "/bops/systemposition/add.htm",
					type:"POST",
					data:{"name":name, "depart":depart, "role":role, "des":des, "status":status},
					success:function(res){
						if(res.meta.success){
							layer.msg("添加成功");
							layer.close(index);
							setTimeout("location.reload()", 1500);
						}else{
							layer.alert(res.meta.errorInfo, {"icon":2});
						}
						
					},
					error:function(){
						layer.msg("网络错误");
					}
				});
				
			}
		});
	});

	$(".position-detail").on("click", function(){
		var id = $(this).attr("data-code");
		$.ajax({
			url:appServer + "/bops/systemposition/positiondetail.htm",
			type:"GET",
			data:{"id":id},
			success:function(res){
				if(res.meta.success){
					var obj = replaceNull(res.retObj);
					var ctt = "<div class='pout-frame form-group'>"
						+"<div class='row frame-row'><div class='col-md-6'><span style='color:red'>*</span><span>岗位名称：</span><input id='pout-positionname' value='"+ obj.name +"' disabled class='form-control'/></div><div class='col-md-6'><span>岗位ID：</span><span>"+ obj.id +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span>所属部门：</span><input id='pout-depart' disabled value='"+ obj.departSimple +"' class='form-control'/><input id='pout-fatherdepartval' type='hidden' value='" + obj.departIdSimple + "'></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span>岗位权限：</span><input id='pout-positionpermission' disabled value='"+ obj.roleSimple +"' class='form-control' /><input id='pout-departpermissionval' type='hidden' value='"+ obj.roleIdSimple +"'></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span style='vertical-align: top'>岗位描述：</span><textarea id='pout-positiondes' disabled class='form-control' style='width:360px;height:80px;'>"+ obj.description +"</textarea></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><span style='color:red'>*</span><span>部门状态：</span>"
						+"<select id='pout-positionstatus' class='form-control' disabled>"
						+"<option value='1' "+ (obj.status==1?"selected='selected'":"") +">启用</option>"
						+"<option value='2' "+ (obj.status==2?"selected='selected'":"") +">停用</option>"
						+"</select></div></div>"
						+"<div class='row frame-row'><div class='col-md-6'><span>创建时间：</span><span>"+ parseTime(obj.createTime) +"</span></div><div class='col-md-6'><span>创建者：</span><span>"+ obj.createrName +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-6'><span>更新时间：</span><span>"+ parseTime(obj.modifyTime) +"</span></div><div class='col-md-6'><span>更新者：</span><span>"+ obj.updaterName +"</span></div></div>"
						+"<div class='row frame-row'><div class='col-md-12'><a href='javascript:void(0);' id='editposition'><span class='glyphicon glyphicon-pencil' ></span> 修改</a></div></div>"
					+"</div>"
					+"<script>"
					+"$('#pout-depart').on('click', function(){"
							+"pout();"
						+"});"
					+'$("#editposition").on("click", function(){'
							+'$(".pout-frame").find("input").removeAttr("disabled");'
							+'$(".pout-frame").find("textarea").removeAttr("disabled");'
							+'$(".pout-frame").find("select").removeAttr("disabled");'
							+'$(this).hide();'
						+'});'
					+"</script>";
					layer.open({
						type: 1,
						shift: 2,
						title: '岗位详情',
						btn: ['确定', '取消'],
						area: ['700px', '400px'],
						content: ctt,
						yes: function(index) {
							if($("#editposition").css("display") != "none"){
								return;
							}else{
								var name = $("#pout-positionname").val();
								var depart = $("#pout-fatherdepartval").val();
								var role = $("#pout-departpermissionval").val();
								var des = $("#pout-positiondes").val();
								var status = $("#pout-positionstatus").val();
								if(name == "" || status == ""){
									layer.alert("请填完整");
									return;
								}
								
								$.ajax({
									url: appServer + "/bops/systemposition/editposition.htm",
									type:"POST",
									data:{"name":name, "depart":depart, "role":role, "des":des, "status":status, "id":id},
									success:function(res){
										if(res.meta.success){
											layer.msg("修改成功");
											setTimeout("location.reload()", 1500);
										}else{
											layer.alert(res.meta.errorInfo);
										}
										layer.close(index);
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

	$(document).on("click", "#pout-positionpermission", function(){
		var departs = $("#pout-fatherdepartval").val();
		if(departs!=""){
			var depart = departs.split(",");
			$.ajax({
				url:appServer + "/bops/systemrole/getactiverolebylist.htm",
				type:"POST",
				data:{"depart":depart},
				success:function(res){
					if(res.meta.success){
						var obj = res.retObj;
						var str = "<div style='width:100%;' id='roleck'>";
						var rolelist = $("#pout-departpermissionval").val().split(",");
						for(var i=0; i<obj.length; i++){
							var flag = false;
							if(rolelist!=null){
								for(var j=0; j<rolelist.length; j++){
									if(rolelist[j] == obj[i].id){
										flag = true;
									}
								}
							}
							str += "<div class='checkbox' style='padding:10px 10px'><label><input type='checkbox' name='rolecheckbox' value='"+ obj[i].id +"' "+ (flag?"checked='checked'":"") +">"+ obj[i].name +"</label></div>"
						}
						str += "</div>";
						layer.open({
							type: 1,
							shift: 2,
							title: '部门权限',
							btn: ['确定', '取消'],
							area: ['400px', '400px'],
							content: str,
							yes:function(index){
								var roles =  $("#roleck").find("input[name='rolecheckbox']:checked");
								var vals = "";
								var rolesStr = "";
								for(var i=0;i<roles.length;i++){
									vals += roles[i].value;
									rolesStr += $(roles[i]).parent().text();
									if(i != roles.length-1){
										vals += ",";
										rolesStr += ",";
									}
								}
								
								$("#pout-departpermissionval").val(vals);
								$("#pout-positionpermission").val(rolesStr);
								layer.close(index);
							}
						});
					}
				},
				error:function(){
					layer.msg("网络错误");
				}
			});
		}else{
			layer.alert("请先选择部门");
		}
	});
	
	$(".position-depart-detail").on("click", function(){
		var id = $(this).attr("data-code");
		$.ajax({
			url: appServer + "/bops/systemposition/getpositiondepart.htm",
			type:"GET",
			data:{"id":id},
			success:function(res){
				if(res.meta.success){
					var str = "<div style='width:80%;margin:10px auto;'>";
					var obj = res.retObj;
					for(var i=0; i<obj.length; i++){
						str += "<div>"+(i+1) + "、" + obj[i].name + "</div>";
					}
					str += "</div>";
					layer.open({
						type: 1,
						shift: 2,
						title: '所属部门',
						btn: ['确定'],
						area: ['400px'],
						content: str
					});
				}else{
					layer.alert(res.meta.errorInfo);
				}
			}
		});
	});
	
	$(".position-role-detail").on("click", function(){
		var id = $(this).attr("data-code");
		$.ajax({
			url: appServer + "/bops/systemposition/getpositionrole.htm",
			type:"GET",
			data:{"id":id},
			success:function(res){
				if(res.meta.success){
					var str = "<div style='width:80%;margin:10px auto;'>";
					var obj = res.retObj;
					for(var i=0; i<obj.length; i++){
						str += "<div>"+(i+1) + "、" + obj[i].name + "</div>";
					}
					str += "</div>";
					layer.open({
						type: 1,
						shift: 2,
						title: '所含角色',
						btn: ['确定'],
						area: ['400px'],
						content: str
					});
				}else{
					layer.alert(res.meta.errorInfo);
				}
			}
		});
	});
	
	$(".position-ban").on("click", function(){
		var id = $(this).attr("data-code");
		layer.confirm('确定停用？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/systemposition/stopposition.htm',
                type:"GET",
                data:{"id":id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("停用成功！");
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
	
	$(".position-restart").on("click", function(){
		var id = $(this).attr("data-code");
		layer.confirm('确定启用？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/systemposition/restartposition.htm',
                type:"GET",
                data:{"id":id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("启用成功！");
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
	
	$(".position-delete").on("click", function(){
		var id = $(this).attr("data-code");
		layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/systemposition/deleteposition.htm',
                type:"GET",
                data:{"id":id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("删除成功！");
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
	
	$("#position-search").on("click", function(){
		$("#positionform").submit();
	});
	
	$("#save-dataper-btn").on("click", function(){
		var val = $("input[name='datar']:checked").val();
		var roleId = $("#fade-roleid").val();
		if(val == "" || val == null){
			layer.msg("请选择数据权限");
			return;
		}
		
		$.ajax({
			url: appServer + "/bops/systemrole/setpositiondataper.htm",
			type: "POST",
			data:{"positionId": roleId, "dataType":val},
			beforeSend:function(){
				loadIndex = layer.load(2);
			},
			success:function(res){
				layer.close(loadIndex);
				if(res.meta.success){
					layer.msg("操作成功");
				}else{
					layer.msg(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.close(loadIndex);
				layer.msg("网络错误");
			}
		});
	});
	
	$(".role-data-per").on("click", function(){
		event.stopPropagation();
        var id = $(this).attr("data-code");
        $.ajax({
        	url: appServer + "/bops/systemrole/getpositiondataper.htm",
        	type: "GET",
        	data:{"positionId": id},
        	beforeSend:function(){
        		loadIndex = layer.load(2);
        	},
        	success:function(res){
        		setTimeout("layer.close(loadIndex)", 300);
        		if(res.meta.success){
        			var list = res.retObj;
        			if(list!=null && list.length == 1){
        				var type = list[0].dataType;
        				$ipt = $(".fadePage").find("input[value='"+ type +"']");
        				$ipt.attr("checked='checked'");
        				$ipt.iCheck('check');
        			}else{
        				$("input[type='radio']").iCheck('uncheck');
        			}
        		}else{
        			layer.msg(res.meta.errorInfo);
        		}
        	},
        	error:function(){
        		layer.close(loadIndex);
        		layer.msg("网络错误");
        	}
        });
	    $(".fadePage").attr("class", "fadePage animated fadeInRight");
	    $("#fade-roleid").val(id);
		$(".fadePage").show();
	});
	
	$(".fadePage").on("click", function(event){
		event.preventDefault();
        event.stopPropagation();
	});
	
	$(document).on("click", function(){
		$(".fadePage").attr("class", "fadePage animated fadeOutRight");
	});
	
	$('.i-checks').iCheck({
             radioClass: 'iradio_square-green'
    });

});

function pout(){
	var ctt = '<div class="dtt"></div>'
			+'<script>'
			+'initDepartMenu();'	
			+"</script>";

		layer.open({
			type: 1,
			shift: 2,
			title: '选择部门',
			btn: ['确定', '取消'],
			area: ['400px', '500px'],
			content: ctt,
			yes: function(index) {
				var ipt = $("input[name='departcheck']:checked");
				var showStr = "";
				var valStr = "";
				for(var i=0; i<ipt.length; i++){
						showStr += ipt[i].getAttribute("desc");
						valStr +=ipt[i].value;
						if(i!=ipt.length-1){
							showStr += ",";
							valStr += ",";
						}
				}
				$("#pout-depart").val(showStr);
				$("#pout-fatherdepartval").val(valStr);
				layer.close(index);
			}
		});
}
var d;
function initDepartMenu(id){
	if(d!=null){
		$(".dtt").html(d.toString());
		if($("#pout-fatherdepartval").val()!=""){
			var arr = $("#pout-fatherdepartval").val().split(",");
			var ipt = $("input[name='departcheck']");
			for(var i=0; i<ipt.length; i++){
				for(var j=0;j<arr.length;j++){
					if(ipt[i].value == arr[j]){
						ipt[i].checked = "checked";
					}
				}
			}
		}
		return;
	}
	$.ajax({
			url:appServer + "/bops/systemdepart/getalldepart.htm",
			aysnc:false,
			type:"GET",
			success:function(res){
				if(res.meta.success){
					d = new dTree("d", false);
					var obj = res.retObj;
					d.add(null, -1, "部门选择");
					for(var i=0;i<obj.length;i++){
							d.add(obj[i].id, obj[i].fid, "departcheck", obj[i].id, obj[i].name);
//							$("#"+id).find("ul").append("<li class='active'><a href='#' class='titleli' data-code='"+ obj[i].id  + "'" + (obj[i].status==2?"style='color:#9e9e9e'>":">") + obj[i].name +"</a></li>");
					}
					
				   $(".dtt").html(d.toString());
				   if($("#pout-fatherdepartval").val()!=""){
						var arr = $("#pout-fatherdepartval").val().split(",");
						var ipt = $("input[name='departcheck']");
						for(var i=0; i<ipt.length; i++){
							for(var j=0;j<arr.length;j++){
								if(ipt[i].value == arr[j]){
									ipt[i].checked = "checked";
								}
							}
						}
					}
				}
			}
		});
}