$(function(){
	
	$("#pgi-1").page("/bops/menu/exclusiveuserlist", {"menuId": $("#menuId").val()}, createData);
	
	$("#od-search").on("click", function(){
		var name = $("#e-name").val();
		var mobile = $("#e-mobile").val();
		var comName = $("#e-comname").val();
		var id = $("#menuId").val();
		$("#pgi-1").page(
				"/bops/menu/exclusiveuserlist", 
				{"name":name, "mobile":mobile, "comName":comName, "menuId":id}, 
				createData
		);
	});
	
	$(document).on("click", ".deleteexclusive", function() {
		var menuId = $("#menuId").val();
		var userId = $(this).attr("data-id");
		
		if(menuId != "" && userId != "") {
			layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(cindex){
                $.ajax({
                    url:appServer+'/bops/menu/deleteexclusiveuser.htm',
                    type:"POST",
                    data:{"menuId":menuId, "userId":userId},
                    beforeSend:function(){
                        loadIndex = layer.load(1);
                    },
                    success:function(res){
                        layer.close(loadIndex);
                        if(res.meta.success){
                            layer.msg("删除成功！");
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

/**
 * 构建表格数据
 * @param obj
 * @param pg
 */
function createData(obj, pg) {
	$tb = $("#list").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":"");
		
		str += ">"+
	      "<td>"+ nobj.name +"</td>"+
	      "<td>"+ nobj.companyName +"</td>";
		  str += "<td>"+ nobj.mobile+"</td>"+
		  "<td>"+ nobj.email+"</td>";
	      str += "<td>";
		  if(hasPermission("/bops/menu/deleteexclusiveuser")){
			 str += "<a href='javascript:;' style='display:inline-block;' class='deleteexclusive' data-id='"+ nobj.id +"'>删除</a>"; 
		  }
			str += "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}