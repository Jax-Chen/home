$(function() {
	
	$("#back").on("click", function() {
		history.go(-1);
		return false;
	});
	
	$("#submit").on("click", function() {
		var form = new FormData($('#menuItemForm')[0]);
		var url = '/bops/menuItem/add';
		$.ajax({
			url:appServer+url+".htm",
			type:"POST",
			data: form,
			processData: false,  
            contentType: false,
			success:function(res){
				if(res.meta.success){
					layer.msg("添加成功");
					setTimeout("location.reload();", 2000);
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(xhr){
				layer.alert("网络错误！");
			}
		});
		
	});
	
});