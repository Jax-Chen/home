checkPermission();
$(function(){
	$("#pgi-1").page("/bops/bgcheck/reportreleaselist", {"auditStatus":20}, dataView);
	
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
		var auditerName = $("#o-auditerName").val();
		var deliverId = $("#o-deliverId").find("option:selected").val();
		var marketId = $("#o-marketName").find("option:selected").val();
		$("#pgi-1").page(
				"/bops/bgcheck/reportreleaselist", 
				{"code":code, "subuser":subuser, "comname":comname, "menu":menu, "deliver":deliver, "surveyuser":surveyuser, "marketId":marketId,"auditStatus":auditStatus,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime,"auditerName":auditerName,"deliverId":deliverId}, 
				dataView
		);
	});
	
	$("body").on("click",".downloadReport",function(){ 
		var path = $(this).siblings("input").val();
		if(path == null || path == ""){
			layer.alert("文件不存在无法下载");
		}else{
			if(hasPermissionToFileDownload==1){
				var url = appServer + "/common/component/FileDownload.htm";
				url += "?relativePath=" + encodeURIComponent(encodeURIComponent(path));
			    window.open(url, "_blank", "");
			}else{
				layer.alert("权限不足！");
			}
		}
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
		  "<td>"+ nobj.auditerName +"</td>"+
		  "<td class='deliver-td'>"+ nobj.marketName+"<input type='hidden' value='"+ nobj.marketName +"'/></td>"+
	      "<td>";
		  str += "<a href='"+ appServer +"/bops/bgcheck/reportreleaseoperate.htm?id="+ nobj.orderId + "' target='_blank' style='display:inline-block;'>查看</a>"; 	  
		  if(nobj.auditStatus == 40 || nobj.auditStatus == 10 || nobj.auditStatus == 20 || nobj.auditStatus == 30){
			  if(hasPermissionToFileDownload == 1 && nobj.reportPath!="" && null!=nobj.reportPath){
				  str += "<a href='javascript:;' target='_blank' class='downloadReport' style='display:inline-block;margin-left:20px;'>下载报告</a>"; 	  
			  }
			  str += "<input type='hidden' id='reportPath' value='" + nobj.reportPath + "'/>";
		  }
		  str += "</td>"+
	   "</tr>";
	}

	$tb.append(str);
}

var hasPermissionToFileDownload = 0;
function checkPermission(){
    $.ajax({
        url: appServer + "/bops/haspermission.htm",
        type: "GET",
        data: {"url": ["/bops/bgcheck/downReportCheckPermission"]},
        success: function(res){
            if(res.meta.success){
                var obj = res.retObj;
                if(obj != null){
                    hasPermissionToFileDownload = obj[0];
                }
            }
        },
        error: function(){
            layer.msg("网络错误");
        }
    });
}
