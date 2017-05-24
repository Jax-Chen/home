checkPermission();
$(function(){
    //初始化ajax
    $("#pgi-1").page("/bops/bgcheck/allVoucher", null, createData);
    
    //搜索
    $("#od-search").on("click", function(){
        var userName = $("#userName").val();
        var companyName = $("#companyName").val();
        var mobile = $("#mobile").val();
        var position = $("#position").val();
        
        $("#pgi-1").page(
                "/bops/bgcheck/allVoucher", 
                {"userName":userName, "companyName":companyName, "mobile":mobile, "position":position}, 
                createData
        );
    });
    
    //添加证明人页面
	$(document).on("click", ".addVoucher-btn", function(){
		
		 var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
		 
             ctt += '<div class="form-group">'+
                 '<label class="col-sm-2 control-label"><span style="color:red;">*</span>所在公司</label>'+
                 '<div class="col-sm-9">'+
                     '<input type="text" class="form-control" id="e-companyName" value="">'+
                 '</div>'+
             '</div>';
             
	            ctt += "<div class='form-group'>"+
                 "<label class='col-sm-2 control-label'></span>在岗时间</label>"+
                 "<div class='col-sm-4'>"+
                     "<input type='text' class='form-control' id='e-joinTime' value='' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'  >"+
                 "</div>"+ 
                 "<label class='col-sm-1 control-label'><span'>-&nbsp; </span></label>"+
                 "<div class='col-sm-4'>"+
	                 "<input type='text' class='form-control' id='e-leaveTime' value=''  onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'   >"+
	             "</div>"+
             "</div>";
	            
	            ctt += '<div class="form-group">'+
                 '<label class="col-sm-2 control-label">部门</label>'+
                 '<div class="col-sm-4">'+
                     '<input type="text" class="form-control" id="e-department" value="">'+
                 '</div>'+
                 '<label class="col-sm-2 control-label"><span style="color:red;">*</span>职位</label>'+
                 '<div class="col-sm-4">'+
                     '<input type="text" class="form-control" id="e-position" value="">'+
                 '</div>'+
             '</div>';
	            
	            ctt += '<div class="form-group">'+
                 '<label class="col-sm-2 control-label">离职原因</label>'+
                 '<div class="col-sm-10">'+
                     '<input type="text" class="form-control" id="e-leaveReason" value="">'+
                 '</div>'+
             '</div>';
	            
	            ctt += '<hr style="height:1px;border:none;border-top:1px solid #C3C3C3;" />';
	            
	            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label"><span style="color:red;">*</span>姓名</label>'+
                '<div class="col-sm-4">'+
                    '<input type="text" class="form-control" id="e-username" value="">'+
                '</div>'+
                '<label class="col-sm-2 control-label">性别</label>'+
                '<div class="col-sm-4">'+
	                "<select id='e-gender' class='form-control' >" +
	                	"<option value=''>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未知</option>"+
	                	"<option value='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;男</option>"+
						"<option value='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女</option>"+
					"</select>"+
                '</div>'+
            '</div>';
	            
	            ctt += '<div class="form-group">'+
	            '<label class="col-sm-2 control-label"><span style="color:red;">*</span>联系方式</label>'+
                '<div class="col-sm-4">'+
                    '<input type="text" class="form-control" id="e-mobile" value="">'+
                '</div>'+
                '<label class="col-sm-2 control-label">微信</label>'+
                '<div class="col-sm-4">'+
                    '<input type="text" class="form-control" id="e-wechat" value="">'+
                '</div>'+
            '</div>';
	            
	            ctt += '<div class="form-group">'+
	            '<label class="col-sm-2 control-label">邮箱</label>'+
                '<div class="col-sm-10">'+
	                '<input type="text" class="form-control" id="e-email" value="">'+
	            '</div>'+
            '</div>';
	            
	            
	            ctt += "<br/><br/><br/>";
	            
	            
	            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label">备注</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="e-mark" value="">'+
                '</div>'+
            '</div>';
	            
	            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label"></label>'+
                '<div class="col-sm-10" style="color:#C3C3C3;">'+
                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比如这个证明人的脾气如何，沟通时需要注意什么，可以写备注'+
                '</div>'+
            '</div>';
	            
	            ctt += "<br/><br/>";
	            
             ctt += '</div>';
		layer.open({
		            type:1,
		            title:'添加证明人',
		            btn:['确定', '取消'],
		            area:['650px'],
		            content:ctt,
		            yes:function(index){
		                
		            	var joinTime = $("#e-joinTime").val();
		            	var leaveTime = $("#e-leaveTime").val();
		                var userName = $("#e-username").val();
                        var companyName = $("#e-companyName").val();
                        var mobile = $("#e-mobile").val();
                        var email = $("#e-email").val();
                        
                        var department = $("#e-department").val();
                        var position = $("#e-position").val();
                        var wechat = $("#e-wechat").val();
                        var mark = $("#e-mark").val();
                        var leaveReason = $("#e-leaveReason").val();
                        var gender = $("#e-gender").val();
                        
                        if(companyName == ""){
                            layer.alert("请填写所在公司", {title:"警告"});
                            return false;
                        }
                        
                        if(position == ""){
                            layer.alert("请填写职位", {title:"警告"});
                            return false;
                        }
                        
                        if(userName == ""){
                            layer.alert("请填写姓名", {title:"警告"});
                            return false;
                        }
                        
                        if(mobile == ""){
                            layer.alert("请填写联系方式", {title:"警告"});
                            return false;
                        }
		                
	                	layer.confirm('确定添加证明人？', {icon: 3, title:'提示'}, function(cindex){
	                        $.ajax({
	                            url:appServer+'/bops/bgcheck/addVoucher.htm',
	                            type:"POST",
	                            data:{"joinTime":joinTime,"leaveTime":leaveTime,"userName":userName,"userName":userName,"companyName":companyName,"mobile":mobile,"email":email,"department":department,"position":position,"wechat":wechat,"mark":mark,"leaveReason":leaveReason,"gender":gender},
	                            beforeSend:function(){
	                                loadIndex = layer.load(1);
	                            },
	                            success:function(res){
	                                layer.close(loadIndex);
	                                if(res.meta.success){
	                                    layer.msg("添加成功！");
	                                    layer.close(index);
	                                    $("#pgi-1").page.refresh();
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
    
	//详情
	$(document).on("click", ".detailVoucher", function(){
		 var id = $(this).attr("data-id");
		 $.ajax({
		        url: appServer + "/bops/bgcheck/findVoucherById.htm",
		        type: "GET",
		        data: {"id": id},
		        success:function(res){
		            if(res.meta.success){
		                var obj = res.retObj;
		                obj = replaceNull(obj);
		                var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">';
		       		 
		                ctt += '<div class="form-group">'+
		                    '<label class="col-sm-2 control-label"><span style="color:red;">*</span>所在公司</label>'+
		                    '<div class="col-sm-9">'+
		                        '<input type="text" class="form-control" id="e-companyName" value="' + obj.companyName + '">'+
		                    '</div>'+
		                '</div>';
		                
		   	            ctt += "<div class='form-group'>"+
		                    "<label class='col-sm-2 control-label'></span>在岗时间</label>"+
		                    "<div class='col-sm-4'>"+
		                        "<input type='text' class='form-control' id='e-joinTime' value='" + (obj.orderDate==""?"":parseTime(obj.joinTime)) + "' onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'  >"+
		                    "</div>"+ 
		                    "<label class='col-sm-1 control-label'><span'>-&nbsp; </span></label>"+
		                    "<div class='col-sm-4'>"+
		   	                 "<input type='text' class='form-control' id='e-leaveTime' value='" + (obj.orderDate==""?"":parseTime(obj.leaveTime)) + "'  onclick='WdatePicker({dateFmt:\"yyyy-MM-dd\"})'   >"+
		   	             "</div>"+
		                "</div>";
		   	            
		   	            ctt += '<div class="form-group">'+
		                    '<label class="col-sm-2 control-label">部门</label>'+
		                    '<div class="col-sm-4">'+
		                        '<input type="text" class="form-control" id="e-department" value="' + obj.department + '">'+
		                    '</div>'+
		                    '<label class="col-sm-2 control-label"><span style="color:red;">*</span>职位</label>'+
		                    '<div class="col-sm-4">'+
		                        '<input type="text" class="form-control" id="e-position" value="' + obj.position + '">'+
		                    '</div>'+
		                '</div>';
		   	            
		   	            ctt += '<div class="form-group">'+
		                    '<label class="col-sm-2 control-label">离职原因</label>'+
		                    '<div class="col-sm-10">'+
		                        '<input type="text" class="form-control" id="e-leaveReason" value="' + obj.leaveReason + '">'+
		                    '</div>'+
		                '</div>';
		   	            
		   	            ctt += '<hr style="height:1px;border:none;border-top:1px solid #C3C3C3;" />';
		   	            
		   	            ctt += '<div class="form-group">'+
		                   '<label class="col-sm-2 control-label"><span style="color:red;">*</span>姓名</label>'+
		                   '<div class="col-sm-4">'+
		                       '<input type="text" class="form-control" id="e-username" value="' + obj.name + '">'+
		                   '</div>'+
		                   '<label class="col-sm-2 control-label">性别</label>'+
		                   '<div class="col-sm-4">'+
		   	                "<select id='e-gender' class='form-control' >" +
		   	                	"<option value=''" + (obj.gender==''?"selected":"") + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;未知</option>"+
		   	                	"<option value='1'" + (obj.gender!=''&&obj.gender==1?"selected":"") + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;男</option>"+
		   						"<option value='0'" + (obj.gender!=''&&obj.gender==0?"selected":"") + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女</option>"+
		   					"</select>"+
		                   '</div>'+
		               '</div>';
		   	            
		   	            ctt += '<div class="form-group">'+
		   	            '<label class="col-sm-2 control-label"><span style="color:red;">*</span>联系方式</label>'+
		                   '<div class="col-sm-4">'+
		                       '<input type="text" class="form-control" id="e-mobile" value="' + obj.mobile + '">'+
		                   '</div>'+
		                   '<label class="col-sm-2 control-label">微信</label>'+
		                   '<div class="col-sm-4">'+
		                       '<input type="text" class="form-control" id="e-wechat" value="' + obj.wechat + '">'+
		                   '</div>'+
		               '</div>';
		   	            
		   	            ctt += '<div class="form-group">'+
		   	            '<label class="col-sm-2 control-label">邮箱</label>'+
		                   '<div class="col-sm-10">'+
		   	                '<input type="text" class="form-control" id="e-email" value="' + obj.email + '">'+
		   	            '</div>'+
		               '</div>';
		   	            
		   	            
		   	            ctt += "<br/><br/>";
		   	            
		   	            
		   	            ctt += '<div class="form-group">'+
		                   '<label class="col-sm-2 control-label">备注</label>'+
		                   '<div class="col-sm-10">'+
		                       '<input type="text" class="form-control" id="e-mark" value="' + obj.mark + '">'+
		                   '</div>'+
		               '</div>';
		   	            
		   	            ctt += '<div class="form-group">'+
		                   '<label class="col-sm-2 control-label"></label>'+
		                   '<div class="col-sm-10" style="color:#C3C3C3;">'+
		                       '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比如这个证明人的脾气如何，沟通时需要注意什么，可以写备注'+
		                   '</div>'+
		               '</div>';
		   	            
		   	            ctt += "<br/>";
		   	         ctt += '<hr style="height:1px;border:none;border-top:1px solid #C3C3C3;" />';
		   	            
		   	         ctt += '<div class="form-group">'+
		   	            '<label class="col-sm-2 control-label">创建时间</label>'+
		                   '<div class="col-sm-4">'+
		                       '<input type="text" class="form-control" id="e-createTime" readonly="true" value="' + parseTime(obj.createTime) + '">'+
		                   '</div>'+
		                   '<label class="col-sm-2 control-label">创建者</label>'+
		                   '<div class="col-sm-4">'+
		                       '<input type="text" class="form-control" id="e-createSysUserName" readonly="true" value="' + obj.createSysUserName + '">'+
		                   '</div>'+
		               '</div>';
		   	         
		   	         
		   	      ctt += '<div class="form-group">'+
	   	            '<label class="col-sm-2 control-label"></span>上次更新</label>'+
	                   '<div class="col-sm-4">'+
	                       '<input type="text" class="form-control" id="e-modifyTime" readonly="true" value="' + parseTime(obj.modifyTime) + '">'+
	                   '</div>'+
	                   '<label class="col-sm-2 control-label">更新者</label>'+
	                   '<div class="col-sm-4">'+
	                       '<input type="text" class="form-control" id="e-modifySysUserName" readonly="true" value="' + obj.modifySysUserName + '">'+
	                   '</div>'+
	               '</div>';
		   	            
		   	   ctt += "<br/><br/>";
		   	            
		                ctt += '</div>';
		                
		                layer.open({
				            type:1,
				            title:'证明人详情',
				            btn:['修改', '取消'],
				            area:['650px'],
				            content:ctt,
				            yes:function(index){
				                
				            	var joinTime = $("#e-joinTime").val();
				            	var leaveTime = $("#e-leaveTime").val();
				                var userName = $("#e-username").val();
		                        var companyName = $("#e-companyName").val();
		                        var mobile = $("#e-mobile").val();
		                        var email = $("#e-email").val();
		                        
		                        var department = $("#e-department").val();
		                        var position = $("#e-position").val();
		                        var wechat = $("#e-wechat").val();
		                        var mark = $("#e-mark").val();
		                        var leaveReason = $("#e-leaveReason").val();
		                        var gender = $("#e-gender").val();
		                        
		                        if(companyName == ""){
		                            layer.alert("请填写所在公司", {title:"警告"});
		                            return false;
		                        }
		                        
		                        if(position == ""){
		                            layer.alert("请填写职位", {title:"警告"});
		                            return false;
		                        }
		                        
		                        if(userName == ""){
		                            layer.alert("请填写姓名", {title:"警告"});
		                            return false;
		                        }
		                        
		                        if(mobile == ""){
		                            layer.alert("请填写联系方式", {title:"警告"});
		                            return false;
		                        }
				                
			                	layer.confirm('确定修改证明人？', {icon: 3, title:'提示'}, function(cindex){
			                        $.ajax({
			                            url:appServer+'/bops/bgcheck/editVoucher.htm',
			                            type:"POST",
			                            data:{"id":id,"joinTime":joinTime,"leaveTime":leaveTime,"userName":userName,"userName":userName,"companyName":companyName,"mobile":mobile,"email":email,"department":department,"position":position,"wechat":wechat,"mark":mark,"leaveReason":leaveReason,"gender":gender},
			                            beforeSend:function(){
			                                loadIndex = layer.load(1);
			                            },
			                            success:function(res){
			                                layer.close(loadIndex);
			                                if(res.meta.success){
			                                    layer.msg("修改成功！");
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
		            }else{
		                layer.alert("无数据");
		            }
		        },
		        error:function(){
		            layer.msg("网络错误");
		        }
		    });
	});
	
	
    //删除
    $(document).on("click", ".deleteVoucher", function(){
	    var id = $(this).attr("data-id");
	    layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/bgcheck/deleteVoucher.htm',
                type: "POST",
                data: {"id": id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("删除成功！");
                        $("#od-search").click();
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
    
  //从自动报告表导入证明人
    $(document).on("click", ".addFronAr", function(){
	    layer.confirm('确定导入？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/bgcheck/addVoucherFromWorkPerAndWorkHis.htm',
                type: "POST",
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("导入成功！");
                        $("#od-search").click();
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
});

//功能点判断
function checkPermission(){
    $.ajax({
        url: appServer + "/bops/haspermission.htm",
        type: "GET",
        data: {"url": ["/bops/bgcheck/allVoucher","/bops/bgcheck/deleteVoucher"]},
        success: function(res){
            if(res.meta.success){
                var obj = res.retObj;
                if(obj != null){
                	hasPermissionToLook = obj[0];
                	hasPermissionToDelete = obj[1];
                }
            }
        },
        error: function(){
            layer.msg("网络错误");
        }
    });
}

var hasPermissionToLook = 0;
var hasPermissionToDelete = 0;

//拼接页面
function createData(obj, pg){
    $tb = $("#userlist").find("tbody");
    $tb.empty();
    var str = "";
    
    if(obj != null){
        for(var i=0; i<obj.length; i++){
            var nobj = replaceNull(obj[i]);
            str += "<tr "+ (i%2==0?"class='tr-normal'":"");
            
            str += ">"+
            	"<td>"+ nobj.companyName +"</td>"+
            	"<td>"+ nobj.department +"</td>"+
            	"<td>"+ nobj.position +"</td>"+
            	"<td>"+ nobj.name + "（" + (nobj.gender==""?"未知":(nobj.gender==1?"男":"女")) +  "）" +"</td>"+
            	"<td>"+ nobj.mobile +"</td>"+
            	"<td>"+ nobj.wechat +"</td>"+
            	
            	"<td>"+ (nobj.joinTime==""?"":parseTime(nobj.joinTime)) + " —— " + (nobj.leaveTime==""?"":parseTime(nobj.leaveTime)) +"</td>";
            	str += "<td>";
              if(hasPermissionToLook == 1){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='detailVoucher' data-id='"+ nobj.id +"'>详情</a>"; 
              }
              if(hasPermissionToDelete == 1){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='deleteVoucher' data-id='"+ nobj.id +"'>删除</a>"; 
              }
              
              str += "</td>"+
           "</tr>";
        }
    }

    $tb.append(str);
}

//批量导入
function fileUpload(file){
	var form = new FormData($('#fm')[0]);
	$.ajax({
		url:appServer + "/bops/bgcheck/batchImportVoucher.htm",
		type: "POST",
		data: form,
		processData: false,  
        contentType: false,
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				layer.alert("正在导入中，请稍等！");
				layer.alert(res.data);
				$("#pgi-1").page("/bops/bgcheck/allVoucher", null, createData);
			}else{
				layer.alert(res.meta.errorInfo);
			}
		},
		error:function(){
			layer.close(loadIndex);
			layer.msg("网络错误！");
		}
	});
	//兼容IE和其他浏览器，清空file元素
	file.outerHTML += '';   
	file.value ="";  
	//兼容IE和其他浏览器，清空file元素
}