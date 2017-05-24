$(function(){
	
	$("#pass").on("click", function(){
		var id = $("#orderId").val();
		layer.confirm('确定通过审核', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/bgcheck/auditpass.htm',
                type:"POST",
                data:{"id":id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("操作成功！");
                        $("btn").remove();
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
		
	});
	
	$("#no-pass").on("click", function(){
		var id = $("#orderId").val();
		var ctt = "<div class='ibox-content'><div class='col-md-12'>"+
			"<div class='form-group'>" +
			"<label style='vertical-align: top;'>审核意见: </label>"+
			"<textarea style='width:255px;height:165px;margin-left:10px;' id='auditDetail'></textarea>"+
			"</div>"+
		"</div></div>";
		layer.open({
		            type:1,
		            title:'编辑',
		            btn:['确定', '取消'],
		            area:['400px', '300px'],
		            content:ctt,
		            yes:function(index){
		                var text = $("#auditDetail").val();
		                var r = formatTextArea(text);
		                $.ajax({
		                	url: appServer + "/bops/bgcheck/auditdenied.htm",
		                	type: "POST",
		                	data: {"id":id, "reason": r},
		                	success:function(res){
		                		if(res.meta.success){
		                			$("btn").remove();
		                			layer.close(index);
		                			layer.msg("操作成功！");
		                		}else{
		                			layer.msg(res.meta.errorInfo);
		                		}
		                	}
		                });
		               
		            }
		        });    
		
	});
	
});