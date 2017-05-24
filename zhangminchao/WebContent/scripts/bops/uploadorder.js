$(function(){
	
	$("#sub").on("click", function(){
		
		var form = new FormData($('#fm')[0]);
		var url = $("#url").val();
		$.ajax({
			url:appServer+url+".htm",
			type:"POST",
			data: form,
			processData: false,  
            contentType: false,
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					alert("正在添加中，完成后将发送结果邮件，请注意查收！");
					clear();
				}else{
					alert(res.meta.errorInfo);
				}
			},
			error:function(xhr){
				$(".loadframe").hide();
				alert("网络错误！");
			}
		});
		
	});
	
	$(".reset").on("click", function(){
		clear();
	});
	
});

function clear(){
	$("#suName").val("");
	$("#suId").val("");
	$("#hrName").val("");
	$("#hrMobile").val("");
	$("#company").val("");
	$("#subTime").val("");
}