$(function(){
	$(".bt_add").on("click", function(){
		$("#h-surveyname").val($("#s-surveyname").val());
		$("#h-funname").val($("#s-funname").val());
		$("#h-starttime").val($("#s-starttime").val());
		$("#h-endtime").val($("#s-endtime").val());
		layer.alert('确定导出？', {icon:3,btn:['确定','取消']}, function(index){
			$("#hidenForm").submit();
			layer.closeAll();
		});
	});
});