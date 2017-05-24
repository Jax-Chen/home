$(function(){
	$(".bt_add").on("click", function(){
		
		var ct = "<table style='width:80%;margin:0 auto;'>" +
				"<tr style='height:35px;'><th>所需金额:</th><td><input id='needAmount' value='' /></td></tr>" +
				"<tr style='height:35px;'><th>赠送金额:</th><td><input id='giftAmount' value='' /></td></tr>" +
				"</table>";
		
		layer.open({
			btn:['确定', '取消'],
			title:'添加定义',
			type: 1,
			area:['300px', '200px'],
			content:ct,
			yes:function(index){
				var needAmount = $("#needAmount").val();
				var giftAmount = $("#giftAmount").val();
				if(checkAmount(needAmount)){
					layer.alert('请输入正确的所需金额', {icon:2});
					return;
				}
				
				if(checkAmount(giftAmount)){
					layer.alert('请输入正确的赠送金额', {icon:2});
					return;
				}
				
				layer.confirm('确定添加？', {icon: 3, title:'提示'}, function(cindex){
    				$.ajax({
        				url:appServer+'/bops/money/addgiftmoney.htm',
        				type:"POST",
        				data:{"needAmount":needAmount, "giftAmount":giftAmount},
        				beforeSend:function(){
        					loadIndex = layer.load(1);
        				},
        				success:function(res){
        					layer.close(loadIndex);
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
});

function checkAmount(amount){
	var a=/^[0-9]*(\.[0-9]{1,2})?$/;
	if(!a.test(amount)||amount==""){
		return true;
	}else{
		return false;
	}
}

function del(id){
	layer.confirm('确定删除？', {icon: 3, title: '提示'}, function(index){
		$.ajax({
			url:appServer+'/bops/money/delgiftmoney.htm',
			type:"POST",
			data:{"id":id},
			beforeSend:function(){
				loadIndex = layer.load(1);
			},
			success:function(res){
				layer.close(loadIndex);
				if(res.meta.success){
					layer.msg("删除成功！");
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

