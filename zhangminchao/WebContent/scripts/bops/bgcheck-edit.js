$(document).ready(function() {
	new FileUpload({
		multi : false,  // 支持单选
		formData : {
			'allowExps' : 'pdf',
			'dirPath' : 'report',
			"t" : new Date().getTime(),
			"orderId": $("#orderId").val()
		},
		fileTypeExts : 'pdf',
		acceptFiles : 'application/pdf', // 允许的过滤类型
		acceptFilesMessage : '非法后缀，请选择后缀为pdf的文件',
		validateFun : function() {
			var status = $("#orderStatus").val();
			if (status == 3 || status == 4) {
				return true;
			} else if (status == 1) {
				alert("未支付，不能上传报告");
				return false;
			} else if (status == 2) {
				alert("资料还未补充完成，不能上传报告");
				return false;
			}
		},
		onUploadStart : function(file) {
		},
		onUploadSuccess : function(data, filename) {
			var obj = jQuery.parseJSON(data);
			if (obj.errorNO != 0) {
				alert(obj.errorInfo);
			} else {
				$('#downloadReportSpan').html(filename);
				$("#reportInput").val(obj.filePath);
				$.ajax({
					url:appServer + "/bops/updateOrderReportFile.htm",
					type:"POST",
					data:{"orderId":$("#orderId").val(),"filePath":obj.filePath},
					success:function(res){
						if (res.meta.success) {
							$("#orderStatusSpan").html("已完成");
							alert("报告上传成功！");
							window.location.reload();
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
		},
		onUploadComplete : function() {
		}
	}, $("#uploadReport"));
	
	new FileUpload({
		multi : false,  // 支持单选
		formData : {
			'allowExps' : 'jpg,jpeg,gif,png',
			'dirPath' : 'report',
			"t" : new Date().getTime(),
			"orderId": $("#orderId").val()
		},
		fileTypeExts : 'jpg,jpeg,gif,png',
		acceptFiles : 'image/jpeg,image/gif,image/png', // 允许的过滤类型
		acceptFilesMessage : '非法后缀，请选择图片',
		validateFun : function() {
			var status = $("#orderStatus").val();
			if (status == 3 || status == 4) {
				return true;
			} else if (status == 1) {
				alert("未支付，不能更改");
				return false;
			} else if (status == 2) {
				alert("资料还未补充完成，不能更改");
				return false;
			}
		},
		onUploadStart : function(file) {
		},
		onUploadSuccess : function(data, filename) {
			var obj = jQuery.parseJSON(data);
			if (obj.errorNO != 0) {
				alert(obj.errorInfo);
			} else {
				$('#downloadReportSpan').html(filename);
				$("#reportInput").val(obj.filePath);
				$.ajax({
					url:appServer + "/bops/replaceglobaldip.htm",
					type:"POST",
					data:{"orderId":$("#orderId").val(),"filePath":obj.filePath},
					success:function(res){
						if (res.meta.success) {
							$("#orderStatusSpan").html("已完成");
							alert("替换成功！");
							window.location.reload();
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
		},
		onUploadComplete : function() {
		}
	}, $("#replaceglobaldip"));
	
	$("#downloadReport").on("click", function(){
		var path = $("#reportInput").val();
		if (!path && $("#orderStatusSpan").text()!="秒出报告") {
			alert("文件不存在无法下载");
			return false;
		}else if($("#orderStatusSpan").text()=="秒出报告"){
			$.ajax({
				url:appServer+"/bops/createfreecheckreport.htm",
				async:false,
				type:"POST",
				data:{"orderId":$("#orderId").val()},
				success:function(res){
					if(res.meta.success){
						path = res.data;
						var name = path.substring(path.lastIndexOf("/")).replace("/","");
						$("#downloadReportSpan").text(name);
					}else{
						path = '';
					}
				}
			});
		}
		 var url = appServer + "/common/component/FileDownload.htm";
         url += "?relativePath=" + encodeURIComponent(encodeURIComponent(path));
         window.open(url, "_blank", "");
	});
	
	$("#setReportNotSafe").on("click", function(){
		var orderId = $("#orderId").val();
		
		if (window.confirm("确认设置报告为异常吗？")) {
			$.ajax({
				url:appServer + "/bops/updateOrderCredibility.htm",
				type:"POST",
				data:{"orderId":orderId, "credibility": 2},
				success:function(res){
					if (res.meta.success) {
						alert("报告异常设置成功！");
						window.location.reload();
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

		return false;
	});
	
	$("#setSurveying").on("click", function(){
		var orderCode = $("#orderCode").val();
		
		if (window.confirm("确认设置此订单为调查中？")) {
			$.ajax({
				url:appServer + "/bops/user/setSurveying.htm",
				type:"POST",
				data:{"orderCode":orderCode},
				success:function(res){
					if (res.meta.success) {
						alert("操作成功！");
						window.location.reload();
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

		return false;
	});
	
	$("#setReportSafe").on("click", function(){
		var orderId = $("#orderId").val();
		
		if (window.confirm("确认设置报告为安全吗？")) {
			$.ajax({
				url:appServer + "/bops/updateOrderCredibility.htm",
				type:"POST",
				data:{"orderId":orderId, "credibility": 1},
				success:function(res){
					if (res.meta.success) {
						alert("报告安全设置成功！");
						window.location.reload();
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

		return false;
	});
	
	$("#downloadResume").on("click", function(){
		var path = $(this).attr("data-code");
		if (!path) {
			alert("文件不存在无法下载");
			return false;
		}
		 var url = appServer + "/common/component/FileDownload.htm";
         url += "?relativePath=" + encodeURIComponent(encodeURIComponent(path));
         window.open(url, "_blank", "");
	});
	
	$("#previewResume").on("click",function(){
		var rid = $(this).attr("data-code");
		if (!rid) {
			alert("文件不存在无法下载");
			return false;
		}
		var url = appServer + "/bops/resume/preview.htm?resumeId="+rid;
		window.open(url, "_blank", "");
	});
	
	$("#uploadSurveyUser").on("click", function() {
		var code = $(this).attr("data-code");
		var surveryId = $(this).attr("data-surveyId");
		window.open(appServer +"/my/adminUpload.htm?code="+code+"&surveryId="+surveryId);
	});
	
	$("#recreateReport").on("click",function(){
		if(confirm("确定重新制作报告?")){
			var orderId = $("#orderId").val();
			$.ajax({
				url:appServer+"/bops/bgcheck/recreate.htm",
				type:"POST",
				data:{"orderId":orderId},
				success:function(res){
					if(res.meta.success){
						alert("重置完成！");
					}else{
						alert(res.meta.errorInfo);
					}
				},
				error:function(){
					alert("网络错误！");
				}
			});
		}
	})
	
	$("#editFreeReport").on("click",function(){
		var orderId = $("#orderId").val();
		$.ajax({
			url:appServer + "/bops/findfreecheckresult.htm",
			type:"POST",
			data:{"orderId":orderId},
			success:function(res){
				if (res.meta.success) {
					console.log(res.retObj);
					var fcr = res.retObj.fcr;
					var su = res.retObj.su;
					var gen = res.retObj.gender==1?'男':'女';
					str = "<div>" +
								"<table style='margin-left:auto;margin-right:auto;width:650px;border-collapse:separate;border-spacing:10px;'>" +
									"<tr>" +
										"<th style='float:right'>委托方：</th>"+
										"<td><input id='company' value='"+fcr.company+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>候选人姓名：</th>"+
										"<td>"+su.name+"</td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>候选人性别：</th>"+
										"<td>"+gen+"</td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>候选人籍贯：</th>"+
										"<td>"+res.retObj.cityName+"</td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>候选人身份证：</th>"+
										"<td>"+su.idCard+"</td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-身份证号：</th>"+
										"<td><input id='fcrid' value='"+(fcr.identityId==null?'':fcr.identityId)+"' maxlength='18'></td>"+
										"<td><select id='identityIdMatch' >" ;
										if(fcr.identityIdMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th>备注：</th>"+
										"<td><input id='identityIdMark' value='"+(fcr.identityIdMark==null?'':fcr.identityIdMark)+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-入学时间：</th>"+
										"<td><input id='fcrenroll' value='"+(fcr.enrollDate==null?'':fcr.enrollDate)+"' maxlength='8'></td>"+
										"<td rowspan='2'><select id='studyDateMatch'>";
										if(fcr.studyDateMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th rowspan='2'>备注：</th>"+
										"<td rowspan='2'><input id='fcrstudyDateMark' value='"+(fcr.studyDateMark==null?'':fcr.studyDateMark)+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-毕业时间：</th>"+
										"<td><input id='fcrgraduate' value='"+(fcr.graduateDate==null?'':fcr.graduateDate)+"' maxlength='8'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-毕业院校：</th>"+
										"<td><input id='fcrschool' value='"+(fcr.schoolName==null?'':fcr.schoolName)+"'></td>"+
										"<td><select id='schoolNameMatch'>";
										if(fcr.schoolNameMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th>备注：</th>"+
										"<td><input id='schoolNameMark' value='"+(fcr.schoolNameMark==null?'':fcr.schoolNameMark)+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-学习专业：</th>"+
										"<td><input id='fcrmajor' value='"+(fcr.major==null?'':fcr.major)+"'></td>"+
										"<td><select id='majorMatch'>";
										if(fcr.majorMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th>备注：</th>"+
										"<td><input id='majorMark' value='"+(fcr.majorMark==null?'':fcr.majorMark)+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-学历类型：</th>"+
										"<td><input id='fcredutype' value='"+(fcr.educationType==null?'':fcr.educationType)+"'></td>"+
										"<td><select id='educationTypeMatch'>";
										if(fcr.educationTypeMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th>备注：</th>"+
										"<td><input id='educationTypeMark' value='"+(fcr.educationTypeMark==null?'':fcr.educationTypeMark)+"'></td>"+
									"</tr>"+
									"<tr>" +
										"<th style='float:right'>查询结果-学历层次：</th>"+
										"<td><input id='fcredu' value='"+(fcr.education==null?'':fcr.education)+"'></td>"+
										"<td><select id='educationMatch'>";
										if(fcr.educationMatch==0){
											str+="<option value='0' selected='true'>不匹配</option>";
											str+="<option value='1'>匹配</option>";
										}else{
											str+="<option value='0'>不匹配</option>";
											str+="<option value='1' selected='true'>匹配</option>"
										}
										str+="</select></td>"+
										"<th>备注：</th>"+
										"<td><input id='educationMark' value='"+(fcr.educationMark==null?'':fcr.educationMark)+"'></td>"+
									"</tr>"+
								"</table>"+
							"</div>";
					hrHuTui.popout({
						width:700,
						title:'编辑报告',
						content:str,
						btn:"okcancel",
						onOk:function(callback){
							if(confirm("确定修改？")){
								var company = $("#company").val();
								var identityId = $("#fcrid").val();
								var identityIdMark = $("#identityIdMark").val();
								var enrollDate = $("#fcrenroll").val();
								var graduateDate = $("#fcrgraduate").val();
								var studyDateMark = $("#fcrstudyDateMark").val();
								var schoolName = $("#fcrschool").val();
								var schoolNameMark = $("#schoolNameMark").val();
								var major = $("#fcrmajor").val();
								var majorMark = $("#majorMark").val();
								var educationType = $("#fcredutype").val();
								var educationTypeMark = $("#educationTypeMark").val();
								var education = $("#fcredu").val();
								var educationMark = $("#educationMark").val();
								var identityIdMatch = $("#identityIdMatch").val();
								var studyDateMatch = $("#studyDateMatch").val();
								var schoolNameMatch = $("#schoolNameMatch").val();
								var majorMatch = $("#majorMatch").val();
								var educationTypeMatch = $("#educationTypeMatch").val();
								var educationMatch = $("#educationMatch").val();
								
								if(company==""){
									alert("请输入委托方名称！");
									return false;
								}
								
								$.ajax({
									url: appServer+"/bops/editfreecheckresult.htm",
									type:"POST",
									data:{"company":company,"identityId":identityId,"identityIdMark":identityIdMark,
										"enrollDate":enrollDate,"graduateDate":graduateDate,"studyDateMark":studyDateMark,
										"schoolName":schoolName,"schoolNameMark":schoolNameMark,"major":major,"majorMark":majorMark,
										"educationType":educationType,"educationTypeMark":educationTypeMark,"education":education,"educationMark":educationMark,
										"orderId":orderId,"id":fcr.id,"identityIdMatch":identityIdMatch,"studyDateMatch":studyDateMatch,"schoolNameMatch":schoolNameMatch,
										"majorMatch":majorMatch,"educationTypeMatch":educationTypeMatch,"educationMatch":educationMatch
										},
									success:function(res){
										if(res.meta.success){
											alert("修改成功！");
										}else{
											alert("操作失败！");
										}
									}
								});
								
								
							}else{
								alert("未修改！");
							}
						}
					});
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
	});
	
	$("#checkAuditHis").on("click", function(){
		$.ajax({
			url: appServer + "/bops/bgcheck/checkorderaudithis.htm",
			type: "GET",
			data: {"id": $("#orderId").val()},
			success:function(res){
				if(res.meta.success){
					var list = res.retObj;
					var str = "";
					if(list!=null){
						for(var i=0; i<list.length; i++){
							str += "<div style='margin:0 20px;border-bottom:1px solid #eee;padding:5px 0;'><div><span style='color:#f00;'>版本："+ list[i].ver +"</span>"+
							"<span style='padding-left:10px;'>";
								
								if(list[i].auditResult == 20){
									str += "审核通过,待发布";
								}else if(list[i].auditResult == 30){
									str += "审核未通过";
								}else if(list[i].auditResult == 40){
									str += "已发布";
								}else if(list[i].auditResult == 50){
									str += "发布审核不通过，退回修改";
								}
								str += "</span><span style='margin-left:10px;'>"+ parseTime(list[i].createTime) + "</span></div>";
								if(list[i].auditDetail != null){
									str += "<div style='margin-top:10px;'><div style='color:#f00;'>审核意见：</div><div>"+ list[i].auditDetail +"</div></div>";
								}
								str += "</div>"
						}
						
						layer.open({
						            type:1,
						            title:'报告审核记录',
						            btn:['确定', '取消'],
						            area:['600px', "400px"],
						            content:str
						        });   
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
	
	$("#resendmessage").on("click", function(){
		$this = $(this);
		var code = $("#getOrderCode").text();
    	var userName = $("#uname span").text();
    	var userMobile=$("#umobile").text();
    	var userEmail=$("#uemail").text();
    	var userCompany1=$("#ucompany1").text();
    	var company_all = $(".authcontent");
    	var str ="";
    	$(".authcontent").each(function(index){
    		$(this).text();
    		
    		str += "<tr><td align='right' width='30%'>公司全称" + (index+1) + "：</td><td align='left'><input class='again' id='" + $(this).attr("id") + "' style='height: 22px;' type='text' value='"+ $(this).text() +"'></td></tr>";
    		
    	});
    	

    	var ct = "<table width='100%'><tbody>" +
    			"<tr><td align='right' width='30%'>姓名：</td><td id='name'>"+userName+"</td></tr>" +
    			"<tr><td align='right' width='30%'>手机(hr输入)：</td><td align='left'><input id='pp' style='height: 22px;' type='text' value='"+userMobile+"'></td></tr>" +
    			"<tr><td align='right' width='30%'>邮箱(hr输入)：</td><td align='left'><input id='sp' style='height: 22px;' type='text' value='"+userEmail+"'></td></tr>" +
    			str +
    			"<tr><td align='right' width='30%'><input type='checkbox' id='checkemail' name='checkss'  value='"+1+"'>重发邮件</input></td><td align='left'></td></tr>"+
    			"<tr><td align='right' width='30%'><input type='checkbox' id='checkedmobile' name='checksss' value='"+1+"'>重发短信</input></td><td align='left'></td></tr>"+
    			"</tbody></table>";
		layer.open({
    		title:"重发授权链接",
    		type: 1,
    		shift: 3,
			area : ['400px' , '400px'],
    		btn:['确定', '取消'],
    		content:ct,
    		yes:function(index){
    			var mobile = $("#pp").val() || "";
    			var email = $("#sp").val() || "";
    			var checkemail = $("input:checkbox[name=checkss]:checked").val() || 0; 
    			var checkedmobile = $("input:checkbox[name=checksss]:checked").val() || 0;
    			var companyNames = "";
    			var companyIds = "";	
    			$(".again").each(function(index){
    				if(index != 0){
    					companyNames += ",";
    					companyIds += ",";
    				}
    	    		companyIds += $(this).attr("id");
    	    		companyNames += $(this).val();
    	    	});
    			if(checkemail == 1 && email == ""){
    				layer.alert('邮箱不能为空！');
    				return;
    			}
    			
    			if(checkedmobile == 1 && mobile == ""){
    				layer.alert('手机不能为空！');
    				return;
    			}
    			if(checkemail != 1  && checkedmobile != 1 ) {
    				layer.alert('发送短信和发送邮箱必须选择一个！');
    				return;
    			}
    			var loadIndex;
    			layer.confirm('确定发送？', {icon: 7, title:'提示'}, function(cindex){ 
    				$.ajax({
        				url:appServer+'/bops/resendAcq.htm',
        				type:"POST",
        				data:{ "code" : code, "mobile" :mobile, "email":email,"checkemail" : checkemail,"checkedmobile" :checkedmobile , "companyNames":companyNames,"companyIds":companyIds},
        				beforeSend:function(){
        					loadIndex = layer.load(1);
        				},
        				success:function(res){
        					layer.close(loadIndex);
        					if(res.meta.success){
        						layer.msg("发送成功！");
        						layer.close(index);
        						location.reload();
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
	
	
	$("#getAuthContent").on("click", function(){
		var code = $("#getOrderCode").text();
		$.ajax({
			url:appServer+'/bops/getauthcontent.htm',
        				type:"GET",
        				data:{ "code":code},
        				success:function(res){
        					var su=res.retObj.su;
        					var ct = "<table width='100%'><tbody>" +
        					"<tr><td align='right' width='30%'>姓名：</td><td id='name'>"+su.name+"</td></tr>" +
        					"<tr><td align='right' width='30%'>手机号：</td><td id='name'>"+su.mobile+"</td></tr>" +
        					"<tr><td align='right' width='30%'>邮箱：</td><td id='name'>"+su.email+"</td></tr>"+
        	    			"</tbody></table>";
        					layer.open({
        			    		title:"重发授权链接",
        			    		type: 1,
        			    		shift: 3,
        						area : ['400px' , '400px'],
        			    		btn:['确定', '取消'],
        			    		content:ct
        			    	});
        				},
        				error:function(){
        					layer.close(laodIndex);
        					layer.msg('网络错误！');
        				}
		})
		/*layer.open({
    		title:"重发授权链接",
    		type: 1,
    		shift: 3,
			area : ['400px' , '400px'],
    		btn:['确定', '取消'],
    		content:ct,
    		yes:function(index){
    			var mobile = $("#pp").val() || "";
    			var email = $("#sp").val() || "";
    			var companyname = $("#companyname").val() || "";
    			var checkemail = $("input:checkbox[name=checkss]:checked").val() || 0; 
    			var checkedmobile = $("input:checkbox[name=checksss]:checked").val() || 0;
    			var name=$("#name").text() || "";
    			if(checkemail == 1 && email == ""){
    				layer.alert('邮箱不能为空！');
    				return;
    			}
    			
    			if(checkedmobile == 1 && mobile == ""){
    				layer.alert('手机不能为空！');
    				return;
    			}
    			if(checkemail != 1  && checkedmobile != 1 ) {
    				layer.alert('发送短信和发送邮箱必须选择一个！');
    				return;
    			}
    			var loadIndex;
    			layer.confirm('确定发送？', {icon: 7, title:'提示'}, function(cindex){
    				$.ajax({
        				url:appServer+'/bops/resendAcq.htm',
        				type:"POST",
        				data:{ "code" : code, "mobile" :mobile, "email":email, "companyname" : companyname,"checkemail" : checkemail,"checkedmobile" :checkedmobile , "name" :name},
        				beforeSend:function(){
        					loadIndex = layer.load(1);
        				},
        				success:function(res){
        					layer.close(loadIndex);
        					if(res.meta.success){
        						layer.msg("发送成功！");
        						layer.close(index);
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
    		
    	});*/
	});
	$("#editbtn-name").live("click",function(){
		var username=$("#uname span");
		var btn=$("#editbtn-name");
		var ipt=$("#editinp-name");
		if(btn.text() == '编辑'){
			username.hide();
			ipt.val(username.text().trim());
			ipt.show();
			btn.text("确定");
		}else if(btn.text() == "确定"){
			var orderId=$("#orderId");
			var ipt=$("#editinp-name").val();
			
			layer.confirm('确定修改？', {title:'提示'}, function(cindex){ 
				$.ajax({
					url:appServer+'/bops/bgcheck/eidtSurveyUserName.htm',
					type:"POST",
					data:{"name":ipt,"orderId":orderId.val()},
					success:function(res){
						if(res.meta.success){
							layer.msg("更新成功！");
							location.reload();
						}else{
							layer.alert(res.meta.errorInfo, {icon:2});
						}
					},
					error:function(){
						layer.close(laodIndex);
						layer.msg('网络错误！');
					}
					
				});
			})
			
			
		}
		
		
		
	});
	
	$("#interdimensioncheck").on("click", function(){
		$.ajax({
			url: appServer + "/bops/bgcheck/checkinterdimensioncheck.htm",
			type: "GET",
			data: {"id": $("#orderId").val()},
			success: function(res) {
				if(res.meta.success) {
					var obj = res.retObj;
					var ctt = "<table><tbody>";
					if(obj != null) {
						for(var i=0; i<obj.length; i++) {
							ctt += "<tr><td>"+ obj[i].title +"</td></tr>";
						}
					}
								
					ctt += "</tbody></table>";
					layer.tips(ctt, "#regulardimensioncheck", {
                        tips: [2, '#4898d5'],
                        area: ['300px'],
                        time: 5000
                      });
				} else {
					
				}
			},
			error: function() {
				layer.msg("网络错误");
			}
		});
	});
	
	$("#regulardimensioncheck").on("click", function(){
		$.ajax({
			url: appServer + "/bops/bgcheck/checkregulardimensioncheck.htm",
			type: "GET",
			data: {"id": $("#orderId").val()},
			success: function(res) {
				if(res.meta.success) {
					var obj = res.retObj;
					var ctt = "<table><tbody>";
					if(obj != null) {
						for(var i=0; i<obj.length; i++) {
							ctt += "<tr><td>"+ obj[i].title +"</td></tr>";
						}
					}
								
					ctt += "</tbody></table>";
					layer.tips(ctt, "#regulardimensioncheck", {
                        tips: [2, '#4898d5'],
                        area: ['300px'],
                        time: 5000
                      });
				} else {
					layer.msg(res.meta.errorInfo);
				}
			},
			error: function() {
				layer.msg("网络错误");
			}
		});
	});
});


