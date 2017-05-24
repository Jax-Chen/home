$(function() {
	$(".editdepart-btn").on("click", function() {
		$this = $(this);
		$this.hide();
		$(".save-btn").show();
		$(".cancel-btn").show();
		$(".content-option input").removeAttr("disabled");
		$(".content-option textarea").removeAttr("disabled");
		$(".content-option select").removeAttr("disabled");
		$(".selectpicker").removeClass("disabled");
		$(".show-tick").removeClass("disabled");
		$(".checkbox-switch").bootstrapSwitch("toggleDisabled");
		$(".tags-span").removeClass("role-disabled");
		$("#role-add-btn").removeClass("a-disabled");
		$(".selectpicker li").removeClass("disabled");
	});
	
	$(".cancel-btn").on("click", function() {
		cancel();
	});

	$(".save-btn").on("click", function() {
		layer.confirm('确定保存？', {
			icon: 3,
			title: '提示'
		}, function(cindex) {
			if($(".checkbox-switch").bootstrapSwitch("state")==false){
				layer.confirm('确定停用, 该部门的子部门也将被停用？', {icon:3}, function(){
					sv(cindex);
				});
			}else{
				sv(cindex);
			}
			
			
		});

	});

	$(".adddepart-btn").on("click", function() {
		var ctt = "<div class='pout-frame'>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='color:red'>*</span><span>部门名称：</span><input id='pout-departname' /></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span>上级部门：</span><input id='pout-fatherdepart' /><input id='pout-fatherdepartval' type='hidden'></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span>部门权限：</span><span id='pout-departpermission'></span><input id='pout-departpermissionval' type='hidden' value='1'><a href='javascript:void(0);' id='pout-role-add'>选择</a></div></div>"
			+"<div class='row frame-row'><div class='col-md-6'><span> 负责人：</span><div class='selectdiv'><select id='pout-dutyleader' class='selectpicker show-tick form-control'  data-live-search='true'></select></div></div>"
			+"<div class='col-md-6'><span>负责hr: </span><div class='selectdiv'><select id='pout-dutyhr' class='selectpicker show-tick form-control'  data-live-search='true'></select></div></div></div>"
			+"<div class='row frame-row'><div class='col-md-12'><span style='vertical-align: top'>部门描述：</span><textarea id='pout-departdes'></textarea></div></div>"
			+"<div class='row frame-row'><div class='col=md-12'><span style='color:red'>*</span><span>部门状态：</span>"
			+"<select id='pout-departstatus'>"
			+"<option value='1'>启用</option>"
			+"<option value='0'>停用</option>"
			+"</select></div></div>"
		+"</div>"
		+"<script>"
		+"$(function(){" 
			+"initUserList(['pout-dutyleader', 'pout-dutyhr']);"
			+"$('#pout-fatherdepart').on('click', function(){"
			+"pout();"
			+"});"
		+"});"
		
		
		+"</script>";
		layer.open({
			type: 1,
			title: '添加部门',
			btn: ['确定', '取消'],
			area: ['600px', '400px'],
			content: ctt,
			yes: function(index) {
				var name = $("#pout-departname").val();
				var fid = $("#pout-fatherdepartval").val();
				var role = $("#pout-departpermissionval").val();
				var dutyleader = $("#pout-dutyleader").val();
				var dutyhr = $("#pout-dutyhr").val();
				var des = $("#pout-departdes").val();
				var status = $("#pout-departstatus").val();
				
				if(name=="" || status == ""){
					layer.alert("请填写完整表单", {icon:2});
				}
				
				$.ajax({
					url:appServer + "/bops/systemdepart/add.htm",
					type:"POST",
					data:{"name":name, "fid":fid, "role":role, "dutyleader":dutyleader, "dutyhr":dutyhr, "des":des, "status":status},
					beforeSend:function(){
	                    loadIndex = layer.load(1);
	                },
	                success:function(res){
	                    layer.close(loadIndex);
	                    if(res.meta.success){
	                        layer.msg("添加成功！");
	                        layer.close(index);
	                        setTimeout("location.reload()", 1000);
	                    }else{
	                        layer.alert(res.meta.errorInfo, {icon:2});
	                    }
	                },
	                error:function(){
	                    layer.close(laodIndex);
	                    layer.msg('网络错误！');
	                }
				});
				
				
			}
		});
	});

	$(".metismenu").on("click", "a", function(){
		var id = $(this).attr("data-code");
		$.ajax({
			url:appServer + "/bops/systemdepart/getdepartdetail.htm",
			type:"GET",
			data:{"id":id},
			async:false,
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					initDepart(obj);
					cancel();
					initUserList(["dutyleaderid", "dutyhrid"]);
					$(".right-frame").show();
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	});

	$("#fatherdepart").on("click", function(){
		var ctt = "<div class='pouttreediv'><nav id='pouttree' class='tuxedo-menu metismenu tuxedo-menu-pristine animated tuxedo-menu-visible'>"+
		                '<ul id="ftree">'
		                    
		                +"</ul>"
		            +"</nav>"
			+"</div>"
			+"<div style='margin-top:10px;margin-left:10px'><span>上级部门：</span><span id='ftdpt'>"+ $("#fatherdepart").val() +"</span><input id='poutfather' type='hidden' value='"+ $("#fatherdepartval").val() +"'></div>"
			+"<div><a href='javascript:void(0);' style='text-decoration:none;margin-top:10px;margin-left:10px;' id='setnofatherdepart'>设为无上级部门</a></div>"
			+'<script>'
			+'initDepartMenu("pouttree");'
	        +"$('#pouttree').on('click', 'a', function(){"
	        		+'$("#ftdpt").text($(this).text());'
	        		+'$("#poutfather").val($(this).attr("data-code"));'
	        	+"});"
	        +"$('#setnofatherdepart').on('click', function(){"
	        	+"$('#ftdpt').text('无父部门');"
	        	+"$('#poutfather').val('');"
	        	+"});"
			+"</script>";
		
		layer.open({
			type: 1,
			title: '修改上级部门',
			btn: ['确定', '取消'],
			area: ['400px', '500px'],
			content: ctt,
			yes: function(index) {
				if($("#departid").text() == $("#poutfather").val()){
					layer.alert("不能设置自己为父部门");
				}else{
					$("#fatherdepart").val($("#ftdpt").text());
					$("#fatherdepartval").val($("#poutfather").val());
					$(".tags-span").remove();
					$("#departpermissionval").val("");
					layer.close(index);
				}
			}
		});
	});

	buidDepart();
	initDepartMenu("sidebar");
	
	$("#role-add-btn").on("click", function(){
		if($(this).attr("class").indexOf("a-disabled")>=0){
			return;
		}
		$.ajax({
			url:appServer + "/bops/systemrole/getactiverole.htm",
			type:"GET",
			data:{"departFid":$("#fatherdepartval").val()},
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var str = "<div style='width:100%;' id='roleck'>";
					var rolelist = $(".rolelist .tags-span");
					for(var i=0; i<obj.length; i++){
						var flag = false;
						if(rolelist!=null){
							for(var j=0; j<rolelist.length; j++){
								if($(rolelist[j]).find("a").attr("data-code") == obj[i].id){
									flag = true;
								}
							}
						}
						str += "<div style='display:inline-block;padding:10px 10px'><input type='checkbox' name='rolecheckbox' value='"+ obj[i].id +"' "+ (flag?"checked='checked'":"") +">"+ obj[i].name +"</div>";
					}
					str += "</div>";
					layer.open({
						type: 1,
						title: '部门权限',
						btn: ['确定', '取消'],
						area: ['400px', '400px'],
						content: str,
						yes:function(index){
							var roles =  $("#roleck").find("input[name='rolecheckbox']:checked");
							var vals = "";
							var rolesStr = "";
							for(var i=0;i<roles.length;i++){
								vals += roles[i].value;
								if(i != roles.length-1){
									vals += ",";
								}
								
								rolesStr += '<div class="tags-span">'+ $(roles[i]).parent().text() +'<a href="javascript:void(0);" class="remove-role" data-code="'+ roles[i].value +'"><span class="glyphicon glyphicon-remove-sign"></span></a></div>';
							}
							$(".rolelist").empty();
							$(".rolelist").append(rolesStr);
							$("#departpermissionval").val(vals);
							layer.close(index);
						}
					});
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	});
	
	$(document).on("click", ".remove-role", function(){
		if($(this).parent().attr("class").indexOf("role-disabled")>=0){
			return;
		}
		
		$(this).parent().remove();
		var rl = $(".remove-role");
		var str = "";
		for(var i=0; i<rl.length; i++){
			str += $(rl[i]).attr("data-code");
			if(i!=rl.length-1){
				str += ",";
			}
		}
		$("#departpermissionval").val(str);
	});
	
	$(document).on("click", "#pout-role-add", function(){
		var fid = $("#pout-fatherdepartval").val();
		var txt = $("#pout-fatherdepart").val();
		if(txt == ""){
			layer.alert("请先选择上级部门");
			return;
		}
		$.ajax({
			url:appServer + "/bops/systemrole/getactiverole.htm",
			type:"GET",
			data:{"departFid":fid},
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					var str = "<div style='width:100%;' id='roleck'>";
					var rolelist = $("#pout-departpermissionval").val().split(",");
					for(var i=0; i<obj.length; i++){
						var flag = false;
						if(rolelist!=null){
							for(var j=0; j<rolelist.length; j++){
								if(rolelist[j] == obj[i].id){
									flag = true;
								}
							}
						}
						str += "<div style='display:inline-block;padding:10px 10px'><input type='checkbox' name='rolecheckbox' value='"+ obj[i].id +"' "+ (flag?"checked='checked'":"") +">"+ obj[i].name +"</div>"
					}
					str += "</div>";
					layer.open({
						type: 1,
						title: '部门权限',
						btn: ['确定', '取消'],
						area: ['400px', '400px'],
						content: str,
						yes:function(index){
							var roles =  $("#roleck").find("input[name='rolecheckbox']:checked");
							var vals = "";
							var rolesStr = "";
							for(var i=0;i<roles.length;i++){
								vals += roles[i].value;
								rolesStr += $(roles[i]).parent().text();
								if(i != roles.length-1){
									vals += ",";
									rolesStr += ",";
								}
							}
							
							$("#pout-departpermissionval").val(vals);
							$("#pout-departpermission").text(rolesStr);
							layer.close(index);
						}
					});
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
		
	});
	
	
});

function sv(cindex){
	buidDepart();
	var role = [];
	for(var i=0;i<depart.role.length;i++){
		role.push(depart.role[i].id);
	}
	
	var res = $(".checkbox-switch").bootstrapSwitch("state");
	depart.status = res==true?1:2;
	$.ajax({
		url:appServer + "/bops/systemdepart/editdepart.htm",
		type:"POST",
		data:{"name":depart.departname, "fid":depart.fid, "dutyleader":depart.dutyleaderid, "dutyhr":depart.dutyhrid, "description":depart.departdes, "id":depart.id, "status":depart.status, "role":role},
		success:function(res){
			if(res.meta.success){
				$(".save-btn").hide();
				$(".cancel-btn").hide();
				$(".editdepart-btn").show();
				$(".content-option input").attr("disabled", "disabled");
				$(".content-option textarea").attr("disabled", "disabled");
				$(".content-option select").attr("disabled", "disabled");
				$(".selectpicker").addClass("disabled");
				$(".selectpicker li").addClass("disabled");
				$(".checkbox-switch").bootstrapSwitch("disabled", true);
				$(".tags-span").addClass("role-disabled");
				$("#role-add-btn").addClass("a-disabled");
				$(".show-tick").addClass("disabled");
				
				layer.close(cindex);
				layer.msg("保存成功！");
			}else{
				layer.alert(res.meta.errorInfo);
				depart = jQuery.extend(true, {}, olddepart);
			}
		},
		error:function(){
			layer.msg("网络错误");
		}
	});
}

function changeValue() {
	$("#departname").val(depart.departname);
	$("#fatherdepart").val(depart.fatherdepart);
	$("#dutyleader").val(depart.dutyleader);
	$("#dutyleaderid").val(depart.dutyleaderid);
	$("#fatherdepartval").val(depart.fid);
	$("#dutyhr").val(depart.dutyhr);
	$("#dutyhrid").val(depart.dutyhrid);
	$("#departdes").val(depart.departdes);
	$("#departid").text(depart.id);
	$("#departcreatetime").text(depart.createTime);
	$("#departcreater").text(depart.creater);
	$("#departmodifytime").text(depart.updateTime);
	$("#departmodifyer").text(depart.updater);
	var s = (depart.status == 1);
	$(".checkbox-switch").bootstrapSwitch("disabled", false);
	$(".checkbox-switch").bootstrapSwitch("state", s);
	$(".rolelist").empty();
	var roleStr = "";
	if(depart.role!=null){
		var r = depart.role;
		for(var i=0; i<r.length; i++){
			$(".rolelist").append('<div class="tags-span role-disabled">'+ r[i].name +'<a href="javascript:void(0);" class="remove-role" data-code="'+ r[i].id +'"><span class="glyphicon glyphicon-remove-sign"></span></a></div>');
			roleStr += r[i].id;
			if(i!=r.length-1){
				roleStr += ",";
			}
		}
	}
	$("#departpermissionval").val(roleStr);
}

function initDepart(obj){
	depart.departname = obj.name;
	depart.fatherdepart = obj.fname;
	depart.dutyleader = obj.dutyleaderName;
	depart.dutyhr = obj.dutyhrName;
	depart.departdes = obj.description;
	depart.id = obj.id;
	depart.createTime = parseTime(obj.createTime);
	depart.creater = obj.createrName;
	depart.updateTime = parseTime(obj.modifyTime);
	depart.updater = obj.updaterName;
	depart.status = obj.status;
	depart.fid = obj.fid;
	depart.dutyleaderid = obj.dutyleader;
	depart.dutyhrid = obj.dutyhr;
	depart.role = obj.roleList;
	olddepart = jQuery.extend(true, {}, depart);
}

function buidDepart() {
	depart.departname = $("#departname").val();
	depart.fatherdepart = $("#fatherdepart").val();
	depart.dutyleader = $("#dutyleader").val();
	depart.dutyleaderid = $("#dutyleaderid").val();
	depart.dutyhr = $("#dutyhr").val();
	depart.dutyhrid = $("#dutyhrid").val();
	depart.departdes = $("#departdes").val();
	depart.fid = $("#fatherdepartval").val();
	var res = $(".checkbox-switch").bootstrapSwitch("state");
	depart.status = res == true?1:2;
	var l = [];
	var rl = $(".tags-span");
	for(var i=0;i<rl.length;i++){
		var temp = {"id":$(rl[i]).find("a").attr("data-code"), "name":$(rl[i]).text()};
		l.push(temp);
	}
	depart.role = l;
}
var olddepart;
var depart = new Object();

function pout(){
	var ctt = "<div class='pouttreediv'><nav id='pouttree' class='tuxedo-menu metismenu tuxedo-menu-pristine animated tuxedo-menu-visible'>"+
		                '<ul id="poutul">'
		                    
		                +"</ul>"
		            +"</nav>"
			+"</div>"
			+"<div style='margin-top:10px;margin-left:10px'><span>上级部门：</span><span id='ftdpt'></span><input id='poutfather' type='hidden' value=''></div>"
			+"<div><a href='javascript:void(0);' style='text-decoration:none;margin-top:10px;margin-left:10px;' id='setnofatherdepart'>设为无上级部门</a></div>"
			+'<script>'
			+'initDepartMenu("pouttree");'	
	        +"$('#pouttree').on('click', 'a', function(){"
	        		+'$("#ftdpt").text($(this).text());'
	        		+'$("#poutfather").val($(this).attr("data-code"));'
	        	+"});"
	        +"$('#setnofatherdepart').on('click', function(){"
	        	+"$('#ftdpt').text('无父部门');"
	        	+"$('#poutfather').val('');"
	        	+"});"
			+"</script>";

		layer.open({
			type: 1,
			title: '选择上级部门',
			btn: ['确定', '取消'],
			area: ['400px', '500px'],
			content: ctt,
			yes: function(index) {
				$("#pout-fatherdepart").val($("#ftdpt").text());
				$("#pout-fatherdepartval").val($("#poutfather").val());
				layer.close(index);
			}
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

function cancel(){
	changeValue();
	$(".save-btn").hide();
	$(".cancel-btn").hide();
	$(".editdepart-btn").show();
	$(".content-option input").attr("disabled", "disabled");
	$(".content-option textarea").attr("disabled", "disabled");
	$(".content-option select").attr("disabled", "disabled");
	$(".selectpicker").addClass("disabled");
	$(".selectpicker li").addClass("disabled");
	$(".checkbox-switch").bootstrapSwitch("disabled", true);
	$(".tags-span").addClass("role-disabled");
	$("#role-add-btn").addClass("a-disabled");
	$(".show-tick").addClass("disabled");
}

var userList = [];
function initUserList(id){
	if(userList.length == 0){
		$.ajax({
			url:appServer + "/bops/systemuser/getuserlist.htm",
			type:"GET",
			success:function(res){
				if(res.meta.success){
					var obj = res.retObj;
					userList = obj;
					buildUser(id);
				}else{
					layer.msg("系统错误");
				}
			},
			error:function(){
				layer.msg("网络错误");
			}
		});
	}else{
		buildUser(id);
	}
}

function buildUser(id){
	var str = "<option value=''>请选择</option>";
	for(var i=0;i<userList.length;i++){
		str += "<option value='"+ userList[i].id +"'>"+ userList[i].nickName +"</option>";
		
	}
	for(var i=0;i<id.length;i++){
		$("#"+id[i]).empty();
		$("#"+id[i]).append(str);
		$("#"+id[i]).selectpicker({noneSelectedText:'请选择', size:5});
		if(depart[id[i]]!=null){
			$("#"+id[i]).selectpicker('val', depart[id[i]]);
		}
		
		$("#"+id[i]).selectpicker('refresh');
	}
}