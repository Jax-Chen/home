$(function(){
	
	$("#sub-audit-btn").on("click", function(){
		$this = $(this);
		var id = $(this).attr("data-id");
		layer.confirm('确定提交报告？', {icon: 3, title:'提示'}, function(index){
			  $.ajax({
				  url:appServer + "/bops/bgcheck/submitaudit.htm",
				  type:"POST",
				  data:{"id": id},
				  success:function(res){
					  if(res.meta.success){
						  layer.msg("提交审核成功");
						  $this.hide();
						  $("#export-btn").hide();
						  $("#allsave-btn").hide();
					  }else{
						  layer.alert(res.meta.errorInfo);
					  }
				  },
				  error:function(){
					  layer.msg("网络错误");
				  }
			  });
			});
	});
	
	getMenuDetail();
	
	$(".editbtn").live("click", function(){
		var ipt = $(this).siblings(".editipt");
		var text = $(ipt).siblings("span");
		if($(this).text()=="编辑"){
			$(ipt).show();
			$(this).text("确定");
			$(text).hide();
		}else if($(this).text()=="确定"){
			$(ipt).hide();
			$(this).text("编辑");
			$(text).text($(ipt).val()).show();
		}
	});
	
	$(".editbtn-ta").live("click", function(){
		
		var text = $(this).siblings("p");
		var ctt = "<textarea id='atr-te'>"+$(text).html().trim().replaceAll("<br>",'\r\n')+"</textarea>";
		
		layer.open({
            type:1,
            title:'编辑',
            btn:['确定', '取消'],
            area:['600px'],
            content:ctt,
            yes:function(index){
            	var t = $("#atr-te").val();
				$(text).html(t.replace(/\n|\r\n|\r/g,"<br>"));
				layer.close(index);
            }
        });  
		
	});
	
	$(".editbtn-ta-sele").live("click", function(){
		var text = $(this).siblings("p");
		var type= $(this).attr("type");
		var optext1 = "";
		var optext2 = "";
		if(type==1){
			optext1 = "自主寻找（来自i背调HR联盟）";
			optext2 = "候选人提供（经i背调HR联盟验证，该证明人身份及其联系方式为真实）";
		}else{
			optext1 = "自主寻找";
			optext2 = "候选人提供（经专业流程验证，该证明人身份及其联系方式为真实）";
		}
		
		ctt = "<table style='width:80%;margin:0 auto'><tr><th>选项：</th><td style='float:left;'>" +
				"<select id='out-select'>" +
				"<option value=''>其他</option>"+
				"<option value='"+optext1+"'>自主寻找</option>"+
				"<option value='"+optext2+"'>候选人提供</option>"+
				"</select>" +
				"</td></tr>" +
				"<tr><th>文本：</th><td style='float:left;'><textarea id='out-area' style='height:100px;width:200px;'>"+$(text).html().replaceAll("<br>",'\r\n')+"</textarea></td></tr>"+
				"</table><script>$('#out-select').on('change', function(){" +
				"$('#out-area').html($('#out-select').val());"+
				"})</script>";
		
		layer.open({
            type:1,
            title:'编辑',
            btn:['确定', '取消'],
            area:['500px'],
            content:ctt,
            yes:function(index){
            	var html = $("#out-area").val()
				$(text).html(html.replace(/\n|\r\n|\r/g,"<br>"));
				layer.close(index);
            }
        });
	});
	
	$(".editbtn-sle").live("click", function(){
		$sel = $(this).siblings("select");
		$text = $sel.siblings("span");
		if($(this).text()=="编辑"){
			$text.hide();
			$sel.show();
			$(this).text("确定");
		}else{
			$text.show();
			$sel.hide();
			$text.text(Gettext($sel));
			$(this).text("编辑");
		}
	});
	
	$(".editbtn-ico").on("click", function(){
		var span = $(this).siblings("span");
		var value = $(span).find("img").attr("src");
		var spantext = $(span).find(".showtext").text().trim();
		
		var ctt = '<option value="">请选择</option>'+
		'<option value="1"'+cprSel(value, '/images/bops/report/preview/dh.png')+'>对号</option>'+
					'<option value="2" '+cprSel(value, '/images/bops/report/preview/ch.png')+'>错号</option>'+
					'<option value="3" '+cprSel(value, '/images/bops/report/preview/th.png')+'>叹号</option>'+
					'<option value="0" '+cprSel(value, '/images/bops/report/preview/th.png')+'>横号</option>';
		var nt1 = "结果说明："+"<script> $('#popinput').val('"+spantext+"')</script>";
		
		
		var tt = "<table style='width:80%;margin:0 auto;'><tr><td style='width:80px;'><span>"+ nt1 +"</span></td><td><input id='popinput' type='text'></td>"+
		"<tr><td style='width:80px;'><span>选择结果：</span></td><td><select id='pop-select'>"+ ctt +"</select></td></tr></table>";
		
		layer.open({
            type:1,
            title:'编辑',
            btn:['确定', '取消'],
            area:['600px'],
            content:tt,
            yes:function(index){
            	var t = $("#popinput").val();
				var st = $("#pop-select").val();
				if(st==""){
					alert("请选择结果！");
					return false;
				}
				if(st==1){
					$(span).find("img").attr("src","/images/bops/report/preview/dh.png");
					$(span).find(".res-s").val(st);
					$(span).find(".showtext").text(t);
					$(span).find(".res-t").val(t);
				}else if(st==2){
					$(span).find("img").attr("src","/images/bops/report/preview/ch.png");
					$(span).find(".res-s").val(st);
					
					$(span).find(".showtext").text(t);
					$(span).find(".res-t").val(t);
				}else if(st==3){
					$(span).find("img").attr("src","/images/bops/report/preview/th.png");
					$(span).find(".res-s").val(st);
					
					$(span).find(".showtext").text(t);
					$(span).find(".res-t").val(t);
				}else if(st==0){
					$(span).find("img").attr("src","/images/bops/report/preview/jh.png");
					$(span).find(".res-s").val(st);
					
					$(span).find(".showtext").text(t);
					$(span).find(".res-t").val(t);

				}
				layer.close(index);
            }
        });
		
	});
	
	$(".editbtn-content-sle").on("click", function(){
		var sel = $(this).siblings("select");
		var span = $(sel).siblings("span");
		if($(this).text()=="编辑"){
			$(sel).show();
			$(this).text("确定");
			$(span).hide();
		}else if($(this).text()=="确定"){
			$(sel).hide();
			$(this).text("编辑");
			var v = $(sel).val();
			if(v==0){
				$(span).find("img").attr("src","/images/bops/report/preview/jh.png");
			}else if(v==1){
				$(span).find("img").attr("src","/images/bops/report/preview/dh.png");
			}else if(v==2){
				$(span).find("img").attr("src","/images/bops/report/preview/ch.png");
			}else if(v==3){
				$(span).find("img").attr("src","/images/bops/report/preview/th.png");
			}
			$(span).show();
		}
	});
	
	$("#sfyz-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动身份验证吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/autoidentityck.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                   
                    if(res.meta.success){
                    	layer.msg("操作成功！");
                    	var obj = replaceNull(res.retObj);
						$("#entityidck").text(obj.entityId);
						$("#identitysp").text("已验证");
						$("#sfyz-if-sel").val(1);
						if(obj.entityIdCheckRes==1){
							$("#identitycheck").find(".rst-icon").attr("src", "/images/bops/report/preview/dh.png");
							$("#identitycheck").find(".content-sel").val(1);
							$("#identityspansel").find("img").attr("src","/images/bops/report/preview/dh.png");
							$("#sfyz-res-s").val(1);
						}else if(obj.entityIdCheckRes==2){
							$("#identitycheck").find(".rst-icon").attr("src", "/images/bops/report/preview/ch.png");
							$("#identitycheck").find(".content-sel").val(2);
							$("#identityspansel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#sfyz-res-s").val(2);
						}
						$("#idtext").text(obj.entityIdCheckMark);
						$("#content-sfyz-idcard-if-sel").val(obj.entityIdCheckRes);
						$("#entitynameck").text(obj.entityName);
						$("#content-sfyz-name-if-sel").val(obj.entityNameCheckRes);
						$("#sexval").text(obj.gender);
						$("#sexipt").val(obj.gender);
						$("#content-sfyz-sex-if-sel").val(obj.genderCheckRes);
						$("#ageval").text(obj.age);
						$("#ageipt").val(obj.age);
						$("#content-sfyz-age-if-sel").val(obj.ageCheckRes);
						$("#hometownval").text(obj.hometown);
						$("#hometownipt").val(obj.hometown);
						$("#content-sfyz-hometown-if-sel").val(obj.hometownRes);
						$("#birthdayval").text(obj.birthday);
						$("#bornipt").val(obj.birthday);  
						$("#content-sfyz-birthday-if-sel").val(obj.birthdayCheckRes);
						if(obj.photo != null && obj.photo != ""){
							$("#sfyz-photo").html("<img src='data:image/jpg;base64,"+ obj.photo +"'/>");
							$("#content-sfyz-photo-if-sel").val(obj.photoRes);
							$("#phototext").val(obj.photoMark);
						}
						
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#sfyz-sav-btn").on("click", function(){
		var obj = $("#identitycheck").find("input");
		$tb = $(this).parent("div").siblings("table");
		if(!checkLength($("#identitycheck"))) {
			return false;
		}
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(checkIptNull(obj)){
				layer.alert("请填写完整信息！", {icon:2});
				return false;
			}
			if(saveIdentity()){
				layer.msg("保存成功！");
				clic($tb);
			}
        });  
		
	});
	
	$("#reportinfo-sav-btn").on("click", function(){
		if(!checkLength($("#table-main"))) {
			return false;
		}
		
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(saveMainInfo()){
				layer.alert("保存成功！");
			}
        });  
	});
	
	$("#xlyz-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动验证学历吗？', {icon: 3, title:'提示'}, function(cindex){
			$.ajax({
				url:appServer+"/bops/bgcheck/autocheckedu.htm",
				type:"get",
				data:{"mainId":mainId},
				beforeSend:function(){
					loadIndex = layer.load(1);
				},
				success:function(res){
					layer.close(loadIndex);
					if(res.meta.success){
						layer.msg("查询成功！");
						$("#edusp").text("已验证");
						$("#xlyz-sel").val(1);
						var obj = replaceNull(res.retObj);
						if(obj.schoolNameRes==1){
							$("#xueli").find(".rst-icon").attr("src", "/images/bops/report/preview/dh.png");
							$("#xueli").find(".content-sel").val(1);
						}else if(obj.schoolNameRes==2){
							$("#xueli").find(".rst-icon").attr("src", "/images/bops/report/preview/ch.png");
							$("#xueli").find(".content-sel").val(2);
							$("#eduspsel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#xlyz-res-s").val(2);
						}
						
						if(obj.studyTimeRes == 3){
							$("#stimespan").find("img").attr("src", "/images/bops/report/preview/th.png");
							$("#content-xlyz-studytime-if-sel").val(3);
							$("#eduspsel").find("img").attr("src","/images/bops/report/preview/th.png");
							$("#xlyz-res-s").val(3);
						}else if(obj.studyTimeRes == 1){
							$("#stimespan").find("img").attr("src", "/images/bops/report/preview/dh.png");
							$("#content-xlyz-studytime-if-sel").val(1);
						}else if(obj.studyTimeRes == 2){
							$("#stimespan").find("img").attr("src", "/images/bops/report/preview/ch.png");
							$("#content-xlyz-studytime-if-sel").val(2);
							$("#eduspsel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#xlyz-res-s").val(2);
						}
						
						$("#schoolsp").text(obj.schoolName);
						$("#schoolipt").val(obj.schoolName);
						$("#content-xlyz-schoolname-if-sel").val(obj.schoolNameRes);
						$("#schooltext").text(obj.schoolNameMark);
						$("#985sp").text(obj.is985);
						$("#ipt985").val(obj.is985);
						$("#content-xlyz-985-if-sel").val(obj.is985Res);
						$("#text985").text(obj.is985Mark);
						$("#content-xlyz-985-if-sel").siblings(".showtext").find("img").attr("src", "/images/bops/report/preview/jh.png");
						$("#211sp").text(obj.is211);
						$("#ipt211").val(obj.is211);
						$("#content-xlyz-211-if-sel").val(obj.is211Res);
						$("#text211").text(obj.is211Mark);
						$("#content-xlyz-211-if-sel").siblings(".showtext").find("img").attr("src", "/images/bops/report/preview/jh.png");
						$("#studytimesp").text(obj.studyTime);
						$("#studytimeipt").val(obj.studyTime);
						$("#content-xlyz-studytime-if-sel").val(obj.studyTimeRes);
						$("#studytimetext").text(obj.studyTimeMark);
						
						$("#majorsp").text(obj.major);
						$("#majoript").val(obj.major);
						if(obj.majorRes == 1){
							$("#majorResSpan").find("img").attr("src", "/images/bops/report/preview/dh.png");
							$("#content-xlyz-studytime-if-sel").val(1);
						}else if(obj.majorRes == 2){
							$("#majorResSpan").find("img").attr("src", "/images/bops/report/preview/ch.png");
							$("#content-xlyz-major-if-sel").val(2);
							$("#eduspsel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#xlyz-res-s").val(2);
						}
						$("#content-xlyz-major-if-sel").val(obj.majorRes);
						$("#majortext").text(obj.majorMark);
						
						$("#studytypesp").text(obj.type);
						$("#studytypeipt").val(obj.type);
						if(obj.typeRes == 1){
							$("#studyTypeSpan").find("img").attr("src", "/images/bops/report/preview/dh.png");
							$("#content-xlyz-type-if-sel").val(1);
						}else if(obj.typeRes == 2){
							$("#studyTypeSpan").find("img").attr("src", "/images/bops/report/preview/ch.png");
							$("#content-xlyz-type-if-sel").val(2);
							$("#eduspsel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#xlyz-res-s").val(2);
						}
						$("#content-xlyz-type-if-sel").val(obj.typeRes);
						$("#studytypetext").text(obj.typeMark);
					}else{
						layer.alert(res.meta.errorInfo, {icon:2});
					}
				},
				error:function(){
					layer.close(laodIndex);
					layer.msg('网络错误！');
				}
			});
        });  
	});
	
	$("#xlyz-sav-btn").on("click",function(){
		var obj = $("#xueli").find("input");
		$tb = $(this).parent("div").siblings("table");
		if(!checkLength($("#xueli"))) {
	    	return false;
	    }
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(checkIptNull(obj)){
				layer.alert("请填写完整信息！", {icon:2});
				return false;
			}
			if(saveEducationCheck()){
				layer.msg("保存成功！");
				clic($tb);
			}
        });  
		
	});
	
	$("#gjxlyz-sav-btn").on("click", function(){
		var obj = $("#gjxueli").find("input");
		$tb = $(this).parent("div").siblings("table");
		if(!checkLength($("#gjxueli"))) {
	    	return false;
	    }
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(checkIptNull(obj)){
				layer.alert("请填写完整信息！", {icon:2});
				return false;
			}
			if(saveInternationalEducationCheck()){
				layer.msg("保存成功！");
				clic($tb);
			}
        });
	});
	
	$("#xwyz-sav-btn").on("click", function(){
		var obj = $("#xuewei").find("input");
		$tb = $(this).parent("div").siblings("table");
		if(!checkLength($("#xuewei"))) {
			return false;
		}
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(checkIptNull(obj)){
				layer.alert("请填写完整信息！", {icon:2});
				return false;
			}
			if(saveDegreeCheck()){
				layer.msg("保存成功！");
				clic($tb);
			}
        });
	});
	
	$("#driver-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动查询驾驶证状态吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
				url:appServer+"/bops/bgcheck/autodriverchcek.htm",
				type:"get",
				data:{"mainId":mainId},
				beforeSend:function(){
					loadIndex = layer.load(1);
				},
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("添加成功！");
                        var obj = replaceNull(res.retObj);
						$("#driversp").text("已验证");
						$("#jsz-sel").val(1);
						if(obj.dstatusRes==1){
							$("#driver").find(".rst-icon").attr("src", "/images/bops/report/preview/dh.png");
							$("#driver").find(".content-sel").val(1);
							$("#driverspansel").find("img").attr("src","/images/bops/report/preview/dh.png");
							$("#jsz-res-s").val(1);
						}else if(obj.dstatusRes==2){
							$("#driver").find(".rst-icon").attr("src", "/images/bops/report/preview/ch.png");
							$("#driver").find(".content-sel").val(2);
							$("#driverspansel").find("img").attr("src","/images/bops/report/preview/ch.png");
							$("#jsz-res-s").val(2);
						}
						$("#drivernosp").text(obj.driverNo);
						$("#driver-idipt").val(obj.driverNo);
						$("#content-driver-id-if-sel").val(obj.driverNoRes);
						$("#driver-idtext").text(obj.driverNoMark);
						
						$("#drivernamesp").text(obj.name);
						$("#driver-nameipt").val(obj.name);
						$("#content-driver-name-if-sel").val(obj.nameRes);
						$("#driver-nametext").text(obj.nameMark);
						
						$("#driverdstatussp").text(obj.dstatus);
						$("#driver-statusipt").val(obj.dstatus);
						$("#content-driver-status-if-sel").val(obj.dstatusRes);
						$("#driver-statustext").text(obj.dstatusMark);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#jsz-sav-btn").on("click", function(){
		var obj = $("#driver").find("input");
		$tb = $(this).parent("div").siblings("table");
		if(!checkLength($("#driver"))) {
			return false;
		}
		layer.confirm('确定保存吗？', {icon: 3, title:'提示'}, function(cindex){
			if(checkIptNull(obj)){
				layer.alert("请填写完整信息！", {icon:2});
				return false;
			}
			if(saveDriverCheck()){
				layer.msg("保存成功！");
				clic($tb);
			}
        });
	});
	
	$(".batchedit-btn").live("click", function(){
		$tb = $(this).parent("div").siblings("table");
		$tb.find(".editipt").show();
		$tb.find(".editipt").siblings(".editbtn").text("确定");
		$tb.find(".editipt").siblings(".showtext").hide();
		$tb.find("select").show();
		$tb.find("select").siblings(".showtext").hide();
		$tb.find("select").siblings("a").text("确定");
	});
	
	$("#courtexe-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动查询诉讼执行记录？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/autocheckexe.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("查询成功！");
                        var obj = res.retObj;
						
						$("#exesp").text("已验证");
						$("#fysjzx-sel").val(1);
						$("#exeressp").find("img").attr("src","/images/bops/report/preview/dh.png");
//						$("#exeressp").find(".showtext").text(obj.length+"条记录");
						$("#fysjzx-res-s").val(1);
//						$("#fysjzx-res-t").val(obj.length+"条记录");
						
						$(".exe-content").remove();
						$(".exe-nocheck").remove();
						$(".exenorec").hide();
						
						$("#execount").text(obj.length);
						var txt = "";
						if(obj.length==0){
							txt = '<tr class="execontenttr exenorec"><td><p class="showtext exe-date" data-code="1">--</p></td><td><p class="showtext exe-casecode" data-code="1">--</p></td>'+
						'<td><p class="showtext exe-execourt" data-code="1">--</p></td><td><p class="showtext exe-money" data-code="1">--</p></td><td><p class="showtext exe-casestatus" data-code="1" style="border-right:none;">--</p></td><td></td></tr>';
						}else{
							for(var i=0;i<obj.length;i++){
								replaceNull(obj[i]);
								txt += '<tr class="execontenttr exe-content"><td><p class="showtext exe-date" data-code="1">'+obj[i].caseDate+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext exe-casecode" data-code="1">'+obj[i].caseCode+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext exe-execourt" data-code="1">'+obj[i].court+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext exe-money" data-code="1">'+obj[i].exeMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext exe-casestatus" data-code="1" style="border-right:none;">'+obj[i].caseStatus+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><a href="javascript:void(0);" class="deletebtn-ta" onclick="delexe('+obj[i].id+')">删除</a>'+
								'<input type="hidden" class="courtexeid" value="'+obj[i].id+'"/></td></tr>';
							}
							
						}
						$(".exetitletr").after(txt);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#unhonest-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动查询法院失信记录？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/autocheckunhonest.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("查询成功！");
                        var obj = res.retObj;
						
						$("#unhsp").text("已验证");
						$("#sxjl-sel").val(1);
						
						$("#unhressp").find("img").attr("src","/images/bops/report/preview/dh.png");
//						$("#unhressp").find(".showtext").text(obj.length+"条记录");
						$("#sxjl-res-s").val(1);
//						$("#sxjl-res-t").val(obj.length+"条记录");
						
						
						$(".unhonest-content").remove();
						$(".unhonest-nocheck").remove();
						$(".unhonest-norec").hide();
						
						
						$("#unhonestcount").text(obj.length);
						var txt = "";
						if(obj.length==0){
							txt = '<tr class="unhonestcttr unhonest-norec"><td><p class="showtext unhonest-date" data-code="1">--</p></td><td><p class="showtext unhonest-casecode" data-code="1">--</p></td>'+
						'<td><p class="showtext unhonest-execourt" data-code="1">--</p></td><td><p class="showtext unhonest-duty" data-code="1">--</p></td><td><p class="showtext unhonest-casestatus" data-code="1" style="border-right:none;">--</p></td><td></td></tr>';
						}else{
							for(var i=0;i<obj.length;i++){
								replaceNull(obj[i]);
								txt += '<tr class="unhonestcttr unhonest-content"><td><p class="showtext unhonest-date" data-code="1">'+obj[i].caseDate+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext unhonest-casecode" data-code="1">'+obj[i].caseCode+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext unhonest-execourt" data-code="1">'+obj[i].court+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext unhonest-duty" data-code="1">'+obj[i].duty+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext unhonest-casestatus" data-code="1" style="border-right:none;">'+obj[i].exeStatus+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
								'<a href="javascript:void(0);" class="deletebtn-ta" onclick="delunhonest('+obj[i].id+')">删除</a>'+
								'<input type="hidden" class="unhonestid" value="'+obj[i].id+'"/></td></tr>';
							}
							
						}
						$(".unhonesttitletr").after(txt);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#finblk-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动查询金融行业黑名单查询？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/autocheckfinblk.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("查询成功！");
                        var obj = res.retObj;
						$("#finblksp").text("已验证");
						$("#jrhmd-sel").val(1);
						
						$("#finblkressp").find("img").attr("src","/images/bops/report/preview/dh.png");
//						$("#finblkressp").find(".showtext").text(obj.length+"条记录");
						$("#jrhmd-res-s").val(1);
//						$("#jrhmd-res-t").val(obj.length+"条记录");
						
						$(".fin-content-tr").remove();
						$(".fin-norec").hide();
						
						$("#finblkcount").text(obj.length);
						var txt = "";
						if(obj.length==0){
							$(".fin-norec").show();
							txt += '<tr class="finblkcontenttr fin-norec"><td><p class="showtext finblack-position" data-code="1">--</p></td><td><p class="showtext finblack-date" data-code="1">--</p></td>'+
						'<td><p class="showtext finblack-money" data-code="1">--</p></td><td><p class="showtext finblack-wishmoney" data-code="1">--</p></td><td></td></tr>';
						}else{
							for(var i=0;i<obj.length;i++){
								replaceNull(obj[i]);
								txt += '<tr class="finblkcontenttr fin-content-tr"><td><p class="showtext finblack-position" data-code="1">'+obj[i].position+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext finblack-date" data-code="1">'+obj[i].loansDate+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext finblack-money" data-code="1">'+obj[i].loansMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext finblack-wishmoney" data-code="1">'+obj[i].wishMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><a href="javascript:void(0);" class="deletebtn-ta" onclick="delfinblk('+obj[i].id+')">删除</a>'+
								'<input type="hidden" class="finblkid" value="'+obj[i].id+'"/></td></tr>';
							}
							
						}
						$(".finblktitletr").after(txt);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#conflict-autocheck-btn").on("click", function(){
		
		layer.confirm('确定自动查询商业利益冲突？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/autocheckconflict.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("查询成功！");
                        var obj = res.retObj;
						var acgl = obj.acgl;
						var acfl = obj.acfl;
						var acgll = obj.acgll;
						var c = acgl.length+acfl.length+acgll.length;
						$("#conflictsp").text("已验证");
						$("#syly-sel").val(1);
						
						$("#coflictresp").find("img").attr("src","/images/bops/report/preview/dh.png");
//						$("#coflictresp").find(".showtext").text(c+"条记录");
						$("#syly-res-s").val(1);
//						$("#syly-res-t").val(c+"条记录");
						
						$("#confcount").text(c);
						
						var acgltxt = "";
						var acglltxt = "";
						if(acgl.length==0){
							$(".qygd-nocheck").remove();
							$(".qygd-norec").show();
						}else{
							for(var i=0;i<acgl.length;i++){
								replaceNull(acgl[i]);
								acgltxt += '<tr class="qygdcontenttr qygd-content"><td><p class="showtext gd-comname" data-code="1">'+acgl[i].comName+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gd-comcode" data-code="1">'+acgl[i].regCode+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext gd-comtype" data-code="1">'+acgl[i].type+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gd-regmoney" data-code="1">'+acgl[i].regMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gd-moneytype" data-code="1">'+acgl[i].regMoneyType+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext gd-comstatus" data-code="1">'+acgl[i].comStatus+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gd-takemoney" data-code="1">'+acgl[i].giveMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><a href="javascript:void(0);" class="deletebtn-ta" onclick="delCongd('+acgl[i].id+')">删除</a>'+
								'<input type="hidden" class="gdid" value="'+acgl[i].id+'"/></td></tr>';
							}
							$(".qygd-nocheck").remove();
							$(".qygd-norec").hide();
							$(".qygd-content").remove();
							$(".qygdtitletr").after(acgltxt);
						}
						
						if(acgll.length==0){
							$(".qygl-nocheck").remove();
							$(".qygl-norec").show();
						}else{
							for(var i=0;i<acgll.length;i++){
								replaceNull(acgll[i]);
								acglltxt += '<tr class="qyglcontenttr qygl-content"><td><p class="showtext gl-comname" data-code="1">'+acgll[i].comName+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gl-comcode" data-code="1">'+acgll[i].regCode+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext gl-comtype" data-code="1">'+acgll[i].type+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gl-regmoney" data-code="1">'+acgll[i].regMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gl-moneytype" data-code="1">'+acgll[i].regMoneyType+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext gl-comstatus" data-code="1">'+acgll[i].comStatus+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext gl-position" data-code="1">'+acgll[i].position+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><a href="javascript:void(0);" class="deletebtn-ta" onclick="delCongl('+acgll[i].id+')">删除</a><input type="hidden" class="glid" value="'+acgll[i].id+'"/></td></tr>';
							}
							$(".qygl-nocheck").remove();
							$(".qygl-norec").hide();
							$(".qygl-content").remove();
							$(".qygltitletr").after(acglltxt);
						}
						var acfltxt = "";
						if(acfl.length==0){
							$(".qyfr-nocheck").remove();
							$(".qyfr-norec").show();
						}else{
							for(var i=0;i<acfl.length;i++){
								replaceNull(acfl[i]);
								acfltxt += '<tr class="qyfrcontenttr qyfr-content"><td><p class="showtext fr-comname" data-code="1">'+acfl[i].comName+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext fr-comcode" data-code="1">'+acfl[i].regCode+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext fr-comtype" data-code="1">'+acfl[i].comType+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext fr-regmoney" data-code="1">'+acfl[i].regMoney+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td><p class="showtext fr-moneytype" data-code="1">'+acfl[i].regMoneyType+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
								'<td><p class="showtext fr-comstatus" data-code="1">'+acfl[i].comStatus+'</p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
								'<a href="javascript:void(0);" class="deletebtn-ta" onclick="delConfr('+acfl[i].id+')">删除</a><input type="hidden" class="frid" value="'+acfl[i].id+'"/></td></tr>';
							}
							$(".qyfr-nocheck").remove();
							$(".qyfr-norec").hide();
							$(".qyfr-content").remove();
							$(".qyfrtitletr").after(acfltxt);
						}
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#fzjl-add-btn").on("click", function(){
		
		layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/addguity.htm",
				type:"POST",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("添加成功！");
                        var obj = res.retObj;
						var count = $("#guitycount").text();
						$("#guitycount").text("截止本报告之日前，有以下匹配信息");
						$(".guitynore").hide();
						var txt = '<tr class="guitycontenttr"><td>'+
						'<p class="showtext fz-caseTime" data-code="1" maxlength="64" tname="负面社会安全记录-案发时间"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
						'<p class="showtext fz-result" data-code="1" maxlength="64" tname="负面社会安全记录-结果"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delguity('+obj.id+')">删除</a><input type="hidden" class="guityid" value="'+obj.id+'"/></td></tr>';
						$("#guitytbson").append(txt);
						
						$("#fzjl-res-s").val(2);
						$("#fzjl-res-s").siblings("img").attr("src", "/images/bops/report/preview/ch.png");
						$("#fzjl-sel").val(1);
						$("#fzjl-sel").siblings(".showtext").text("已验证");
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        }); 
	});
	
	$("#fzjl-auto-btn").on("click", function() {
		layer.confirm('确定自动查询负面社会安全记录？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url: appServer + "/bops/bgcheck/autocheckguity.htm",
				type:"GET",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        var obj = res.retObj;
						if(obj != null) {
							layer.msg("查询成功！");
							var txt = '<tr class="guitycontenttr">'+
								'<td>'+
							'<p class="showtext fz-caseTime" data-code="1" maxlength="64" tname="负面社会安全记录-案发时间">'+ obj.caseTime +'</p>'+
							'<a href="javascript:void(0);" class="editbtn-ta">编辑</a>'+
						'</td>'+
						'<td>'+
							'<p class="showtext fz-result" data-code="1" maxlength="64" tname="负面社会安全记录-结果">'+ obj.result +'</p>'+
							'<a href="javascript:void(0);" class="editbtn-ta">编辑</a>'+
						'</td>'+
						'<td style="border-right:none">'+
							'<a href="javascript:void(0);" class="deletebtn-ta" onclick="delguity($!{r.id})">删除</a>'+
							'<input type="hidden" class="guityid" value="$!{r.id}"/>'+
						'</td>'+
					'</tr>';
							
						$(".guitycontenttr").remove();
						$(".guitynore").hide();
						
						$(".guitytitletr").after(txt);
						} else {
							layer.msg("查询成功！无数据");
						}
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#fyss-add-btn").on("click", function(){
		
		layer.confirm('确定添加？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/addcourtexe.htm",
				type:"POST",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("添加成功！");
                        var obj = res.retObj;
						var count = $("#execount").text();
						$("#execount").text(parseInt(count)+1);
						$(".exenorec").hide();
						$(".exe-nocheck").hide();
						var txt = '<tr class="execontenttr exe-content"><td>'+
						'<p class="showtext exe-date" data-code="1" maxlength="32" tname="法院诉讼执行记录-立案日期"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
						'<p class="showtext exe-casecode" data-code="1" maxlength="64" tname="法院诉讼执行记录-案号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext exe-execourt" data-code="1" maxlength="64" tname="法院诉讼执行记录-执行法院"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext exe-money" data-code="1" maxlength="32" tname="法院诉讼执行记录-执行金额"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext exe-casestatus" data-code="1" maxlength="64" tname="法院诉讼执行记录-案件状态"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delexe('+obj.id+')">删除</a><input type="hidden" class="courtexeid" value="'+obj.id+'"/></td></tr>';
						$("#exeson").append(txt);
						changeMainConflict(1, $("#fysjzx-sel"), $("#fysjzx-res-s"));
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });
	});
	
	$("#unhonest-add-btn").live("click", function(){
		
		layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/addunhonest.htm",
				type:"POST",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("添加成功！");
                        var obj = res.retObj;
						var count = $("#unhonestcount").text();
						$("#unhonestcount").text(parseInt(count)+1);
						$(".unhonest-norec").hide();
						$(".unhonest-nocheck").hide();
						var txt = '<tr class="unhonestcttr unhonest-content"><td>'+
						'<p class="showtext unhonest-date" data-code="1" maxlength="64" tname="法院失信记录-立案日期"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
						'<p class="showtext unhonest-casecode" data-code="1" maxlength="128" tname="法院失信记录-案号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext unhonest-execourt" data-code="1" maxlength="64" tname="法院失信记录-执行法院"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext unhonest-duty" data-code="1" maxlength="1024" tname="法院失信记录-法律文书确认的义务"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext unhonest-casestatus" data-code="1" maxlength="255" tname="法院失信记录-执行情况"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delunhonest('+obj.id+')">删除</a><input type="hidden" class="unhonestid" value="'+obj.id+'"/></td></tr>';
						$("#unhonestson").append(txt);
						changeMainConflict(1, $("#sxjl-sel"), $("#sxjl-res-s"));
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#fzjl-sav-btn").on("click", function(){
		if(!checkLength($("#guitytb"))) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveGuity()){
				layer.msg("保存成功！");
			}
        }); 
	});
	
	$("#jrwg-sav-btn").on("click", function(){
		if(!checkLength($("#finruletb"))) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveJrwg()){
				layer.msg("保存成功！");
			}
        }); 
	});
	
	$("#syly-sav-btn").on("click", function(){
		if(!checkLength($("#conf"))) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveConflict()){
				layer.msg("保存成功！");
			}
        }); 
	});
	
	$("#sxjl-sav-btn").on("click", function(){
		if(!checkLength($("#unhonest"))) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveUnhonest()){
				layer.msg("保存成功！");
			}
        });
	});
	
	$(".workhissave").on("click", function(){
		$t = $(this).closest(".whllist");
		if(!checkLength($t)) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveWorkHis($t)){
				layer.msg("保存成功！");
			}
        });
	});
	
	$(".zmrft-sav-btn").on("click", function(){
		$t = $(this).closest(".wpllist");
		if(!checkLength($t)) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveWorkPer($t)){
				layer.msg("保存成功！");
			}
        });
	});
	
	$("#allsave-btn").on("click",function(){
		if(!checkLength($("#main"))) {
			return false;
		}
		layer.confirm('全部保存？', {icon: 3, title:'提示'}, function(cindex){
			
			$.ajax({
				url: appServer + "/bops/bgcheck/getreportauditstatus.htm",
				type:"GET",
				data:{"id": mainId},
				success:function(res){
					if(res.meta.success){
						var flag = true;
						loadIndex = layer.load(1);
						for(var i=0;i<itemArr.length;i++){
							var s = itemArr[i];
							if(s=="main"){
								flag = saveMainInfo();
								if(!flag){
									break;
								}
							}else if(s=="identityCheck"){
								flag = saveIdentity();
								if(!flag){
									break;
								}
							}else if(s=="education"){
								flag = saveEducationCheck();
								if(!flag){
									break;
								}
							}else if(s=="degree"){
								flag = saveDegreeCheck();
								if(!flag){
									break;
								}
							}else if(s=="driver"){
								flag = saveDriverCheck();
								if(!flag){
									break;
								}
							}else if(s=="finrule"){
								flag = saveJrwg();
								if(!flag){
									break;
								}
							}else if(s=="guity"){
								flag = saveGuity();
								if(!flag){
									break;
								}
							}else if(s=="workHis"){
								var a = $(".whllist");
								for(var j=0;j<a.length;j++){
									flag = saveWorkHis($(a[j]));
									if(!flag){
										break;
									}
								}
								if(!flag){
									break;
								}
							}else if(s=="workPer"){
								var a = $(".wpllist");
								for(var j=0;j<a.length;j++){
									flag = saveWorkPer($(a[j]));
									if(!flag){
										break;
									}
								}
								if(!flag){
									break;
								}
							}else if(s=="court"){
								flag = saveExe();
								if(!flag){
									break;
								}
							}else if(s=="unhonest"){
								flag = saveUnhonest();
								if(!flag){
									break;
								}
							}else if(s=="finblk"){
								flag = saveFinblk();
								if(!flag){
									break;
								}
							}else if(s=="conflict"){
								flag = saveConflict();
								if(!flag){
									break;
								}
							}else if(s=="internationalEdu"){
								flag = saveInternationalEducationCheck();
								if(!flag){
									break;
								}
							}
						}
						layer.close(loadIndex);
						if(flag){
							layer.msg("保存成功！");
						}else{
							layer.alert("保存失败，请勿关闭网页！请进行单个保存, 并立即联系技术人员");
						}
					}else{
						layer.alert(res.meta.errorInfo);
					}
				},
				error:function(){
					layer.msg("网络错误");
				}
			});
			
			
        });  
	});
	
	$("#export-btn").live("click", function(){
		$this = $(this);
		if(!checkLength($("#main"))) {
			return false;
		}
		layer.confirm('确定生成报告？', {icon: 3, title:'提示'}, function(cindex){
			
			$.ajax({
				url:appServer + "/bops/bgcheck/getreportauditstatus.htm",
				type:"GET",
				data:{"id": mainId},
				success:function(res){
					if(res.meta.success){
						var flag = true;
						
						for(var i=0;i<itemArr.length;i++){
							var s = itemArr[i];
							if(s=="main"){
								if(!saveMainInfo()){
									flag = false;
									break;
								}
							}else if(s=="identityCheck"){
								if(!saveIdentity()){
									flag = false;
									break;
								}
							}else if(s=="education"){
								if(!saveEducationCheck()){
									flag = false;
									break;
								}
							}else if(s=="degree"){
								if(!saveDegreeCheck()){
									flag = false;
									break;
								}
							}else if(s=="driver"){
								if(!saveDriverCheck()){
									flag = false;
									break;
								}
							}else if(s=="finrule"){
								if(!saveJrwg()){
									flag = false;
									break;
								}
							}else if(s=="guity"){
								if(!saveGuity()){
									flag = false;
									break;
								}
							}else if(s=="workHis"){
								var a = $(".whllist");
								for(var j=0;j<a.length;j++){
									if(!saveWorkHis($(a[j]))){
										flag = false;
									}
									
									if(flag == false) {
										break;
									}
								}
								
								if(flag == false) {
									break;
								}
							}else if(s=="workPer"){
								var a = $(".wpllist");
								for(var j=0;j<a.length;j++){
									if(!saveWorkPer($(a[j]))){
										flag = false;
									}
									if(flag == false) {
										break;
									}
								}
								
								if(flag == false) {
									break;
								}
							}
						}
						if(flag){
							$.ajax({
								url:appServer+"/bops/bgcheck/exportreport.htm",
								type:"GET",
								data:{"id":mainId},
								beforeSend:function(){
									loadIndex = layer.load(1);
								},
								success:function(res){
									layer.close(loadIndex);
									if(res.meta.success){
										layer.msg("报告生成成功！");
										location.reload(true);
									}else{
										layer.alert(res.meta.errorInfo);
									}
								},
								error:function(){
									layer.msg("网络错误");
								}
							});
						} else {
							layer.alert("保存失败");
						}
					}else{
						layer.alert(res.meta.errorInfo);
					}
				},
				error:function(){
					layer.msg("网络错误");
				}
			});
			
			
			
        });  
	
	});
	
	$("#fysszx-sav-btn").live("click", function(){
		if(!checkLength($("#exe"))) {
			return false;
		}
		layer.confirm('确定保存法院诉讼执行记录？', {icon: 3, title:'提示'}, function(cindex){
			if(saveExe()){
				layer.msg("保存成功！");
			}
        });
	});
	
	$("#finblk-add-btn").live("click", function(){
		
		layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
            	url:appServer+"/bops/bgcheck/addfinblk.htm",
				type:"POST",
				data:{"mainId":mainId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("添加成功！");
                        var obj = res.retObj;
						var count = $("#finblkcount").text();
						$("#finblkcount").text(parseInt(count)+1);
						$(".fin-norec").hide();
						$(".fin-nocheck").hide();
						var txt = '<tr class="finblkcontenttr fin-content-tr"><td>'+
						'<p class="showtext finblack-position" data-code="1" maxlength="255" tname="金融风险记录-地点"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
						'<p class="showtext finblack-date" data-code="1" maxlength="64" tname="金融风险记录-贷款日期"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext finblack-money" data-code="1" maxlength="64" tname="金融风险记录-贷款金额"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td><p class="showtext finblack-wishmoney" data-code="1" maxlength="64" tname="金融风险记录-逾期金额"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
						'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delfinblk('+obj.id+')">删除</a><input type="hidden" class="finblkid" value="'+obj.id+'"/></td></tr>';
						$("#finblkson").append(txt);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        });  
	});
	
	$("#finblack-sav-btn").on("click", function(){
		if(!checkLength($("#finblack"))) {
			return false;
		}
		layer.confirm('确定保存？', {icon: 3, title:'提示'}, function(cindex){
			if(saveFinblk()){
				layer.msg("保存成功！");
			}
        });
	});
	
	$(".add-jd").on("click", function(){
		var perid = $(this).attr("data-code");
		var comName = $(this).attr("com");
		$this = $(this);
		var pertemp;
		$.ajax({
			url:appServer+"/bops/bgcheck/findpertemp.htm",
			type:"GET",
			async:false,
			success:function(res){
				if(res.meta.success){
					pertemp = res.retObj;
				}else{
					layer.alert(res.meta.errorInfo, {icon:2});
				}
			},
			error:function(){
				layer.alert("网络错误！", {icon:2});
			}
		});
		var ctt = "";
		
		for(var i=0;i<pertemp.length;i++){
			ctt += "<option value="+pertemp[i].id+">"+pertemp[i].title+"</option>";
		}
		
		hrHuTui.popout({
			width:400,
			title:"添加访谈项",
			type:"select",
			nttext:["选择项目："],
			content:ctt,
			onOk:function(v,callback){
				$.ajax({
					url:appServer+"/bops/bgcheck/addperitem.htm",
					type:"POST",
					data:{"workperId":perid, "perItemId":v},
					async:false,
					success:function(res){
						if(res.meta.success){
							alert("添加成功！");
							$t = $this.parent(".ap-btn-group").siblings("table");
							var obj = res.retObj;
							var tt = "";
							for(var i=0;i<pertemp.length;i++){
								if(pertemp[i].id==$("#pop-select").val()){
									tt = pertemp[i].title;
								}
							}
							var ss = '<tr class="peritem"><td style="font-weight:bold;font-size:16px;" width="20%">'+tt+'</td>'+
								'<td colspan="3" width="80%"><input type="hidden" value="'+obj.id+'" class="peritem-id"/>'+
								'<p class="showtext peritem-val" maxlength="1024" tname="'+ comName +'-证明人访谈-'+ tt +'"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a>'+
									'<a href="javascript:void(0);" class="deletebtn-ta" onclick="delPerItem('+obj.id+')">删除</a></td></tr>';
							$t.append(ss);
							return true;
						}else{
							alert(res.meta.errorInfo);
							return false;
						}
					},
					error:function(xhr){
						alert("网络错误！");
						return false;
					}
				});
			}
		});
		
	});
	
	
	
	$(".change-temp").on("click", function(){
		$this = $(this);
		
		layer.open({
            type:1,
            title:'编辑',
            btn:['确定', '取消'],
            area:['600px'],
            content:"<div><span>请选择：</span><select id='changetemp-sel'><option value='1'>初级模板</option><option value='2'>中层模板</option><option value='3'>高阶模板</option></select>" +
			"</div><div style='width:500px;margin:0 auto;'><p style='padding:5px 0;text-align:left;'>初级模板：专业能力、 突出优点或主要业绩、缺点或待改进之处、团队合作或人际关系、抗压能力、总体评分</p>" +
			"<p style='padding:5px 0;text-align:left;'>中层模板：专业能力、职业性格、 突出优点、主要业绩、缺点或待改进之处、团队合作或人际关系、抗压能力、自律性、 管理能力、总体评分</p>" +
			"<p style='padding:5px 0;text-align:left;'>高阶模板：专业能力、职业性格、 突出优点、主要业绩、缺点或待改进之处、团队合作或人际关系、抗压能力、 成本意识、 管理及培养下属能力、分析决策能力、组织规划能力、总体评分</p>" +
			"</div>",
            yes:function(index){
            	var tempId = $("#changetemp-sel").val();
            	layer.confirm('确定替换吗？', {icon: 3, title:'提示'}, function(cindex){
                    $.ajax({
                    	url:appServer+"/bops/bgcheck/changetemp.htm",
						type:"POST",
						data:{"tempId":tempId, "perId":$this.attr("data-code")},
                        beforeSend:function(){
                            loadIndex = layer.load(1);
                        },
                        success:function(res){
                            layer.close(loadIndex);
                            if(res.meta.success){
                            	layer.close(index);
                                layer.msg("添加成功！");
                                var obj = res.retObj;
								var iar = [];
								var oo;
								for(var i=0;i<obj.length;i++){
									for(j=i+1;j<obj.length;j++){
										if(obj[i].lv>obj[j].lv){
											oo = obj[j];
											obj[j] = obj[i];
											obj[i] = oo;
										}
									}
								}
								
								var txt = "";
								for(var i=0;i<obj.length;i++){
									txt += '<tr class="peritem"><td style="font-weight:bold;font-size:16px;" width="20%">'+obj[i].key+'</td>'+
									'<td colspan="3" width="80%"><input type="hidden" value="'+obj[i].id+'" class="peritem-id"/><p class="showtext peritem-val"></p>'+
									'<a href="javascript:void(0);" class="editbtn-ta">编辑</a><a href="javascript:void(0);" class="deletebtn-ta" onclick="delPerItem('+obj[i].id+')">删除</a></td></tr>';
								}
								$this.parent(".ap-btn-group").siblings("table").find(".peritem").remove();
								$this.parent(".ap-btn-group").siblings("table").append(txt);
                            }else{
                                layer.alert(res.meta.errorInfo, {icon:2});
                            }
                        },
                        error:function(){
                            layer.close(laodIndex);
                            layer.msg('网络错误！');
                        }
                        
                    });
                });  
            }
        }); 
	});

	var mainId = $("#ar-mainId").val();
});


