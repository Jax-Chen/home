$(function(){
	$(".bt_add").on("click", function(){
		$("#h-name").val($("#s-name").val());
		$("#h-mobile").val($("#s-mobile").val());
		$("#h-email").val($("#s-email").val());
		$("#h-companyName").val($("#s-companyName").val());
		$("#h-menu").val($("#s-menu").val());
		$("#h-userFrom").val($("#s-userFrom").val());
		$("#h-orderStatus").val($("#s-orderStatus").val());
		$("#h-orderTime").val($("#s-orderTime").val());
		$("#h-surveyingTime").val($("#s-surveyingTime").val());
		$("#h-doneTime").val($("#s-doneTime").val());
		$("#h-sort").val($("#s-sort").val());
		
		layer.alert('确定导出？', {icon:3,btn:['确定','取消']}, function(index){
			$("#hidenForm").submit();
			layer.closeAll();
		});
	});
});