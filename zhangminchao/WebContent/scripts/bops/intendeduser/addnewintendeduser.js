$(function(){
	
	//提交按钮
	$("#int-sub-btn").on("click", function(){
		var userName = $("#uname").val();
		var companyName = $("#comname").val();
		var mobile = $("#mob").val();
		var email = $("#email").val();
		var tel = $("#tel").val();
		
		if(userName == ""){
			layer.alert("请填写用户姓名", {title:"警告"});
		}
		
		if(companyName == ""){
			layer.alert("请填写公司名称", {title:"警告"});
		}
		
		if(mobile == "" && tel == ""){
			layer.alert("手机座机必须填写一个", {title:"警告"});
		}
		
		$.ajax({
			url: imageServer + "/bops/user/addnewintendeduser.htm",
			type: "POST",
			data: {"userName": userName, "companyName":companyName, "mobile":mobile, "email":email, "tel":tel},
			success:function(res){
				if(res.meta.success){
					layer.msg("添加成功");
					$("#int-reset-btn").click();
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
		});
		
	});
	
	$("#int-reset-btn").on("click", function(){
		$(".form-horizontal").find("input").val("");
	});
	
});