$(document).ready(function() {
	
	$(".menuItemDel").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		hrHuTui.popout({
			type:"info",
			title:"删除套餐项",
			content:"<span style='font-size:16px;padding-left:20px;'>确定删除该套餐项吗？</span>",
			onOk:function(callback){
				$.ajax({
					url:appServer + "/bops/menuItem/delete.htm",
					type:"POST",
					data:{"id":id},
					success:function(res){
						if (res.meta.success) {
							alert("删除成功！");
							self.closest("tr").remove();
							return true;
						}else{
							alert(res.meta.errorInfo);
							return false;
						}
					},
					error:function(xhr){
						alert("服务器连接失败！");
						return false;
					}
				});
			}
		});
	});
	
	$(".menuItemEdit").on("click", function() {
		var self = $(this);
		var id = self.attr("data-code");
		window.location.href = appServer + "/bops/menuItem/edit.htm?id="+id;
	});
});