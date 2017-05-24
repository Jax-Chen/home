$(document).ready(function() {
	
	$(".checkimg").on("click", function() {
		var self = $(this);
		var lic = self.attr("lic-pth");
		var dec = self.attr("dec-pth");
		
		var str = "<div style='width:100%'>" +
		"<div style='float:left;width:50%'><div>营业执照</div><div style='margin-top:10px;margin-bottom:10px'>";
		if(lic!=""){
			str+="<a href='"+uploadImageServer+"/"+lic+"' target='_blank'><img style='width:50%;' src="+uploadImageServer+"/"+lic+" /></a></div></div>";
		}else{
			str+="无</div></div>";
		}
		str+="<div style='float:left;width:50%'><div>企业执照</div><div style='margin-top:10px;margin-bottom:10px'>";
		if(dec!=""){
			str+="<a href='"+uploadImageServer+"/"+dec+"' target='_blank'><img style='width:50%;' src="+uploadImageServer+"/"+dec+" /></a></div></div>";
		}else{
			str+="无</div></div>";
		}
		str+="</div>";
		hrHuTui.popout({
			title:"审核信息",
			width:800,
			content:str
		});
	});
	
    
	$(".auditoperate").on("click", function(){
		var self = $(this);
		var id = self.attr("data-code");
		
		var cstr = "<div style='width:400px;margin-left:auto;margin-right:auto;margin-top:10px;' id='opframe'><div style='height:20px;line-height:20px;float:left;'>操作结果:</div><div style='float:left;margin-left:5px;'><select id='chooseres'><option value=''>请选择</option><option value='1'>审核通过</option><option value='2'>审核不通过</option></select></div></div>" +
				"<script>" +
				"$('#chooseres').change(function(){" +
					"$('.newname').remove();"+
					"$('.reason').remove();" +
					"if($('#chooseres').val()=='2'){" +
						"var str = '<div class=\"reason\" style=\"width:400px;margin-left:auto;margin-right:auto;margin-top: 50px;\"><div style=\"float:left\">审核不通过理由:</div><textarea id=\"reasonta\" style=\"float:left;width:200px;height:100px\" ></textarea></div>';" +
						"$('#opframe').after(str);" +
					"}else if($('#chooseres').val()=='1'){" +
						"var str='<div class=\"newname\" style=\"width:400px;margin-left:auto;margin-right:auto;margin-top: 50px;\"><div style=\"float:left\">公司名称(不填则为原来的名字):</div><input id=\"comname\" value=\"\" style=\"float:left;marign-top:10px;\" /></div>';"+
						"$('#opframe').after(str);"+
					"}" +
				"});" +
				"</script>";
		
		hrHuTui.popout({
			title:"审核操作",
			type:"text",
			width:600,
			content:cstr,
			onOk:function(callback){
				var v = $("#chooseres").val();
				var res = $("#reasonta").val();
				var comname = $("#comname").val();
				if(v=="1"||v=="2"){
					$.ajax({
						url:"/bops/user/auditoperate.htm",
						type:"POST",
						data:{"id":id,"type":v,"reason":res,"comname":comname},
						success:function(res){
							if(res.meta.success){
								alert("审核成功！");
								if(v==1){
									self.closest("tr").find("#tdStatus").html("审核通过");
									if(comname!=""){
										self.closest("tr").find("#tdcomname").text(comname);
									}
								}else if(v==2){
									self.closest("tr").find("#tdStatus").html("审核未通过");
								}
								self.remove();
								return true;
							}else{
								alert(res.meta.errorInfo);
								return false;
							}
						},
						error:function(res){
							alert("网络错误！");
						}
					});
				}else if(v==""){
					alert("请选择审核结果！");
					return false;
				}else{
					alert("参数错误！");
				}
			}
		});
		
	});
    
	
	
});