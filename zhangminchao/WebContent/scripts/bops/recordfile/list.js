$(function(){
	
	$("#pgi-1").page("/bops/recordfile/list", null, dataView);
	
	$("#od-search").on("click", function(){
		var thirdAccount = $("#o-thirdAccount").val();
		var fileName = $("#o-fileName").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchEndTime").val();
		$("#pgi-1").page(
				"/bops/recordfile/list", 
				{"thirdAccount":thirdAccount, "fileName":fileName,"searchFromTime":searchFromTime,"searchEndTime":searchEndTime}, 
				dataView
		);
	});
	
	
	$(document).on("click", ".download", function(){
		var u = $(this).siblings("span").text();
		var url = appServer + "/common/component/FileDownload.htm";
		url += "?relativePath=" + encodeURIComponent(encodeURIComponent(u));
        window.open(url, "_blank", "");
	});
	
});

function dataView(obj, pg){
	$tb = $("#recordfilelist").find("tbody");
	$tb.empty();
	var str = "";
	
	for(var i=0; i<obj.length; i++){
		var nobj = replaceNull(obj[i]);
		str += "<tr "+ (i%2==0?"class='tr-normal'":""); 
		
		str+= ">"+
	      "<td>"+ nobj.thirdAccount +"</td>";
	      
		  str += "<td>"+ getLocalTime(nobj.recordDate)+ "</td>"+
		  "<td>"+"<span style='display:none'>"+nobj.filePath+"</span><a class='download'>下载</a></td>"+
		  "<td>"+ nobj.fileName +"</td>";
	}

	$tb.append(str);
}

	var getLocalTime = function (nS) {
	    var d = new Date(nS),    //根据时间戳生成的时间对象
	        date = (d.getFullYear()) + "-" +
	            (numToString(d.getMonth() + 1)) + "-" +
	            (numToString(d.getDate())) + " " 

	    function numToString(num) {
	        return num > 9 ? num : ('0' + num)
	    }

	    return date;
	}

