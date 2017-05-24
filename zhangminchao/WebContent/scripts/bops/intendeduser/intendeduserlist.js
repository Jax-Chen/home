$(function(){
	
	$("#pgi-1").page("/bops/user/intendeduserlist", null, createData);
	
	$("#od-search").on("click", function(){
		var userName = $("#userName").val();
		var companyName = $("#companyName").val();
		var mobile = $("#mobile").val();
		var email = $("#email").val();
		var systemuser = $("#systemuser").val();
		var regStatus = $("#regStatus").val();
		var tel = $("#tel").val();
		var systemUserId = $("#pout-dutyleader").val();
		$("#pgi-1").page(
				"/bops/user/intendeduserlist", 
				{"userName":userName, "companyName":companyName, "mobile":mobile, "email":email, "systemuser":systemuser, "regStatus":regStatus, "tel":tel,"systemUserId":systemUserId}, 
				createData
		);
	});
	
	$(document).on("click", ".addservicelog", function(){
		var ctt = "<textarea id='servlog' style='width:100%;height:300px;'></textarea>";
		var intendedUserId = $(this).attr("data-id");
		layer.open({
		            type:1,
		            title:'添加服务记录',
		            btn:['确定', '取消'],
		            area:['600px'],
		            content:ctt,
		            yes:function(index){
		                var content = $("#servlog").val();
		                if(content != ""){
		                	layer.confirm('确定添加服务记录？', {icon: 3, title:'提示'}, function(cindex){
		                        $.ajax({
		                            url:appServer+'/bops/user/addusermarketservice.htm',
		                            type:"POST",
		                            data:{"intendedUserId":intendedUserId, "log":content},
		                            beforeSend:function(){
		                                loadIndex = layer.load(1);
		                            },
		                            success:function(res){
		                                layer.close(loadIndex);
		                                if(res.meta.success){
		                                    layer.msg("添加成功！");
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
		            }
		        }); 
	});
	
	$(document).on("click", ".checkservicelog", function(){
		var id = $(this).attr("data-id");
		$.ajax({
			url: appServer + "/bops/user/queryintendedservicelog.htm",
			type: "POST",
			data: {"id":id},
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					if(obj != null){
						var ctt = "<div style='width:100%;overfolw:auto;margin-top:10px;'>";
						for(var i = 0; i < obj.length; i++){
							ctt += "<div class='servicelog'><div style='color: red;display: inline-block;width: 100%;color:red;'><span style='width:50%;display: inline-block;'>添加时间："+ parseTime(obj[i].createTime) +"</span><span style='width:50%;display: inline-block;text-align:right;'>添加者："+ obj[i].nickName +"</span></div>" + obj[i].log +"</div>";
						}
						ctt += "</div>";
						layer.open({
				            type:1,
				            title:'查看服务记录',
				            btn:['确定'],
				            area:['600px', '400px'],
				            content: ctt,
				            yes:function(index){
				                layer.close(index);
				            }
				        });    
					}
				}
			}
		});
	});
	
	$(document).on("click", ".deleteintduser", function(){
	    var id = $(this).attr("data-id");
	    layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/user/delitendeduser.htm',
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
	
	$(document).on("click", ".editintendeduser", function(){
	    var id = $(this).attr("data-id");
	    $.ajax({
	        url: appServer + "/bops/user/findindendedbyid.htm",
	        type: "GET",
	        data: {"id": id},
	        success:function(res){
	            if(res.meta.success){
	                var obj = res.retObj;
	                obj = replaceNull(obj);
	                var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">'
	                ctt += '<div class="form-group">'+
                        '<label class="col-sm-2 control-label"><span style="color:red;">*</span>用户姓名</label>'+
                        '<div class="col-sm-10">'+
                            '<input type="text" class="form-control" id="e-uname" value="'+ obj.userName +'">'+
                        '</div>'+
                    '</div>';
	                
    	            ctt += '<div class="form-group">'+
                        '<label class="col-sm-2 control-label"><span style="color:red;">*</span>公司名称</label>'+
                        '<div class="col-sm-10">'+
                            '<input type="text" class="form-control" id="e-comname" value="'+ obj.companyName +'">'+
                        '</div>'+
                    '</div>';
    	            
    	            ctt += '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">手机号</label>'+
                        '<div class="col-sm-10">'+
                            '<input type="text" class="form-control" id="e-mobile" value="'+ obj.mobile +'">'+
                        '</div>'+
                    '</div>';
    	            
    	            ctt += '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">座机号</label>'+
                        '<div class="col-sm-10">'+
                            '<input type="text" class="form-control" id="e-tel" value="'+ obj.tel +'">'+
                        '</div>'+
                    '</div>';
    	            
    	            ctt += '<div class="form-group">'+
                        '<label class="col-sm-2 control-label">邮箱</label>'+
                        '<div class="col-sm-10">'+
                            '<input type="text" class="form-control" id="e-email" value="'+ obj.email +'">'+
                        '</div>'+
                    '</div>';
    	            
	                ctt += '</div>';
	                
	                layer.open({
	                    type:1,
	                    title:'编辑',
	                    btn:['确定', '取消'],
	                    area:['600px'],
	                    content:ctt,
	                    yes:function(index){
	                        var userName = $("#e-uname").val();
	                        var companyName = $("#e-comname").val();
	                        var mobile = $("#e-mobile").val();
	                        var tel = $("#e-tel").val();
	                        var email = $("#e-email").val();
	                        
	                        if(userName == ""){
	                            layer.alert("请填写用户姓名", {title:"警告"});
	                            return false;
	                        }
	                        
	                        if(companyName == ""){
	                            layer.alert("请填写公司名称", {title:"警告"});
	                            return false;
	                        }
	                        
	                        if(mobile == "" && tel == ""){
	                            layer.alert("手机座机必须填写一个", {title:"警告"});
	                            return false;
	                        }
	                        
	                        $.ajax({
	                            url: imageServer + "/bops/user/updateintendeduser.htm",
	                            type: "POST",
	                            data: {"id":id, "userName": userName, "companyName":companyName, "mobile":mobile, "email":email, "tel":tel},
	                            success:function(res){
	                                if(res.meta.success){
	                                    layer.msg("修改成功");
	                                    layer.close(index);
	                                    $("#od-search").click();
	                                }else{
	                                    layer.alert(res.meta.errorInfo);
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
	                layer.alert("无数据");
	            }
	        },
	        error:function(){
	            layer.msg("网络错误");
	        }
	    });
	});
	
	$(document).on("click", ".completeuser", function(){
	    var id = $(this).attr("data-id");
	    var username = $(this).parent("td").siblings(".t-username").text();
	    var companyName = $(this).parent("td").siblings(".t-companyName").text();
	    var mobile = $(this).parent("td").siblings(".t-mobile").text();
	    var tel = $(this).parent("td").siblings(".t-tel").text();
	    var email = $(this).parent("td").siblings(".t-email").text();
	    $this = $(this);
	    
	    var ctt = '<div class="form-horizontal" style="width:80%;margin:5px auto;">'
            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label"><span style="color:red;">*</span>用户姓名</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="c-uname" value="'+ username +'" disabled>'+
                '</div>'+
            '</div>';
            
            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label"><span style="color:red;">*</span>公司名称</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="c-comname" value="'+ companyName +'" disabled>'+
                '</div>'+
            '</div>';
            
            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label">手机号</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="c-mobile" value="'+ mobile +'" '+ (mobile==""?"":"disabled") +'>'+
                '</div>'+
            '</div>';
            
            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label">座机号</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="c-tel" value="'+ tel +'" '+ (tel==""?"":"disabled") +'>'+
                '</div>'+
            '</div>';
            
            ctt += '<div class="form-group">'+
                '<label class="col-sm-2 control-label">邮箱</label>'+
                '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" id="c-email" value="'+ email +'" '+ (email==""?"":"disabled") +'>'+
                '</div>'+
            '</div>';
            
            ctt += '</div>';
            
            layer.open({
                type:1,
                title:'编辑',
                btn:['确定', '取消'],
                area:['600px'],
                content:ctt,
                yes:function(index){
                    var nmobile = $("#c-mobile").val();
                    var ntel = $("#c-tel").val();
                    var nemail = $("#c-email").val();
                    
                    if(mobile == "" && tel == ""){
                        layer.alert("手机座机必须填写一个", {title:"警告"});
                        return false;
                    }
                    
                    $.ajax({
                        url: imageServer + "/bops/user/completeintendeduser.htm",
                        type: "POST",
                        data: {"id":id, "mobile": nmobile, "tel":ntel, "email":nemail},
                        success:function(res){
                            if(res.meta.success){
                                layer.msg("修改成功");
                                layer.close(index);
                                $this.parent("td").siblings(".t-mobile").text(nmobile);
                                $this.parent("td").siblings(".t-tel").text(ntel);
                                $this.parent("td").siblings(".t-email").text(nemail);
                            }else{
                                layer.alert(res.meta.errorInfo);
                            }
                        },
                        error:function(){
                            layer.close(laodIndex);
                            layer.msg('网络错误！');
                        }
                    });
                    
                    
                }
            }); 
	    
	});
});

function checkPermission(){
    $.ajax({
        url: appServer + "/bops/haspermission.htm",
        type: "GET",
        data: {"url": ["/bops/user/delitendeduser", "/bops/user/updateintendeduser", "/bops/user/completeintendeduser"]},
        success: function(res){
            if(res.meta.success){
                var obj = res.retObj;
                if(obj != null){
                    hasPermissionToDelete = obj[0];
                    hasPermissionToEdit = obj[1];
                    hasPermissionToComplete = obj[2];
                }
            }
        },
        error: function(){
            layer.msg("网络错误");
        }
    });
}

var hasPermissionToDelete = 0;
var hasPermissionToEdit = 0;
var hasPermissionToComplete = 0;

checkPermission();

function createData(obj, pg){
	$tb = $("#userlist").find("tbody");
	$tb.empty();
	var str = "";
	
	if(obj != null){
    	for(var i=0; i<obj.length; i++){
            var nobj = replaceNull(obj[i]);
            str += "<tr "+ (i%2==0?"class='tr-normal'":"");
            
            str += ">"+
              "<td class='t-username'>"+ nobj.userName +"</td>"+
              "<td class='t-companyName'>"+ nobj.companyName +"</td>";
              str += "<td class='t-mobile'>"+ nobj.mobile+"</td>"+
              "<td class='t-tel'>"+ nobj.tel +"</td>"+
              "<td class='t-email'>"+ nobj.email+"</td>"+
              "<td>";
              if(nobj.status == 0){
                  str += "未注册";
              }else if(nobj.status == 10){
                  str += "已注册";
              }
              str += "</td>" +
              "<td>"+ nobj.nickName +"</td>" +
              "<td>"+ parseTime(nobj.createTime) +"</td>" +
              "<td>"+ parseTime(nobj.modifyTime) +"</td><td>";
              if(nobj.status == 0){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='addservicelog' data-id='"+ nobj.id +"'>添加记录</a>";   
              }
              
              str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='checkservicelog' data-id='"+ nobj.id +"'>查看记录</a>"; 
              if(hasPermissionToDelete == 1){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='deleteintduser' data-id='"+ nobj.id +"'>删除</a>"; 
              }
              
              if(hasPermissionToEdit == 1 && nobj.status == 0){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='editintendeduser' data-id='"+ nobj.id +"'>编辑</a>" 
              }
              
              if(hasPermissionToComplete == 1 && nobj.status == 0){
                  str += "<a href='javascript:;' style='display:inline-block;padding-right:10px;' class='completeuser' data-id='"+ nobj.id +"'>补全</a>"
              }
              
              str += "</td>"+
           "</tr>";
        }
	}

    $tb.append(str);
}



var userList = [];
function initUserList(id){
	if(userList.length == 0){
		$.ajax({
			url:appServer + "/bops/systemuser/getActiveMarketUserNew.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					userList = obj;
					buildUser(id);
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	}else{
		buildUser(id);
	}
}

var depart = new Object();
function buildUser(id){
	var str = "<option value=''>请选择</option><option value='-1'>无销售</option>";
	for(var i=0;i<userList.length;i++){
		str += "<option value='"+ userList[i].id +"'>"+ userList[i].nickName +"</option>";
		
	}
	for(var i=0;i<id.length;i++){
		$("#"+id[i]).empty();
		$("#"+id[i]).append(str);
		$("#"+id[i]).selectpicker({noneSelectedText:'请选择', size:5});
		if(depart[id[i]]!=null){
			$("#"+id[i]).selectpicker('val', depart[id[i]]);
		}
		
		$("#"+id[i]).selectpicker('refresh');
	}
}
