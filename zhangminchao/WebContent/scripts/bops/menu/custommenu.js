$(function() {
	$(".btn-search").on("click", function() {
		var mobile = $("#mobile").val();
		
		if(!mobileCheck(mobile)) {
			layer.alert("手机号错误");
		}
		$.ajax({
			url: appServer + "/bops/menu/custommenu.htm",
			type: "POST",
			data:{"mobile": mobile},
			beforeSend: function(){
                loadIndex = layer.load(1);
            },
            success: function(res){
            	layer.close(loadIndex);
            	if(res.meta.success){
            		var obj = res.retObj;
            		var ctt = "<table class='table table-hover'><tbody>"
            		for(var i=0; i<obj.length; i++){
            			ctt += "<tr>" +
            						"<td class='project-title'><a href='javascript:;' data-id='"+ obj[i].id +"' class='menuId'>"+ obj[i].name +"</a></td>"+
            					"</tr>"
            		}
            		
            		ctt += "</tbody></table>";
            		
            		$(".serch-result").empty().append(ctt);
            		$(".search-frame").show();
            	}else{
            		layer.close(loadIndex);
            		layer.msg(res.meta.errorInfo);
            	}
            },
            error: function(){
            	layer.close(loadIndex);
            	layer.msg("网络错误");
            }
		});
		
	});
	
	$(document).on("click", ".menuId", function(){
		var menuId = $(this).attr("data-id");
		$this = $(this);
		$.ajax({
			url: appServer + "/bops/menu/getmenudetail.htm",
			type: "POST",
			data: {"menuId": menuId},
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var ctt = "<div style='width:200px;margin:10px auto;'>";
	                for(var i=0; i<obj.length; i++){
	                    ctt += "<p style='margin:10px auto;'>"+ obj[i].surveyProject +"<span style='padding-left:20px;'>"+ (obj[i].valid==true?"可用 <i class='fa fa-check'></i>":"不可用 <i class='fa fa-close'></i>") +"</span></p>"
	                }
	                ctt += "</div>";
	                layer.open({
	                    type:1,
	                    title:'套餐项:' + $this.text(),
	                    btn:['确定', '取消'],
	                    area:['300px'],
	                    content:ctt,
	                    yes:function(index){
	                        layer.close(index);
	                    }
	                }); 
				}else{
					layer.msg(res.meta.retObj);
				}
			},
			error:function(){
               layer.msg('网络错误！');
			}
		});
	});
});