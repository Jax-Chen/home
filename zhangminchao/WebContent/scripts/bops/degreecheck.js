$(function (){
	$("#bk-btn-ok").on("click",function(){
		var name = $("#nameipt").val();
		var degreeNumber = $("#degreeNoipt").val();
		if("" == degreeNumber  ||  ""==name){
			alert("请填写查询姓名，学位证书编号");
			return;
		}
		
		$.ajax({
			url:appServer+"/bops/bkcheck/degreecheck.htm",
			type:"POST",
			data:{"tName":name,"degreeNumber":degreeNumber},
			beforeSend:function(){
				$(".loadframe").show();
			},
			success:function(res){
				$(".loadframe").hide();
				if(res.meta.success){
					var obj = res.data;
					$("#bk-degree-name").text(obj.name);
					var str = obj.photoBase64;
					str = str.substring(0,str.length -1);
					str = str.substring(1,str.length);
					var image = new Image();
					var str = 'data:image/jpeg;base64,'+str;
				    $("#bk-degree-photo").html('<img src="'+str+'">');
					$("#bk-degree-gender").text(obj.gender);
					$("#bk-degree-birthday").text(obj.birthday);
					$("#bk-degree-xwschool").text(obj.degreeGrantUnit);
					$("#bk-degree-pyschool").text(obj.studyingUnit);
					$("#bk-degree-major").text(obj.major);
					$("#bk-degree-degreename").text(obj.degreeName);
					$("#bk-degree-id").text(obj.degreeNumber);
					$("#bk-degree-date").text(obj.degreeDate);
					$("#bk-degree-regist").text(obj.degreeOrderNumber);
					$(".bk-result").show();
				}else{
					alert(res.meta.errorInfo);
					return;
				}
			},
			error:function(xhr){
				$(".loadframe").hide();
				alert("网络错误！");
				return;
			}
			
		});
	});
	$("#bk-btn-reset").live("click", function() {
		$("#nameipt").val("");
		$("#idcardipt").val("");
		$("#ordeript").val("");
		$(".bk-result").hide();
	});
});