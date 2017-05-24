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
	
	
	$("body").on("click",".add",function(){
		
		var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
		 
		 ctt += '<div class="form-group" style="margin-top:25px;">'+
         
		         	'<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>标&nbsp;&nbsp&nbsp;&nbsp;&nbsp;题</label>'+
			         '<div class="col-sm-10">'+
			             '<input type="text" class="form-control" id="i-title" value="">'+
			         '</div>'+
			     '</div>';
		
		
		  ctt += '<div class="form-group" style="margin-top:25px;">'+
			        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>作&nbsp;&nbsp&nbsp;&nbsp;&nbsp;者</label>'+
			        '<div class="col-sm-4">'+
			            '<input type="text" class="form-control" id="i-author" value="">'+
			        '</div>'+
			        
			        
			        '<label style="margin-top:0" class="col-sm-2 control-label">标签</label>'+
			        '<div class="col-sm-4">'+
			            '<input type="text" class="form-control" style="width:33%;float:left;" id="i-tag1" value="">'+
			            '<input type="text" class="form-control" style="width:33%;float:left;" id="i-tag2" value="">'+
			            '<input type="text" class="form-control" style="width:33%;float:left;" id="i-tag3" value="">'+
			        '</div>'+
			        
			    '</div>';
		  
		  ctt += '<textarea id="i-content" placeholder="请输入公告内容" style="padding:12px 16px;min-height:170px;margin-left:10px;" class="layui-textarea"></textarea>';

	       
	    ctt += '</div>';
	layer.open({
				id:"layer-useradd",
	           type:1,
	           title:'添加公告',
	           btn:['保存', '取消'],
	           area:['650px','420px'],
	           content:ctt,
	           yes:function(index){
	                
	        	   var title = $("#i-title").val();
	        	   var author = $("#i-author").val();
	        	   
	        	   var tag1 = $("#i-tag1").val();
	        	   var tag2 = $("#i-tag2").val();
	        	   var tag3 = $("#i-tag3").val();
	        	   
	        	   var content = $("#i-content").val();
	        	   
	               
	               if(title == ""){
	                   layer.alert("请填写标题！", {icon: 2,title:"警告"});
	                   return false;
	               }
	               
	               if(author == ""){
	            	   layer.alert("请填写作者！", {icon: 2,title:"警告"});
	            	   return false;
	               }
	               
	               if(content == ""){
	                   layer.alert("请填写公告内容！", {icon: 2,title:"警告"});
	                   return false;
	               }
	               
	               
	               layer.confirm('确定添加公告？', {icon: 3, title:'提示'}, function(cindex){
	    			   $.ajax({
	                       url:appServer+'/bops/notice/add.do',
	                       type:"POST",
	                       data:{"title":title,"author":author,"tag1":tag1,"tag2":tag2,"tag3":tag3,"content":content},
	                       beforeSend:function(){
	                           loadIndex = layer.load(1);
	                       },
	                       success:function(ret){
	                    	   var res = JSON.parse(ret);
	                           layer.close(loadIndex);
	                           if(res.meta.success){
	                        	   
	                    		   layer.msg("添加成功！");
	                        	   
	                               layer.close(index);
	                               setTimeout(function(){
	                               	$("#od-search-new").click();
	                               	},1000);
	                               
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

function search_click(){
	$("#od-search-new").click();
}