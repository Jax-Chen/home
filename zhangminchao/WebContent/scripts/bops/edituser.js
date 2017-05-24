$(function(){
	
/*	$(".edit-a").on("click", function(){
		$o = $(this);
		if($o.text()=="编辑"){
			$o.siblings("span").hide();
			$o.siblings("select").show();
			$o.text("确定");
		}else if($o.text()=="确定"){
			var txt = $o.siblings("select").find("option:selected").text();
			$o.siblings("span").text(txt);
			$o.siblings("span").show();
			$o.siblings("select").hide();
			$o.text("编辑");
		}
	});*/
	
	$("#edit-userFrom").on("click", function(){
		$o = $(this);
		if($o.text()=="编辑"){
			$o.siblings("span").hide();
			$o.siblings("select").show();
			$o.text("确定");
		}else if($o.text()=="确定"){
			var txt = $o.siblings("select").find("option:selected").text();
			var userFrom=$o.siblings("select").find("option:selected").val();
			var id =$("#id").val();
			$o.siblings("span").text(txt);
			$o.siblings("span").show();
			$o.siblings("select").hide();
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editUserFrom.htm',
					type:"POST",
					data:{"userFrom":userFrom,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$o.text("编辑");
		}
	});
	
	$("#edit-settlement").on("click", function(){
		$o = $(this);
		if($o.text()=="编辑"){
			$o.siblings("span").hide();
			$o.siblings("select").show();
			$o.text("确定");
		}else if($o.text()=="确定"){
			var txt = $o.siblings("select").find("option:selected").text();
			var settlementType=$o.siblings("select").find("option:selected").val();
			var id =$("#id").val();
			$o.siblings("span").text(txt);
			$o.siblings("span").show();
			$o.siblings("select").hide();
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editSettlementType.htm',
					type:"POST",
					data:{"settlementType":settlementType,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$o.text("编辑");
		}
	});
	
	$("#edit-notSendSms").on("click", function(){
		$o = $(this);
		if($o.text()=="编辑"){
			$o.siblings("span").hide();
			$o.siblings("select").show();
			$o.text("确定");
		}else if($o.text()=="确定"){
			var txt = $o.siblings("select").find("option:selected").text();
			var notSendSms=$o.siblings("select").find("option:selected").val();
			var id =$("#id").val();
			$o.siblings("span").text(txt);
			$o.siblings("span").show();
			$o.siblings("select").hide();
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editNotSendSms.htm',
					type:"POST",
					data:{"notSendSms":notSendSms,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$o.text("编辑");
		}
	});
	
	$("#edit-notSendEmail").on("click", function(){
		$o = $(this);
		if($o.text()=="编辑"){
			$o.siblings("span").hide();
			$o.siblings("select").show();
			$o.text("确定");
		}else if($o.text()=="确定"){
			var txt = $o.siblings("select").find("option:selected").text();
			var notSendEmail=$o.siblings("select").find("option:selected").val();
			var id =$("#id").val();
			$o.siblings("span").text(txt);
			$o.siblings("span").show();
			$o.siblings("select").hide();
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editNotSendEmail.htm',
					type:"POST",
					data:{"notSendEmail":notSendEmail,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$o.text("编辑");
		}
	});
	
	$("#edit-name").on("click", function(){
		$this = $(this);
		if($this.text()=="编辑"){
			$this.siblings("span").hide();
			$this.siblings("input").show();
			$this.text("确定");
		}else if($this.text()=="确定"){
			var txt = $this.siblings("input").val();
			var id =$("#id").val();
			$this.siblings("span").text(txt);
			$this.siblings("span").show();
			$this.siblings("input").hide();
			
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editUserName.htm',
					type:"POST",
					data:{"name":txt,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$this.text("编辑");
		}
	});
	
	
	$("#edit-mobile").on("click", function(){
		$this = $(this);
		if($this.text()=="编辑"){
			$this.siblings("span").hide();
			$this.siblings("input").show();
			$this.text("确定");
		}else if($this.text()=="确定"){
			var txt = $this.siblings("input").val();
			var id =$("#id").val();
			$this.siblings("span").text(txt);
			$this.siblings("span").show();
			$this.siblings("input").hide();
			
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editUserMobile.htm',
					type:"POST",
					data:{"mobile":txt,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$this.text("编辑");
		}
	});
	
	$("#edit-email").on("click", function(){
		$this = $(this);
		if($this.text()=="编辑"){
			$this.siblings("span").hide();
			$this.siblings("input").show();
			$this.text("确定");
		}else if($this.text()=="确定"){
			var txt = $this.siblings("input").val();
			var id =$("#id").val();
			$this.siblings("span").text(txt);
			$this.siblings("span").show();
			$this.siblings("input").hide();
			
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/user/editUserEmail.htm',
					type:"POST",
					data:{"email":txt,"id":id},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.msg('网络错误！');
					}
					
				});
			})
			$this.text("编辑");
		}
	});
	
	
	$("#edit-companyName").on("click", function(){
		$this = $(this);
		if($this.text()=="编辑"){
			$this.siblings("span").hide();
			$this.siblings("input").show();
			$this.text("确定");
		}else if($this.text()=="确定"){
			var txt = $this.siblings("input").val();
			var id =$("#id").val();
			var auth = $("#auth").val();
			$this.siblings("span").text(txt);
			$this.siblings("span").show();
			$this.siblings("input").hide();
			
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){
				
				if(auth == "1"){
					layer.alert('该用户已验证，修改需重新上传',{
						btn:['确定', '取消'],
						yes:function(index){
							layer.close(index);
							var ct = "<form id='fm'><table style='width:85%;margin:20px auto;border-collapse:separate;border-spacing:10px;'>" +
										"<tr><th>公司名：</th><td height='40px'><input id='reup-comname' name='comName' style='height:20px;width:200px;' value='"+txt+"'/></td></tr>"+
										"<tr><th>证件类型：</th><td><select id='reup-type' name='type'><option value='0'>营业执照</option><option value='1'>企业声明</option></select></td></tr>"+
										"<tr><th>证件文件：</th><td><input type='file' id='reup-file' name='file'/></td></tr>"+
									"</table></form>";
							layer.open({
								  type: 1,
								  closeBtn: 1, //不显示关闭按钮
								  btn: ['确定', '取消'],
								  shift: 2,
								  shadeClose: true, //开启遮罩关闭
								  area : ['400px' , '300px'],
								  title:'编辑',
								  content: ct,
								  yes:function(index){
									  if($("#reup-comname").val()==""){
										  layer.alert('请选择公司名！', {
											  icon: 5
											});
									  }else if($("#reup-file").val()==""){
										  layer.alert('请选择文件！', {
											  icon: 5
											});
									  }
									  
									  var form = new FormData($('#fm')[0]);
									  var comName = $("#reup-comname").val();
									  var type = $("#reup-type").val();
									  var file = $("#reup-file").val();
									  
									  form.append("id", id);
									  
									  var loadIndex;
										$.ajax({
											url:appServer+"/bops/user/reuploadcert.htm",
											type:"POST",
											data: form,
											processData: false,  
								            contentType: false,
											beforeSend:function(){
												loadIndex = layer.load(1, {
													  shade: [0.1,'#fff'] //0.1透明度的白色背景
													});
											},
											success:function(res){
												layer.close(loadIndex);
												if(res.meta.success){
													$this.siblings("span").text(comName);
													$this.siblings("input").val(comName);
													layer.msg('更新成功！');
													location.reload();
													layer.close(index);
												}else{
													layer.alert(res.meta.errorInfo, {icon: 2});
												}
											},
											error:function(xhr){
												layer.close(loadIndex);
												layer.alert('网络错误！', {icon: 2});
											}
										});
									  
								  }
								});
						}
					});
				}else{
					$.ajax({
						url:appServer+'/bops/user/editUserCompanyName.htm',
						type:"POST",
						data:{"companyName":txt,"id":id},
						success:function(res){
							if(res.meta.success){
								layer.msg("更新成功！");
								location.reload();
							}else{
								layer.alert(res.meta.errorInfo, {icon:2});
							}
						},
						error:function(){
							layer.msg('网络错误！');
						}
						
					});
				}
				
				
				
			})
			$this.text("编辑");
		}
	});
	
	
	
	
	$(".edit-c").on("click", function(){
		var id = $("#id").val();
		var cn = $("#companyName").val();
		var auth = $("#auth").val();
		$this = $(this);
		if(auth=="1"){
			layer.alert('该用户已验证，修改需重新上传',{
				btn:['确定', '取消'],
				yes:function(index){
					layer.close(index);
					var ct = "<form id='fm'><table style='width:85%;margin:20px auto;border-collapse:separate;border-spacing:10px;'>" +
								"<tr><th>公司名：</th><td height='40px'><input id='reup-comname' name='comName' style='height:20px;width:200px;' value='"+cn+"'/></td></tr>"+
								"<tr><th>证件类型：</th><td><select id='reup-type' name='type'><option value='0'>营业执照</option><option value='1'>企业声明</option></select></td></tr>"+
								"<tr><th>证件文件：</th><td><input type='file' id='reup-file' name='file'/></td></tr>"+
							"</table></form>";
					layer.open({
						  type: 1,
						  closeBtn: 1, //不显示关闭按钮
						  btn: ['确定', '取消'],
						  shift: 2,
						  shadeClose: true, //开启遮罩关闭
						  area : ['400px' , '300px'],
						  title:'编辑',
						  content: ct,
						  yes:function(index){
							  if($("#reup-comname").val()==""){
								  layer.alert('请选择公司名！', {
									  icon: 5
									});
							  }else if($("#reup-file").val()==""){
								  layer.alert('请选择文件！', {
									  icon: 5
									});
							  }
							  
							  var form = new FormData($('#fm')[0]);
							  var comName = $("#reup-comname").val();
							  var type = $("#reup-type").val();
							  var file = $("#reup-file").val();
							  
							  form.append("id", id);
							  
							  var loadIndex;
								$.ajax({
									url:appServer+"/bops/user/reuploadcert.htm",
									type:"POST",
									data: form,
									processData: false,  
						            contentType: false,
									beforeSend:function(){
										loadIndex = layer.load(1, {
											  shade: [0.1,'#fff'] //0.1透明度的白色背景
											});
									},
									success:function(res){
										layer.close(loadIndex);
										if(res.meta.success){
											$this.siblings("span").text(comName);
											$this.siblings("input").val(comName);
											layer.msg('编辑成功！');
											layer.close(index);
										}else{
											layer.alert(res.meta.errorInfo, {icon: 2});
										}
									},
									error:function(xhr){
										layer.close(loadIndex);
										layer.alert('网络错误！', {icon: 2});
									}
								});
							  
						  }
						});
				}
			});
		}else{
			if($this.text()=="编辑"){
				$this.siblings("span").hide();
				$this.siblings("input").show();
				$this.text("确定");
			}else if($this.text()=="确定"){
				var txt = $this.siblings("input").val();
				$this.siblings("span").text(txt);
				$this.siblings("span").show();
				$this.siblings("input").hide();
				$this.text("编辑");
			}
		}
		
		
	});
	
	$(".edit-auth").on("click", function(){
		$this = $(this);
		var id = $("#id").val();
		var loadIndex;
		layer.alert('确定设为不需要验证吗?', {
			title:'设置',
			btn:['确定', '取消'],
			yes:function(index){
				$.ajax({
					url:appServer+"/bops/user/changecert.htm",
					type:"POST",
					data:{"id":id},
					beforeSend:function(){
						loadIndex = layer.load(1, {
							  shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
					},
					success:function(res){
						layer.close(loadIndex);
						if(res.meta.success){
							$this.siblings('span').text("不需要验证");
							layer.msg('设置成功！');
							layer.close(index);
							$("#auth").val(3);
							$this.remove();
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon: 2});
						}
					},
					error:function(){
						layer.close(loadIndex);
						layer.alert("网络错误！", {icon: 2});
					}
				});
			}
		});
	});
	
	$("#edit-sub-btn").on("click", function(){
		var id = $("#id").val();
		var name = $("#name").val();
		var mobile = $("#mobile").val();
		var email = $("#email").val();
		var auth = $("#auth").val();
		var userFrom = $("#userFrom").val();
		var settlementType = $("#settlementType").val();
		var comName = $("#companyName").val();
		var notSendSms = $("#notSendSms").val();
		var notSendEmail = $("#notSendEmail").val();
		var loadIndex;
		$.ajax({
			url:appServer+"/bops/user/edituser.htm",
			type:"POST",
			data:{"id":id, "name":name, "mobile":mobile, "email":email, "auth":auth, "userFrom":userFrom, "settlementType":settlementType, "comName":comName, "notSendSms":notSendSms, "notSendEmail":notSendEmail},
			beforeSend:function(){
				loadIndex = layer.load(1, {
					  shade: [0.1,'#fff'] //0.1透明度的白色背景
				});
			},
			success:function(res){
				layer.close(loadIndex);
				if(res.meta.success){
					layer.msg('保存成功！');
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
				}
			},
			error:function(){
				layer.close(loadIndex);
				layer.alert('网络错误', {icon:2});
			}
		});
	});
});
