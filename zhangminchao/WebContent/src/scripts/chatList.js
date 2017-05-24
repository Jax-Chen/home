$(function(){
	
	$("body").on("click",".delete",function(){
		
		var noticeId = $(this).siblings(".noticeId").val();
		
		layer.confirm('确定删除公告？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/notice/delete.do',
                type: "POST",
                data: {"noticeId": noticeId},
//                beforeSend:function(){
//                    loadIndex = layer.load(1);
//                },
                success:function(ret){
//                    layer.close(loadIndex);
                	var res = JSON.parse(ret);
                    if(res.meta.success){
                        layer.msg("公告已删除！");
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
	
	$('#message').keydown(function(e){
		if(e.keyCode==13){
			var content = $(this).val();
			
			 $.ajax({
	                url: appServer+'/public/chat/add.do',
	                type: "POST",
	                data: {"content": content},
	                success:function(ret){
	                	var res = JSON.parse(ret);
	                    if(res.meta.success){
	                    	var obj = res.data;
	                    	
	                    	var ctt = 
	                    	'<div class="chat-message">'+
	                            '<img class="message-avatar" src="' + appServer + '/hadmin/img/a1.jpg" alt="">'+
	                            '<div class="message">'+
	                                '<a class="message-author" href="#"> ' + obj.name + '</a>'+
	                                '<span class="message-date">' + (obj.createTime==""?"":new Date(obj.createTime).format("yyyy-MM-dd hh:mm:ss")) + ' </span>'+
	                                '<span class="message-content">'+
										obj.content
	                                '</span>'+
	                           ' </div>'+
	                        '</div>';
	                    	
	                    	$(".chat-discussion").append(ctt);
	                    	
	                        layer.msg("发送成功！");
	                        $("#message").val("");
	                        
	                    }else{
	                        layer.alert(res.meta.errorInfo, {icon:2});
	                    }
	                },
	                error:function(){
	                    layer.close(cindex);
	                    layer.msg('网络错误！');
	                }
	                
	            });
		}
	});
	
	
	//定时任务
	setInterval(function(){
    	
		$.ajax({
            url: appServer+'/public/chat/list.do',
            type: "POST",
            success:function(ret){
            	var res = JSON.parse(ret);
                if(res.meta.success){
                	var obj = res.data;
                	var ctt = "";
                	for(var i=0; i<obj.length; i++){
                        var nobj = obj[i];
                        
                      ctt += 
                        	'<div class="chat-message">'+
	                        	'<img class="message-avatar" src="' + appServer + '/hadmin/img/a1.jpg" alt="">'+
	                        	'<div class="message">'+
		                        	'<a class="message-author" href="#"> ' + nobj.name + '</a>'+
		                        	'<span class="message-date">' + (nobj.createTime==""?"":new Date(nobj.createTime).format("yyyy-MM-dd hh:mm:ss")) + ' </span>'+
		                        	'<span class="message-content">'+
		                        		nobj.content + 
		                        	'</span>'+
	                        	' </div>'+
                        	'</div>';
                        
                	}
                	
                	$(".chat-discussion").html(ctt);
                	
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(cindex);
                layer.msg('网络错误！');
            }
            
        });
		
    	},2000);
});


function search_click(){
	$("#od-search-new").click();
}