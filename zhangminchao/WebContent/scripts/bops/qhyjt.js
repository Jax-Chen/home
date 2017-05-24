$(function(){
	$("#address-ck").on("click", function(){
		
		if($("#address-ck")[0].checked){
			$("#address-tr").show();
		}else{
			$("#address-tr").hide();
		}
		
	});
	
	$("#workcompany-ck").on("click", function(){
	
		if($("#workcompany-ck")[0].checked){
			$("#workcompany-tr").show();
		}else{
			$("#workcompany-tr").hide();
		}
		
	});
	
	$("#car-ck").on("click", function(){
	
		if($("#car-ck")[0].checked){
			$("#carid-tr").show();
			$("#careng-tr").show();
			$("#carframe-tr").show();
			$("#carstatus-tr").show();
		}else{
			$("#carid-tr").hide();
			$("#careng-tr").hide();
			$("#carframe-tr").hide();
			$("#carstatus-tr").hide();
		}
		
	});
	
	$("#face-ck").on("click", function(){
		if($("#face-ck")[0].checked){
			$("#photo-tr").show();
			$("#areacode-tr").show();
		}else{
			$("#photo-tr").hide();
			$("#areacode-tr").hide();
		}
	});
	
	$("#party-ck").on("click", function(){
		if($("#party-ck")[0].checked){
			$("#refname-tr").show();
			$("#refmob-tr").show();
		}else{
			$("#refname-tr").hide();
			$("#refmob-tr").hide();
		}
	});
	
	$("#credit-ck").on("click", function(){
		if($("#credit-ck")[0].checked){
			$("#credit-tr").show();
		}else{
			$("#credit-tr").hide();
		}
	});
	
	$(".bk-btn-ok").on("click", function(){
		
		if(checkData()){
			
			var form = new FormData($('#form1')[0]);
			
			
			$(".loadframe").show();
			$(".bk-result").hide();
			
			$.ajax({
				url : appServer + "/bops/bkcheck/qhyjtcheck.htm",
				type : "POST",
				data : form,
				processData: false,  
	            contentType: false,
				success : function(res) {
					$(".loadframe").hide();
					if (res.meta.success) {
						hrHuTui.popout({type:"success",content:"查询成功"});
						showView(res.retObj);
					} else {
						alert(res.meta.errorInfo);
					}
				},error:function(xhr){
					$(".loadframe").hide();
					alert("网络错误！");
				}
			});
			
		}
		
	});
	
	$(".bk-btn-reset").live("click", function() {
		$("#name-ipt").val("");
		$("#id-ipt").val("");
		$("input[name='sg-ckbox']").removeAttr("checked");
		$("#order-ipt").val("");
		
		var arr = $(".addipt");
		
		for(var i=0;i<arr.length;i++){
			arr[i].value="";
		}
		
		$(".htr").hide();
		$(".bk-result").hide();
	});
});

function getChecked(){
	var arr = $("input[name='sg-ckbox']:checked");
	var resArr = [];
	for(var i=0;i<arr.length;i++){
		resArr.push(arr[i].value);
	}
	
	return resArr;
}

function checkData(){
	
	var name = $("#name-ipt").val();
	var id = $("#id-ipt").val();
	var orderCode = $("#order-ipt").val();
	
	if(name == "" || id == "" || orderCode == ""){
		alert("请填写必填信息！");
		return false;
	}
	
	var resArr = getChecked();
	
	if(resArr.length==0){
		alert("请选择调查项");
		return;
	}
	
	for(var i=0;i<resArr.length;i++){
		if(resArr[i]==1){
			if($("#address-ipt").val()==""){
				alert("请填写地址信息！");
				return false;
			}
		}else if(resArr[i]==2){
			if($("#workcompany-ipt").val()==""){
				alert("请填写工作单位！");
				return false;
			}
		}else if(resArr[i]==3){
			if($("#carid-ipt").val()==""){
				alert("请填写车牌号！");
				return false;
			}
			
		}else if(resArr[i]==5){
			if($("#pic-ipt").val()==""){
				alert("请选择相片！");
				return false;
			}
			
			if($("#areacode-ipt").val()==""){
				alert("请输入行政区代码！");
				return false;
			}
		}else if(resArr[i]==6){
			if($("#refname-ipt").val()==""){
				alert("请输入联系人姓名！");
				return false;
			} 
			
			if($("#refmob-ipt").val()==""){
				alert("请输入联系人手机号！");
				return false;
			}
		}else if(resArr[i]==7){
			if($("#credit-ipt").val()==""){
				alert("请输入银行卡号！");
				return false;
			} 
		}
	}
	return true;
}

