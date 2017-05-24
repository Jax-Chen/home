$(function(){
	
	
	$("body").on("click",".edit",function(){
		var userId = $(this).attr("data-id");
		
		$.ajax({
	        url: appServer+'/front/user/detailFront.do',
	        type: "POST",
	        data: {"userId": userId},
	        success:function(ret){
	        	var res = JSON.parse(ret);
	            if(res.meta.success){
	            	var obj = res.retObj.user;
	            	var home = res.retObj.hList;
	            	
	            	var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
	       		 
	        		ctt += '<div class="form-group" style="margin-top:25px;">'+
	                '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>所属社区</label>'+
	                '<div class="col-sm-4">'+
	                	'<select type="text" class="form-control" id="i-homeId" style="font-size:13px;">';
	        		
			        		for(var i=0; i<home.length; i++){
		                        var nobj = home[i];
		                       ctt += '<option value="' + nobj.id + '" ' + (nobj.id==obj.homeId?"selected":"") + '>' + nobj.name + '</option>';
		                	}
	                		
	         ctt +=     '</select>'+
	                '</div>'+
	                
	                	'<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>真实姓名</label>'+
	        	        '<div class="col-sm-4">'+
	        	        
	        		        "<input type='text' id='i-name' value='" + obj.name + "' class='form-control' style='float:left;width:100%;'>"+
	        	        
	        	        '</div>'+
	        	        
	        	        
	        	    '</div>';
	                
	        			
	        			
	        			
	        		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	                    '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>登录账号</label>'+
	                    '<div class="col-sm-4">'+
	                        '<input type="text" class="form-control" id="i-uname" value="' + obj.uname + '">'+
	                    '</div>'+
	                    
	                    
	                    '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>注册手机</label>'+
	                    '<div class="col-sm-4">'+
	                        '<input type="text" class="form-control" id="i-mobile" value="' + obj.mobile + '">'+
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
	                  '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>'+
	                  '<div class="col-sm-4">'+
	                      '<input type="password" disabled class="form-control" id="i-password" value="' + obj.password + '">'+
	                  '</div>'+
	                  
	                  
	                  '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>密码确认</label>'+
	                  '<div class="col-sm-4">'+
	                      '<input type="password" disabled class="form-control" id="i-password2" value="' + obj.password + '">'+
	                  '</div>'+
	                  
	              '</div>';
	        		  
	        		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	                  '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>'+
	                  '<div class="col-sm-4">'+
	                      '<input type="text" class="form-control" id="i-email" value="' + obj.email + '">'+
	                  '</div>'+
	                  
	                  '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;"></span><span style="color:red;">*</span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>'+
	                  '<div class="col-sm-4" style="">'+
	                  	'<label> <input type="radio" class="i-checks" ' + (obj.sex == 1?"checked":"") + ' value="1" name="i-sex"> <i></i> 先生</label>'+
	                  	"&nbsp;&nbsp;&nbsp;&nbsp;"+
	                  	'<label> <input type="radio" class="i-checks" ' + (obj.sex == 0?"checked":"") + '  value="0" name="i-sex"> <i></i> 女士</label>'+
	                  '</div>'+
	              '</div>';
	        		  
	        		  
	        		  
	        		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	                    '<label style="margin-top:0" class="col-sm-2 control-label">生&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;日</label>'+
	                    '<div class="col-sm-4">'+
	                        '<input type="text" class="form-control" id="i-birthday" value="' + (obj.birthday==""?"":new Date(obj.birthday).format("yyyy-MM-dd")) + '" onclick="laydate({istime: true, format: \'YYYY-MM-DD\'})">'+
	                    '</div>'+
	                    
	                    '<label style="margin-top:0" class="col-sm-2 control-label">座&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;机</label>'+
	                    '<div class="col-sm-4">'+
	                        '<input type="text" class="form-control" id="i-tel" value="' + obj.tel + '">'+
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
	        			              '<input type="text" class="form-control" id="i-remark" value="' + obj.remark + '">'+
	        			          '</div>'+
	        			      '</div>';
	        		  
	        		  ctt += '<div class="form-group" style="margin-top:25px;">'+
	        			        '<label style="margin-top:0" class="col-sm-2 control-label">有无老伴</label>'+
	        			        '<div class="col-sm-4">'+
	        				        '<div class="onoffswitch">'+
	        			                  '<input type="checkbox" class="onoffswitch-checkbox" id="notSendSms">'+
	        			                  '<label class="onoffswitch-label" for="notSendSms">'+
	        			                      '<span class="onoffswitch-inner"></span>'+
	        			                      '<span class="onoffswitch-switch"></span>'+
	        			                  '</label>'+
	        			              '</div>'+
	        		              '</div>'+
	        			        
	        			        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;"></span>有无子女</label>'+
	        			        '<div class="col-sm-4">'+
	        				        '<div class="onoffswitch">'+
	        			                  '<input type="checkbox" class="onoffswitch-checkbox" id="notSendEmail">'+
	        			                  '<label class="onoffswitch-label" for="notSendEmail">'+
	        			                      '<span class="onoffswitch-inner"></span>'+
	        			                      '<span class="onoffswitch-switch"></span>'+
	        			                  '</label>'+
	        			              '</div>'+
	        		              '</div>'+
	        			    '</div>';
	        		  
	              
	        	
	                   
	                ctt += '</div>';
	        	layer.open({
	        				id:"layer-useradd",
	        	           type:1,
	        	           title:'修改资料',
	        	           btn:['保存', '取消'],
	        	           area:['650px','600px'],
	        	           content:ctt,
	        	           yes:function(index){
	        	                
	        	        	   var homeId = $("#i-homeId").val();
	        	        	   var name = $("#i-name").val();
	        	        	   var uname = $("#i-uname").val();
	        	        	   var mobile = $("#i-mobile").val();
	        	        	   
	        	        	   
	        	        	   var password = $("#i-password").val();
	        	        	   var password2 = $("#i-password2").val();
	                           var email = $("#i-email").val();
	                           var sex = $("input[name='i-sex']:checked").val();
	                           
	                           var birthday = $("#i-birthday").val();
	                           var tel = $("#i-tel").val();
	                           var address = $("#i-address").val();
	                           var remark = $("#i-remark").val();
	                           
	                           if(name == ""){
	                               layer.alert("请填写真实姓名！", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           if(uname == ""){
	                        	   layer.alert("请填写登录账号！", {icon: 2,title:"警告"});
	                        	   return false;
	                           }
	                           
	                           if(mobile == ""){
	                               layer.alert("请填写手机！", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           if(password=="" ||password.length<6 || password.length>16){
	                        	   layer.alert("密码长度为6-16位！", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           if(password != password2){
	                        	   layer.alert("两次密码输入不一致", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           if(email == ""){
	                               layer.alert("请填写邮箱！", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           if(address == ""){
	                               layer.alert("请填写地址！", {icon: 2,title:"警告"});
	                               return false;
	                           }
	                           
	                           layer.confirm('确定修改资料？', {icon: 3, title:'提示'}, function(cindex){
	                			   $.ajax({
	                                   url:appServer+'/front/user/editFront.do',
	                                   type:"POST",
	                                   data:{"userId":userId,"homeId":homeId,"name":name,"uname":uname,"mobile":mobile,"password":password,"email":email,"sex":sex,"birthday":birthday,"tel":tel,"address":address,"remark":remark},
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