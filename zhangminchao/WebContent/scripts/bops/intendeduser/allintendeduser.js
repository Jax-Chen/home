$(function(){
    
    $("#pgi-1").page("/bops/user/allintendeduser", null, createData);
    
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
                "/bops/user/allintendeduser", 
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
    
});

function checkPermission(){
    $.ajax({
        url: appServer + "/bops/haspermission.htm",
        type: "GET",
        data: {"url": ["/bops/user/addusermarketservice"]},
        success: function(res){
            if(res.meta.success){
                var obj = res.retObj;
                if(obj != null){
                    hasPermissionToCheckLog = obj[0];
                }
            }
        },
        error: function(){
            layer.msg("网络错误");
        }
    });
}

var hasPermissionToCheckLog = 0;

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
              "<td>"+ nobj.userName +"</td>"+
              "<td>"+ nobj.companyName +"</td><td>";
              if(nobj.status == 0){
                  str += "未注册";
              }else if(nobj.status == 10){
                  str += "已注册";
              }
              str += "</td>" +
              "<td>"+ nobj.nickName +"</td>" +
              "<td>"+ parseTime(nobj.createTime) +"</td>" +
              "<td>"+ parseTime(nobj.modifyTime) +"</td><td>";
              if(hasPermissionToCheckLog == 1){
                  str += "<a href='javascript:;' style='display:inline-block;' class='addservicelog' data-id='"+ nobj.id +"'>添加记录</a>"; 
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