function showView(resObj){
	if(resObj!=null){
		$(".contentdiv").hide();
		var identity = resObj.identity;
		var address = resObj.address;
		var company = resObj.company;
		var house = resObj.house;
		var ref = resObj.ref;
		var face = resObj.face;
		var credit = resObj.credit;
		
		if(identity==null){
			$(".identitydiv").hide();
		}else if((typeof identity)=="string" && identity.indexOf("ERROR")>=0){
			$(".identitydiv").show();
			$(".bk-error").show();
			$("#etext").text(identity);
			$(".bk-baseinfo").hide();
			$(".bk-nullinfo").hide();
		}else if(identity!=null){
			$(".identitydiv").show();
			if(identity==false){
				$(".bk-error").hide();
				$(".bk-baseinfo").hide();
				$(".bk-nullinfo").show();
			}else if(identity==true){
				$(".bk-error").hide();
				$(".bk-baseinfo").show();
				$(".bk-nullinfo").hide();
			}
		}
		
		if(address==null){
			$(".addressdiv").hide();
		}else if((typeof address)=="string" && address.indexOf("ERROR")>=0){
			$(".bk-addressinfo").hide();
			$(".bk-addresserror").show();
			$("#qh-addresserr-res").text(address);
			$(".addressdiv").show();
		}else{
			$(".bk-addressinfo").show();
			$(".bk-addresserror").hide();
			if(address.isValidAddress==1){
				$("#qh-address-res").text("是");
			}else if(address.isValidAddress==0){
				$("#qh-address-res").text("否");
			}else if(address.isValidAddress==9){
				$("#qh-address-res").text("库中无数据");
			}
			
			$("#qh-addresstype-res").text(address.addressType);
			$(".addressdiv").show();
		}
		
		if(company==null){
			$(".companydiv").hide();
		}else if((typeof company)=="string" && company.indexOf("ERROR")>=0){
			$(".bk-companyinfo").hide();
			$(".bk-companyinfoerr").show();
			$("#qh-comerr-res").text(company);
			$(".companydiv").show();
		}else{
			$(".bk-companyinfo").show();
			$(".bk-companyinfoerr").hide();
			
			if(company.isRealCompany==1){
				$("#qh-isrealcom-res").text("是");
			}else if(company.isRealCompany==0){
				$("#qh-isrealcom-res").text("否");
			}else if(company.isRealCompany==9){
				$("#qh-isrealcom-res").text("库中无数据");
			}
			$("#qh-matchnum-res").text(company.companySimDeg);
			$("#qh-comfirst-res").text(company.appear1ThDate);
			$("#qh-comlast-res").text(company.appearLastDate);
			
			$(".companydiv").show();
		}
		
		if(house==null){
			$(".housediv").hide();
		}else if((typeof house)=="string" && house.indexOf("ERROR")>=0){
			$(".bk-houseinfo").hide();
			$(".bk-houseinfoerr").show();
			$("#qh-houseerr-res").text(house);
			$(".housediv").show();
		}else{
			$(".bk-houseinfo").show();
			$(".bk-houseinfoerr").hide();
			
			if(house.houseChkResult==1){
				$("#qh-house-res").text("是");
			}else if(company.houseChkResult==0){
				$("#qh-house-res").text("否");
			}else if(company.houseChkResult==9){
				$("#qh-house-res").text("库中无数据");
			}
			$("#qh-housegettime-res").text(house.houseDataDate);
			
			$(".housediv").show();
		}
		
		if(ref==null){
			$(".refdiv").hide();
		}else if((typeof ref)=="string" && ref.indexOf("ERROR")>=0){
			$(".bk-refinfo").hide();
			$(".bk-refinfoerr").show();
			$("#qh-referr-res").text(ref);
			$(".refdiv").show();
		}else{
			$(".bk-refinfo").show();
			$(".bk-refinfoerr").hide();
			
			if(ref.isExistRel==1){
				$("#qh-ref-res").text("是");
			}else if(ref.houseChkResult==0){
				$("#qh-ref-res").text("否");
			}else if(ref.houseChkResult==9){
				$("#qh-ref-res").text("库中无数据");
			}
			
			if(ref.relLevel==0){
				$("#qh-refnum-res").text('弱');
			}else if(ref.relLevel==1){
				$("#qh-refnum-res").text('中');
			}else if(ref.relLevel==2){
				$("#qh-refnum-res").text('强');
			}
			
			
			$(".refdiv").show();
		}
		
		if(face==null){
			$(".facediv").hide();
		}else if((typeof face)=="string" && face.indexOf("ERROR")>=0){
			$(".bk-faceinfo").hide();
			$(".bk-faceinfoerr").show();
			$("#qh-faceerr-res").text(face);
			$(".facediv").show();
		}else{
			$(".bk-faceinfo").show();
			$(".bk-faceinfoerr").hide();
			
			if(face.photoCmpResult==1){
				$("#qh-face-res").text("一致");
			}else if(face.houseChkResult==0){
				$("#qh-face-res").text("不一致");
			}else if(face.houseChkResult==9){
				$("#qh-face-res").text("库中无数据");
			}
			
			$("#qh-facematch-res").text(face.photoSimDeg);
			
			
			$(".facediv").show();
			$("#pic-ipt").val("");
		}
		
		if(credit==null){
			$(".creditdiv").hide();
		}else if((typeof credit)=="string" && credit.indexOf("ERROR")>=0){
			$(".bk-creditinfo").hide();
			$(".bk-creditinfoerr").show();
			$("#qh-crediterr-res").text(face);
			$(".creditdiv").show();
		}else{
			$(".bk-creditinfo").show();
			$(".bk-creditinfoerr").hide();
			
			if(credit=="1"){
				$("#qh-credit-res").text("鉴权通过(信息匹配)");
			}else if(credit=="0"){
				$("#qh-credit-res").text("鉴权不通过");
			}else if(credit=="2"){
				$("#qh-credit-res").text("未查到结果");
			}
			
			
			$(".creditdiv").show();
		}
		
		$(".bk-result").show();
	}
}