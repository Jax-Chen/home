$(function(){
	
	$("body").on("click",".cancel",function(){
		
		var orderId = $(this).siblings(".orderId").val();
		
		layer.confirm('确定取消？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/order/update.do',
                type: "POST",
                data: {"orderId": orderId,"status":3},
//                beforeSend:function(){
//                    loadIndex = layer.load(1);
//                },
                success:function(ret){
//                    layer.close(loadIndex);
                	var res = JSON.parse(ret);
                    if(res.meta.success){
                        layer.msg("取消成功！");
                        setTimeout(function(){
                        	$("#od-search-new").click();
                        	},1000);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(cindex);
                    layer.msg('网络错误！');
                }
                
            });
        }); 
    	
	});
	
	$("body").on("click",".begin",function(){
		
		var orderId = $(this).siblings(".orderId").val();
		
		layer.confirm('确定开始处理订单？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/order/update.do',
                type: "POST",
                data: {"orderId": orderId,"status":1},
//                beforeSend:function(){
//                    loadIndex = layer.load(1);
//                },
                success:function(ret){
//                    layer.close(loadIndex);
                	var res = JSON.parse(ret);
                    if(res.meta.success){
                        layer.msg("订单已开始！");
                        setTimeout(function(){
                        	$("#od-search-new").click();
                        	},1000);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(cindex);
                    layer.msg('网络错误！');
                }
                
            });
        }); 
    	
	});	
	
	
	$("body").on("click",".delete",function(){
		
		var orderId = $(this).siblings(".orderId").val();
		
		layer.confirm('确定删除订单？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/order/delete.do',
                type: "POST",
                data: {"orderId": orderId},
//                beforeSend:function(){
//                    loadIndex = layer.load(1);
//                },
                success:function(ret){
//                    layer.close(loadIndex);
                	var res = JSON.parse(ret);
                    if(res.meta.success){
                        layer.msg("订单已删除！");
                        setTimeout(function(){
                        	$("#od-search-new").click();
                        	},1000);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(cindex);
                    layer.msg('网络错误！');
                }
                
            });
        }); 
    	
	});	
	
});

function search_click(){
	$("#od-search-new").click();
}