$(function(){
	
	$("#pgi-1").page("/bops/bgcheck/reportauditlist", {"auditStatus":10}, dataView);
	
	$("#od-search").on("click", function(){
		var code = $("#o-code").val();
		var subuser = $("#o-subuser").val();
		var comname = $("#o-comname").val();
		var menu = $("#o-menu").val();
		var deliver = $("#o-deliver").val();
		var surveyuser = $("#o-surveyuser").val();
		var auditStatus = $("#o-auditStatus").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchEndTime").val();
		var deliverId = $("#o-deliverId").find("option:selected").val();
		var marketId = $("#o-marketName").find("option:selected").val();
		$("#pgi-1").page(
				"/bops/bgcheck/reportauditlist", 
				{"code":code, "subuser":subuser, "comname":comname, "menu":menu, "deliver":deliver, "surveyUser":surveyuser, "marketId":marketId,"auditStatus":auditStatus,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime,"deliverId":deliverId}, 
				dataView
		);
	});
	
});

function dataView(obj, pg){
	$tb = $("#orderlist").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":""); 
		
		str+= ">"+
	      "<td class='orderCode'>"+ nobj.orderCode +"</td>"+
	      "<td>"+ (nobj.orderDate==""?"":new Date(nobj.orderDate).format("yyyy-MM-dd hh:mm:ss")) +"</td>";
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
		  
		  
		  "<td class='deliver-td'>"+ nobj.deliverName + "</td>"+
		  "<td class='deliver-td'>"+ nobj.marketName+"<input type='hidden' value='"+ nobj.marketName +"'/></td>"+
	      "<td>";
		  str += "<a href='"+ appServer +"/bops/bgcheck/reportauditopreate.htm?id="+ nobj.orderId + "' target='_blank' style='display:inline-block;'>查看</a>"; 	  
		  str += "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}