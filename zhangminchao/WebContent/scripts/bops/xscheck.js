$(function(){
	
	$('.ui-choose').ui_choose();    
	
	$("#bk-btn-ok").on("click",function(){
		//var name = $("#nameipt").val();
		//var idCard = $("#idcardipt").val();
		var option = $("#uc_04").val();
		
		if(option==null){
			layer.alert("请选择查询项！", {icon:7});
			return;
		}
//		
//		if(name==null||name==""){
//			layer.alert("请输入姓名！", {icon:7});
//			return;
//		}
//		
//		if(idCard==null||idCard==""){
//			layer.alert("请输入身份证！", {icon:7});
//			return;
//		}
		
		if(!canSub()){
			layer.alert("请输入完整表单！", {icon:7});
			return;
		}
		var iptArr = $(".xs-checkframediv input");
		var obj = {};
		for(var i=0; i<iptArr.length; i++){
			var name = iptArr[i].id;
			obj[name] = iptArr[i].value;
		}
		obj["option"] = JSON.stringify(option);
		layer.confirm('确定查询?', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/bkcheck/xscheck.htm',
                type:"POST",
                data:obj,
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("查询成功！");
                        var obj = res.retObj;
                        $(".bk-table").hide();
                    	$(".p2pson").remove();
                        for(var i=0;i<option.length;i++){
                        	var a = option[i];
                        	showView(a,obj);
                        }
                        $(".bk-result").show();
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
	
	$("#bk-btn-reset").on("click", function(){
		$(".ui-choose").find("li").attr("class", "");
		$(".xs-checkframediv input").val("");
		$("#uc_04").val("");
		$(".hideoption").hide();
		for(var key in divcount){
			divcount[key] = 0;
		}
	});
	
	$(".choose-type-right li").live("click", function(){
		var v = $(this).attr("data-value");
		if($(this).attr("class") == "selected"){
			showDiv(v);
		}else{
			displayDiv(v);
		}
		
	});
	
	$("#airplanesele").change(function(){
		var v = $(this).val();
		if(v!=""){
			$("#airplanemonth").val(v);
		}
	});
});

function showView(a, obj){
	
	if(a==1){
		if(obj.identityCode==0){
			var data = obj.identity;
			$("#bk-info-name").text(data.idCardName);
			$("#bk-info-id").text(data.idCardCode);
			$("#bk-info-gender").text(data.gender);
			$("#bk-info-birthcity").text(data.city);
			$(".bk-baseinfo").show();
		}else{
			$("#identity-errinfo").text(obj.identity);
			$(".bk-nullinfo").show();
		}
	}else if(a==0){
		if(obj.eduCode==0){
			var eduinfo = obj.edu;
			$("#bk-edu-schname").text(eduinfo.graduate);
			$("#bk-edu-major").text(eduinfo.specialityName);
			$("#bk-edu-edu").text(eduinfo.educationDegree);
			$("#bk-edu-edutype").text(eduinfo.studyStyle);
			$("#bk-edu-enroll").text(eduinfo.enrolDate);
			$("#bk-edu-grad").text(eduinfo.graduateTime);
			$("#bk-edu-status").text(eduinfo.studyResult);
			$("#bk-edu-photo").attr("src", "data:img/jpg;base64,"+eduinfo.photo);
			$(".bk-education").show();
		}else{
			$("#eduinfo").text(obj.edu);
			$(".bk-noeducation").show();
		}
	}else if(a==3){
		if(obj.p2pCode==0){
			var p = obj.p2p;
			for(var j=0;j<p.length;j++){
				var pp = p[j];
				str = "<tr class='p2pson'><td>"+replaceNull(pp.loanAmount)+"</td>" +
				"<td>"+replaceNull(pp.loanDate)+"</td>"+
				"<td>"+replaceNull(pp.overAmount)+"</td>"+
				"<td>"+replaceNull(pp.publishDate)+"</td>"+
						"</tr>";
				$(".bk-finblack").find(".tb-content-title").after(str);
			}
			$(".bk-finblack").show();
		}else{
			$("#finblkerr").text(obj.p2p);
			$(".bk-finblackerror").show();
		}
	}else if(a==4){
		$(".creditValidtr").remove();
		if(obj.creditValidCode == 0){
			var c = obj.creditValid;
			var s = "";
			if(c.status == "1"){
				s = "有效";
			}else if(c.status == "2"){
				s = "无效";
			}else{
				s = "未知";
			}
			var str = "<tr class='creditValidtr'>" 
					+ "<td>"+ c.creditNo +"</td>" 
					+ "<td>"+ c.name +"</td>" 
					+ "<td>"+ s +"</td>" +
					"</tr>";
			$(".bk-creditvalid").append(str);
		}else{
			var str = "<tr class='creditValidtr' >" +
							"<td colspan='3'>" + obj.creditValid + "</td>"+
						"</tr>";
			$(".bk-creditvalid").append(str);
		}
		
		$(".bk-creditvalid").show();
	}else if(a == 5){
		$(".mobiletr").remove();
		if(obj.mobileCode == 0){
			var r = obj.mobile;
			var s = "";
			if(r.code == "00"){
				s = "一致";
			}else if(r.code == "01"){
				s = "不一致";
			}else{
				s = "库中无此号码";
			}
			var str = "<tr class='mobiletr'>" 
				+ "<td>"+ r.name +"</td>" 
				+ "<td>"+ r.idCard +"</td>" 
				+ "<td>"+ r.mobile +"</td>" 
				+ "<td>"+ s + "</td>"+
				"</tr>";
			$(".bk-mobile").append(str);
		}else{
			var str = "<tr class='mobiletr' >" +
						"<td colspan='4'>" + obj.mobile + "</td>"+
						"</tr>";
			$(".bk-mobile").append(str);
		}
		$(".bk-mobile").show();
	}else if(a == 6){
		$(".airplanetr").remove();
		if(obj.airpalneCode == 0){
			var r = obj.airplane;
			var str = "";
			for(var key in r){
				str += "<tr class='airplanetr'>" 
					+ "<td>"+ airp[key] +"</td>" 
					+ "<td>"+ r[key] +"</td>"
					+ "</tr>";
			}
			 
			$(".bk-airplane").append(str);
		}else{
			var str = "<tr class='airplanetr' >" +
						"<td colspan='2'>" + obj.airplane + "</td>"+
						"</tr>";
			$(".bk-airplane").append(str);
		}
		$(".bk-airplane").show();
	}else if(a == 7){
		$(".unionpaytr").remove();
		if(obj.unionPayCode == 0){
			var r = obj.unionPay;
			var str = "<tr class='unionpaytr'>" +
						"<td>"+ r.accountNo +"</td>"+
						"<td>"+ r.name +"</td>"+
						"<td>"+ r.identityCard +"</td>"+
						"<td>"+ r.bankPreMobile +"</td>"+
						"<td>"+ r.result +"</td>"+
					"</tr>";
			
			$(".bk-unionpay").append(str);
		}else{
			var str = "<tr class='unionpaytr'>" +
			"<td colspan='5'>" + obj.unionPay + "</td>"+
			"</tr>";
			
			$(".bk-unionpay").append(str);
		}
		$(".bk-unionpay").show();
	}else if(a == 8){
		$(".accounttr").remove();
		if(obj.airpalneCode == 0){
			var r = obj.accountant;
			var str = "";
			for(var i=0;i<r.length;i++){
				str += "<tr class='accounttr'>"
				+ "<td>"+ r[i].area +"</td>"
				+ "<td>"+ r[i].level +"</td>"
				+ "<td>"+ r[i].birthday +"</td>"
				+ "<td><img src='data:img/jpg;base64,"+ r[i].image +"' width='170'></td>"
				+ "<td>"+ r[i].year +"</td>"
				+ "<td>"+ r[i].idCard +"</td>"
				+ "<td>"+ r[i].sex +"</td>"
				+ "<td>"+ r[i].name +"</td>"
				+ "<td>"+ r[i].examNo +"</td>"
				+ "<td>"+ r[i].certNo +"</td>"
				+ "</tr>";
			}
			
			$(".bk-accountant").append(str);
		}else{
			var str = "<tr class='accounttr' >" +
						"<td colspan='10'>" + obj.accountant + "</td>"+
						"</tr>";
			$(".bk-accountant").append(str);
		}
		$(".bk-accountant").show();
	}else if(a == 9){
		$(".trademarktr").remove();
		if(obj.trademarkCode == 0){
			var r = obj.trademark;
			var str = "";
			for(var i=0;i<r.length;i++){
				str += "<tr class='trademarktr'>"
				+ "<td>"+ r[i].regno +"</td>"
				+ "<td>"+ r[i].catalog +"</td>"
				+ "<td>"+ r[i].name +"</td>"
				+ "<td>"+ r[i].applicant +"</td>"
				+ "<td>"+ r[i].state +"</td>"
				+ "<td><img src='"+ r[i].image +"' width='170'></td>"
				+ "</tr>";
			}
			
			$(".bk-trademark").append(str);
		}else{
			var str = "<tr class='trademarktr' >" +
						"<td colspan='6'>" + obj.trademark + "</td>"+
						"</tr>";
			$(".bk-trademark").append(str);
		}
		$(".bk-trademark").show();
	}else if(a == 10){
		$(".patenttr").remove();
		if(obj.patentCode == 0){
			var r = obj.patent;
			var str = "";
			for(var i=0;i<r.length;i++){
				str += "<tr class='patenttr'>"
				+ "<td>"+ r[i].title +"</td>"
				+ "<td>"+ r[i].type +"</td>"
				+ "<td>"+ r[i].state +"</td>"
				+ "<td>"+ r[i].appNo +"</td>"
				+ "<td>"+ r[i].appDate +"</td>"
				+ "<td>"+ r[i].publishDate+"</td>"
				+ "<td>"+ r[i].publishNo+"</td>"
				+ "<td>"+ r[i].applicant+"</td>"
				+ "<td>"+ r[i].catNo+"</td>"
				+ "<td>"+ r[i].priority+"</td>"
				+ "<td>"+ r[i].summary+"</td>"
				+ "</tr>";
			}
			
			$(".bk-patent").append(str);
		}else{
			var str = "<tr class='patenttr' >" +
						"<td colspan='11'>" + obj.patent + "</td>"+
						"</tr>";
			$(".bk-patent").append(str);
		}
		$(".bk-patent").show();
	}else if(a == 11){
		$(".softwaretr").remove();
		if(obj.softwareCode == 0){
			var r = obj.software;
			var str = "";
			for(var i=0;i<r.length;i++){
				str += "<tr class='softwaretr'>"
				+ "<td>"+ r[i].regNo +"</td>"
				+ "<td>"+ r[i].catNo +"</td>"
				+ "<td>"+ r[i].fullName +"</td>"
				+ "<td>"+ r[i].briefName +"</td>"
				+ "<td>"+ r[i].version +"</td>"
				+ "<td>"+ r[i].owner+"</td>"
				+ "<td>"+ r[i].publishDate+"</td>"
				+ "<td>"+ r[i].regDate+"</td>"
				+ "</tr>";
			}
			
			$(".bk-software").append(str);
		}else{
			var str = "<tr class='softwaretr'>" +
						"<td colspan='8'>" + obj.softerware + "</td>"+
						"</tr>";
			$(".bk-software").append(str);
		}
		$(".bk-software").show();
	}else if(a == 12){
		if(obj.conflictCode == 0){
			var con = obj.conflict;
			var shaList = con.shaList;
			var frList = con.frList;
			var manaList = con.manaList;
			if(shaList!=null && shaList.length!=0){
				var str = "";
				for(var i=0;i<shaList.length;i++){
					str += "<tr class='shatr'>"
					+ "<td>"+ shaList[i].ryName +"</td>"
					+ "<td>"+ shaList[i].entName +"</td>"
					+ "<td>"+ shaList[i].regNo +"</td>"
					+ "<td>"+ shaList[i].entType +"</td>"
					+ "<td>"+ shaList[i].regCap +"</td>"
					+ "<td>"+ shaList[i].regCapCur+"</td>"
					+ "<td>"+ shaList[i].entStatus+"</td>"
					+ "<td>"+ shaList[i].subConAm+"</td>"
					+ "<td>"+ shaList[i].currency+"</td>"
					+ "</tr>";
				}
				$(".shatr").remove();
				$(".bk-sha").append(str);
			}else{
				var str = "<tr class='shatr'>" +
				"<td colspan='9'>无记录</td>"+
				"</tr>";
				$(".shatr").remove();
				$(".bk-sha").append(str);
			}
			
			if(frList!=null && frList.length!=0){
				var str = "";
				for(var i=0;i<frList.length;i++){
					str += "<tr class='frtr'>"
					+ "<td>"+ frList[i].ryName +"</td>"
					+ "<td>"+ frList[i].entName +"</td>"
					+ "<td>"+ frList[i].regNo +"</td>"
					+ "<td>"+ frList[i].entType +"</td>"
					+ "<td>"+ frList[i].regCap +"</td>"
					+ "<td>"+ frList[i].regCapCur+"</td>"
					+ "<td>"+ frList[i].entStatus+"</td>"
					+ "</tr>";
				}
				$(".frtr").remove();
				$(".bk-fr").append(str);
			}else{
				var str = "<tr class='frtr'>" +
				"<td colspan='7'>无记录</td>"+
				"</tr>";
				$(".frtr").remove();
				$(".bk-fr").append(str);
			}
			
			if(manaList!=null && manaList.length!=0){
				var str = "";
				for(var i=0;i<manaList.length;i++){
					str += "<tr class='manatr'>"
					+ "<td>"+ manaList[i].ryName +"</td>"
					+ "<td>"+ manaList[i].entName +"</td>"
					+ "<td>"+ manaList[i].regNo +"</td>"
					+ "<td>"+ manaList[i].entType +"</td>"
					+ "<td>"+ manaList[i].regCap +"</td>"
					+ "<td>"+ manaList[i].regCapCur+"</td>"
					+ "<td>"+ manaList[i].entStatus+"</td>"
					+ "<td>"+ manaList[i].position+"</td>"
					+ "</tr>";
				}
				$(".manatr").remove();
				$(".bk-mana").append(str);
			}else{
				var str = "<tr class='manatr'>" +
				"<td colspan='8'>无记录</td>"+
				"</tr>";
				$(".manatr").remove();
				$(".bk-mana").append(str);
			}
			
		}else{
			var str1 = "<tr class='shatr'>" +
			"<td colspan='9'>"+ obj.conflict +"</td>"+
			"</tr>";
			var str2 = "<tr class='frtr'>" +
			"<td colspan='7'>"+ obj.conflict +"</td>"+
			"</tr>";
			var str3 = "<tr class='manatr'>" +
			"<td colspan='8'>"+ obj.conflict +"</td>"+
			"</tr>";
			$(".manatr").remove();
			$(".frtr").remove();
			$(".shatr").remove();
			
			$(".bk-sha").append(str1);
			$(".bk-fr").append(str2);
			$(".bk-mana").append(str3);
		}
		$(".bk-sha").show();
		$(".bk-fr").show();
		$(".bk-mana").show();
	}else if(a == 13){
		$(".perbadinfo").remove();
		if(obj.perBadInfoCode == 0){
			var r = obj.perBadInfo;
			var str = "";
			$("#bk-perbad-name").text(r.name);
			$("#bk-perbad-id").text(r.idCard);
			$("#bk-perbad-res").text(replaceNull(r.comparisonResult));
			var str = "";
			for(var i=0; i<r.caseTime.length; i++){
				str += r.caseTime[i] + "<br>";
			}
			$("#bk-perbad-caseTime").append(str);
			$(".bk-perbadinfo").show();
			$(".bk-perbadnullinfo").hide();
		}else{
			$("#perbadinfo-errinfo").text(obj.perBadInfo);
			$(".bk-perbadnullinfo").show();
			$(".bk-perbadinfo").hide();
		}
		
	}
	
}

function replaceNull(obj){
	return obj==null?"无":obj;
}

function canSub(){
	for (var key in divcount){
	   if(divcount[key]!=0){
		   if($("#" + key).find("input").val()==""){
			   return false;
		   }
	   }
	}
	return true;
}

function showDiv(code){
	for(var i=0; i<div.length; i++){
		if(div[i].code == code){
			var l = div[i].divlist;
			for(var j=0; j<l.length; j++){
				if(divcount[l[j]]==0){
					$("#"+l[j]).show();
				}
				divcount[l[j]] += 1;
			}
		}
	}
}

function displayDiv(code){
	for(var i=0; i<div.length; i++){
		if(div[i].code == code){
			var l = div[i].divlist;
			for(var j=0; j<l.length; j++){
				if(divcount[l[j]]!=0){
					divcount[l[j]] -= 1;
					if(divcount[l[j]] == 0){
						$("#"+l[j]).hide();
					}
				}
			}
		}
	}
}

var div = [{"code":0, "divlist":["namediv", "idcarddiv"]}, 
           {"code":1, "divlist":["namediv", "idcarddiv"]}, 
           {"code":3, "divlist":["namediv", "idcarddiv"]}, 
           {"code":4, "divlist":["credit", "namediv"]},
           {"code":5, "divlist":["namediv", "idcarddiv", "mobilediv"]},
           {"code":6, "divlist":["namediv", "idcarddiv", "airplanediv"]},
           {"code":7, "divlist":["namediv", "idcarddiv", "mobilediv", "credit"]},
           {"code":8, "divlist":["idcarddiv"]},
           {"code":9, "divlist":["searchentitynamediv"]},
           {"code":10, "divlist":["searchentitynamediv"]},
           {"code":11, "divlist":["searchentitynamediv"]},
           {"code":12, "divlist":["idcarddiv"]},
           {"code":13, "divlist":["namediv", "idcarddiv"]},
           ];

var divcount = {"namediv":0, "idcarddiv":0, "credit":0, "mobilediv":0, "airplanediv":0, "searchentitynamediv":0};

var airp = {"name":"姓名", "idcard":"身份证", "flighttimes":"飞行次数", "flightMonth":"最繁忙的乘机月份", "flytimes":"最繁忙的月份乘机次数", "avgdiscount":"一年内平均折扣", "fcabin":"商务舱乘机次数",
"ccabin":"公务舱乘机次数", "ycabin":"经济舱乘机次数", "fromcity":"最频繁乘机出发城市"	, "destcity":"最频繁乘机到达城市", "airline":"最频繁使用航空公司以及乘机次数", "cncount":"国内飞行次数", "intercount":"国外飞行次数",
"freeCount":"免票次数", "avgprice":"平均票价", "tsdelay":"总延误时间(分钟)", "avgdelay":"平均延误时间(分钟)", "avgTicketday":"平均提前出票天数", "lastflightdate":"最后飞行时间", "lastfromcity":"最后起飞城市", "lastdestcity":"最后抵达城市",
"flytotaltpm":"总共飞行里程数(千米)"
};