$(function() {
	
	$(".back").on("click", function() {
		window.location.href= appServer + "/bops/systemuser/list.htm";
	});
	
	$("#checkAll").on("click", function() {
		if ($(this).attr('checked')){
			$("[name='checkMe']").attr('checked', 'checked');
		} else {
			$("[name='checkMe']").removeAttr('checked');
		}
	});
	
	$("#saveUserRole").click(function(e){
	    var len = $("[name='checkMe']:checked").length;
		if (0 >= len) {
			alert("请选择适用的角色信息");
			return false;
		}
		
		if (confirm('确定设置关联角色?')){
			var roleIds = [];
			$("[name='checkMe']:checked").each(function() {
				roleIds.push(this.value);
    		});
			$("#selRoleId").val(roleIds.join(","));
			$("#roleSetForm").submit();
		}
	});
});

	
		