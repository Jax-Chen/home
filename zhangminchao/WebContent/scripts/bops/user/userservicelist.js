$(function(){
	
	$("#ser-sub").on("click", function(){
		var text = $("#userv").val();
		if(text != ""){
			layer.confirm('确定添加？', {icon: 3, title:'提示'}, function(cindex){
                $.ajax({
                    url:appServer+'/bops/user/addusermarketservicelog.htm',
                    type:"POST",
                    data:{"userId":$("#userId").val(), "log":text},
                    beforeSend:function(){
                        loadIndex = layer.load(1);
                    },
                    success:function(res){
                        layer.close(loadIndex);
                        if(res.meta.success){
                            layer.msg("添加成功！");
                            setTimeout("location.reload()", 1000)
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
		}else{
			layer.alert("请填写内容");
		}
	});
	
});