$(function(){
	$("#blackwhitelistdiv").hide();
	$(".back-btn").on("click", function(){
		window.history.go(-1);
	});
	
	$("#user-edit-btn").on("click", function(){
		$(this).hide();
		$("#user-cancel-btn").show();
		$("#user-save-btn").show();
		removeDisabled();
	});
	
	$("#user-cancel-btn").on("click", function(){
		$("#user-edit-btn").show();
		$("#user-cancel-btn").hide();
		$("#user-save-btn").hide();
		$(".newadd").remove();
		$(".user-position-content").empty().append(dtl.position);
		if($("#su-workStatus").val() != "1"){
			$(".leavetr").hide();
		}
		backValue();
		addDisabled();
	});
	
	$("#user-save-btn").on("click", function(){
		if($("#su-joinTime").val() != "" && $("#su-regularTime").val() != ""){
			if($("#su-joinTime").val() > $("#su-regularTime").val()){
				layer.alert("入职时间不能晚于转正时间");
				return;
			}
		}
		var permsList = $(".user-position-select");
		for(var i=0; i<permsList.length; i++){
			var d = $(permsList[i]).find(".user-position-depart-select-val").val();//部门
			var p = $(permsList[i]).find(".user-position-role-select").val();
			if(d == "" || p == ""){
				layer.msg("请先选择部门岗位");
				return;
			}
		}
		
		var ipt = $(".sysusrdtl-content-table").find(".param");
		for(var i = 0; i<ipt.length; i++){
			tempDtl[$(ipt[i]).attr("id").replace("su-","")] = ipt[i].value;
		}
		
		tempDtl["id"] = $("#detailid").val();
		
		var pl = [];
		for(var i=0; i<permsList.length; i++){
			var d = $(permsList[i]).find(".user-position-depart-select-val").val();//部门
			var p = $(permsList[i]).find(".user-position-role-select").val();
			var main = $(permsList[i]).find(".mainposition");
			pl.push({"depart":d, "position":p, "main":main.length>0?"1":"0"});
		}
		
		tempDtl["positionList"] = pl;
		tempDtl["systemuserId"] = $("#systemuserId").val();
		$.ajax({
			url:appServer + "/bops/systemuser/saveuserdetail.htm",
			type:"POST",
			data:JSON.stringify(tempDtl),
			success:function(res){
				if(res.meta.success){
					$("#user-edit-btn").show();
					$("#user-cancel-btn").hide();
					$("#user-save-btn").hide();
					addDisabled();
					layer.msg("保存成功");
				}else{
					layer.msg(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
		
		
	});
	
	$("#user-add-position").on("click", function(){
		if($("#user-edit-btn").css("display")!="none"){
			return;
		}
		$arr = $(".user-position-select");
		if($arr.size() == 0){
			$(".user-position-content").append("<div class='user-position-select newadd' ><input class='form-control user-position-depart-select' placeholder='部门'><input type='hidden' class='user-position-depart-select-val'/>" +
					"<select class='user-position-role-select form-control'><option value=''>请选择</option></select>" +
					"<span class='glyphicon glyphicon-star mainposition' style='color:red'></span></div>");
		}else{
			$(".user-position-content").append("<div class='user-position-select newadd' ><input class='form-control user-position-depart-select' placeholder='部门'><input type='hidden' class='user-position-depart-select-val'/>" +
				"<select class='user-position-role-select form-control'><option value=''>请选择</option></select>" +
				"<a href='javascript:void(0)' class='position-setmain'><span class='glyphicon glyphicon-flag'></span> 设为主岗位</a><a href='javascript:void(0)' class='position-delete'><span class='glyphicon glyphicon-trash'></span> 删除</a></div>");
		}
		
	});
	
	$(document).on("click", ".position-delete", function(){
		if($("#user-edit-btn").css("display")!="none"){
			return;
		}
		$(this).parent(".user-position-select").remove();
	});
	
	$(document).on("click", ".position-setmain", function(){
		if($("#user-edit-btn").css("display")!="none"){
			return;
		}
		if($(this).siblings(".user-position-role-select").val()==""){
			layer.msg("请先选择岗位");
			return;
		}
		$(".mainposition").after("<a href='javascript:void(0)' class='position-setmain'><span class='glyphicon glyphicon-flag'></span> 设为主岗位</a><a href='javascript:void(0)' class='position-delete'><span class='glyphicon glyphicon-trash'></span> 删除</a>").remove();
		$(this).siblings(".user-position-role-select").after("<span class='glyphicon glyphicon-star mainposition' style='color:red'></span>");
		$(this).siblings(".position-delete").remove();
		$(this).remove();
		findLeaderAndHr($(this).siblings(".user-position-depart-select-val").val());
	});
	
	$(document).on("click", ".user-position-depart-select", function(){
		$this = $(this);
		$val = $(this).siblings(".user-position-depart-select-val");
		pout($this, $val);
	});
	
	$("#su-workStatus").on("change", function(){
		if($(this).val() == "1"){
			$(".leavetr").show();
		}else{
			$(".leavetr").hide();
		}
	});
	
	initDetail();
	
	buildDepartRoleList();
});

var tempDtl = {};

var dtl = {};

function findLeaderAndHr(id){
	$.ajax({
		url: appServer + "/bops/systemuser/findmainleaderhr.htm",
		type:"GET",
		data:{"id": id},
		success:function(res){
			if(res.meta.success){
				var obj = res.retObj;
				$("#leader").text(obj.leader);
				$("#hr").text(obj.hr);
			}
		},
		error:function(){
			layer.msg("网络错误");
		}
	});
}

function pout(showipt, valipt){
	var ctt = "<div class='pouttreediv'><nav id='pouttree' class='tuxedo-menu metismenu tuxedo-menu-pristine animated tuxedo-menu-visible'>"+
		                '<ul id="poutul">'    
		                +"</ul>"
		            +"</nav>"
			+"</div>"
			+"<div style='margin-top:10px;margin-left:10px'><span>上级部门：</span><span id='ftdpt'></span><input id='poutfather' type='hidden' value=''></div>"
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
				if($("#poutfather").val()==""){
					layer.alert("请选择岗位！");
					return;
				}
				showipt.val($("#ftdpt").text());
				valipt.val($("#poutfather").val());
				initDepartRole(valipt);
				findLeaderAndHr($("#poutfather").val());
				layer.close(index);
			}
		});
}

function initDepartRole(valipt){
	var value = valipt.val();
	$.ajax({
		url: appServer + "/bops/systemposition/getdepartactivepostion.htm",
		type:"GET",
		data:{"departId":value},
		success:function(res){
			if(res.meta.success){
				var list = res.retObj;
				var se = valipt.siblings(".user-position-role-select");
				$(se).empty().append("<option value=''>请选择</option>");
				for(var i=0; i<list.length; i++){
					$(se).append("<option value='"+ list[i].id +"'>"+ list[i].name +"</option>");
				}
			}else{
				layer.msg("系统错误");
			}
		},
		error:function(){
			layer.msg("网络错误");
		}
	});
}

function buildDepartRoleList(){
	var l = $(".user-position-depart-select-val");
	for(var i=0;i<l.length;i++){
		var value = l[i].value;
		var t = l[i];
		$.ajax({
			url: appServer + "/bops/systemposition/getdepartactivepostion.htm",
			type:"GET",
			async:false,
			data:{"departId":value},
			success:function(res){
				if(res.meta.success){
					var list = res.retObj;
					var se = $(t).siblings(".user-position-role-select");
					$(se).empty().append("<option value=''>请选择</option>");
					for(var i=0; i<list.length; i++){
						$(se).append("<option value='"+ list[i].id +"'"+ ($(se).attr("value")==list[i].id?"selected='selected'":"") +">"+ list[i].name +"</option>");
					}
					$(se).val($(se).attr("value"));
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	}
	dtl.position = $(".user-position-content").html();
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

function initDetail(){
	var ipt = $(".sysusrdtl-content-table").find(".param");
	for(var i = 0; i<ipt.length; i++){
		console.log('i: ', i);
		console.log($(ipt[i]).attr("id"));
		dtl[$(ipt[i]).attr("id").replace("su-","")] = ipt[i].value;
	}
	dtl.id = $("#detailid").val();
	dtl.leader = $("#leader").text();
	dtl.hr = $("#hr").text();
	
}

function backValue(){
	for(var key in dtl){
		$("#su-"+key).val(dtl[key]);
	}
	$("#leader").text(dtl.leader);
	$("#hr").text(dtl.hr);
}

function addDisabled(){
	$(".sysusrdtl-content-table").find("input").attr("disabled", "disabled");
	$(".sysusrdtl-content-table").find("select").attr("disabled", "disabled");
	$(".sysusrdtl-content-table").find("textarea").attr("disabled", "disabled");
}

function removeDisabled(){
	$(".sysusrdtl-content-table").find("input").removeAttr("disabled");
	$(".sysusrdtl-content-table").find("select").removeAttr("disabled");
	$(".sysusrdtl-content-table").find("textarea").removeAttr("disabled");
}

function showPersonal(){
	$("#blackwhitelistdiv").hide();
	$("#personaldiv").show();
	$("#contactdiv").hide();
	$("#accountdiv").hide();
	$(event.target).parent().attr("class", "active");
	$(event.target).parent().siblings().removeClass("active");
}

function showContact(){
	$("#blackwhitelistdiv").hide();
	$("#personaldiv").hide();
	$("#contactdiv").show();
	$("#accountdiv").hide();
	$(event.target).parent().attr("class", "active");
	$(event.target).parent().siblings().removeClass("active");
}

function showAccount(){
	$("#blackwhitelistdiv").hide();
	$("#personaldiv").hide();
	$("#contactdiv").hide();
	$("#accountdiv").show();
	$(event.target).parent().attr("class", "active");
	$(event.target).parent().siblings().removeClass("active");
}

function showBlackWhiteList(){
	$("#personaldiv").hide();
	$("#contactdiv").hide();
	$("#accountdiv").hide();
	$("#blackwhitelistdiv").show();
	$(event.target).parent().attr("class", "active");
	$(event.target).parent().siblings().removeClass("active");
}










