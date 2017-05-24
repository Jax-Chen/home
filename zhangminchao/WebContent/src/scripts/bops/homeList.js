$(function(){
	
	$("body").on("click",".delete",function(){
		
		var homeId = $(this).siblings(".homeId").val();
		
		layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/home/delete.do',
                type: "POST",
                data: {"homeId": homeId},
//                beforeSend:function(){
//                    loadIndex = layer.load(1);
//                },
                success:function(ret){
//                    layer.close(loadIndex);
                	var res = JSON.parse(ret);
                    if(res.meta.success){
                        layer.msg("删除成功！");
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
	
	$("body").on("click",".home-add",function(){
		
		
		var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
		 
			
		  ctt += '<div class="form-group" style="margin-top:25px;">'+
            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>社区名称</label>'+
            '<div class="col-sm-4">'+
                '<input type="text" class="form-control" id="i-name" value="">'+
            '</div>'+
            
            
            '<label style="margin-top:0" class="col-sm-2 control-label">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>'+
            '<div class="col-sm-4">'+
                '<input type="text" class="form-control" id="i-zIndex" value="">'+
            '</div>'+
            
            
            
           "<script>"+
               "$(document).ready(function () {"+
                  "$('.i-checks').iCheck({"+
                       "checkboxClass: 'icheckbox_square-green',"+
                       "radioClass: 'iradio_square-green'," +
                   "});"+
               "});"+
          " </script>"+
           
        '</div>';
			
		  ctt += '<div class="form-group" style="margin-top:25px;">'+
          '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>管理员</label>'+
          '<div class="col-sm-4">'+
              '<input type="text" class="form-control" id="i-managerName" value="">'+
          '</div>'+
          
          
          '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>联系方式</label>'+
          '<div class="col-sm-4">'+
              '<input type="text" class="form-control" id="i-managerMobile" value="">'+
          '</div>'+
          
      '</div>';
		  
		  
		  ctt += '<div class="form-group" style="margin-top:25px;">'+
			          '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</label>'+
			          '<div class="col-sm-10">'+
			              '<input type="text" class="form-control" id="i-address" value="" >'+
			          '</div>'+
			          
			      '</div>';
		  
		  ctt += '<div class="form-group" style="margin-top:25px;">'+
			          
			          '<label style="margin-top:0" class="col-sm-2 control-label">备&nbsp;&nbsp&nbsp;&nbsp;&nbsp;注</label>'+
			          '<div class="col-sm-10">'+
			              '<input type="text" class="form-control" id="i-mark" value="">'+
			          '</div>'+
			      '</div>';
		  
           
        ctt += '</div>';
	layer.open({
				id:"layer-homeadd",
	           type:1,
	           title:'添加社区',
	           btn:['保存', '取消'],
	           area:['650px','360px'],
	           content:ctt,
	           yes:function(index){
	                
	        	   var name = $("#i-name").val();
	        	   var zIndex = $("#i-zIndex").val();
	        	   var managerName = $("#i-managerName").val();
	        	   
	        	   var managerMobile = $("#i-managerMobile").val();
                   var address = $("#i-address").val();
                   var mark = $("#i-mark").val();
                   
                   if(name == ""){
                       layer.alert("请填写社区名称！", {icon: 2,title:"警告"});
                       return false;
                   }
                   
                   if(managerName == ""){
                       layer.alert("请填写社区管理员！", {icon: 2,title:"警告"});
                       return false;
                   }
                   
                   if(managerMobile == ""){
                       layer.alert("请填写管理员联系方式！", {icon: 2,title:"警告"});
                       return false;
                   }
                   
                   if(address == ""){
                       layer.alert("请填写社区地址！", {icon: 2,title:"警告"});
                       return false;
                   }
                   
                   layer.confirm('确定添加用户？', {icon: 3, title:'提示'}, function(cindex){
        			   $.ajax({
                           url:appServer+'/bops/home/add.do',
                           type:"POST",
                           data:{"name":name,"zIndex":zIndex,"managerName":managerName,"managerMobile":managerMobile,"address":address,"mark":mark},
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
	
	$("body").on("click",".edit",function(){
		var homeId = $(this).siblings(".homeId").val();
		
		$.ajax({
	        url: appServer+'/bops/home/detail.do',
	        type: "POST",
	        data: {"homeId": homeId},
	        success:function(ret){
	        	var res = JSON.parse(ret);
	            if(res.meta.success){
	            	var obj = res.retObj;
	            	
	            	var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
	       		 
	            	ctt += "<input type='hidden' id='i-homeId' value=" + homeId + ">";
	            	
	    			
	      		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	                  '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>社区名称</label>'+
	                  '<div class="col-sm-4">'+
	                      '<input type="text" class="form-control" id="i-name" value="' + obj.name + '">'+
	                  '</div>'+
	                  
	                  
	                  '<label style="margin-top:0" class="col-sm-2 control-label">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>'+
	                  '<div class="col-sm-4">'+
	                      '<input type="text" class="form-control" id="i-zIndex" value="' + (obj.zIndex==null?"0":obj.zIndex) + '">'+
	                  '</div>'+
	                  
	                  
	                  
	                 "<script>"+
	                     "$(document).ready(function () {"+
	                        "$('.i-checks').iCheck({"+
	                             "checkboxClass: 'icheckbox_square-green',"+
	                             "radioClass: 'iradio_square-green'," +
	                         "});"+
	                     "});"+
	                " </script>"+
	                 
	              '</div>';
	      			
	      		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	                '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>管理员</label>'+
	                '<div class="col-sm-4">'+
	                    '<input type="text" class="form-control" id="i-managerName" value="' + obj.managerName + '">'+
	                '</div>'+
	                
	                
	                '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>联系方式</label>'+
	                '<div class="col-sm-4">'+
	                    '<input type="text" class="form-control" id="i-managerMobile" value="' + obj.managerMobile + '">'+
	                '</div>'+
	                
	            '</div>';
	      		  
	      		  
	      		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	      			          '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</label>'+
	      			          '<div class="col-sm-10">'+
	      			              '<input type="text" class="form-control" id="i-address" value="' + obj.address + '" >'+
	      			          '</div>'+
	      			          
	      			      '</div>';
	      		  
	      		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	      			          
	      			          '<label style="margin-top:0" class="col-sm-2 control-label">备&nbsp;&nbsp&nbsp;&nbsp;&nbsp;注</label>'+
	      			          '<div class="col-sm-10">'+
	      			              '<input type="text" class="form-control" id="i-mark" value="' + obj.mark + '">'+
	      			          '</div>'+
	      			      '</div>';
	      		  
	                 
	              ctt += '</div>';
	      	layer.open({
	      				id:"layer-homeadd",
	      	           type:1,
	      	           title:'添加社区',
	      	           btn:['保存', '取消'],
	      	           area:['650px','360px'],
	      	           content:ctt,
	      	           yes:function(index){
	      	                
	      	        	   var name = $("#i-name").val();
	      	        	   var zIndex = $("#i-zIndex").val();
	      	        	   var managerName = $("#i-managerName").val();
	      	        	   
	      	        	   var managerMobile = $("#i-managerMobile").val();
	                         var address = $("#i-address").val();
	                         var mark = $("#i-mark").val();
	                         var i_homeId = $("#i-homeId").val();
	                         
	                         
	                         if(name == ""){
	                             layer.alert("请填写社区名称！", {icon: 2,title:"警告"});
	                             return false;
	                         }
	                         
	                         if(managerName == ""){
	                             layer.alert("请填写社区管理员！", {icon: 2,title:"警告"});
	                             return false;
	                         }
	                         
	                         if(managerMobile == ""){
	                             layer.alert("请填写管理员联系方式！", {icon: 2,title:"警告"});
	                             return false;
	                         }
	                         
	                         if(address == ""){
	                             layer.alert("请填写社区地址！", {icon: 2,title:"警告"});
	                             return false;
	                         }
	                         
	                         layer.confirm('确定修改？', {icon: 3, title:'提示'}, function(cindex){
	              			   $.ajax({
	                                 url:appServer+'/bops/home/edit.do',
	                                 type:"POST",
	                                 data:{"homeId":i_homeId,"name":name,"zIndex":zIndex,"managerName":managerName,"managerMobile":managerMobile,"address":address,"mark":mark},
	                                 beforeSend:function(){
	                                     loadIndex = layer.load(1);
	                                 },
	                                 success:function(ret){
	                              	   var res = JSON.parse(ret);
	                                     layer.close(loadIndex);
	                                     if(res.meta.success){
	                                  	   
	                              		   layer.msg("修改成功！");
	                                  	   
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

function search_click(){
	$("#od-search-new").click();
}