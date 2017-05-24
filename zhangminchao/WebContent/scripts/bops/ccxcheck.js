$(function(){
	$('.ui-choose').ui_choose();    
	
	$("#bk-btn-ok").on("click",function(){
		var option = $("#uc_04").val();
		if(option==null){
			layer.alert("请选择查询项！", {icon:7});
			return;
		}
		
		if(!canSub()){
			layer.alert("请输入完整表单！", {icon:7});
			return;
		}
		var iptArr = $(".ccx-checkframediv input");
//		var type = $(".checkstyle input:checkbox[name=bk-check]:checked").val() || null;
		var mobile=$("#mobile").val() || null;
		var obj = {};
		for(var i=0; i<iptArr.length; i++){
			var name = iptArr[i].id;
			obj[name] = iptArr[i].value;
		}
		/*if(type!==null){
			obj["type"]=type;
		}*/
		if(mobile !== null){
			obj["mobile"]=mobile;
		}
		
		obj["option"] = JSON.stringify(option);
		layer.confirm('确定查询?', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url:appServer+'/bops/bkcheck/ccxcheck.htm',
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
		$(".ccx-checkframediv input").val("");
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
	
	
});

/**
 * 查询结果显示代码
 * @param a
 * @param obj
 * @returns
 */
function showView(a, obj){
	
	if(a==0){
		if(obj.perbadinfoCode == 0){
			var perbadinfo = obj.perbadinfo;
			$("#bk-info-name").text(perbadinfo.name);
			$("#bk-info-cid").text(perbadinfo.cid);
			$("#bk-info-result").text(perbadinfo.caseResult);
			
			
			var list = perbadinfo.queryResTime;
			if(list != null){
				for(var i=0; i<list.size(); i++){
					$("#bk-info-caseTime").append(list[i]);
				}
			}
			
			$(".bk-perbadinfo").show();
		}else{
			$("#perbadinfo-errinfo").text(obj.perbadinfo);
			$(".bk-perbadinfonullinfo").show();
		}
	} else if(a == 1) {//身份验证带照片
		if(obj.identitycheckphotoCode == 0) {
			var identityphoto = obj.identitycheckphoto;
			$("#bk-identity-name").text(identityphoto.name);
			$("#bk-identity-cid").text(identityphoto.cid);
			if(identityphoto.result == 1){
				$("#bk-identity-result").text("验证成功");
			}else if(identityphoto.result == 0){
				$("#bk-identity-result").text("身份证号存在,姓名不符合,验证失败");
			}
			
			$("#bk-identity-photo").html("<img src='data:image/jpg;base64,"+ identityphoto.image +"' />");
			$(".bk-identitycheckphotoerrorinfo").show();
			$(".bk-identitycheckphoto").show();
		} else {
			$("#indentityphoto-errinfo").text(obj.identitycheckphoto);
			$(".bk-indentity-photo-check").show();
		}
	}else if(a == 2){//身份验证
		if(obj.identitycheckCode == 0){
			var identity=obj.identitycheck;
			$("#bk-identity-name-noimage").text(identity.name);
			$("#bk-identity-cid-noimage").text(identity.cid);
			if(identity.result == 1){
				$("#bk-identity-result-noimage").text("验证成功");
			}else if(identity.result == 0){
				$("#bk-identity-result-noimage").text("验证失败");
			}
			$(".bk-identitycheck").show();
		} else{
			$("#indentity-errinfo").text(obj.identitycheck);
			$(".bk-indentity-check").show();
		}
	}else if(a ==3){//户籍查询
		if(obj.householdregistercheckCode == 0){
			var householdregistercheck=obj.householdregistercheck;
			$("#bk-house-hold-register-name").text(householdregistercheck.name);
			$("#bk-house-hold-register-cid").text(householdregistercheck.cid);
			$("#bk-house-hold-register-gender").text(householdregistercheck.gender);
			$("#bk-house-hold-register-formername").text(householdregistercheck.formername);
			$("#bk-house-hold-register-birthday").text(householdregistercheck.birthday);
			$("#bk-house-hold-register-company").text(householdregistercheck.company);
			$("#bk-house-hold-register-education").text(householdregistercheck.education);
			$("#bk-house-hold-register-maritalstatus").text(householdregistercheck.maritalstatus);
			$("#bk-house-hold-register-nativeplace").text(householdregistercheck.nativeplace);
			$("#bk-house-hold-register-birthplace").text(householdregistercheck.birthplace);
			$("#bk-house-hold-register-address").text(householdregistercheck.address);
			$(".bk-householdregister").show();
		}else {
			$("#householdregister-errinfo").text(obj.householdregistercheck);
			$(".bk-householdregister-check").show();
		}
	}else if(a==4){
		if(obj.dishhonestexecutioncheckCode == 0){
			
			var arr1=obj.list.hec;
			var arr2=obj.list.hpi;
			$(".show").remove();
			var str = "";
			for(var i=0;i<arr1.length;i++){
				var o = arr1[i];
				replaceNull(o);
				str += "<tr class="+'show'+"><td>"+ o.time +"</td><td>"+ o.casenum +"</td><td>"+ o.court +"</td><td>"+ o.concretesituation  +"</td><td>"+ o.obligation +"</td></tr>";
			}
			$(".bk-unhonest").find("tbody").append(str);
			$(".bk-unhonest").show();
			var str2 = "";
			for(var j=0;j<arr2.length;j++){
				var p=arr2[j];
				str2 +="<tr class="+'show'+"><td>"+ p.time +"</td><td>"+ (p.casenum || "") +"</td><td>"+ p.court +"</td><td>"+ (p.statute || "") +"</td><td>"+ (p.basiccourt || "")  +"</td></tr>";
			}
			$(".bk-unhonestpeo").find("tbody").append(str2);
			$(".bk-unhonestpeo").show();
		}else {
			$("#dishhonestexecutioncheck-errinfo").text(obj.dishhonestexecutioncheck);
			$(".bk-dishhonestexecutioncheck-check").show();
		}
	}else if(a==5){
		if(obj.mobileauthenticationcheckCode ==0){
			var mobileauthenticationcheck=obj.mobileauthenticationcheck;
			$("#bk-mobilecheck-name").text(mobileauthenticationcheck.name);
			$("#bk-mobilecheck-cid").text(mobileauthenticationcheck.cid);
			$("#bk-mobilecheck-mobile").text(mobileauthenticationcheck.mobile);
			if(mobileauthenticationcheck.result == 1){
				$("#bk-mobilecheck-result").text("验证成功！");
			}else if(mobileauthenticationcheck.result == 0){
				$("#bk-mobilecheck-result").text("验证失败！");
			}
			
			$(".bk-mobileauthcheck").show();
		}else{
			$("#mobileauthenticationcheck-errinfo").text(obj.mobileauthenticationcheck);
			$(".bk-mobileauthenticationcheck-check").show();
		} 
		
	}else if(a==6){
		if(obj.educationinfocheckCode == 0){
			var educationinfocheck=obj.educationinfocheck;
			$("#bk-education-name").text(educationinfocheck.name);
			$("#bk-education-cid").text(educationinfocheck.cid);
			$("#bk-education-degrees").text(educationinfocheck.degrees);
			$("#bk-education-schoolname").text(educationinfocheck.schoolName);
			$("#bk-education-schooltype").text(educationinfocheck.schoolType);
			$("#bk-education-major").text(educationinfocheck.major);
			$("#bk-education-enrollmentdate").text(educationinfocheck.enrollMentdata);
			$("#bk-education-graduationdate").text(educationinfocheck.graduationDate);
			$("#bk-education-degreestype").text(educationinfocheck.degreesType);
			$("#bk-education-graduation").text(educationinfocheck.graduation);
			$(".bk-educationinfocheck").show();
		}else{
			$("#educationinfocheck-errinfo").text(obj.educationinfocheck);
			$(".bk-educationinfocheck-check").show();
		}
	}
}

var div = [{"code":0, "divlist":["namediv", "idcarddiv"]},
		{"code":1, "divlist":["namediv", "idcarddiv"]},
		{"code":2,"divlist":["namediv","idcarddiv"]},
		{"code":3,"divlist":["namediv",'idcarddiv']},
		{"code":4,"divlist":["namediv",'idcarddiv']},
		{"code":5,"divlist":["namediv",'idcarddiv',"mobilediv"]},
		{"code":6,"divlist":["namediv",'idcarddiv']}
	];
var divcount = {"namediv":0, "idcarddiv":0, "credit":0, "mobilediv":0, "airplanediv":0, "searchentitynamediv":0,"typediv":0};
function replaceNull(obj){
	return obj==null?"":obj;
}

/**
 * 参数验证
 * @returns
 */
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

/**
 * 查询项目显示
 * @param code
 * @returns
 */
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

/**
 * 隐藏查询项目项目
 * @param code
 * @returns
 */
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


//$(document).ready(function(){
//    $('#test').find('input[type=checkbox]').bind('click', function(){
//        $('#test').find('input[type=checkbox]').not(this).attr("checked", false);
//    });
//});