function saveFinblk(){
	$content = $(".fin-content-tr");
	var arr = [];
	if($content.size()!=0){
		
		for(var i=0;i<$content.size();i++){
				var position = $($content[i]).find(".finblack-position").text();
				var loansDate = $($content[i]).find(".finblack-date").text();
				var loansMoney = $($content[i]).find(".finblack-money").text();
				var wishMoney = $($content[i]).find(".finblack-wishmoney").text();
				var id = $($content[i]).find(".finblkid").val();
				var o = {
						"position":position, "loansDate":loansDate, 
						"loansMoney":loansMoney, "wishMoney":wishMoney,
						"id":id
					};
				arr.push(JSON.stringify(o));
		}
	}
	
	var f = false;
	
	$.ajax({
		url:appServer+"/bops/bgcheck/savefinblk.htm",
		type:"post",
		data:{"finblk":arr},
		async:false,
		success:function(res){
			if(res.meta.success){
				f = true;
			}else{
				layer.alert("保存失败！");
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return f;
}

function saveExe(){
	$content = $(".exe-content");
	var arr = [];
	if($content.size()!=0){
		
		for(var i=0;i<$content.size();i++){
				var caseDate = $($content[i]).find(".exe-date").text();
				var caseCode = $($content[i]).find(".exe-casecode").text();
				var court = $($content[i]).find(".exe-execourt").text();
				var exeMoney = $($content[i]).find(".exe-money").text();
				var caseStatus = $($content[i]).find(".exe-casestatus").text();
				var id = $($content[i]).find(".courtexeid").val();
				var o = {
						"caseDate":caseDate, "caseCode":caseCode, 
						"court":court, "exeMoney":exeMoney,
						"caseStatus":caseStatus, "id":id
					};
				arr.push(JSON.stringify(o));
		}
	}
	
	var f = false;
	$.ajax({
		url:appServer+"/bops/bgcheck/saveexe.htm",
		type:"post",
		data:{"exe":arr},
		async:false,
		success:function(res){
			if(res.meta.success){
				f = true;
			}else{
				layer.alert("保存失败！");
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return f;
}

function saveUnhonest(){
	$content = $(".unhonest-content");
	var arr = [];
	if($content.size()!=0){
		
		for(var i=0;i<$content.size();i++){
				var caseDate = $($content[i]).find(".unhonest-date").text();
				var caseCode = $($content[i]).find(".unhonest-casecode").text();
				var court = $($content[i]).find(".unhonest-execourt").text();
				var duty = $($content[i]).find(".unhonest-duty").text();
				var exeStatus = $($content[i]).find(".unhonest-casestatus").text();
				var id = $($content[i]).find(".unhonestid").val();
				var o = {
						"caseDate":caseDate, "caseCode":caseCode, 
						"court":court, "duty":duty,
						"exeStatus":exeStatus, "id":id
					};
				arr.push(JSON.stringify(o));
		}
	}
	var f = false;
	$.ajax({
		url:appServer+"/bops/bgcheck/saveunhonest.htm",
		type:"post",
		data:{"unh":arr},
		async:false,
		success:function(res){
			if(res.meta.success){
				f = true;
			}else{
				layer.alert("保存失败！");
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return f;
}

function delShowCheck(id){
	$e = $(event.target);
	layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer + "/bops/bgcheck/delshowcheck.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.parents("table").find(".percktb").hide();
					$e.parents("table").siblings(".ap-btn-group").find(".rebuild-check").show();
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function reCheck(id){
	$e = $(event.target);
	
	layer.confirm('确认还原？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer + "/bops/bgcheck/reshowcheck.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("还原成功！");
                    $e.parents(".ap-btn-group").siblings("table").find(".percktb").show();
					$e.hide();
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function checkIptNull(obj){
	if(obj.length==0){
		return true;
	}
	
	for(var i=0;i<obj.length;i++){
		if(obj[i].value==""){
			return true;
		}
	}
	
	return false;
}

function saveWorkPer($t){
	var voucherSource = $t.find(".zmrft-from").html();
	var voucherName = $t.find(".zmrft-hr").html();
	var voucherPosition = $t.find(".zmrft-position").html();
	var voucherRelation = $t.find(".zmrft-relation").html();
	var voucherTime = $t.find(".zmrft-time").html();
	var hireName = $t.find(".zmrft-hirename").html();
	var hireNameRes = $t.find(".content-zmrft-hirename-if-sel").val();
	var hireNameMark = $t.find(".zmrft-hirename-text").html();
	var comPosition = $t.find(".zmrft-composition").html();
	var comPositionRes = $t.find(".content-zmrft-composition-if-sel").val();
	var comPositonMark = $t.find(".zmrft-composition-text").html(); 
	var workTime = $t.find(".zmrft-worktime").html();
	var workTimeRes = $t.find(".content-zmrft-worktime-if-sel").val();
	var workTimeMark = $t.find(".zmrft-worktime-text").html();
	var workType = $t.find(".zmrft-worktype").html();
	var workTypeRes = $t.find(".content-zmrft-worktype-if-sel").val();
	var workTypeMark = $t.find(".zmrft-worktype-text").html();
	var reportPerson = $t.find(".zmrft-reportperson").html();
	var reportPersonRes = $t.find(".content-zmrft-reportperson-if-sel").val();
	var reportPersonMark = $t.find(".zmrft-reportperson-text").html();
	var department = $t.find(".zmrft-depart").html();
	var departmentRes = $t.find(".content-zmrft-depart-if-sel").val();
	var departmentMark = $t.find(".zmrft-depart-text").html();
	var positionName = $t.find(".zmrft-workname").html();
	var positionNameRes = $t.find(".content-zmrft-workname-if-sel").val();
	var positionNameMark = $t.find(".zmrft-workname-text").html();
	var positionDuty = $t.find(".zmrft-dutydes").html();
	var positionDutyRes = $t.find(".content-zmrft-dutydes-if-sel").val();
	var positionDutyMark = $t.find(".zmrft-dutydes-text").html();
	var salary = $t.find(".zmrft-salary").html();
	var salaryRes = $t.find(".content-zmrft-salary-if-sel").val();
	var salaryMark = $t.find(".zmrft-salary-text").html();
	var leaveReason = $t.find(".zmrft-leavereason").html();
	var leaveReasonRes = $t.find(".content-zmrft-leavereason-if-sel").val();
	var leaveReasonMark = $t.find(".zmrft-leavereason-text").html();
	var ruleBreak = $t.find(".content-zmrft-rule-if-sel").val();
	var ruleBreakMark = $t.find(".zmrft-rule").html();
	var argue = $t.find(".content-zmrft-arbitrate-if-sel").val();
	var argueMark = $t.find(".zmrft-arbitrate").html();
	var banSameWork = $t.find(".content-zmrft-ban-if-sel").val();
	var banSameWorkMark = $t.find(".zmrft-ban").html();
	var professional = $t.find(".zmrft-prof").html();
	var good = $t.find(".zmrft-good").html();
	var bad = $t.find(".zmrft-bad").html();
	var teamwork = $t.find(".zmrft-teamwork").html();
	var press = $t.find(".zmrft-press").html();
	var score = $t.find(".zmrft-score").html();
	var other = $t.find(".zmrft-other").html();
	var id = $t.find(".workperid").val();
	var comName = $t.find(".companyName").val();
	var voucherContact = $t.find(".zmrft-contact").html();
	var voucherMark = $t.find(".zmrft-vouchermark").html();
	
	var obj = {
		"voucherSource":voucherSource,	"voucherName":voucherName,	"voucherPosition":voucherPosition,	"voucherRelation":voucherRelation,	
		"voucherTime":voucherTime,	"hireName":hireName,	"hireNameRes":hireNameRes,	"hireNameMark":hireNameMark, 
		"comPosition":comPosition,	"comPositionRes":comPositionRes,	"comPositonMark":comPositonMark,	"workTime":workTime, 
		"workTimeRes":workTimeRes,	"workTimeMark":workTimeMark,	"workType":workType,	"workTypeRes":workTypeRes,
		"workTypeMark":workTypeMark,	"reportPerson":reportPerson,	"reportPersonRes":reportPersonRes,	"reportPersonMark":reportPersonMark,
		"department":department,	"departmentRes":departmentRes,	"departmentMark":departmentMark,	"positionName":positionName,
		"positionNameRes":positionNameRes,	"positionNameMark":positionNameMark,	"positionDuty":positionDuty,	"positionDutyRes":positionDutyRes,
		"positionDutyMark":positionDutyMark,	"salary":salary,	"salaryRes":salaryRes,	"salaryMark":salaryMark,
		"leaveReason":leaveReason,	"leaveReasonRes":leaveReasonRes,	"leaveReasonMark":leaveReasonMark,	"ruleBreak":ruleBreak,
		"ruleBreakMark":ruleBreakMark,	"argue":argue,	"argueMark":argueMark,	"banSameWork":banSameWork,
		"banSameWorkMark":banSameWorkMark, "id":id, "professional":professional, "good":good, "bad":bad,
		"teamwork":teamwork, "press":press, "score":score, "other":other, "voucherContact":voucherContact, "comName":comName, "voucherMark": voucherMark
	};
	
	$peritem = $t.find(".peritem");
	var peritemArr = [];
	for(var i=0;i<$peritem.size();i++){
		$temp = $($peritem.get(i));
		var peritemid = $temp.find(".peritem-id").val();
		var peritemval = $temp.find(".peritem-val").html();
		peritemArr.push(JSON.stringify({"peritemid":peritemid, "peritemval":peritemval}));
	}
	
	var r = false;
	
	$.ajax({
		url:appServer+"/bops/bgcheck/saveworkper.htm",
		type:"POST",
		async:false,
		data:{"wp":JSON.stringify(obj), "peritem":peritemArr},
		success:function(res){
			if(res.meta.success){
				r = true;
			}else{
				layer.alert("保存失败");
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return r;
}

function saveWorkHis($t){
	var voucherSource = $t.find(".rlzy-from").html();
	var voucherName = $t.find(".rlzy-hr").html();
	var voucherPosition = $t.find(".rlzy-position").html();
	var voucherRelation = $t.find(".rlzy-relation").html();
	var voucherTime = $t.find(".rlzy-time").html();
	var hireName = $t.find(".rlzy-hirename").html();
	var hireNameRes = $t.find(".content-rlzy-hirename-if-sel").val();
	var hireNameMark = $t.find(".rlzy-hirename-text").html();
	var comPosition = $t.find(".rlzy-composition").html();
	var comPositionRes = $t.find(".content-rlzy-compos-if-sel").val();
	var comPositonMark = $t.find(".rlzy-composition-text").html(); 
	var workTime = $t.find(".rlzy-worktime").html();
	var workTimeRes = $t.find(".content-rlzy-worktime-if-sel").val();
	var workTimeMark = $t.find(".rlzy-worktime-text").html();
	var workType = $t.find(".rlzy-worktype").html();
	var workTypeRes = $t.find(".content-rlzy-worktype-if-sel").val();
	var workTypeMark = $t.find(".rlzy-worktype-text").html();
	var reportPerson = $t.find(".rlzy-reportperson").html();
	var reportPersonRes = $t.find(".content-rlzy-reportper-if-sel").val();
	var reportPersonMark = $t.find(".rlzy-reportperson-text").html();
	var department = $t.find(".rlzy-depart").html();
	var departmentRes = $t.find(".content-rlzy-departname-if-sel").val();
	var departmentMark = $t.find(".rlzy-depart-text").html();
	var positionName = $t.find(".rlzy-workname").html();
	var positionNameRes = $t.find(".content-rlzy-position-if-sel").val();
	var positionNameMark = $t.find(".rlzy-workname-text").html();
	var positionDuty = $t.find(".rlzy-dutydes").html();
	var positionDutyRes = $t.find(".content-rlzy-duty-if-sel").val();
	var positionDutyMark = $t.find(".rlzy-dutydes-text").html();
	var salary = $t.find(".rlzy-salary").html();
	var salaryRes = $t.find(".content-rlzy-salary-if-sel").val();
	var salaryMark = $t.find(".rlzy-salary-text").html();
	var leaveReason = $t.find(".rlzy-leavereason").html();
	var leaveReasonRes = $t.find(".content-rlzy-leavereason-if-sel").val();
	var leaveReasonMark = $t.find(".rlzy-leavereason-text").html();
	var ruleBreak = $t.find(".content-rlzy-rule-if-sel").val();
	var ruleBreakMark = $t.find(".rlzy-rule").html();
	var argue = $t.find(".content-rlzy-arbitrate-if-sel").val();
	var argueMark = $t.find(".rlzy-arbitrate").html();
	var banSameWork = $t.find(".content-rlzy-ban-if-sel").val();
	var banSameWorkMark = $t.find(".rlzy-ban").html();
	var id = $t.find(".workhisid").val();
	var voucherContact = $t.find(".rlzy-contact").html();
	var comName = $t.find("#r-companyName").val();
	var voucherMark = $t.find(".rlzy-vouchermark").html();
	
	var iArr = [hireNameRes, comPositionRes, workTimeRes, workTypeRes, reportPersonRes, departmentRes, positionNameRes, positionDutyRes, salaryRes,
	            leaveReasonRes, ruleBreak, argue, banSameWork];
	
	var obj = {
		"voucherSource":voucherSource,	"voucherName":voucherName,	"voucherPosition":voucherPosition,	"voucherRelation":voucherRelation,	
		"voucherTime":voucherTime,	"hireName":hireName,	"hireNameRes":hireNameRes,	"hireNameMark":hireNameMark, 
		"comPosition":comPosition,	"comPositionRes":comPositionRes,	"comPositonMark":comPositonMark,	"workTime":workTime, 
		"workTimeRes":workTimeRes,	"workTimeMark":workTimeMark,	"workType":workType,	"workTypeRes":workTypeRes,
		"workTypeMark":workTypeMark,	"reportPerson":reportPerson,	"reportPersonRes":reportPersonRes,	"reportPersonMark":reportPersonMark,
		"department":department,	"departmentRes":departmentRes,	"departmentMark":departmentMark,	"positionName":positionName,
		"positionNameRes":positionNameRes,	"positionNameMark":positionNameMark,	"positionDuty":positionDuty,	"positionDutyRes":positionDutyRes,
		"positionDutyMark":positionDutyMark,	"salary":salary,	"salaryRes":salaryRes,	"salaryMark":salaryMark,
		"leaveReason":leaveReason,	"leaveReasonRes":leaveReasonRes,	"leaveReasonMark":leaveReasonMark,	"ruleBreak":ruleBreak,
		"ruleBreakMark":ruleBreakMark,	"argue":argue,	"argueMark":argueMark,	"banSameWork":banSameWork,
		"banSameWorkMark":banSameWorkMark, "id":id, "voucherContact":voucherContact,"comName":comName, "voucherMark":voucherMark
	};
	
	var tt;
	for(var i=0; i<$(".gzly-tr").size();i++){
		if($($(".gzly-tr")[i]).find(".whid").val()==id){
			tt = $($(".gzly-tr")[i]).find(".gzly-name-res-s");
		}
	}
	var r = false;
	$.ajax({
		url:appServer+"/bops/bgcheck/saveworkhis.htm",
		type:"POST",
		async:false,
		data:{"wh":JSON.stringify(obj)},
		success:function(res){
			if(res.meta.success){
				//changeMainRes(iArr, $(tt));
				r = true;
			}else{
				layer.alert("保存出错");
			}
		},
		error:function(){
			layer.alert("网络错误！");
			return false;
		}
	});
	
	return r;
}

function changeMainConflict(para, $sel, $ressel){
	if(para==1){
		$sel.val(1);
		$sel.siblings(".showtext").text("已验证");
		$ressel.val(2);
		$ressel.siblings("img").attr("src", "/images/bops/report/preview/ch.png");
	}else{
		$sel.val(1);
		$sel.siblings(".showtext").text("已验证");
		$ressel.val(1);
		$ressel.siblings("img").attr("src", "/images/bops/report/preview/dh.png");
		
	}
}

function addqygd(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addqygd.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)+1);
					$(".qygd-nocheck").remove();
					$(".qygd-norec").hide();
					var txt = '<tr class="qygdcontenttr qygd-content"><td>'+
					'<p class="showtext gd-comname" data-code="1" maxlength="128" tname="企业股东-企业名称"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext gd-comcode" data-code="1" maxlength="128" tname="企业股东-注册号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gd-comtype" data-code="1" maxlength="128" tname="企业股东-企业类型"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gd-regmoney" data-code="1" maxlength="64" tname="企业股东-注册资本(万元)"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gd-moneytype" data-code="1" maxlength="32" tname="企业股东-注册资本币种"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gd-comstatus" data-code="1" maxlength="64" tname="企业股东-企业状态"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gd-takemoney" data-code="1" maxlength="64" tname="企业股东-认缴出资"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delCongd('+obj.id+')">删除</a><input type="hidden" class="gdid" value="'+obj.id+'"/></td></tr>';
					$("#qygdtb").append(txt);
					changeMainConflict(1, $("#syly-sel"), $("#syly-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });
}

function addqygl(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addqygl.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)+1);
					$(".qygl-nocheck").remove();
					$(".qygl-norec").hide();
					var txt = '<tr class="qyglcontenttr qygl-content"><td>'+
					'<p class="showtext gl-comname" data-code="1" maxlength="64" tname="企业主要管理人员-企业名称"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext gl-comcode" data-code="1" maxlength="64" tname="企业主要管理人员-注册号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gl-comtype" data-code="1" maxlength="64" tname="企业主要管理人员-企业类型"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gl-regmoney" data-code="1" maxlength="64" tname="企业主要管理人员-注册资本(万元)"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gl-moneytype" data-code="1" maxlength="32" tname="企业主要管理人员-注册资本币种"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gl-comstatus" data-code="1" maxlength="32" tname="企业主要管理人员-企业状态"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext gl-position" data-code="1" maxlength="32" tname="企业主要管理人员-职务"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delCongl('+obj.id+')">删除</a><input type="hidden" class="gdid" value="'+obj.id+'"/></td></tr>';
					$("#qygltb").append(txt);
					changeMainConflict(1, $("#syly-sel"), $("#syly-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function addqyfr(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addqyfr.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)+1);
					$(".qyfr-nocheck").remove();
					$(".qyfr-norec").hide();
					var txt = '<tr class="qyfrcontenttr qyfr-content"><td>'+
					'<p class="showtext fr-comname" data-code="1" maxlength="64" tname="企业法定代表人-企业名称"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext fr-comcode" data-code="1" maxlength="64" tname="企业法定代表人-注册号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext fr-comtype" data-code="1" maxlength="64" tname="企业法定代表人-企业类型"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext fr-regmoney" data-code="1" maxlength="64" tname="企业法定代表人-注册资本(万元)"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext fr-moneytype" data-code="1" maxlength="32" tname="企业法定代表人-注册资本币种"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext fr-comstatus" data-code="1" maxlength="32" tname="企业法定代表人-企业状态"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delConfr('+obj.id+')">删除</a><input type="hidden" class="frid" value="'+obj.id+'"/></td></tr>';
					$("#qyfrtb").append(txt);
					changeMainConflict(1, $("#syly-sel"), $("#syly-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function addzjh(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addzjhrec.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)+1);
					$(".zjhtrson").hide();
					var txt = '<tr class="zjhcontenttr"><td>'+
					'<p class="showtext xzcf-behav" data-code="1"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext xzcf-code" data-code="1"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext xzcf-date" data-code="1"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext xzcf-type" data-code="1"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delzjh('+obj.id+')">删除</a><input type="hidden" class="zjhid" value="'+obj.id+'"/></td></tr>';
					$("#zjhtb").append(txt);
					changeMainConflict(1, $("#jrwg-sel"), $("#jrwg-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function addban(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addbanrec.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)+1);
					$(".bannone").hide();
					var txt = '<tr class="bancontenttr"><td>'+
					'<p class="showtext zqjr-behav" data-code="1" maxlength="255" tname="证券市场禁入记录-违法行为"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext zqjr-code" data-code="1" maxlength="64" tname="证券市场禁入记录-处罚文号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext zqjr-date" data-code="1" maxlength="64" tname="证券市场禁入记录-发文日期"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext zqjr-type" data-code="1" maxlength="64" tname="证券市场禁入记录-处罚分类"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delban('+obj.id+')">删除</a><input type="hidden" class="banid" value="'+obj.id+'"/></td></tr>';
					$("#bantb").append(txt);
					changeMainConflict(1, $("#jrwg-sel"), $("#jrwg-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function addbjh(){
	
	layer.confirm('确定添加一条记录吗？', {icon: 3, title:'提示'}, function(cindex){
		var mainId = $("#ar-mainId").val();
        $.ajax({
        	url:appServer+"/bops/bgcheck/addbjhrec.htm",
			type:"POST",
			data:{"mainId":mainId},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    var obj = res.retObj;
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)+1);
					$(".bjhnone").hide();
					var txt = '<tr class="bjhcontenttr"><td>'+
					'<p class="showtext bjh-behav" data-code="1" maxlength="255" tname="保监会行政处罚记录-违法行为"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td><td>'+
					'<p class="showtext bjh-code" data-code="1" maxlength="64" tname="保监会行政处罚记录-处罚文号"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext bjh-date" data-code="1" maxlength="64" tname="保监会行政处罚记录-发文日期"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
					'<td><p class="showtext bjh-type" data-code="1" maxlength="64" tname="保监会行政处罚记录-处罚分类"></p><a href="javascript:void(0);" class="editbtn-ta">编辑</a></td>'+
				'<td style="border-right:none"><a href="javascript:void(0);" class="deletebtn-ta" onclick="delbjh('+obj.id+')">删除</a><input type="hidden" class="bjhid" value="'+obj.id+'"/></td></tr>';
					$("#bjhtb").append(txt);
					changeMainConflict(1, $("#jrwg-sel"), $("#jrwg-res-s"));
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}


function saveGuity(){
	$g = $(".guitycontenttr");
	if($g.size()!=0){
		var arr = [];
		for(var i=0;i<$g.size();i++){
			var caseTime = $($g[i]).find(".fz-caseTime").text();
			var result = $($g[i]).find(".fz-result").text();
			var id = $($g[i]).find(".guityid").val();
			var o = {
					"caseTime":caseTime, "result":result, 
					"id":id
				};
			arr.push(JSON.stringify(o));
		}
		
		var r = false;
		
		$.ajax({
			url:appServer+"/bops/bgcheck/saveguity.htm",
			type:"POST",
			data:{"arr":arr},
			async:false,
			success:function(res){
				if(res.meta.success){
					r = true;
				}else{
					layer.alert(res.meta.errorInfo);
				}
			},
			error:function(){
				layer.alert("网络错误！");
			}
		});
		
		return r;
	}else{
		return true;
	}
}

function saveConflict(){
	$gd = $(".qygd-content");
	$gl = $(".qygl-content");
	$fr = $(".qyfr-content");
	var gdarr = [];
	var glarr = [];
	var frarr = [];
	for(var i=0;i<$gd.size();i++){
		var comName = $($gd[i]).find(".gd-comname").text();
		var regCode = $($gd[i]).find(".gd-comcode").text();
		var type = $($gd[i]).find(".gd-comtype").text();
		var regMoney = $($gd[i]).find(".gd-regmoney").text();
		var regMoneyType = $($gd[i]).find(".gd-moneytype").text();
		var comStatus = $($gd[i]).find(".gd-comstatus").text();
		var giveMoney = $($gd[i]).find(".gd-takemoney").text();
		var id = $($gd[i]).find(".gdid").val();
		
		var o = {
				"comName":comName, "regCode":regCode, 
				"type":type, 
				"regMoney":regMoney, "id":id, "regMoney":regMoney,
				"regMoneyType":regMoneyType, "comStatus":comStatus,
				"giveMoney":giveMoney
			};
		gdarr.push(JSON.stringify(o));
	}
	
	for(var i=0;i<$gl.size();i++){
		var comName = $($gl[i]).find(".gl-comname").text();
		var regCode = $($gl[i]).find(".gl-comcode").text();
		var type = $($gl[i]).find(".gl-comtype").text();
		var regMoney = $($gl[i]).find(".gl-regmoney").text();
		var regMoneyType = $($gl[i]).find(".gl-moneytype").text();
		var comStatus = $($gl[i]).find(".gl-comstatus").text();
		var position = $($gl[i]).find(".gl-position").text();
		var id = $($gl[i]).find(".glid").val();
		var o = {
				"comName":comName, "regCode":regCode, 
				"type":type, "regMoney":regMoney, "regMoneyType":regMoneyType,
				"comStatus":comStatus, "position":position,
				"id":id
			};
		glarr.push(JSON.stringify(o));
	}
	
	for(var i=0;i<$fr.size();i++){
		var comName = $($fr[i]).find(".fr-comname").text();
		var regCode = $($fr[i]).find(".fr-comcode").text();
		var comType = $($fr[i]).find(".fr-comtype").text();
		var regMoney = $($fr[i]).find(".fr-regmoney").text();
		var regMoneyType = $($fr[i]).find(".fr-moneytype").text();
		var comStatus = $($fr[i]).find(".fr-comstatus").text();
		var id = $($fr[i]).find(".frid").val();
		var o = {
				"comName":comName, "regCode":regCode, 
				"comType":comType, "regMoney":regMoney, "regMoneyType":regMoneyType,
				"comStatus":comStatus,"id":id
			};
		frarr.push(JSON.stringify(o));
	}
	
	var r = false;
	
	$.ajax({
		url:appServer+"/bops/bgcheck/saveconflict.htm",
		type:"POST",
		data:{"gdarr":gdarr, "glarr":glarr, "frarr":frarr},
		async:false,
		success:function(res){
			if(res.meta.success){
				r = true;
			}else{
				layer.alert(res.meta.errorInfo);
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return r;
}

function saveJrwg(){
	$z = $(".zjhcontenttr");
	$b = $(".bancontenttr");
	$bj = $(".bjhcontenttr");
	var zarr = [];
	var barr = [];
	var bjarr = [];
	for(var i=0;i<$z.size();i++){
		var action = $($z[i]).find(".xzcf-behav").text();
		var code = $($z[i]).find(".xzcf-code").text();
		var subDate = $($z[i]).find(".xzcf-date").text();
		var punishType = $($z[i]).find(".xzcf-type").text();
		var id = $($z[i]).find(".zjhid").val();
		var o = {
				"action":action, "code":code, 
				"subDate":subDate, 
				"punishType":punishType, "id":id
			};
		zarr.push(JSON.stringify(o));
	}
	
	for(var i=0;i<$bj.size();i++){
		var illegalAction = $($bj[i]).find(".bjh-behav").text();
		var code = $($bj[i]).find(".bjh-code").text();
		var subDate = $($bj[i]).find(".bjh-date").text();
		var punishType = $($bj[i]).find(".bjh-type").text();
		var id = $($bj[i]).find(".bjhid").val();
		var o = {
				"illegalAction":illegalAction, "code":code, 
				"subDate":subDate, "punishType":punishType,
				"id":id
			};
		bjarr.push(JSON.stringify(o));
	}
	
	for(var i=0;i<$b.size();i++){
		var illegalAction = $($b[i]).find(".zqjr-behav").text();
		var code = $($b[i]).find(".zqjr-code").text();
		var subDate = $($b[i]).find(".zqjr-date").text();
		var punishType = $($b[i]).find(".zqjr-type").text();
		var id = $($b[i]).find(".banid").val();
		var o = {
				"illegalAction":illegalAction, "code":code, 
				"subDate":subDate, "punishType":punishType,
				"id":id
			};
		barr.push(JSON.stringify(o));
	}
	
	var r = false;
	
	$.ajax({
		url:appServer+"/bops/bgcheck/savefinrule.htm",
		type:"POST",
		data:{"zarr":zarr, "barr":barr, "bjarr":bjarr},
		async:false,
		success:function(res){
			if(res.meta.success){
				r = true;
			}else{
				layer.alert(res.meta.errorInfo);
			}
		},
		error:function(){
			layer.alert("网络错误！");
		}
	});
	
	return r;
}


function delguity(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delguity.htm",
			type:"POST",
			data:{"id":id, "mainId": $("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".guitycontenttr").remove();
					var i = $(".guitycontenttr").size();
					if(i == 0) {
						$(".guitynore").show();
						$("#guitycount").text("截止本报告之日前，有0条匹配信息 ");
					} 
					
					if(i==0){
						$(".guitynore").show();
						$("#fzjl-res-s").val(0);
						$("#fzjl-res-s").siblings("img").attr("src", "/images/bops/report/preview/dh.png");
						$("#fzjl-sel").val(1);
						$("#fzjl-sel").siblings(".showtext").text("已验证");
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function delexe(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delexe.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".exe-content").remove();
					var i = $(".exe-content").size();
					$("#execount").text(i);
					if(i==0){
						$(".exenorec").show();
						$("#fysjzx-res-s").val(1);
						$("#fysjzx-res-s").siblings("img").attr("src", "/images/bops/report/preview/dh.png");
						$("#fysjzx-sel").val(1);
						$("#fysjzx-sel").siblings(".showtext").text("已验证");
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delban(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delban.htm",
			type:"POST",
			data:{"id":id,  "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".bancontenttr").remove();
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)-1);
					var i = $(".bancontenttr").size();
					if(i==0){
						$(".bannone").show();
						changeMainConflict(2, $("#jrwg-sel"), $("#jrwg-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delCongd(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delcongd.htm",
			type:"POST",
			data:{"id":id, "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".qygd-content").remove();
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)-1);
					var i = $(".qygd-content").size();
					if(i==0){
						$(".qygd-norec").show();
						changeMainConflict(2, $("#syly-sel"), $("#syly-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delCongl(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delcongl.htm",
			type:"POST",
			data:{"id":id,  "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".qygl-content").remove();
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)-1);
					var i = $(".qygl-content").size();
					if(i==0){
						$(".qygl-norec").show();
						changeMainConflict(2, $("#syly-sel"), $("#syly-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delConfr(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delconfr.htm",
			type:"POST",
			data:{"id":id, "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".qyfr-content").remove();
					var count = $("#confcount").text();
					$("#confcount").text(parseInt(count)-1);
					var i = $(".qyfr-content").size();
					if(i==0){
						$(".qyfr-norec").show();
						changeMainConflict(2, $("#syly-sel"), $("#syly-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delzjh(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delzjh.htm",
			type:"POST",
			data:{"id":id, "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".zjhcontenttr").remove();
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)-1);
					var i = $(".zjhcontenttr").size();
					if(i==0){
						$(".zjhtrson").show();
						changeMainConflict(2, $("#jrwg-sel"), $("#jrwg-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delbjh(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delbjh.htm",
			type:"POST",
			data:{"id":id, "mainId":$("#ar-mainId").val()},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".bjhcontenttr").remove();
					var count = $("#finrulecount").text();
					$("#finrulecount").text(parseInt(count)-1);
					var i = $(".bjhcontenttr").size();
					if(i==0){
						$(".bjhnone").show();
						changeMainConflict(2, $("#jrwg-sel"), $("#jrwg-res-s"));
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

function delunhonest(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delunhonest.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("删除成功！");
                    $e.closest(".unhonestcttr").remove();
					var count = $("#unhonestcount").text();
					$("#unhonestcount").text(parseInt(count)-1);
					var i = $(".unhonest-content").size();
					if(i==0){
						$(".unhonest-norec").show();
						$("#sxjl-res-s").val(1);
						$("#sxjl-res-s").siblings("img").attr("src", "/images/bops/report/preview/dh.png");
						$("#sxjl-sel").val(1);
						$("#sxjl-sel").siblings(".showtext").text("已验证");
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    }); 
}

/**
 * 最大长度判断
 * @param $obj
 * @returns
 */
function checkLength($obj) {
	var la = $obj.find("*[maxlength]");
	if(la != null && la.length != 0) {
		for(var i=0; i<la.length; i++) {
			var ml = (la[i].maxLength == null?$(la[i]).attr("maxlength"):la[i].maxLength);
			var v = null;
			if(la[i].tagName == "INPUT") {
				v = la[i].value;
			} else {
				v = la[i].innerHTML;
			}
			
			if(v != null) {
				if(ml < v.length) {
					layer.alert($(la[i]).attr("tname")+",长度超过限制，最大为"+ ml + "字", {icon:2});
					return false;
				}
			}
			
		}
	}
	
	return true;
}

function saveMainInfo(){
	var o = new Array();
	var mainId = $("#ar-mainId").val();
	var subComName = $("#subcom").val();
	var identityChcekIfDid = $("#sfyz-if-sel").val();
	var identityCheckResSel = $("#sfyz-res-s").val();
	var identityCheckMark = $("#sfyz-res-t").val();
	var educationIfDid = $("#xlyz-sel").val();
	var educationResSel = $("#xlyz-res-s").val();
	var educationMark = $("#xlyz-res-t").val();
	var degreeIfDid = $("#xwyz-sel").val();
	var degreeResSel = $("#xwyz-res-s").val();
	var degreeResMark = $("#xwyz-res-t").val();
	var driverIfDid = $("#jsz-sel").val();
	var driverResSel = $("#jsz-res-s").val();
	var driverResMark = $("#jsz-res-t").val();
	var guityIfDid = $("#fzjl-sel").val();
	var guityResSel = $("#fzjl-res-s").val();
	var guityResMark = $("#fzjl-res-t").val();
	var courtIfDid = $("#fysjzx-sel").val();
	var courtResSel = $("#fysjzx-res-s").val();
	var courtResMark = $("#fysjzx-res-t").val();
	var unhonestIfDid = $("#sxjl-sel").val();
	var unhonestResSel = $("#sxjl-res-s").val();
	var unhonestResMark = $("#sxjl-res-t").val();
	var finruleIfDid = $("#jrwg-sel").val();
	var finruleResSel = $("#jrwg-res-s").val();
	var finruleResMark = $("#jrwg-res-t").val();
	var conflictIfDid = $("#syly-sel").val();
	var conflictResSel = $("#syly-res-s").val();
	var conflictResMark = $("#syly-res-t").val();
	var finblkIfDid = $("#jrhmd-sel").val();
	var finblkResSel = $("#jrhmd-res-s").val();
	var finblkResMark = $("#jrhmd-res-t").val();
	var internationalResSel = $("#gjxlyz-res-s").val();
	var internationalMark = $("#gjxlyz-res-t").val();
	var internationalIfDid = $("#gjxlyz-sel").val();
	var workHisIn = JSON.stringify(workHisInfo());
	var workPerIn = JSON.stringify(workPerInfo());	
	var deliverVer = $("#deliverver").val();
	var remarkstext = $("#remarkstext").html();
	
	if(subComName==""){
		layer.alert("公司名不能为空！");
		return false;
	}
	
	var flag = 0;
	$.ajax({
		url:appServer+"/bops/bgcheck/savmaininfo.htm",
		type:"post",
		async:false,
		data:{"mainId":mainId,"subComName":subComName, "identityChcekIfDid":identityChcekIfDid, "identityCheckResSel":identityCheckResSel, "identityCheckMark":identityCheckMark,
			"educationIfDid":educationIfDid, "educationResSel":educationResSel, "educationMark":educationMark, "degreeIfDid":degreeIfDid, "degreeResSel":degreeResSel, "degreeResMark":degreeResMark, "driverIfDid":driverIfDid,
			"driverResSel":driverResSel, "driverResMark":driverResMark, "guityIfDid":guityIfDid, "guityResSel":guityResSel, "guityResMark":guityResMark, "courtIfDid":courtIfDid, "courtResSel":courtResSel,
			"courtResMark":courtResMark, "unhonestIfDid":unhonestIfDid, "unhonestResSel":unhonestResSel, "unhonestResMark":unhonestResMark, "finruleIfDid":finruleIfDid, "finruleResSel":finruleResSel,
			"finruleResMark":finruleResMark, "conflictIfDid":conflictIfDid, "conflictResSel":conflictResSel, "conflictResMark":conflictResMark, "finblkIfDid":finblkIfDid, "finblkResSel":finblkResSel,
			"finblkResMark":finblkResMark, "workHisIn":workHisIn, "workPerIn":workPerIn, "internationalResSel":internationalResSel, "internationalMark":internationalMark, "internationalIfDid":internationalIfDid,
			"ver":deliverVer, "remarks":remarkstext
		},
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
			}else{
				layer.alert(res.meta.errorInfo);
			}
			
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function changeMainRes(arr, $sel){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==2){
			$sel.val(2);
			$sel.siblings("img").attr("src", "/images/bops/report/preview/ch.png");
			$sel.parents("tr").find(".reptslct").val(1);
			$sel.parents("tr").find(".reptslct").siblings(".showtext").text("已验证");
			return;
		}
	}
	
	for(var i=0;i<arr.length;i++){
		if(arr[i]==3){
			$sel.val(3);
			$sel.siblings("img").attr("src", "/images/bops/report/preview/th.png");
			$sel.parents("tr").find(".reptslct").val(1);
			$sel.parents("tr").find(".reptslct").siblings(".showtext").text("已验证");
			return;
		}
	}
	for(var i=0;i<arr.length;i++){
		if(arr[i]!=0){
			$sel.val(1);
			$sel.siblings("img").attr("src", "/images/bops/report/preview/dh.png");
			$sel.parents("tr").find(".reptslct").val(1);
			$sel.parents("tr").find(".reptslct").siblings(".showtext").text("已验证");
			return;
		}
	}
	
	$sel.val(0);
	$sel.siblings("img").attr("src", "/images/bops/report/preview/jh.png");
	$sel.parents("tr").find(".reptslct").val(0);
	$sel.parents("tr").find(".reptslct").siblings(".showtext").text("未验证");
}

function saveIdentity(){
	var entityIdCheckRes = $("#content-sfyz-idcard-if-sel").val();
	var entityIdCheckMark = $("#idtext").text();
	var entityNameCheckRes = $("#content-sfyz-name-if-sel").val();
	var entityNameCheckMark = $("#nametext").text();
	var gender = $("#sexipt").val();
	var genderCheckRes = $("#content-sfyz-sex-if-sel").val();
	var genderCheckMark =  $("#sextext").text();
	var age = $("#ageipt").val();
	var ageCheckRes = $("#content-sfyz-age-if-sel").val();
	var ageCheckMark = $("#agetext").text();
	var hometown = $("#hometownipt").val();
	var hometownRes = $("#content-sfyz-hometown-if-sel").val();
	var hometownMark = $("#hometowntext").text();
	var birthday = $("#bornipt").val();
	var birthdayCheckRes = $("#content-sfyz-birthday-if-sel").val();
	var birthdayCheckMark = $("#borntext").text();
	var photoRes = $("#content-sfyz-photo-if-sel").val();
	var photoMark = $("#phototext").text();
	var flag = 0;
	
	var iArr = [entityIdCheckRes, entityNameCheckRes, genderCheckRes, ageCheckRes, hometownRes, birthdayCheckRes];
	$.ajax({
		url:appServer+"/bops/bgcheck/saveidentity.htm",
		type:"POST",
		async:false,
		data:JSON.stringify({"mainId":$("#ar-mainId").val(), "entityIdCheckRes":entityIdCheckRes, "entityIdCheckMark":entityIdCheckMark, "entityNameCheckRes":entityNameCheckRes,
			"entityNameCheckMark":entityNameCheckMark, "gender":gender, "genderCheckRes":genderCheckRes, "genderCheckRes":genderCheckRes,
			"genderCheckMark":genderCheckMark, "age":age, "ageCheckRes":ageCheckRes, "ageCheckMark":ageCheckMark, "hometown":hometown,
			"hometownRes":hometownRes, "hometownMark":hometownMark, "birthday":birthday, "birthdayCheckRes":birthdayCheckRes, "birthdayCheckMark":birthdayCheckMark, "photoRes":photoRes,
			"photoMark":photoMark
		}),
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
//				changeMainRes(iArr, $("#sfyz-res-s"));
			}else{
				layer.alert(res.meta.errorInfo, {icon:2});
			}
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function saveEducationCheck(){
	var schoolName = $("#schoolipt").val();
	var schoolNameRes = $("#content-xlyz-schoolname-if-sel").val();
	var schoolNameMark = $("#schooltext").text();
	var is985 = $("#ipt985").val();
	var is985Res = $("#content-xlyz-985-if-sel").val();
	var is985Mark =  $("#text985").text();
	var is211 = $("#ipt211").val();
	var is211Res = $("#content-xlyz-211-if-sel").val();
	var is211Mark = $("#text211").text();
	var studyTime = $("#studytimeipt").val();
	var studyTimeRes = $("#content-xlyz-studytime-if-sel").val();
	var studyTimeMark = $("#studytimetext").text();
	var major = $("#majoript").val();
	var majorRes = $("#content-xlyz-major-if-sel").val();
	var majorMark = $("#majortext").text();
	var type = $("#studytypeipt").val();
	var typeRes = $("#content-xlyz-type-if-sel").val();
	var typeMark = $("#studytypetext").text();
    var flag = 0;
    
    var iArr = [schoolNameRes, is985Res, is211Res, studyTimeRes, majorRes, typeRes];
	$.ajax({
		url:appServer+"/bops/bgcheck/saveducation.htm",
		type:"post",
		async:false,
		data:{"mainId":$("#ar-mainId").val(), "schoolName":schoolName, "schoolNameRes":schoolNameRes, "schoolNameMark":schoolNameMark,
			"is985":is985, "is985Res":is985Res, "is985Mark":is985Mark, "is211":is211, "is211Res":is211Res,
			"is211Mark":is211Mark, "studyTime":studyTime, "studyTimeRes":studyTimeRes, "studyTimeMark":studyTimeMark, 
			"major":major, "majorRes":majorRes, "majorMark":majorMark, "type":type, "typeRes":typeRes, "typeMark":typeMark
		},
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
//				changeMainRes(iArr, $("#xlyz-res-s"));
			}else{
				layer.alert(res.meta.errorInfo);
			}
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function saveInternationalEducationCheck(){
	var schoolName = $("#gjschoolipt").val();
	var schoolNameRes = $("#content-gjxlyz-schoolname-if-sel").val();
	var schoolNameMark = $("#gjschooltext").text();
	var studyTime = $("#gjstudytimeipt").val();
	var studyTimeRes = $("#content-gjxlyz-studytime-if-sel").val();
	var studyTimeMark = $("#gjstudytimetext").text();
	var major = $("#gjmajoript").val();
	var majorRes = $("#content-gjxlyz-major-if-sel").val();
	var majorMark = $("#gjmajortext").text();
	var type = $("#gjstudytypeipt").val();
	var typeRes = $("#content-gjxlyz-type-if-sel").val();
	var typeMark = $("#gjstudytypetext").text();
    var flag = 0;
    
    var iArr = [schoolNameRes, studyTimeRes, majorRes, typeRes];
	$.ajax({
		url:appServer+"/bops/bgcheck/saveinternationalducation.htm",
		type:"post",
		async:false,
		data:{"mainId":$("#ar-mainId").val(), "schoolName":schoolName, "schoolNameRes":schoolNameRes, "schoolNameMark":schoolNameMark,
			"studyTime":studyTime, "studyTimeRes":studyTimeRes, "studyTimeMark":studyTimeMark, 
			"major":major, "majorRes":majorRes, "majorMark":majorMark, "type":type, "typeRes":typeRes, "typeMark":typeMark
		},
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
//				changeMainRes(iArr, $("#xlyz-res-s"));
			}else{
				layer.alert(res.meta.errorInfo);
			}
			
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function saveDegreeCheck(){
	var schoolName = $("#xw-schoolipt").val();
	var schoolNameRes = $("#content-xwyz-schoolname-if-sel").val();
	var schoolNameMark = $("#xw-schooltext").text();
	var giveTime = $("#xw-givetimeipt").val();
	var giveTimeRes = $("#content-xwyz-givetime-if-sel").val();
	var giveTimeMark =  $("#xw-givetimetext").text();
	var major = $("#xw-major").val();
	var majorRes = $("#content-xwyz-major-if-sel").val();
	var majorMark = $("#xw-majortext").text();
	var type = $("#xw-typeipt").val();
	var typeRes = $("#content-xwyz-type-if-sel").val();
	var typeMark = $("#xw-typetext").text();
    var flag = 0;
    
    var iArr = [schoolNameRes, giveTimeRes, majorRes, typeRes];
    
    $.ajax({
		url:appServer+"/bops/bgcheck/savedegree.htm",
		type:"post",
		async:false,
		data:{"mainId":$("#ar-mainId").val(), "schoolName":schoolName, "schoolNameRes":schoolNameRes, "schoolNameMark":schoolNameMark,
			"giveTime":giveTime, "giveTimeRes":giveTimeRes, "giveTimeMark":giveTimeMark, 
			"major":major, "majorRes":majorRes, "majorMark":majorMark, "type":type, "typeRes":typeRes, "typeMark":typeMark
		},
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
//				changeMainRes(iArr, $("#xwyz-res-s"));
			}else{
				alert(res.meta.errorInfo);
			}
			
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function saveDriverCheck(){
	var driverNo = $("#driver-idipt").val();
	var driverNoRes = $("#content-driver-id-if-sel").val();
	var driverNoMark = $("#driver-idtext").text();
	var name = $("#driver-nameipt").val();
	var nameRes = $("#content-driver-name-if-sel").val();
	var nameMark =  $("#driver-nametext").text();
	var dstatus = $("#driver-statusipt").val();
	var dstatusRes = $("#content-driver-status-if-sel").val();
	var dstatusMark = $("#driver-statustext").text();
    var flag = 0;
    $.ajax({
		url:appServer+"/bops/bgcheck/savedriver.htm",
		type:"post",
		async:false,
		data:{"mainId":$("#ar-mainId").val(), "driverNo":driverNo, "driverNoRes":driverNoRes, "driverNoMark":driverNoMark,
			"name":name, "nameRes":nameRes, "nameMark":nameMark, "dstatus":dstatus, "dstatusRes":dstatusRes, "dstatusMark":dstatusMark
		},
		beforeSend:function(){
			loadIndex = layer.load(1);
		},
		success:function(res){
			layer.close(loadIndex);
			if(res.meta.success){
				flag = 1;
			}else{
				layer.alert(res.meta.errorInfo);
			}
			
		},
		error:function(){
			layer.close(loadIndex);
			layer.alert("网络错误！");
		}
	});
	
	if(flag==0){
		return false;
	}else{
		return true;
	}
}

function workPerInfo(){
	var gzbx = $(".gzbx-tr");
	var workPerIn = new Array();
	
	for(var i=0;i<gzbx.length;i++){
		var id = $(gzbx[i]).find(".whid").val();
		var workPerIfDid = $(gzbx[i]).find(".gzbx-name-sel").val();
		var workPerResSel = $(gzbx[i]).find(".gzbx-name-res-s").val();
		var workPerResMark = $(gzbx[i]).find(".gzbx-name-res-t").val();
		workPerIn.push(obj = {"id":id, "workPerIfDid":workPerIfDid, "workPerResSel":workPerResSel, "workPerResMark":workPerResMark});
	}
	
	return workPerIn;
}

function workHisInfo(){
	var gzly = $(".gzly-tr");
	var workHisIn = new Array();
	
	for(var i=0;i<gzly.length;i++){
		var id = $(gzly[i]).find(".whid").val();
		var workHisIfDid = $(gzly[i]).find(".gzly-name-sel").val();
		var workHisResSel = $(gzly[i]).find(".gzly-name-res-s").val();
		var workHisResMark = $(gzly[i]).find(".gzly-name-res-t").val();
		workHisIn.push(obj = {"id":id, "workHisIfDid":workHisIfDid, "workHisResSel":workHisResSel, "workHisResMark":workHisResMark});
	}
	
	return workHisIn;
}
function replaceNull(object){
	var obj = object;
	for(var o in obj){
		obj[o] = obj[o]==null?"":obj[o];
	}
	return obj;
}

function cprSel(obj1, obj2){
	if(obj1==obj2){
		return 'selected="selected"';
	}
}

function Gettext($obj){
	var txt=$obj.find("option:selected").text();
	return txt;
}
function Getvaule(obj){
	var val=$(obj).find("option:selected").val();
	return val;
}
function clic($obj){
		$btn = $obj.find(".editipt");
		$a = $obj.find("select");
		for(var i=0;i<$btn.size();i++){
			if($($btn.get(i)).siblings(".editbtn").text()=="确定"){
				$($btn.get(i)).siblings(".editbtn").click();
			}
		}
		
		for(var i=0;i<$a.size();i++){
			if($($a.get(i)).siblings("a").text()=="确定"){
				$($a.get(i)).siblings("a").click();
			}
		}
}

function delfinblk(id){
	$e = $(event.target);
	
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delfinblk.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    $e.closest(".fin-content-tr").remove();
					var i = $(".fin-content-tr").size();
					$("#finblkcount").text(i);
					if(i==0){
						$(".fin-norec").show();
						
					}
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function delPerItem(id){
	$e = $(event.target);
	layer.confirm('确定删除该记录？', {icon: 3, title:'提示'}, function(cindex){
        $.ajax({
        	url:appServer+"/bops/bgcheck/delperitem.htm",
			type:"POST",
			data:{"id":id},
            beforeSend:function(){
                loadIndex = layer.load(1);
            },
            success:function(res){
                layer.close(loadIndex);
                if(res.meta.success){
                    layer.msg("添加成功！");
                    $e.closest(".peritem").remove();
                }else{
                    layer.alert(res.meta.errorInfo, {icon:2});
                }
            },
            error:function(){
                layer.close(laodIndex);
                layer.msg('网络错误！');
            }
            
        });
    });  
}

function getMenuDetail() {
	var orderId = $("#ar-orderId").val();
	$.ajax({
		url: appServer + "/bops/bgcheck/getmenudetail.htm",
		type: "GET",
		data: {"orderId": orderId},
		success: function(res) {
			if(res.meta.success){
				var obj = res.retObj;
				$(".blt").append("<div style='border-top:1px solid #9e9e9e;margin-top:5px;'><span style='color:#999'>套餐项目：<span></div>");
				for(var i=0; i<obj.length; i++) {
					var c = "<p>"+ obj[i].surveyProject +"</p>"
					$(".blt").append(c);
				}
				
			}
		}
	});
}