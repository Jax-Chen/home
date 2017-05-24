$(function(){
	$(".btn-cls").on("click", function(){
		window.close();
	});
	
	$(".btn-sub").on("click", function(){
		if(checkDefined()){
			layer.alert("请填写完整信息！");
			return false;
		}
		var idCard = $("#idcard").val();
		var educationId = $("#educationId").val();
		var degree = $("#degree").val();
		var whtr = $(".workhis");
		var wptr = $(".workPer");
		var mainId = $("#mainId").val();
		var whlist = [];
		var wplist = [];
		for(var i=0;i<whtr.length;i++){
			whlist.push(w(whtr[i].value, $(whtr[i]).attr("data-code")));
		}
		for(var i=0;i<wptr.length;i++){
			wplist.push(w(wptr[i].value, $(wptr[i]).attr("data-code")));
		}
		
		$.ajax({
			url:"/bops/bgcheck/subdefine.htm",
			type:"post",
			data:{"idCard":idCard, "educationId":educationId, "degree":degree, "whlist":whlist, "wplist":wplist, "mainId":mainId},
			success:function(res){
				if(res.meta.success){
					window.location.href="/bops/bgcheck/editreport.htm?id="+mainId;
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误！");
			}
		});
	});
	
});

function w(val, id){
	return '{"id":"'+id+'","value":"'+val.replace("'", "").replace("\"", "")+'"}';
}

function delzmr(id){
	$obj = $(event.target);
	var name = $obj.prev().val();
	requestDel("/bops/bgcheck/delzmr.htm", $obj, name, id);
}

function delrlzy(id){
	$obj = $(event.target);
	var name = $obj.prev().val();
	requestDel("/bops/bgcheck/delrlzy.htm", $obj, name, id);
}

function requestDel(urls, $obj, name, id){
	layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(){
		$.ajax({
			url:urls,
			type:"GET",
			data:{"id":id, "mainId":$("#mainId").val()},
			success:function(res){
				if(res.meta.success){
					layer.alert("删除成功!");
					$obj.parents("tr").remove();
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误！");
			}
		});
	});
}

function addrlzy(mainId){
	var tr = $(".rlzy-tr");
	var obj= tr[tr.size()-1];
	layer.confirm('确定添加一段人力资源访谈？', {icon: 3, title:'提示'}, function(){
		$.ajax({
			url:"/bops/bgcheck/addrlzy.htm",
			type:"GET",
			data:{"mainId":mainId},
			success:function(res){
				if(res.meta.success){
					layer.alert("添加成功!");
					var html = '<tr class="rlzy-tr"><th>公司名称：</th><td><input class="workhis" data-code="'+res.retObj+'" value=""/><a href="javascript:;" onclick="delrlzy('+res.retObj+')">删除</a></td></tr>';
					if(tr.length == 0) {
						$(".rlzyft-title").after(html);
					} else {
						$(obj).after(html);
					}
					
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误！");
			}
		});
	
	});
}

function addzmr(mainId){
	var tr = $(".zmr-tr");
	var obj = tr[tr.size()-1];
	layer.confirm('确定添加一段人力资源访谈？', {icon: 3, title:'提示'}, function(){
		$.ajax({
			url:"/bops/bgcheck/addzmr.htm",
			type:"GET",
			data:{"mainId":mainId},
			success:function(res){
				if(res.meta.success){
					layer.alert("添加成功!");
					var html = '<tr class="zmr-tr"><th>('+ res.retObj +')公司名称：</th><td><input class="workPer" data-code="'+ res.retObj +'" value=""/><a href="javascript:;" onclick="delzmr('+res.retObj+')">删除</a></td></tr>';
					if(tr.length == 0) {
						$(".zmrft-title").after(html);	
					} else{
						$(obj).after(html);	
					}
					
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误！");
			}
		});
	});
}

function checkDefined(){
	var hisArr = $(".workhis");
	var perArr = $(".workPer");
	for(var i=0;i<hisArr.length;i++){
		if(hisArr[i].value==""){
			return true;
		}
	}
	
	for(var i=0;i<perArr.length;i++){
		if(perArr[i].value==""){
			return true;
		}
	}
	
	return false;
}