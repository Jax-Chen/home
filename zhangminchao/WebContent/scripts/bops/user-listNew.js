checkPermission();
marketTree();
var hasPermissionToDistribution = 0;
function checkPermission(){
    $.ajax({
        url: appServer + "/bops/haspermission.htm",
        type: "GET",
        data: {"url": ["/bops/user/batchsetmarketuser"]},
        success: function(res){
            if(res.meta.success){
                var obj = res.retObj;
                if(obj != null){
                	hasPermissionToDistribution = obj[0];
                }
            }
        },
        error: function(){
            layer.msg("网络错误");
        }
    });
}

/**
 * 创建8位随机数
 * @returns
 */
function createCode(){
	code="";
	var codeLength=8;
	var selectChar=new Array(0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
	
	for(var i=0;i<codeLength;i++){
		var charIndex=Math.floor(Math.random()*62);
		code+=selectChar[charIndex];
	}
	
	return code;
}

/**
 * 销售人员树状下拉框
 */
function marketTree(){
	 $.ajax({
	        url: appServer + "/bops/systemdepart/getMarketTree.htm",
	        type: "GET",
	        success: function(res){
	            if(res.meta.success){
	            	//树代码
	            	mydtree = new dTree('mydtree',imageServer + '/newframe/css/plugins/select-tree/imgmenu/','no','no');
	            	
	            	mydtree.add(-99,
               			 31,
                  		  "无销售",
                  		  "javascript:setvalue('-1','无销售')",
                  		  "无销售",
                  		"_systemuser",
                  		true,
                  		imageServer + '/newframe/css/plugins/select-tree/imgmenu/none.png',
                  		true);
	            	
	                var dep = res.retObj.marketDepartment;
	                var sysuser = res.retObj.systemUserList;
	                if(dep != null){
	                	for(var i=0; i<dep.length; i++){
	                        var nobj = dep[i];
	                       
	                        
	                        	 mydtree.add(nobj.id,
	                        			 nobj.id==31?-1:nobj.fid,
	 	                      		  nobj.name,
	 	                      		  "javascript:setvalue('" + nobj.id +"','" + nobj.name + "')",
	 	                      		  nobj.name,
	 	                      		  "_depart",
	 	                      		false);
	                        
	                       
	                        
	                	}
	                }
	                if(sysuser != null){
	                	for(var i=0; i<sysuser.length; i++){
	                		 var nobj = sysuser[i];
	                		 mydtree.add(nobj.id,
	                				 nobj.departId ,
 	                      		  nobj.nickName,
 	                      		  "javascript:setvalue('" + nobj.id +"','" + nobj.nickName + "')",
 	                      		  nobj.nickName,
 	                      		  "_systemuser",
 	                      		  true,
 	                      		imageServer + '/newframe/css/plugins/select-tree/imgmenu/user.png',
	 	                      	  true);
	                	}
	                }
	                
//	                console.log(mydtree);
                	$('#treediv').append(mydtree.toString());
                	//document.write(mydtree);
	            }
	        },
	        error: function(){
	            layer.msg("网络错误");
	        }
	    });
}

//<!-- 弹出层-->
//生成弹出层的代码
//点击菜单树给文本框赋值------------------菜单树里加此方法
function setvalue(id,name){
	$("#menu_parent_name").val(name);
	$("#menu_parent").val(id);
	$("#treediv").hide();
	search_click();
}

$(document).ready(function() {
	
	//生成弹出层的代码
//	<!-- 弹出层-->
	xOffset = -0;//向右偏移量
	yOffset = 30;//向下偏移量
	var toshow = "treediv";//要显示的层的id
	var target = "menu_parent_name";//目标控件----也就是想要点击后弹出树形菜单的那个控件id
	$('.wrapper-content').on("click", "#"+target, function(){
		$("#"+toshow)
		.css("position", "absolute")
		.css("left", $("#"+target).offset().left+xOffset + "px")
		.css("top", $("#"+target).offset().top+yOffset +"px").show();
	});
	
//	$('body').on("click", "#menu_parent_name1", function(){
//		$("#"+toshow)
//		.css("position", "absolute")
//		.css("left", $("#menu_parent_name1").offset().left+xOffset + "px")
//		.css("top", $("#menu_parent_name1").offset().top+yOffset +"px").show();
//	});
	
	//用户来源
	$('body').on("change", "#userFrom", function(){
//		alert($("input[name='settlementType']:checked").val());
//		$("#id").is(":checked");
		
		var v = $(this).val();
		if(v==4){
			$(".third-div").show();
			$("#companyAuth").iCheck('check');
			
		}else{
			$(".third-div").hide();
			
		}
	});
	
	//显示第三方用户
	$('body').on("mouseover", "#thirdName-i", function(){
		
		layer.tips($('#thirdId').find('option:selected').text(), '.thirdName-i',{
			tips:3
		});
		
	});
	
	//手置密码选中
	$('body').on("ifChecked", "#password-check", function(){
		$("#password").attr("disabled",false).val("").focus();
	});
	
	//手置密码取消
	$('body').on("ifUnchecked", "#password-check", function(){
		$("#password").attr("disabled",true).val("********");
	});
	
	//无须认证选中
	$('body').on("ifChecked", "#companyAuth", function(){
		var ctt = "<textarea id='reasontextarea' style='width:100%;height:100%;'></textarea>";
		layer.open({
			id:"layer-reason",
            type:1,
            title:'无须认证原因',
            btn:['确定'],
            area:['400px', '300px'],
            content:ctt,
            yes:function(index1){
                var text = $("#reasontextarea").val();
                
                if(text != ""){
                	
                	$("#i-reason").val(text);
                    $(".reason").css("display","");
                	
                    layer.msg("添加成功！");
                    layer.close(index1);
                }else{
					layer.msg("原因不能为空");
					return false;
				}
            },
            cancel:function(index1){
            	$("#companyAuth").iCheck('uncheck');
            	$("#userFrom").val(1);
            	$(".third-div").hide();
            	layer.close(index1);
            }
        });  
	});
	
	//查看原因
	$('body').on("click", ".reason", function(){
		var old = $("#i-reason").val();
		var ctt = "<textarea id='reasontextarea' style='width:100%;height:100%;'>" + old + "</textarea>";
		layer.open({
			id:"layer-reason",
            type:1,
            title:'无须认证原因',
            btn:['确定'],
            area:['400px', '300px'],
            content:ctt,
            yes:function(index1){
                var text = $("#reasontextarea").val();
                
                if(text != ""){
                	
                	$("#i-reason").val(text);
                    $(".reason").css("display","");
                	
                    layer.msg("修改成功！");
                    layer.close(index1);
                    
                }else{
					layer.msg("原因不能为空");
					return false;
				}
            }
        });  
	});
	
	
	//无须认证取消
	$('body').on("ifUnchecked", "#companyAuth", function(){
		$("#i-reason").val("");
		$(".reason").css("display","none");
		$(".third-div").hide();
		$("#userFrom").val(1);
	});
	
	
	
	//添加用户
	$('body').on("click", ".user-add", function(){
            $.ajax({
    			url:appServer+'/bops/user/loadThirdUser.htm',
    			type:"POST",
    			success:function(res){
    				if(res.meta.success){
    					
    						var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
    						 
    						ctt += '<div class="form-group" style="margin-top:25px;">'+
    				        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>用户来源</label>'+
    				        '<div class="col-sm-4">'+
    				        	'<select type="text" class="form-control" id="userFrom" style="font-size:13px;">'+
    				        		'<option value="1">线下签单</option>'+
    				        		'<option value="0">线上注册</option>'+
    				        		'<option value="4">渠道对接</option>'+
    				        		'<option value="2">好友邀请</option>'+
    				        		'<option value="3">活动邀请</option>'+
    				        	'</select>'+
    				        '</div>'+
    				        
    				        	'<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>分&nbsp;&nbsp;&nbsp;配</label>'+
    					        '<div class="col-sm-4">'+
    				            '<select type="text" class="form-control" id="distr" style="font-size:13px;">';
    								ctt += '<option value="">请选择</option>';
		    						if(hasPermissionToDistribution==1){
		    							var obj1 = res.retObj.ml;
			        					for(var i=0; i<obj1.length; i++){
			        						var nobj = obj1[i];
		    						
			        						ctt += '<option value="' + nobj.id + '">' + nobj.nickName + '</option>';
		    							
			        					}
		    						}else{
		    							ctt += '<option value="-1">分配给自己</option>';
		    						}
		    						
	        					
	        					
    							ctt += 
    					            '</select>'+
    					        '</div>'+
    					        
    					        
    					    '</div>';
    				        
    							
    					ctt += '<div class="form-group third-div" style="margin-top:25px;display:none;">'+
    							'<div class="" style=""><label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>渠&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</label>'+
        				        '<div class="col-sm-4">'+
        				            '<select type="text" class="form-control" id="thirdId" style="font-size:13px;">';
        						
    		    						var obj = res.retObj.tl;
    		        					for(var i=0; i<obj.length; i++){
    		        						var nobj = obj[i];
    	    						
    		        						ctt += '<option value="' + nobj.id + '">' + nobj.companyName + '</option>';
    	    							
    		        					}
    	        					
    	        					
        							ctt += 
        					            '</select>'+
        					        '</div>'+
        					      '</div>'+
        					     '</div>';
    							
    							
    							
    							
    						  ctt += '<div class="form-group" style="margin-top:25px;">'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>公司名称</label>'+
    				            '<div class="col-sm-7">'+
    				                '<input type="text" class="form-control" id="i-companyName" value="">'+
    				            '</div>'+
    				            '<label><input type="checkbox" id="companyAuth" class="i-checks">无须认证</label>'+
    				            '<a class="reason" href="javascrip:;" style="display:none;font-size:10px;color:red;margin-left:18px;text-decoration: underline;">原因</a>' +
    				            '<input type="hidden" id="i-reason" value="">'+
//			    				            '<div class="col-sm-7"> <div class="checkbox m-l m-r-xs">'+
//			    					            '<label><input type="checkbox" class="i-checks">无须认证</label>'+
//			    			               '</div></div>'+
    			               
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
    				            '<label style="margin-top:0" class="col-sm-2 control-label">显示昵称</label>'+
    				            '<div class="col-sm-4">'+
    				                '<input type="text" class="form-control" id="nickName" value="">'+
    				            '</div>'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>结算方式</label>'+
    				            '<div class="col-sm-4" style="margin-top:-15px;">'+
    				            	'<label> <input type="radio" class="i-checks" checked value="0" name="settlementType" id="settlementType"> <i></i> 不可月结</label>'+
    				            	'<label> <input type="radio" class="i-checks" value="1" name="settlementType" id="settlementType"> <i></i> 支持月结</label>'+
    				            '</div>'+
    				        '</div>';
    						  
    						  ctt += '<div class="form-group" style=";">'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>初始密码</label>'+
    				            '<div class="col-sm-7">'+
    				                '<input type="text" style="ime-mode:disabled;" class="form-control" id="password" value="">'+
    				            '</div>'+
//    				            '<label  id="password-check"><input type="checkbox" class="i-checks">手置密码</label>'+
    				            
    				        '</div>';
    						  
    						  ctt += '<div class="form-group" style="margin-top:25px;">'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>联&nbsp;系&nbsp;&nbsp;人</label>'+
    				            '<div class="col-sm-4">'+
    				                '<input type="text" class="form-control" id="name" value="">'+
    				            '</div>'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;"></span><span style="color:red;">*</span>性&nbsp;&nbsp;&nbsp;别</label>'+
    				            '<div class="col-sm-4" style="">'+
    				            	'<label> <input type="radio" class="i-checks" checked value="1" name="gender"> <i></i> 先生</label>'+
    				            	"&nbsp;&nbsp;&nbsp;&nbsp;"+
    				            	'<label> <input type="radio" class="i-checks" value="0" name="gender"> <i></i> 女士</label>'+
    				            '</div>'+
    				        '</div>';
    						  
    						  ctt += '<div class="form-group" style="margin-top:25px;">'+
    					        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</label>'+
    					        '<div class="col-sm-4">'+
    					            '<input type="text" class="form-control" id="mobile" value="">'+
    					        '</div>'+
    					        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;"></span><span style="color:red;">*</span>邮&nbsp;&nbsp;&nbsp;箱</label>'+
    					        '<div class="col-sm-4">'+
    					            '<input type="text" class="form-control" id="email" value="">'+
    					        '</div>'+
    					    '</div>';
    						  
    						  ctt += '<div class="form-group" style="margin-top:25px;">'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label">生&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;日</label>'+
    				            '<div class="col-sm-4">'+
    				                '<input type="text" class="form-control" id="birthday" value="" onclick="laydate({istime: true, format: \'YYYY-MM-DD\'})">'+
    				            '</div>'+
    				            '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;">*</span>状&nbsp;&nbsp;&nbsp;态</label>'+
    				            '<div class="col-sm-4" style="">'+
    				            	'<label> <input type="radio" class="i-checks" checked value="1" name="status"> <i></i> 正常</label>'+
    				            	"&nbsp;&nbsp;&nbsp;&nbsp;"+
    				            	'<label> <input type="radio" class="i-checks" value="2" name="status"> <i></i> 停用</label>'+
    				            '</div>'+
    				        '</div>';
    						  
    						  
    						  ctt += '<div class="form-group" style="margin-top:25px;">'+
    							        '<label style="margin-top:0" class="col-sm-2 control-label">平台短信</label>'+
    							        '<div class="col-sm-4">'+
    								        '<div class="onoffswitch">'+
    							                  '<input type="checkbox" class="onoffswitch-checkbox" id="notSendSms">'+
    							                  '<label class="onoffswitch-label" for="notSendSms">'+
    							                      '<span class="onoffswitch-inner"></span>'+
    							                      '<span class="onoffswitch-switch"></span>'+
    							                  '</label>'+
    							              '</div>'+
    						              '</div>'+
    							        
    							        '<label style="margin-top:0" class="col-sm-2 control-label"><span style="color:red;"></span>平台邮件</label>'+
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
    						  
//			    						 ctt +=  '<input type="text" placeholder="负责销售" name="" value="" id="menu_parent_name1" class="select_tree form-control layer-date"  style="width: 115%;height: 32px;">'+ 
//			    							
//			    							'<input type="hidden" name="${status.expression}" value="$!{status.value}" id="menu_parent" name="menu_parent">';
    						  
    						  
//			    					ctt+= '<div class="layui-form">'+
//			    							'<div class="layui-form-item">'+
//			    							    '<div class="layui-input-block">'+
//			    							      '<input name="close" lay-skin="switch" lay-text="wgwege|OFF" type="checkbox">'+
//			    							    '</div>'+
//			    							  '</div>'+
//			    							'</div>';
//			    					
//			    				      ctt += '<div class="layui-form"><div class="layui-form-item">'+
//			    						      '<label class="layui-form-label">开关-默认开</label>'+
//			    						      '<div class="layui-input-block">'+
//			    						        '<input checked="" name="open" lay-skin="switch" lay-filter="switchTest" lay-text="ON|OFF" type="checkbox">'+
//			    						      '</div>'+
//			    						    '</div> </div>'; 
    					
//    				      ctt += "<script>"+
//    					      	"layui.use('form', function(){"+
//    						    	  "var form = layui.form();"+
//    						    	  
//    						    	  //各种基于事件的操作，下面会有进一步介绍
//    						    	"});"+
//    						    	"</script>";
    				      
    					
    				           
    				        ctt += '</div>';
    					layer.open({
    								id:"layer-useradd",
    					           type:1,
    					           title:'添加用户',
    					           btn:['保存', '取消'],
    					           area:['650px','650px'],
    					           content:ctt,
    					           yes:function(index){
    					                
    					        	   var userFrom = $("#userFrom").val();
    					        	   var thirdId = $("#thirdId").val();
    					        	   var companyName = $("#i-companyName").val();
    					        	   var companyAuth = $("#companyAuth").is(":checked")==true?3:-1;
    					        	   var authReason = $("#i-reason").val();
    					        	   
    				                   var nickName = $("#nickName").val();
    				                   var settlementType = $("input[name='settlementType']:checked").val();
    				                   var password = $("#password").prop("disabled")==true?createCode():$("#password").val();
    				                   var name = $("#name").val();
    				                   var gender = $("input[name='gender']:checked").val();
    				                   
    				                   var mobile = $("#mobile").val();
    				                   var email = $("#email").val();
    				                   var birthday = $("#birthday").val();
    				                   var status = $("input[name='status']:checked").val();
    				                   var notSendSms = $("#notSendSms").is(":checked")==true?0:1;
    				                   
    				                   var notSendEmail = $("#notSendEmail").is(":checked")==true?0:1;
    				                   var distr = $("#distr").val();
    				                   
//    				                   "userFrom:"userFrom,"thirdId":thirdId,"companyName":companyName,"companyAuth":companyAuth,"authReason":authReason,"nickName":nickName,
//    				                   "settlementType":settlementType,"password":password,"name":name,"gender":gender,"mobile":mobile,"email":email,"birthday":birthday,
//    				                   "status":status,"notSendSms":notSendSms,"notSendEmail":notSendEmail,"distr":distr
    				                   if(companyName == ""){
    				                       layer.alert("请填写公司名称！", {icon: 2,title:"警告"});
    				                       return false;
    				                   }
    				                   
    				                   if(companyAuth==3){
    				                	   if(authReason==""){
    				                		   layer.alert("请填写无须认证原因！", {icon: 2,title:"警告"});
        				                       return false;
    				                	   }
    				                	   
    				                	   if(authReason.length>20){
    				                		   layer.alert("无须认证原因不得大于20个字！", {icon: 2,title:"警告"});
        				                       return false;
    				                	   }
    				                   }
    				                   
    				                   if(password=="" ||password.length<6 || password.length>16){
    				                	   layer.alert("密码长度为6-16位！", {icon: 2,title:"警告"});
    				                       return false;
    				                   }
    				                   
    				                   if(name == ""){
    				                       layer.alert("请填写联系人！", {icon: 2,title:"警告"});
    				                       return false;
    				                   }
    				                   
    				                   if(mobile == ""){
    				                       layer.alert("请填写手机！", {icon: 2,title:"警告"});
    				                       return false;
    				                   }
    				                   
    				                   if(email == ""){
    				                       layer.alert("请填写邮箱！", {icon: 2,title:"警告"});
    				                       return false;
    				                   }
    				                   $.ajax({
				                           url:appServer+'/bops/user/checkUserByCompanyName.htm',
				                           type:"POST",
				                           data:{"companyName":companyName},
				                           success:function(res){
				                               if(res.meta.success){
				                            	   var count = res.retObj;
				                            	   if(count>0){
				                            		   layer.confirm('该公司名称已存在，确定继续添加？', {icon: 3, title:'提示'}, function(cindex){
				                            			   $.ajax({
				    				                           url:appServer+'/bops/user/addUserNew.htm',
				    				                           type:"POST",
				    				                           data:{"userFrom":userFrom,"thirdId":thirdId,"companyName":companyName,"companyAuth":companyAuth,"authReason":authReason,"nickName":nickName,
				    				                        	   "settlementType":settlementType,"password":password,"name":name,"gender":gender,"mobile":mobile,"email":email,"birthday":birthday,
				    				                        	   "status":status,"notSendSms":notSendSms,"notSendEmail":notSendEmail,"distr":distr},
				    				                           beforeSend:function(){
				    				                               loadIndex = layer.load(1);
				    				                           },
				    				                           success:function(res){
				    				                               layer.close(loadIndex);
				    				                               if(res.meta.success){
				    				                            	   if(res.data!=null){
				    				                            		   layer.msg("添加成功,该用户已存在潜在用户列表，所以分配给了" + res.data); 
				    				                            	   }else{
				    				                            		   layer.msg("添加成功！");
				    				                            	   }
				    				                                   layer.close(index);
//				    				                                   setTimeout(search_click(), 2000);
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
				                            		   layer.confirm('确定添加用户？', {icon: 3, title:'提示'}, function(cindex){
					    				               		
				                            			   $.ajax({
				    				                           url:appServer+'/bops/user/addUserNew.htm',
				    				                           type:"POST",
				    				                           data:{"userFrom":userFrom,"thirdId":thirdId,"companyName":companyName,"companyAuth":companyAuth,"authReason":authReason,"nickName":nickName,
				    				                        	   "settlementType":settlementType,"password":password,"name":name,"gender":gender,"mobile":mobile,"email":email,"birthday":birthday,
				    				                        	   "status":status,"notSendSms":notSendSms,"notSendEmail":notSendEmail,"distr":distr},
				    				                           beforeSend:function(){
				    				                               loadIndex = layer.load(1);
				    				                           },
				    				                           success:function(res){
				    				                               layer.close(loadIndex);
				    				                               if(res.meta.success){
				    				                            	   if(res.data!=null){
				    				                            		   layer.msg("添加成功,该用户已存在潜在用户列表，所以分配给了" + res.data); 
				    				                            	   }else{
				    				                            		   layer.msg("添加成功！");
				    				                            	   }
				    				                                   layer.close(index);
//				    				                                   setTimeout(search_click(), 2000);
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
				                            	   
				                               }else{
				                                   layer.alert(res.meta.errorInfo, {icon:2});
				                               }
				                           },
				                           error:function(){
				                               layer.close(laodIndex);
				                               layer.msg('网络错误！');
				                           }
				                           
				                       }); 
    				               	
    					            }
    					        }); 
    							
    							
    						
    					
    					
    						
    				}else{
    					layer.msg('网络错误！');
    				}
    			},
    			error:function(){
    				layer.msg('网络错误！');
    			}
    		});
			            
	});
	
	
	
	//复选框
	$('.wrapper-content').on("click", ".allocation-all-box", function(){
//		console.log($(".allocation-all-box").is(":checked"));
		if ($(".allocation-all-box").is(":checked")) {
			$(".allocation-checkbox").each(function(i, item) {
				$(item).prop("checked", true);
			});
		} else {
			$(".allocation-checkbox").each(function(i, item) {
				$(item).prop("checked", false);
			});
		}
		cancelBubble();
	});
	
	//批量操作
	$('.wrapper-content').on("change", "#batch-operation", function(e){
		var type = $(this).val();
		var arr = $(".allocation-checkbox:checked");
		var valArr = [];
		for(var i = 0; i<arr.length; i++){
			valArr.push(arr[i].value);
		}
		
		if(type==1){//批量分配
			
			batchDistribution(valArr);
		}else if(type==2){//批量添加标签
			
			batchAddTag(valArr);
		}else if(type==3){//批量删除标签
			
			batchDeleteTag(valArr);
		}
		$(this).val("0").attr("selected");
		cancelBubble(e);
	});
	
	//详情里打标签
	$("body").on("click", "#tagDetail", function(){
		editTag($(this).attr("data-id"),$(this).attr("data-comName"));
	});
	
	//详情里打标签
	$("body").on("click", "#addTag", function(){
		var valArr = [];
		valArr.push($(this).attr("data-id"));
		batchAddTag(valArr);
	});
	
	//详情里删除标签
	$("body").on("click", "#deleteTag", function(){
		var valArr = [];
		valArr.push($(this).attr("data-id"));
		batchDeleteTag(valArr);
	});
	
	//详情里分配
	$("body").on("click", "#distribution", function(){
		var valArr = [];
		valArr.push($(this).attr("data-id"));
		batchDistribution(valArr);
	});
	
	//添加服务记录
	$("body").on("click", "#ser-sub", function(){
		var text = $("#userv").val();
		var forusersearch = $("#forusersearch").val() || 0;
		var userId = $(this).attr("data-id");
		if(text != ""){
			if(text.length>512){
				layer.msg("字数过长，需加长请联系技术人员");
				return false;
			}
			var nextFollowTime = $("#nextFollowTime").val();
			if(nextFollowTime!=null && jQuery.trim(nextFollowTime)!=""){
				text += "(" + "下次跟进时间为：" + nextFollowTime +  ")";
				if(forusersearch == "1" && !compareCalendar(getNowFormatDate(),nextFollowTime)){
					nextFollowTime = getTomorrowDate(getNowFormatDate());
				}
				if(!compareCalendar(getNowFormatDate(),nextFollowTime)){
					layer.msg("跟进时间不得小于当前时间");
					return false;
				}
			}else{
//				text += "(清空下次跟进时间)";
			}
			
			layer.confirm('确定添加？', {icon: 3, title:'提示'}, function(cindex){
                $.ajax({
                    url:appServer+'/bops/user/addUserMarketServiceLogNew.htm',
                    type:"POST",
                    data:{"userId":userId, "log":text,"nextFollowTime":nextFollowTime},
                    beforeSend:function(){
                        loadIndex = layer.load(1);
                    },
                    success:function(res){
                        layer.close(loadIndex);
                        if(res.meta.success){
                            layer.msg("添加成功！");
                            if(forusersearch != "1"){
                            	  $("#nextFollowTime-input").val(nextFollowTime);
                                  loadFollowContent(userId);
                            }
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
	
	//跟进记录里的搜索
	$("body").on("click","#follow-search",function(){
		var log = $("#log").val();
//		alert(log);
		var userId = $(this).attr("data-id");
//		alert(userId);
		loadFollowContentByParam(userId,log);
	});
	
	//客户订单加载
	$("body").on("click","#user-order",function(){
		var loaded = $(this).attr("loaded");
		var userId = $(this).attr("user-id");
		if(loaded==0){
			var o = {};
			o["userId"] = userId;
			//.....加载的方法
			$("#orderContent").load(appServer + "/bops/user/user_orderContent.htm",o, function(responseText, textStatus, XMLHttpRequest) {
    	    });
			
			$(this).attr("loaded","1");
		}
	});
	
	//客户订单搜索
	$("body").on("click","#order-search",function(){
		var userId = $(this).val();
		
		var o = {};
		o = getParam(o);
		o["userId"] = userId;
		
		//.....加载的方法
		$("#orderContent").load(appServer + "/bops/user/user_orderContent.htm",o, function(responseText, textStatus, XMLHttpRequest) {
	    });
			
	});
	
	//客户订单详情
	$("body").on("click",".user_order_detail",function(e){
		if($(e.target).hasClass('user-tips')){
		
		}else{
			var url = $(this).attr("data-url");
			window.open(url);
		}
	});
	
	//套餐描述
	$("body").on("click","#menu-tips",function(){
		var code = $(this).attr("code");
		var targetClass = ".menu" + code;
		$.ajax({
			async : true, 
			url : appServer + '/bops/user/getOrderMenuItems.htm',
			type : 'post',
			dataType : 'json',     
			data : { code: code ,"bops":1},
	        success:function(json){
	        	
	        	var data = json.data || {},
				isDirect = data.isDirect,
				together = data.together,
				type = data.type,
				costDays = data.costDays,
				invoiceStatus = data.invoiceStatus,
				content = "";

	        	content+='<dl>';
				content+='<dt>调查项目</dt>';
				
				content+='<dd><p>' + together + '</p></dd>';
				
				content+='</dl>';
				
				content+='<dl class="mt10">';
				content+='<dt>反馈时间</dt>';
				
				if (isDirect) {
					content+='<dd>秒出</dd>';
				} else {
					content+='<dd>候选人资料完善及授权后' + costDays + '个工作日生成报告</dd>';
				}
				
				if (invoiceStatus >= 0) {
					content+='<dl class="mt20">';
					content+='<dt>发票状态</dt>';
					
					if (0 == invoiceStatus) {
						content+='<dd>未寄出</dd>';
					} else if (1 == invoiceStatus) {
						content+='<dd>已寄出</dd>';
					} else if (2 == invoiceStatus) {
						content+='<dd>已签收</dd>';
					} else if (3 == invoiceStatus) {
						content+='<dd>已取消</dd>';
					}
				}

				content+='</dl>';
				layer.tips(content, targetClass,{
					tips:4
				});
	        },
	        error:function(){
	            layer.msg('网络错误！');
	        }
	    });
		
	});
	
	//价格描述
	$("body").on("click","#price-tips",function(){
		var code = $(this).attr("code");
		var targetClass = ".price" + code;
		
		var orderPrice = $(this).attr("orderPrice");
		var couponName = $(this).attr("couponName");
		var payMoney = $(this).siblings("#payMoney").text();
		var payMethod = $(this).siblings("#payMethod").text();
		var payTime = $(this).attr("payTime");
		
		var content = "<dt>订单价格：" + orderPrice + "</dt>" ;
		content+="<dt>使用优惠：" + (jQuery.trim(couponName)==""?"未使用优惠券":jQuery.trim(couponName)) + "</dt>" ;
		content+="<dt>实际支付：" + payMoney + "</dt>" ;
		content+="<dt>支付方式：" + jQuery.trim(payMethod) + "</dt>" ;
		content+="<dt>支付时间：" + jQuery.trim(payTime) + "</dt>" ;
		
		layer.tips(content, targetClass,{
			tips:1
		});
	});
	
	//订单状态描述
	$("body").on("click","#status-tips",function(){
		var code = $(this).attr("code");
		var targetClass = ".status" + code;
		$.ajax({
			async : true, 
			url : appServer + '/bops/user/getOrderProcess.htm',
			type : 'post',
			dataType : 'json',     
			data : { code: code ,"bops":1},
	        success:function(json){
	        	
	        	var data = json.data || [],
				len = data.length,
				processList = [];
			
				processList.push('<div class="orders-process-wrap"><input type="hidden" class="code" value="' + code + '" />');
				
				$.each(data, function(i, item) {
					if (i < len - 1) {
						processList.push('<div class="one-process done"><i class="icon"></i>');
					} else {
						processList.push('<div class="one-process doing"><i class="icon"></i>');
					}
					
					processList.push('<div class="p1"><span class="name">' + (item.processName || '') + '</span>' + (item.time ? '<span class="date">' + item.time + '</span>' : '') + '</div>');
					processList.push('<div class="clearfix"></div>');
					
					processList.push('</div>');
				});
	
				processList.push('</div">');
				layer.tips(processList.join(""), targetClass,{
					tips:3
				});
	        },
	        error:function(){
	            layer.msg('网络错误！');
	        }
	    });
		
	});
	
	
	//客户详情
	$("body").on("click","#user-detail",function(){
		var loaded = $(this).attr("loaded");
		var userId = $(this).attr("user-id");
		if(loaded==0){
			var o = {};
			o["userId"] = userId;
			//.....加载的方法
			$("#detailContent").load(appServer + "/bops/user/user_detailContent.htm",o, function(responseText, textStatus, XMLHttpRequest) {
    	    });
			
			$(this).attr("loaded","1");
		}
	});
	
	//用户来源
	$("body").on("change","#from",function(){
		var userFrom = $(this).val();
		if(userFrom == 4){
			$("#thirdId").parent().show();
		}else{
			$("#thirdId").parent().hide();
		}
	});
	
	var oldInputVlue = "";
	var oldSpanValue = "";
	//修改操作
	$("body").on("click",".edit-detail",function(){
		$(".edit-detail").each(function(index,v){
			if($(v).css("display")=="none"){
	             $(v).siblings(".edit-cancel").click();
	         }
		});
		oldInputVlue = $(this).parent().siblings("input").val();
		oldSpanValue = $(this).parent().siblings(".span-content").text();
		if(jQuery.trim(oldInputVlue)==""){
			oldInputVlue = $(this).parent().siblings("select").val();
		}
		if($(this).parent().siblings("input").attr("id")=="comName"){
			$(this).parent().siblings("input").attr("type","text");//让input显示
		}
		$(this).parent().siblings("input").attr("disabled",false);//让input可编辑
		$(this).parent().siblings("select").show();//显示select
		$(this).parent().siblings("input").css("width","65%");
		$(this).parent().siblings("span").css("display","none");
		$(this).css("display","none");//设置编辑按钮隐藏
		
		//TODO.....
		
		$(this).siblings("button").each(function(index,v){//设置确定和取消按钮可编辑
			$(v).css("display","");
		});
		
		if($(this).hasClass("from-edit")){
			var userFrom = $(this).parent().siblings("select").val();
			if(userFrom==4){
				$("#thirdId").parent().show();
			}
		}else{
			$("#thirdId").parent().hide();
		}
		
	});
	
	//取消操作
	$("body").on("click",".edit-cancel",function(){
		$(this).parent().siblings("input").val(oldInputVlue);
		$(this).parent().siblings("select").val(oldInputVlue);
		if($(this).parent().siblings("input").attr("id")=="comName"){
			$(this).parent().siblings("input").attr("type","hidden");//让input显示
		}
		$(this).parent().siblings("input").attr("disabled",true);//让input不可编辑
		$(this).parent().siblings("select").hide();
		$(this).parent().siblings("input").css("width","48%");
		$(this).parent().siblings("span").css("display","");
		$(this).css("display","none");//设置取消按钮隐藏
		
		$(this).siblings(".edit-confirm").css("display","none");
		$(this).siblings(".edit-detail").css("display","");
		$("#thirdId").parent().hide();
	});
	
	//确定操作
	$("body").on("click",".edit-confirm",function(){
		var userId = $("#userId").val();
		//var  isChanged = false;
		
		var fn = function(that) {
			return function (isChanged) {
				if (isChanged) {
					
					if(that.parent().siblings("select").attr("id")=="settlementType"){
						if(that.parent().siblings("select").val()==0){
							that.parent().siblings(".span-content").html("&nbsp;&nbsp;&nbsp;&nbsp;不可月结");
						}else if(that.parent().siblings("select").val()==1){
							that.parent().siblings(".span-content").html("&nbsp;&nbsp;&nbsp;&nbsp;支持月结");
						}
					}
					
					if(that.parent().siblings("select").attr("id")=="gender"){
						if(that.parent().siblings("select").val()==0){
							that.parent().siblings(".span-content").html("&nbsp;&nbsp;&nbsp;&nbsp;女士");
						}else if(that.parent().siblings("select").val()==1){
							that.parent().siblings(".span-content").html("&nbsp;&nbsp;&nbsp;&nbsp;先生");
						}
					}
					
					if(that.parent().siblings("select").attr("id")=="from"){
						if(that.parent().siblings("select").val()==0){
							that.parent().siblings("#span-from").html("&nbsp;&nbsp;&nbsp;&nbsp;线上用户");
						}else if(that.parent().siblings("select").val()==1){
							that.parent().siblings("#span-from").html("&nbsp;&nbsp;&nbsp;&nbsp;线下签单");
						}else if(that.parent().siblings("select").val()==2){
							that.parent().siblings("#span-from").html("&nbsp;&nbsp;&nbsp;&nbsp;好友邀请");
						}else if(that.parent().siblings("select").val()==3){
							that.parent().siblings("#span-from").html("&nbsp;&nbsp;&nbsp;&nbsp;活动邀请");
						}else if(that.parent().siblings("select").val()==4){
							that.parent().siblings("#span-from").html('&nbsp;&nbsp;&nbsp;&nbsp;渠道对接<i title="" class="fa fa-copyright thirdName-i" id="thirdName-i" style="float:right;margin-top: 10px;"></i>');
						}
					}
					
					if(that.parent().siblings("select").attr("id")=="sendEmail"){
						if(that.parent().siblings("select").val()==0){
							that.parent().siblings("#span-sendEmail").html("&nbsp;&nbsp;&nbsp;&nbsp;接收");
						}else if(that.parent().siblings("select").val()==1){
							that.parent().siblings("#span-sendEmail").html("&nbsp;&nbsp;&nbsp;&nbsp;不接收");
						}
					}
					
					if(that.parent().siblings("select").attr("id")=="sendSms"){
						if(that.parent().siblings("select").val()==0){
							that.parent().siblings("#span-sendSms").html("&nbsp;&nbsp;&nbsp;&nbsp;接收");
						}else if(that.parent().siblings("select").val()==1){
							that.parent().siblings("#span-sendSms").html("&nbsp;&nbsp;&nbsp;&nbsp;不接收");
						}
					}
					
				}
				if(isChanged){
					if(that.parent().siblings("input").attr("id")=="comName"){
						that.parent().siblings("input").attr("type","hidden");//让input隐藏
						that.parent().siblings("#span-comName").html("&nbsp;&nbsp;&nbsp;&nbsp;" + that.parent().siblings("input").val());
					}
					that.parent().siblings("input").attr("disabled",true);//让input不可编辑
					that.parent().siblings("select").hide();
					that.parent().siblings("input").css("width","48%");
					that.parent().siblings("span").css("display","");
					that.css("display","none");//设置确定按钮隐藏
					
					that.siblings(".edit-cancel").css("display","none");
					that.siblings(".edit-detail").css("display","");
					$("#thirdId").parent().hide();
				}
			};
		};
		
		//修改结算方式
		if(jQuery.trim(oldSpanValue).indexOf("月结")>=0){
			var settlementType = $(this).parent().siblings("select").val();
			var text = $(this).parent().siblings("select").find("option:selected").text();
			
			edit_settlement(userId,settlementType,jQuery.trim(text), fn($(this)));
		}
		
		//修改HR名称
		if($(this).attr("id")=="btn-userName"){
			var username = $(this).parent().siblings("input").val();
			
			edit_username(userId,username,username,fn($(this)));
		}
		
		//修改昵称
		if($(this).attr("id")=="btn-nickName"){
			var nickName = $(this).parent().siblings("input").val();
			
			edit_nickName(userId,nickName,nickName,fn($(this)));
		}
		
		//修改性别
		if($(this).attr("id")=="btn-gender"){
			var gender = $(this).parent().siblings("select").val();
			var text = $(this).parent().siblings("select").find("option:selected").text();
			
			edit_gender(userId,gender,jQuery.trim(text), fn($(this)));
		}
		
		//修改昵称
		if($(this).attr("id")=="btn-birthday"){
			var birthday = $(this).parent().siblings("input").val();
			
			edit_birthday(userId,birthday,birthday,fn($(this)));
		}
		
		//修改手机
		if($(this).attr("id")=="btn-mobile"){
			var mobile = $(this).parent().siblings("input").val();
			
			edit_mobile(userId,mobile,mobile,fn($(this)));
		}
		
		//修改邮箱
		if($(this).attr("id")=="btn-email"){
			var email = $(this).parent().siblings("input").val();
			
			edit_email(userId,email,email,fn($(this)));
		}
		
		//修改公司名称
		if($(this).attr("id")=="btn-comName"){
			var comName = $(this).parent().siblings("input").val();
			
			edit_comName(userId,comName,comName,fn($(this)));
		}
		
		//修改用户来源
		if($(this).attr("id")=="btn-from"){
			var from = $(this).parent().siblings("select").val();
			var text = $(this).parent().siblings("select").find("option:selected").text();
			
			edit_from(userId,from,jQuery.trim(text), fn($(this)));
		}
		
		//修改是否发送邮件
		if($(this).attr("id")=="btn-sendEmail"){
			var sendEmail = $(this).parent().siblings("select").val();
			var text = $(this).parent().siblings("select").find("option:selected").text();
			
			edit_sendEmail(userId,sendEmail,jQuery.trim(text), fn($(this)));
		}
		
		//修改是否发送短信
		if($(this).attr("id")=="btn-sendSms"){
			var sendSms = $(this).parent().siblings("select").val();
			var text = $(this).parent().siblings("select").find("option:selected").text();
			
			edit_sendSms(userId,sendSms,jQuery.trim(text), fn($(this)));
		}
	});
	
	//充值
	$("body").on("click","#edit-charge",function(){	
		var id = $("#userId").val();
    	var comName = $("#comName").val();
    	var mobile = $("#mobile").val();
    	var userName = $("#userName").val();
    	
    	var ct = "<table width='100%' style='font-family:\"Microsoft YAHEI\"'><tbody>" +
		"<tr><td align='right' width='30%'>被充值用户ID：</td><td align='left' id='cg-id'><font color='red'>"+id+"</font></td></tr>" +
		"<tr><td align='right' width='30%'>被充值用户公司：</td><td id='cg-comname'>"+comName+"</td></tr>" +
		"<tr><td align='right' width='30%'>姓名：</td><td>"+userName+"</td></tr>" +
		"<tr><td align='right' width='30%'>手机号：</td><td align='left'><font color='red'>"+mobile+"</font></td></tr>" +
		"<tr><td align='right' width='30%'>充值金额(元)：</td><td align='left'><input id='pp' style='height: 22px;' type='text'></td></tr>" +
		"<tr><td align='right' width='30%'>赠送金额(元)：</td><td align='left'><input id='sp' style='height: 22px;' type='text'></td></tr>" +
		"<tr id='ifinvoice'><td align='right' width='30%'>发送提醒消息：</td><td align='left'>" +
		"<select id='sendnotice'>" +
			"<option value='0'>否</option>"+
			"<option value='1'>是</option>"+
		"</select>"+
		"</td></tr>" +
		"<tr id='ifinvoice'><td align='right' width='30%'>开发票：</td><td align='left'>" +
		"<select id='invoicesele'>" +
			"<option value='0'>无须开票</option>"+
			"<option value='1'>开具</option>"+
			"<option value='2'>暂不开</option>"+
		"</select>"+
		"</td></tr>" +
		"<tr><td align='right' width='30%'>备注(可不写,128个字以内):</td>" +
		"<td align='left'><textarea id='mark' style='width: 200px; min-height: 100px;' maxlength='128'></textarea></td></tr>" +
		"</tbody></table>";
		layer.open({
			title:"充值",
			type: 1,
			shift: 3,
			area : ['400px' , '400px'],
			btn:['确定', '取消'],
			content:ct,
			yes:function(index){
				var amount = $("#pp").val();
				var sendAmount = $("#sp").val();
				var mark = $("#mark").val();
				var invoice = $("#invoicesele").val();
				var invoiceAmount = $("#ivc-amount").val();
				var invoiceTitle = $("#ivc-title").val();
				var invoicePerson = $("#ivc-recvname").val();
				var invoiceContact = $("#ivc-contact").val();
				var invoiceAddress = $("#ivc-address").val();
				var sendnotice = $("#sendnotice").val();
				
				var a=/^[0-9]*(\.[0-9]{1,2})?$/;
				if(!a.test(amount)||amount==""){
					layer.alert('请输入正确的金额！');
					return;
				}
				
				if(!a.test(sendAmount)&&sendAmount!=""){
					layer.alert('请输入正确的赠送金额！');
					return;
				}
				
				if(invoice==1){
					if(invoiceAmount==null||!a.test(invoiceAmount)){
						layer.alert('请输入正确的金额！');
						return;
					}else if(invoiceTitle==""||invoicePerson==""||invoiceContact==""||invoiceAddress==""){
						layer.alert('请填写完整表单！');
						return;
					}
				}
				var loadIndex;
				layer.confirm('确定充值？', {icon: 3, title:'提示'}, function(cindex){
					$.ajax({
						url:appServer+'/bops/user/charge.htm',
						type:"POST",
						data:{"id":id, "amount":amount, "mark":mark, "invoice":invoice, "invoiceAmount":invoiceAmount, 'invoiceTitle':invoiceTitle, 'invoicePerson':invoicePerson, 
							"invoiceContact":invoiceContact, 'invoiceAddress':invoiceAddress, "sendAmount":sendAmount, "sendnotice":sendnotice},
						beforeSend:function(){
							loadIndex = layer.load(1);
						},
						success:function(res){
							layer.close(loadIndex);
							if(res.meta.success){
								layer.msg("充值成功！");
								layer.close(index);
								$.ajax({
									url:appServer+"/bops/money/finduseractblc.htm",
									type:"GET",
									data:{"id":id},
									success:function(res){
										if(res.meta.success){
											var obj = res.retObj;
											$("#span-account").text("￥" + (obj.balance==""?0:obj.balance) + ".00");
											$("#span-score").html("&nbsp;&nbsp;&nbsp;&nbsp;" + (obj.score==""?0:obj.score + "个"));
											$("#span-lv").html("&nbsp;&nbsp;&nbsp;&nbsp;" + "<i class='fa fa-vimeo'></i>" + (obj.lv==""?0:obj.lv));
										}
									}
								});
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
	
	$("body").on("blur","#pp",function(){	
    	var price = $("#pp").val();
    	if(price!=null && price<=0){
    		$(".invoiceinfo").remove();
    		$('#invoicesele option:eq(1)').attr('selected','');
    		$('#invoicesele option:eq(2)').attr('selected','');
    		$('#invoicesele option:eq(0)').attr('selected','selected');
    	}
    });
	
	$("body").on("change","#invoicesele",function(){
    	var money = parseInt($("#pp").val());
    	if(money!=null && money!="" && money<=0){
    		$('#invoicesele option:eq(1)').attr('selected','');
    		$('#invoicesele option:eq(2)').attr('selected','');
    		$('#invoicesele option:eq(0)').attr('selected','selected');
    		return;
    	}
    	if($(this).val()==1){
        	var comName = $("#cg-comname").text();
    		var str = "<tr class='invoiceinfo'><td align='right' width='30%'>开票金额：</td><td><input id='ivc-amount' value='"+money+"'/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>发票抬头：</td><td><input id='ivc-title' value='"+comName+"'/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>收票人：</td><td><input id='ivc-recvname' value=''/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>联系号码：</td><td><input id='ivc-contact' value=''/></td></tr>"+
    		"<tr class='invoiceinfo'><td align='right' width='30%'>收票地址：</td><td><input id='ivc-address' value=''/></td></tr>";
    		$("#ifinvoice").after(str);
    	}else{
    		$(".invoiceinfo").remove();
    	}
    });
	
	//设置为无需认证
	$("body").on("click","#edit-auth",function(){	
		$this = $(this);
		var id = $("#userId").val();
		var loadIndex;
		var ctt = "<textarea id='reasontextarea' style='width:100%;height:100%;'></textarea>";
		
		layer.open({
			id:"layer-edit-auth",
            type:1,
            title:'无须认证原因',
            btn:['确定','取消'],
            area:['400px', '300px'],
            content:ctt,
            yes:function(index){
                var text = $("#reasontextarea").val();
                
                if(text != ""){
                	
                	$.ajax({
    					url:appServer+"/bops/user/changecert.htm",
    					type:"POST",
    					data:{"id":id,"authreason":text},
    					beforeSend:function(){
    						loadIndex = layer.load(1, {
    							  shade: [0.1,'#fff'] //0.1透明度的白色背景
    						});
    					},
    					success:function(res){
    						layer.close(loadIndex);
    						if(res.meta.success){
    							$("#auth-content").text("无须认证");
    							layer.msg('设置成功！');
    							layer.close(index);
//    							$("#auth").val(3);
    							$this.remove();
//    							location.reload();
    						}else{
    							layer.alert(res.meta.errorInfo, {icon: 2});
    						}
    					},
    					error:function(){
    						layer.close(loadIndex);
    						layer.alert("网络错误！", {icon: 2});
    					}
    				});
                    
                }else{
					layer.msg("原因不能为空");
					return false;
				}
            }
        });  
		
	});
	
	//无须认证原因查看
	$("body").on("click",".look_reason",function(){
		var r = $(this).siblings("input").val();
		layer.tips(r, ".look_reason",{
			tips:4
		});
	});
	
	
	//停用用户
	$("body").on("click","#edit-stop",function(){	
		$this = $(this);
		var id = $("#userId").val();
		var loadIndex;
		layer.alert('确定停用该用户？', {
			title:'设置',
			btn:['确定', '取消'],
			yes:function(index){
				$.ajax({
					url:appServer+"/bops/user/delete.htm",
					type:"POST",
					data:{"id":id},
					beforeSend:function(){
						loadIndex = layer.load(1, {
							  shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
					},
					success:function(res){
						layer.close(loadIndex);
						if(res.meta.success){
							$("#span-status").text("已停用");
							layer.msg('设置成功！');
							layer.close(index);
//							$("#auth").val(3);
							$this.hide();
							$("#edit-active").show();
//							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon: 2});
						}
					},
					error:function(){
						layer.close(loadIndex);
						layer.alert("网络错误！", {icon: 2});
					}
				});
			}
		});
	});
	
	//启用用户
	$("body").on("click","#edit-active",function(){	
		$this = $(this);
		var id = $("#userId").val();
		var loadIndex;
		layer.alert('确定启用该用户？', {
			title:'设置',
			btn:['确定', '取消'],
			yes:function(index){
				$.ajax({
					url:appServer+"/bops/user/active.htm",
					type:"POST",
					data:{"id":id},
					beforeSend:function(){
						loadIndex = layer.load(1, {
							  shade: [0.1,'#fff'] //0.1透明度的白色背景
						});
					},
					success:function(res){
						layer.close(loadIndex);
						if(res.meta.success){
							$("#span-status").text("正常");
							layer.msg('设置成功！');
							layer.close(index);
//							$("#auth").val(3);
							$this.hide();
							$("#edit-stop").show();
//							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon: 2});
						}
					},
					error:function(){
						layer.close(loadIndex);
						layer.alert("网络错误！", {icon: 2});
					}
				});
			}
		});
	});
	
	//重置密码
	$("body").on("click","#edit-password",function(){
    	
    	var userId = $("#userId").val();
    	
    	var ct = "<table width='70%' align='center'><tr><th>密码</th><td><input type='text' id='pwdset_password' class='form-control' style='height:35px;'/></td></tr><br><tr><th>确认密码</th><td><input type='text' class='form-control' id='pwdset_repassword' style='height:35px;'/></td></tr></table>";
		layer.open({
			title:"重置密码",
			type: 1,
			shift: 3,
			area : ['400px' , '200px'],
			btn:['确定', '取消'],
			content:ct,
			yes:function(index){
				var password = $("#pwdset_password").val();
				var rePassword = $("#pwdset_repassword").val();
				
				if (!password) {
					alert("请输入密码");
					return false;
				}
				
				if (!rePassword) {
					alert("请输入确认密码");
					return false;
				}
				
				if (password != rePassword) {
					alert("两次密码输入不一致");
					return false;
				}
				var loadIndex;
				layer.confirm('确定重置密码？', {icon: 3, title:'提示'}, function(cindex){
					$.ajax({
						url:  appServer + '/bops/user/setUserPassword.htm',
						type:"POST",
						data: {'id':userId,'password':password, 'rePassword':rePassword} ,
						beforeSend:function(){
							loadIndex = layer.load(1);
						},
						success:function(res){
							layer.close(loadIndex);
							if(res.meta.success){
								layer.msg("重置成功！");
								layer.close(index);
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
	
	$("body").on("click",".wrapper",function(e){
		if ($(e.target).hasClass('target-select')) {
    		
    	} else {
    		$("#user-layer").remove();
    		$(".layui-layer").remove();
    		$(".layui-layer-move").remove();
    	}
		if(!$(e.target).hasClass('select_tree')){
			$("#"+toshow).hide();
		}
		
	});
	$("body").on("click",".navbar",function(e){
		if($(e.target).hasClass('user-add')){
			return false;
		}
		$("#user-layer").remove();
		$(".layui-layer").remove();
		$(".layui-layer-move").remove();
		if(!$(e.target).hasClass('select_tree')){
			$("#"+toshow).hide();
		}
	});
	$("body").on("click",".slimScrollDiv",function(e){
		$("#user-layer").remove();
		$(".layui-layer").remove();
		$(".layui-layer-move").remove();
		if(!$(e.target).hasClass('select_tree')){
			$("#"+toshow).hide();
		}
	});
	
	$("body").on("click","#user-layer",function(e){
		if ($(e.target).hasClass('user-tips') || $(e.target).hasClass('look_reason')) {
    		
    	} else {
    		$(".layui-layer-tips").hide();
    	}
//		$(".layui-layer-tips").remove();
	});
	
//	$("body").on("mouseover",".extFollowTime-label",function(e){
//	     $(this).hide();
//	     $("#delNextFollowTime").show();
//	}); 	
//	
//	$("body").on("mouseout","#delNextFollowTime",function(e){
//		$(this).hide();
//	     $(".extFollowTime-label").show();
//	});
	
//	//清空跟进时间
//	$("body").on("click","#delNextFollowTime",function(e){
//		var userId = $(this).attr("data-id");
//		delNextFollowTime(userId);
//	});
	
    //用户卡片详情页
	$("body").on("click",".detail",function(e){
		if ($(e.target).hasClass('userTagList')) {
			editTag($(e.target).parent().attr("id"),$(e.target).parent().attr("companyName"));
		}else{
			var userId = $(this).attr("id");
			var forusersearch = $("#forusersearch").val() || 0;
			var oldUserId = $("#userId").val();
			if(null!=userId && userId == oldUserId){
				$("#user-layer").remove();
	    		$(".layui-layer").remove();
	    		$(".layui-layer-move").remove();
	    		return false;
			}
			
			var companyName = $(this).attr("companyName");
			var regFrom = $(this).attr("regFrom");
			var createTime = $(this).attr("createTime");
			var nextFollowTime = $(this).parent().children(".nextFollowTime").text();
			
			$.ajax({
				url:appServer + "/bops/user/userServiceListNew.htm",
				type:"POST",
				data:{"userId":userId ,"forusersearch":forusersearch},
				success:function(res){
					if(res.meta.success){
						var obj = res.retObj;
						var forusersearch = res.data;
						var newActionStr = "";
						
						for(var i=0; i<obj.length; i++){
							if(obj.length>0 && i==(obj.length-1)){
								newActionStr += "最新：" + (obj[i].createTime==""?"":new Date(obj[i].createTime).format("yyyy-MM-dd hh:mm:ss")) + " 有跟进操作.";
							}
						}
						
						var ctt = '<div class="form-horizontal" style="width:95%;margin:22px auto;">';
							ctt += '<input type="hidden" name="userId" id="userId" value="' + userId + '">';
							if(forusersearch != "1"){
								ctt += '<input type="hidden" name="nextFollowTime" id="nextFollowTime-input" value="' + nextFollowTime + '">';
							}
							
				        ctt += '<div class="form-group" style="margin-top:32px;">'+
				        	'<div class="col-sm-12" style="font-weight: bold;font-size: 14px;margin-bottom: 12px;">' + companyName + '（ID：' + userId + '）';
				        		if(forusersearch != "1"){
				        			ctt +=' <button data-id="' + userId + '" data-comName="' + companyName + '" id="tagDetail" style="width: 60px;height: 20px;font-size: 8px;text-align: center;line-height: 0px;margin-bottom: 5px;" type="button" class="btn btn-shadow btn-primary">标签</button>';
//				        			ctt +=' &nbsp;&nbsp;<button data-id="' + userId + '" data-comName="' + companyName + '" id="deleteTag" style="width: 80px;height: 20px;font-size: 8px;text-align: center;line-height: 0px;margin-bottom: 5px;" type="button" class="btn btn-shadow btn-primary">删除标签</button>';
				        			if(hasPermissionToDistribution==1){
				        				ctt +=' &nbsp;&nbsp;<button data-id="' + userId + '" id="distribution" style="width: 60px;height: 20px;font-size: 8px;text-align: center;line-height: 0px;margin-bottom: 5px;" type="button" class="btn btn-shadow btn-primary">分配</button>';
				        			}
				        		};
				        		 ctt +=    	'</div>';
				        		 ctt +=      '<div class="col-sm-11" style="margin-left:10px;">'+'<font color="#bcbcbc">' + createTime + '通过 ' + regFrom + ' 注册;&nbsp;&nbsp;' + newActionStr + '</font>'+
				        		 '</div>'+
				        		 '</div>';
				        
				        ctt += '<div class="layui-tab"> '     +
				        	  '<ul class="layui-tab-title">'   +
				       '<li class="layui-this" style="width:100px;">跟进记录</li>';
				        	  if(forusersearch != "1"){
				        		  ctt +=' <li style="width:100px;" id="user-order" user-id="' + userId + '" loaded="0">用户订单</li>';
				        		  ctt +=' <li style="width:100px;" id="user-detail" user-id="' + userId + '" loaded="0">用户详情</li>';
				        	  };
//				       ' <li style="width:100px;">客户轨迹</li>'+
//				       ' <li style="width:100px;">360视图</li>'+
				        	  ctt += '</ul>';
				          ctt += '<div class="layui-tab-content" style="font-familly:\'Microsoft YAHEI\';">'+
					       '<div class="layui-tab-item layui-show" id="followContent">'+
					       		getFollowContenStr(obj,userId,nextFollowTime,forusersearch)+
					     	'</div>';
					     	if(forusersearch != "1"){
					     		ctt +=' <div class="layui-tab-item" id="orderContent"></div>';
					     		ctt +='<div class="layui-tab-item" id="detailContent"></div>';
					     	}
//					       ' <div class="layui-tab-item"></div>'+
//					       ' <div class="layui-tab-item"></div>'+
				      ctt +=  '</div>';
				      ctt += '</div>';
				        
				           
					layer.open({
								id:"user-layer",
					            type:1,
					            offset: 'r',
					            title:false,
					            area: ['650px', '93.3333333333%'],
					            content:ctt,
					            closeBtn :1,
					            shade:0,
					            anim:2,
					            yes:function(index){
					                
					                
					            }
					        }); 
						
						
					}else{
						layer.msg("系统错误");
					}
				},
				error:function(){
					layer.msg("网络错误");
				}
			});
		}
		
	});
	
});

$("#usersearch").on("click",function(e){
	cancelBubble(e);
	$("#currentUrl").html("用户搜索");
	 var url = $(this).attr('url');
	$("#ajax_div").load(url, function() {
		$(".sk-spinner").hide();
   });
	
});

/**
 * 阻止事件冒泡
 * @param e
 */
function cancelBubble(e) { 
	var evt = e ? e : window.event; 
	if (evt.stopPropagation) { 
	evt.stopPropagation(); 
	} 
	else { 
	//IE 
	evt.cancelBubble = true; 
   } 
}

/**
 * 加载跟进记录
 */
function loadFollowContent(userId){
	$.ajax({
		url:appServer + "/bops/user/userServiceListNew.htm",
		type:"POST",
		data:{"userId":userId},
        success:function(res){
            if(res.meta.success){
            	var obj = res.retObj;
            	var ctt = getFollowContenStr(obj,userId);
            	$("#followContent").html(ctt);
            }else{
                layer.alert(res.meta.errorInfo, {icon:2});
            }
        },
        error:function(){
            layer.msg('网络错误！');
        }
    });
}

/**
 * 加载跟进记录,有参数
 */
function loadFollowContentByParam(userId,log){
	$.ajax({
		url:appServer + "/bops/user/userServiceListNew.htm",
		type:"POST",
		data:{"userId":userId,"log":log},
        success:function(res){
            if(res.meta.success){
            	var obj = res.retObj;
            	var ctt = getFollowContenStr(obj,userId);
            	$("#followContent").html(ctt);
            }else{
                layer.alert(res.meta.errorInfo, {icon:2});
            }
        },
        error:function(){
            layer.msg('网络错误！');
        }
    });
}

/**
 * 拼接跟进记录所需的html代码
 */
function getFollowContenStr(obj,userId,nextFollowTime,forusersearch){
	if(nextFollowTime==null){
		nextFollowTime = $("#nextFollowTime-input").val();
	}
	
	ctt = '<div style="margin-left:10px;" class="layui-input-block">'+
				'<textarea id="userv" placeholder="请输入服务内容" style="padding:12px 16px;min-height:170px;" class="layui-textarea"></textarea>';
				
				if(nextFollowTime!=null && nextFollowTime!='' && forusersearch != "1"){
					ctt += '<label class="extFollowTime-label" style="position: absolute; z-index: 111; right: 216px;margin-top: -26px;">下次跟进时间：</label>';
//					'<button id="delNextFollowTime" data-id="' + userId + '" style="width:100px;display:none;position: absolute; z-index: 110; right: 216px;margin-top: -34px;" class="layui-btn layui-btn-small layui-btn-danger"><i class="fa fa-times"></i> 清空跟进时间</button>';
				}
				
					if(forusersearch != "1"){
						ctt +=	'<input type="text" value="' + nextFollowTime + '" id="nextFollowTime" placeholder="请选择下次跟进时间" class="form-control layer-date" style="width: 40%; float: left;width: 30%;float: left;position: absolute;right: 56px;margin-top: -34px;z-index: 2222222;" name="" onclick="laydate({istime: true, format: \'YYYY-MM-DD hh:mm:ss\'})">';
					}else {
						ctt +='<input type="hidden" value="' + nextFollowTime + '" id="nextFollowTime" />';
					}
				ctt +=		'<button id="ser-sub" data-id="' + userId + '" style=" float: left;float: left;position: absolute;right: 3px;margin-top: -34px;z-index: 2222222;" class="layui-btn layui-btn-small layui-btn-normal"><i class="fa fa-check"></i> 确定</button>'+
		'</div>';
				if(forusersearch != "1"){
					ctt +='<div class="form-group" style="margin-right:2px;margin-top:20px;">'+
					   '<div style="float:right;">'+
					   '<input type="text" placeholder="搜索服务内容" style="width:245px;" class="form-control" id="log" name="" value=""/>'+
					      '<button data-id="' + userId + '" id="follow-search" class="follow-search layui-btn layui-btn-radius" style=" width: 70px;height: 29px;line-height:29px;position: absolute;margin-top: -29px;right: 19px;"><i class="fa fa-search"></i>搜索</button>'+
					  '</div>'+
					  '<div style="float:right;">'+
//					       '<select style="height:30px;width:104px;" class="form-control" name="">'+
//					          ' <option>操作类型</option>'+
//					          ' <option>销售跟进</option>'+
//					          ' <option>客服跟进</option>'+
//					          ' <option>信息变更</option>'+
//					          ' <option>后台充值</option>'+
//					      ' </select>'+
					  '</div>'+
					'</div>'+
					'<div class="form-group" style="margin-top:27px;">';
					
					
					for(var i=0; i<obj.length; i++){
						
					ctt +='<div style="margin-left:25px;" class="">' + 
								'<div class="col-sm-12" style="color:#777;">' + 
									'<span style="float:left;">' + (obj[i].createTime==""?"":new Date(obj[i].createTime).format("yyyy-MM-dd hh:mm:ss")) + '</span>' + '<span style="margin-left:45px;">-</span>' + '<span style="float:right;">名称:' + obj[i].nickName + '</span>' +
								'</div>' +
								'<div class="col-sm-12" style="margin-top:10px;margin-bottom:10px;">' + 
									'<span style="font-size:13px;">' + obj[i].log + '</span>' +
								'</div>' +
								'<hr style="margin:0 auto 15px;height:1px;border:none;border-top:0px solid #C3C3C3;" />' +
							'</div>' ; 
					}
					
				}
	
		ctt += 
		'</div>';
		return ctt;
}

/**
 * 修改标签
 * @param userId
 */
function editTag(userId,userName){
		$.ajax({
			url:appServer + "/bops/user/loadALLTag.htm",
			type:"POST",
			data:{"userId":userId},
			success:function(res){
				
				
				if(res.meta.success){
					var obj = res.retObj.userTag;
					var ctt = "<div style='width: 60%;margin: 20px auto;' class='fadeIn'>" +
					"<div>" ;
						
		ctt += '<div class="demo" style="margin-top:40px;">'+
					' <span class="" style=" font-size: 16px;">该用户标签：</span>'+
					'<input type="hidden" id="editTag-hid" value="' + userId + '">'+
                	'<div style="margin-top:8px;" class="plus-tag tagbtn clearfix" id="myTags">';
					
						for(var i=0; i<obj.length; i++){
							
							ctt +=  '<a value="' + obj[i].id + '" title="' + obj[i].name + '" href="javascript:void(0);"><span>' + obj[i].name + '</span><em></em></a>';
						}
		
				ctt += 
					'</div>'+
                   
                	'<div class="plus-tag-add">'+
                		'<form id="" action="" class="login">'+
                			'<ul class="Form FancyForm" style="margin-top: 10px;">'+
                				'<li>'+
                					'<input id="" name="" placeholder="输入标签" type="text" class="stext" maxlength="20" />'+
                					'<span class="fff"></span>'+
                				'</li>'+
                				'<li>'+
                					'<button type="button" class="Button RedButton Button18" style="font-size:14px;">添加标签</button>'+
                					'<a href="javascript:;">展开我的所有标签</a>'+
                				'</li>'+
                			'</ul>'+
                		'</form>'+
                	'</div><!--plus-tag-add end-->'+
                	
                	'<div id="mycard-plus" style="display:none;margin-top: -25px;">'+
                		'<div class="default-tag tagbtn">'+
                			'<div class="clearfix">';
								var obj2 = res.retObj.allTag;
								for(var i=0; i<obj2.length; i++){
									ctt +=  '<a value="' + obj2[i].id + '" title="' + obj2[i].name + '" href="javascript:void(0);"><span>' + obj2[i].name + '</span><em></em></a>';
								}
                				
                		ctt +=		                 
                			'</div>'+
                		'</div>'+
                	'</div><!--mycard-plus end-->'+
                		
               ' </div>';
					
						
					ctt += "</div>"+
					"</div>";
						layer.open({
				            type:1,
				            id:"layer-addTag",
				            title:'"' + userName + '"所属的标签',
				            btn:['完成'],
				            area:['700px','490px'],
				            content:ctt
				           
				        });   
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
}

/**
 * 批量分配
 */
function batchDistribution(valArr){
	if(valArr.length != 0){
		$.ajax({
			url:appServer + "/bops/systemuser/getactivemarketuser.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var ctt = "<div style='width: 60%;margin: 20px auto;' class='fadeIn'>" +
							"<div>" +
							"<span>选择销售人员：</span>"+
							"<select id='deliver-select' class='selectpicker show-tick form-control' data-live-search='true'>"+
							"<option>请选择</option>";
							for(var i=0; i<obj.length; i++){
								ctt += "<option value='"+ obj[i].id +"'>"+ obj[i].nickName +"</option>";
							}
							ctt += "</select>"+
							"</div>"+
							"</div>"+
							"<script>" +
//							"$(function(){$('#deliver-select').selectpicker({noneSelectedText:'请选择', size:5}).selectpicker('val', '"+ $this.parent().siblings('.deliver-td').find('input').val() +"').selectpicker('refresh');});"+
							"</script>";
					layer.open({
					            type:1,
					            id:"layer-distribution",
					            title:'分配订单',
					            btn:['确定', '取消'],
					            area:['400px','200px'],
					            content:ctt,
					            yes:function(index){
					                var v = $("#deliver-select").val();
					                if(v == ""){
					                	layer.msg('请选择交付人员');
					                	return;
					                }else{
					                	$.ajax({
					                		url:appServer + "/bops/user/batchsetmarketuser.htm",
					                		data:{"userIdList":valArr, "deliverId":v},
					                		type:"POST",
					                		success:function(res){
					                			if(res.meta.success){
					                				layer.msg("设置成功");
					                				layer.close(index);
					                				$(".reset1").click();
					                			}else{
					                				layer.msg(res.meta.errorInfo);
					                			}
					                		},
					                		error:function(){
					                			layer.msg("网络错误");
					                		}
					                	});
					                }
					            }
					        });    
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	}else{
		layer.msg("请先选择用户");
	}
}

/**
 * 批量标签
 */
function batchAddTag(valArr){
	if(valArr.length != 0){
		$.ajax({
			url:appServer + "/bops/user/loadTag.htm",
			type:"POST",
			success:function(res){
				
				
				if(res.meta.success){
					var obj = res.retObj;
					var ctt = "<div style='width: 60%;margin: 20px auto;' class='fadeIn'>" +
					"<div>" ;
						
		ctt += '<div class="demo" style="margin-top:40px;">'+
					' <span class="" style=" font-size: 16px;">已添加标签：</span>'+
					'<input type="hidden" id="editTag-hid" value="' + valArr + '">'+
	            	'<div style="margin-top:8px;" class="plus-tag tagbtn clearfix" id="myTags">';
					
				ctt += 
					'</div>'+
	               
	            	'<div class="plus-tag-add">'+
	            		'<form id="" action="" class="login">'+
	            			'<ul class="Form FancyForm" style="margin-top: 10px;">'+
	            				'<li>'+
	            					'<input id="" name="" placeholder="输入标签" type="text" class="stext" maxlength="20" />'+
	            					'<span class="fff"></span>'+
	            				'</li>'+
	            				'<li>'+
	            					'<button type="button" class="Button RedButton Button18" style="font-size:14px;">添加标签</button>'+
	            					'<a href="javascript:;">展开我的所有标签</a>'+
	            				'</li>'+
	            			'</ul>'+
	            		'</form>'+
	            	'</div><!--plus-tag-add end-->'+
	            	
	            	'<div id="mycard-plus" style="display:none;margin-top: -25px;">'+
	            		'<div class="default-tag tagbtn">'+
	            			'<div class="clearfix">';
								var obj = res.retObj;
								for(var i=0; i<obj.length; i++){
									ctt +=  '<a value="' + obj[i].id + '" title="' + obj[i].name + '" href="javascript:void(0);"><span>' + obj[i].name + '</span><em></em></a>';
								}
	            				
	            		ctt +=		                 
	            			'</div>'+
	            		'</div>'+
	            	'</div><!--mycard-plus end-->'+
	            		
	           ' </div>';
					
						
					ctt += "</div>"+
					"</div>";
						layer.open({
				            type:1,
				            id:"layer-addTag",
				            title:'批量标签',
				            btn:['完成'],
				            area:['700px','490px'],
				            content:ctt
				           
				        });   
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	}else{
		layer.msg("请先选择用户");
	}
	
}

/**
 * 批量删除标签
 */
function batchDeleteTag(valArr){
	if(valArr.length != 0){
		layer.confirm('确定删除这些用户的全部标签？', {title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/user/batchDeleteTag.htm',
                type: "POST",
                data:{"userIdList":valArr},
                success:function(res){
                    if(res.meta.success){
                        layer.msg("删除成功！");
                        $(".reset1").click();
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.msg('网络错误！');
                }
                
            });
        }); 
				
	}else{
		layer.msg("请先选择用户");
	}
}

/**
 * 修改结算方式
 */
function edit_settlement(id,settlementType,text, fn){
	//alert($element.tagName);
	layer.confirm('确定修改结算方式为"' + text + '"？', {title:'提示'}, function(cindex){
		$.ajax({
			url:appServer+'/bops/user/editSettlementType.htm',
			type:"POST",
			data:{"settlementType":settlementType,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

///**
// * 清空下次跟进时间
// * @param userId
// */
//function delNextFollowTime(userId){
//	
//	layer.confirm('确定清空下次跟进时间？', {title:'提示'}, function(cindex){ 
//		$.ajax({
//			url:appServer+'/bops/user/delNextFollowTime.htm',
//			type:"POST",
//			data:{"userId":userId},
//			success:function(res){
//				if(res.meta.success){
//					layer.msg("清空成功！");
//					$("#nextFollowTime").val("");
//					$(".extFollowTime-label").hide();
//					$("#delNextFollowTime").hide();
//				}else{
//					layer.alert(res.meta.errorInfo, {icon:2});
//				}
//			},
//			error:function(){
//				layer.msg('网络错误！');
//			}
//		});
//	});
//}

/**
 * 修改HR名称
 * @param id
 * @param username
 * @param text
 * @param fn
 * @returns
 */
function edit_username(id,username,text,fn){
	
	layer.confirm('确定修改HR名称为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editUserName.htm',
			type:"POST",
			data:{"name":username,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改昵称
 * @param id
 * @param nickName
 * @param text
 * @param fn
 */
function edit_nickName(id,nickName,text,fn){
	
	layer.confirm('确定修改昵称为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editNickName.htm',
			type:"POST",
			data:{"nickName":nickName,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改性别
 * @param id
 * @param gender
 * @param text
 * @param fn
 */
function edit_gender(id,gender,text,fn){
	
	layer.confirm('确定修改性别为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editGender.htm',
			type:"POST",
			data:{"gender":gender,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改生日
 * @param id
 * @param birthday
 * @param text
 * @param fn
 */
function edit_birthday(id,birthday,text,fn){
	
	layer.confirm('确定修改生日为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editBirthday.htm',
			type:"POST",
			data:{"birthday":birthday,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改手机
 * @param id
 * @param birthday
 * @param text
 * @param fn
 */
function edit_mobile(id,mobile,text,fn){
	
	layer.confirm('确定修改手机为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editUserMobile.htm',
			type:"POST",
			data:{"mobile":mobile,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改邮箱
 * @param id
 * @param mobile
 * @param text
 * @param fn
 */
function edit_email(id,email,text,fn){
	
	layer.confirm('确定修改邮箱为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editUserEmail.htm',
			type:"POST",
			data:{"email":email,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改公司名称
 * @param id
 * @param comName
 * @param text
 * @param fn
 */
function edit_comName(id,comName,text,fn){
	
	layer.confirm('确定修改公司名称为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editUserCompanyName.htm',
			type:"POST",
			data:{"companyName":comName,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改用户来源
 * @param id
 * @param comName
 * @param text
 * @param fn
 */
function edit_from(id,from,text,fn){
	
	var thirdName = "";
	var thirdId;
	
	if(from == 4){
		thirdName = ',第三方用户为"' + $("#thirdId").find("option:selected").text(); + '"';
		thirdId = $("#thirdId").val();
	}
	
	layer.confirm('确定修改用户来源为"' + text + thirdName + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editUserFrom.htm',
			type:"POST",
			data:{"userFrom":from,"id":id,"thirdId":thirdId},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改是否发送邮件
 * @param id
 * @param from
 * @param text
 * @param fn
 */
function edit_sendEmail(id,sendEmail,text,fn){
	
	layer.confirm('确定修改平台邮件为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editNotSendEmail.htm',
			type:"POST",
			data:{"notSendEmail":sendEmail,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

/**
 * 修改是否发短信
 * @param id
 * @param sendEmail
 * @param text
 * @param fn
 */
function edit_sendSms(id,sendSms,text,fn){
	
	layer.confirm('确定修改平台短信为"' + text + '"？', {title:'提示'}, function(cindex){ 
		$.ajax({
			url:appServer+'/bops/user/editNotSendSms.htm',
			type:"POST",
			data:{"notSendSms":sendSms,"id":id},
			success:function(res){
				if(res.meta.success){
					layer.msg("更新成功！");
					fn(true);
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
					fn(false);
				}
			},
			error:function(){
				layer.msg('网络错误！');
				fn(false);
			}
		});
	});
}

