$(function(){
	
	$("#pgi-1").page("/bops/bgcheck/delivertask", {"status":3}, createOrderData);
	
	$("#od-search").on("click", function(){
		var code = $("#o-code").val();
		var subuser = $("#o-subuser").val();
		var comname = $("#o-comname").val();
		var menu = $("#o-menu").val();
		var surveyuser = $("#o-surveyuser").val();
		var status = $("#o-status").val();
		var marketName = $("#o-marketName").val();
		var auditStatus = $("#o-auditStatus").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchEndTime").val();
		var marketId = $("#o-marketName").find("option:selected").val();
		$("#pgi-1").page(
				"/bops/bgcheck/delivertask", 
				{"code":code, "subuser":subuser, "comname":comname, "menu":menu, "surveyUser":surveyuser, "status":status,"marketId":marketId,"auditStatus":auditStatus,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime}, 
				createOrderData
		);
	});
});

/**
 * 构建表格数据
 * @param obj
 * @param pg
 */
function createOrderData(obj, pg){
	$tb = $("#orderlist").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":"");
		
		str += ">"+
	      "<td>"+ nobj.orderCode +"</td>"+
	      "<td>"+ parseTime(nobj.orderDate) +"</td>";
		if(nobj.thirdName != ""){
			str += "<td>"+ nobj.thirdName +"</td>"+
			  "<td>"+ nobj.thirdComName +"</td>";
		}else{
			str += "<td>"+ nobj.userName +"</td>"+
			  "<td>"+ nobj.companyName+"</td>";
		}
	      
		str += "<td>"+ nobj.menuName+"</td>";
		  
		  if(nobj.orderStatus==3||nobj.orderStatus==4){
			  str += "<td>"+ (nobj.reportDate==""?("预计" + parseTime(nobj.bopsReportDate)):parseTime(nobj.reportDate)) +"</td>";
		  }else{
			  str += "<td>-</td>";
		  }
		  
		  str += "<td>"+ nobj.surveyedUserName+"</td>"+
		  "<td>";
		  if(nobj.auditStatus == 0){
			  str += "待提交";
		  }else if(nobj.auditStatus == 10){
			  str += "待质检";
		  }else if(nobj.auditStatus == 20){
			  str += "待发布";
		  }else if(nobj.auditStatus == 30){
			  str += "质检未通过";
		  }else if(nobj.auditStatus == 40){
			  str += "已发布";
		  }else if(nobj.auditStatus == 50){
			  str += "发布未通过";
		  }
		  str += "<td>"+ nobj.marketName+"</td>"+
	      "</td><td>";
		  if(nobj.thirdName != ""){
			 str += "<a href='"+ appServer +"/bops/bgcheck/edit.htm?id="+nobj.orderId+ "&edittype=td' target='_blank' style='display:inline-block;'>编辑</a>"; 
		  }else{
			 str += "<a href='"+ appServer +"/bops/bgcheck/edit.htm?id="+nobj.orderId+ "' target='_blank' style='display:inline-block;'>编辑</a>";
		  }
			
			str += "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}