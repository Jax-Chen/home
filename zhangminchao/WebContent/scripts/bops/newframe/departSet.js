$(function(){
	
	$("#deliverDepart-btn").on("click", function(){
		pout(retSetDeliver);
	});
	
	$("#marketDepart-btn").on("click", function(){
		pout(retSetMarket);
	});
	
});

function pout(fun){
	var ctt = "<div class='pouttreediv'><nav id='pouttree' class='tuxedo-menu metismenu tuxedo-menu-pristine animated tuxedo-menu-visible'>"+
		                '<ul id="poutul">'
		                    
		                +"</ul>"
		            +"</nav>"
			+"</div>"
			+"<div style='margin-top:10px;margin-left:10px;border-top:1px solid #9e9e9e;'><span>当前选择部门：</span><span id='ftdpt'></span><input id='poutfather' type='hidden' value=''></div>"
			+'<script>'
			+'initDepartMenu("pouttree");'	
	        +"$('#pouttree').on('click', 'a', function(){"
	        		+'$("#ftdpt").text($(this).text());'
	        		+'$("#poutfather").val($(this).attr("data-code"));'
	        	+"});"
			+"</script>";

		layer.open({
			type: 1,
			title: '选择上级部门',
			btn: ['确定', '取消'],
			area: ['400px', '500px'],
			content: ctt,
			yes: function(index) {
				var dpName = $("#ftdpt").text();
				var dpId = $("#poutfather").val();
				if(dpId==""){
					layer.msg("请选择部门");
					return;
				}else{
					fun(dpName, dpId);
				}
			}
		});
}

function retSetDeliver(dpName, dpId){
	layer.confirm("确定设置"+dpName+"为交付部门？",{icon: 3, title:'提示'}, function(cIndex){
		$.ajax({
			url:appServer + "/bops/systempermission/setdeliverdepart.htm",
			type:"POST",
			data:{"id":dpId},
			success:function(res){
				if(res.meta.success){
					layer.msg("设置成功");
					$("#deliverDepartText").text(dpName);
					$("#deliverDepart").val(dpId);
					layer.closeAll();
				}else{
					layer.msg(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	});
}

function retSetMarket(dpName, dpId){
	layer.confirm("确定设置"+dpName+"为市场部门？",{icon: 3, title:'提示'}, function(cIndex){
		$.ajax({
			url:appServer + "/bops/systempermission/setmarketdepart.htm",
			type:"POST",
			data:{"id":dpId},
			success:function(res){
				if(res.meta.success){
					layer.msg("设置成功");
					$("#marketDepartText").text(dpName);
					$("#marketDepart").val(dpId);
					layer.closeAll();
				}else{
					layer.msg(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	});
}

function initDepartMenu(id){
	return $.ajax({
			url:appServer + "/bops/systemdepart/getalldepart.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					for(var i=0;i<obj.length;i++){
						if(obj[i].fid == null){
							$("#"+id).find("ul").append("<li class='active'><a href='#' class='titleli' data-code='"+ obj[i].id  + "'" + (obj[i].status==2?"style='color:#9e9e9e'>":">") + obj[i].name +"</a></li>");
						}
					}
					
					for(var i=0;i<obj.length;i++){
						if(obj[i].fid != null){
							var t = $("#"+id).find("li a[data-code='"+ obj[i].fid +"']");
							var p = t.parent().find("ul");
							if(p.size()==0){
								$(t).append("<span class='glyphicon arrow'></span>").after("<ul class='collapse'>"
			                           +"<li><a href='#' data-code='"+ obj[i].id +"'"+ (obj[i].status==2?"style='color:#9e9e9e'>":">") + obj[i].name +"</a></li>"
			                           +"</ul>");
							}else{
								$(p[0]).append("<li><a href='#' data-code='"+ obj[i].id +"'"+ (obj[i].status==2?"style='color:#9e9e9e'>":">") + obj[i].name +"</a></li>");
							}
						}
					}
					
				    $('#'+id).tuxedoMenu({isFixed: false}).metisMenu({
				        toggle: false,
				        activeClass: 'active'
				    });
				}
			}
		});
}