$(function(){
	$("#edit-edit").on("click", function(){
		$o = $(this);
		if($o.text()=="我要编辑"){
			$("table .s").hide();
			$("table .input-text").show();
			$o.text("取消编辑");
		}else if($o.text()=="取消编辑"){
			$("table .s").show();
			$("table .input-text").hide();
			$o.text("我要编辑");
		}
		
	});
	
	$("#sub").on("click", function(){
		if($("#edit-edit").text()=="我要编辑" && $("#password").val()=="" && $("#repeatPassword").val()=="" ){
			return false;
		}
		var companyName = $("#companyName").val();
		var account = $("#account").val(); 
		var domainName = $("#domainName").val(); 
		var ipAddress = $("#ipAddress").val(); 
		var signCode = $("#signCode").val();
		var id = $("#id").val();
		if(companyName=="" ||account=="" || domainName=="" || ipAddress=="" || signCode==""){
			layer.alert("参数不全");
		}
			var password = $("#password").val();
			var repeatPassword = $("#repeatPassword").val();
			if(!(password === repeatPassword)){
				layer.alert("两次输入的密码不一致");
			}
			if(password == null || repeatPassword ==null){
				layer.alert("密码不能为空");
			}
		$.ajax({
			url:appServer+'/bops/merchant/editChannel.htm',
			type:"POST",
			data:{"id":id,"companyName":companyName,"account":account,"domainName":domainName,"ipAddress" :ipAddress,"signCode":signCode,"password":password},
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
	});
	
});