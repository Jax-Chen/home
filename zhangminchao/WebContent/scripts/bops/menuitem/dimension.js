$(function() {
	$("#pgi-1").page("/bops/menuitem/dimension", null, tableCreate);
	
	$("#dimension-table").on("click", ".restart-btn", function() {
		var id = $(this).attr("data-id");
		layer.confirm('确定启用？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/menuitem/restartdimension.htm',
                type:"POST",
                data:{"id": id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("启用成功！");
                        $("#pagi-i").page.refresh();
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
	
	$("#dimension-table").on("click", ".deldim-btn", function() {
		var id = $(this).attr("data-id");
		layer.confirm('确定停用？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/menuitem/deldimension.htm',
                type:"POST",
                data:{"id": id},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("停用成功！");
                        $("#pagi-i").page.refresh();
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
	
	$("#role-search").on("click", function(){
		var status = $("#status").val();
		var title = $("#title").val();
		$("#pgi-1").page("/bops/menuitem/dimension", {"status": status, "title": title}, tableCreate);
	});
	
	$("#adddi-btn").on("click", function(){
		var ctt = "<div style='width:80%;margin:10px auto;'>" +
					"<form class='form-horizontal'>"+
                            "<div class='form-group'>"+
                                "<label class='col-sm-3 control-label'>名称：</label>"+
                                "<div class='col-sm-8'>"+
                                    "<input type='text' id='new-title' placeholder='名称' class='form-control'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                            	"<label class='col-sm-3 control-label'>原价：</label>"+
                            	"<div class='col-sm-8'>"+
                                	"<input type='text' id='new-originprice' placeholder='原价，精确到分。例：填1000 = 10.00元' class='form-control'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                            	"<label class='col-sm-3 control-label'>折扣价：</label>"+
                            	"<div class='col-sm-8'>"+
                                	"<input type='text' id='new-discountprice' placeholder='折扣价，精确到分。例：填1000 = 10.00元' class='form-control'>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                                "<label class='col-sm-3 control-label'>描述：</label>"+
                                "<div class='col-sm-8'>"+
                                    "<textarea id='new-discription' placeholder='描述' class='form-control' style='height:200px;'></textarea>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                            	"<label class='col-sm-3 control-label'>状态：</label>"+
                            	"<div class='col-sm-8'>"+
                                	"<select id='new-status' class='form-control'>" +
                                		"<option value='0'>启用</option>"+
                                		"<option value='1'>停用</option>"+
                                	"</select>"+
                                "</div>"+
                            "</div>"+
                            "<div class='form-group'>"+
                            	"<label class='col-sm-3 control-label'>排序值：</label>"+
                            	"<div class='col-sm-8'>"+
                            		"<input type='text' id='new-ordering' placeholder='排序值' class='form-control'>"+
                                "</div>"+
                            "</div>"+
                        "</form>"+
				"</div>";
		layer.open({
            type:1,
            title:'新增维度',
            btn:['确定', '取消'],
            area:['600px','500px'],
            content:ctt,
            yes:function(index){
                var title = $("#new-title").val();
                var description = $("#new-discription").val();
                var status = $("#new-status").val();
                var ordering = $("#new-ordering").val();
                var originprice = $("#new-originprice").val();
                var discountprice = $("#new-discountprice").val();
                
                if(title == "") {
                	layer.alert("请填写名称");
                	return false;
                } 
                
                if(ordering == "") {
                	layer.alert("请填写排序值");
                	return false;
                }
                
                if(originprice == "") {
                	layer.alert("请填写原价");
                	return false;
                }
                
                if(discountprice == "") {
                	layer.alert("请填写折扣价");
                	return false;
                }
                
                $.ajax({
                	url: appServer + "/bops/menuitem/adddimension.htm",
                	type: "POST",
                	data: {"title": title, "description": description, "status": status, "ordering": ordering, "originPrice": originprice,
                		"discountPrice": discountprice
                	},
                	beforeSend: function() {
                		loadIndex = layer.load(1);
                	},
                	success: function(res) {
                		layer.close(loadIndex);
                		if(res.meta.success) {
                			layer.msg("添加成功");
                			layer.close(index);
                			$("#pgi-1").page.refresh();
                		} else {
                			layer.alert(res.meta.errorInfo);
                		}
                	},
                	error: function() {
                		layer.close(loadIndex);
                		layer.msg("网络错误");
                	}
                });
                
            }
        });    
	});
	
	$("#dimension-table").on("click", ".editdim-btn", function() {
		var id = $(this).attr("data-id");
		$.ajax({
			url: appServer + "/bops/menuitem/getdimension.htm",
			type: "GET",
			data: {"id": id},
			beforeSend: function() {
				loadIndex = layer.load(1);
			},
			success: function(res) {
				layer.close(loadIndex);
				if(res.meta.success) {
					var di = res.retObj;
					var ctt = "<div style='width:80%;margin:10px auto;'>" +
					"<form class='form-horizontal'>"+
			                "<div class='form-group'>"+
			                    "<label class='col-sm-3 control-label'>名称：</label>"+
			                    "<div class='col-sm-8'>"+
			                        "<input type='text' id='new-title' placeholder='名称' class='form-control' value='"+ di.title +"'>"+
			                    "</div>"+
			                "</div>"+
			                "<div class='form-group'>"+
			                	"<label class='col-sm-3 control-label'>原价：</label>"+
			                	"<div class='col-sm-8'>"+
			                    	"<input type='text' id='new-originprice' placeholder='原价，精确到分。例：填1000 = 10.00元' class='form-control' value='"+ di.originPrice +"'>"+
			                    "</div>"+
			                "</div>"+
			                "<div class='form-group'>"+
			                	"<label class='col-sm-3 control-label'>折扣价：</label>"+
			                	"<div class='col-sm-8'>"+
			                    	"<input type='text' id='new-discountprice' placeholder='折扣价，精确到分。例：填1000 = 10.00元' class='form-control' value='"+ di.discountPrice +"'>"+
			                    "</div>"+
			                "</div>"+
			                "<div class='form-group'>"+
			                    "<label class='col-sm-3 control-label'>描述：</label>"+
			                    "<div class='col-sm-8'>"+
			                        "<textarea id='new-discription' placeholder='描述' class='form-control' wrap='on' cols='40' style='height:200px;resize:none;'>"+ di.description.replace("\r\n","") +"</textarea>"+
			                    "</div>"+
			                "</div>"+
			                "<div class='form-group'>"+
			                	"<label class='col-sm-3 control-label'>排序值：</label>"+
			                	"<div class='col-sm-8'>"+
			                		"<input type='text' id='new-ordering' placeholder='排序值' class='form-control' value='"+ di.ordering +"'>"+
			                    "</div>"+
			                "</div>"+
			            "</form>"+
				"</div>";
					layer.open({
			            type:1,
			            title:'修改维度',
			            btn:['确定', '取消'],
			            area:['600px','500px'],
			            content:ctt,
			            yes:function(index){
			                var title = $("#new-title").val();
			                var description = $("#new-discription").val();
			                var ordering = $("#new-ordering").val();
			                var originprice = $("#new-originprice").val();
			                var discountprice = $("#new-discountprice").val();
			                
			                if(title == "") {
			                	layer.alert("请填写名称");
			                	return false;
			                } 
			                
			                if(ordering == "") {
			                	layer.alert("请填写排序值");
			                	return false;
			                }
			                
			                if(originprice == "") {
			                	layer.alert("请填写原价");
			                	return false;
			                }
			                
			                if(discountprice == "") {
			                	layer.alert("请填写折扣价");
			                	return false;
			                }
			                
			                $.ajax({
			                	url: appServer + "/bops/menuitem/updatedimension.htm",
			                	type: "POST",
			                	data: {"title": title, "description": description, "ordering": ordering, "originPrice": originprice,
			                		"discountPrice": discountprice, "id": id
			                	},
			                	beforeSend: function() {
			                		loadIndex = layer.load(1);
			                	},
			                	success: function(res) {
			                		layer.close(loadIndex);
			                		if(res.meta.success) {
			                			layer.msg("修改成功");
			                			layer.close(index);
			                			$("#pgi-1").page.refresh();
			                		} else {
			                			layer.alert(res.meta.errorInfo);
			                		}
			                	},
			                	error: function() {
			                		layer.close(loadIndex);
			                		layer.msg("网络错误");
			                	}
			                });
			                
			            }
			        });    
					
				} else {
					layer.msg(res.meta.errorInfo);
				}
			},
			error: function() {
				layer.close(loadIndex);
				layer.msg("网络错误");
			}
		});
	});
});

function tableCreate(obj, pg){
	$tb = $("#dimension-table").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr"; 
		str+= ">"+
	      "<td>"+ nobj.title +"</td>"+
	      "<td>"+ nobj.originPrice/100.00 +"</td>"+
	      "<td>"+ nobj.discountPrice/100.00 +"</td>"+
	      "<td>"+ nobj.description +"</td>";
		  if(nobj.status == 0){
			  str += "<td><i class='glyphicon glyphicon-ok' style='color:green;'></i> 正常</td>";
		  }else{
			  str += "<td><i class='glyphicon glyphicon-remove' style='color:red;'></i> 停用</td>";
		  }
		  
		  str += "<td>";
		  
		  if(nobj.status == 0) {
			  if(hasPermission("/bops/menuitem/deldimension")) {
				  str += "<a href='javascript:void(0)' style='display:inline-block;margin-right:10px;' data-id='"+ nobj.id +"' class='deldim-btn'><i class='fa fa-power-off'></i> 停用</a>";
			  }  
		  } else if(nobj.status == 1) {
			  if(hasPermission("/bops/menuitem/restartdimension")) {
				  str += "<a href='javascript:void(0)' style='display:inline-block;margin-right:10px;' data-id='"+ nobj.id +"' class='restart-btn'><i class='glyphicon glyphicon-repeat'></i> 启用</a>";
			  } 
		  }
		  
		  if(hasPermission("/bops/menuitem/updatedimension")) {
			  str += "<a href='javascript:void(0)' style='display:inline-block;margin-right:10px;' data-id='"+ nobj.id +"' class='editdim-btn'><i class='fa fa-edit'></i> 编辑</a>";
		  }
		  
		  str += "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}