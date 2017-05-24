$(function(){
	
	$(".register").click(function(){
		
		var uname = $("#uname").val();
		var password = $("#password").val();
		var password2 = $("#password2").val();

		if($.trim(uname) == ""){
			layer.msg("用户名不能为空！");
			return false;
		}
		
		if($.trim(password) == ""){
			layer.msg("密码不能为空！");
			return false;
		}
		
		if($.trim(password2) == ""){
			layer.msg("确认密码不能为空！");
			return false;
		}
		
		if($.trim(password) != $.trim(password2)){
			layer.msg("两次密码不一致！");
			return false;
		}
		
	});
	
	
});