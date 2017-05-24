$(function(){
	
	$("#pgi-1").page("/bops/sms/list", null, dataView);
	
	$("#od-search").on("click", function(){
		var mobile = $("#o-mobile").val();
		var supplier = $("#o-supplier").val();
		var searchFromTime = $("#o-searchFromTime").val();
		var searchEndTime = $("#o-searchFromTime").val();
		$("#pgi-1").page(
				"/bops/sms/list", 
				{"mobile":mobile, "supplier":supplier,"searchEndTime":searchEndTime,"searchFromTime":searchFromTime}, 
				dataView
		);
	});
	
	
	$(document).on("click", ".retransmission", function(){
		var id = $(this).siblings("span").text();
		$.ajax({
			url:appServer+"/bops/sms/retransmission.htm",
			type:"GET",
			data: {"id":id},
			success:function(res){
				if(res.meta.success){
					alert("重发短信成功");
				}else{
					alert(res.meta.errorInfo);
				}
			},
			error:function(xhr){
				alert("网络错误！");
			}
		});
		
	});
	
});

function dataView(obj, pg){
	$tb = $("#smslist").find("tbody");
	$tb.empty();
	var str = "";
	if(obj != null && obj.length >= 0){
		for(var i=0; i<obj.length; i++){
			var nobj = replaceNull(obj[i]);
			str += "<tr "+ (i%2==0?"class='tr-normal'":""); 
			
			str+= ">"+
		      "<td>"+ nobj.mobile +"</td>";
			  str += "<td title='" + nobj.content +  "'><div style='overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;'><span><a class='getDetailInfo'>"+ nobj.content + "</a></span></div></td>"+
			  "<td>"+nobj.supplier+"</td>"+
			  "<td>"+ getLocalTime(nobj.createTime) +"</td>"+
			  "<td>"+ nobj.status + "</td>"+
			  "<td><span style='display:none'>"+nobj.id+"</span><a class='retransmission'>重发</a></td>"
			  ;
		}
	}
	

	$tb.append(str);
}

$(document).on("click",".getDetailInfo",function(){
	var info = $(this).html();
	layer.alert(info, {
		  closeBtn: 0,
		  time :5000,
		  title:'查看详情'
		});
});

	var getLocalTime = function (nS) {
	    var d = new Date(nS),    //根据时间戳生成的时间对象
	        date = (d.getFullYear()) + "-" +
	            (numToString(d.getMonth() + 1)) + "-" +
	            (numToString(d.getDate())) + " " +
	            (numToString(d.getHours())) + ":" +
	            (numToString(d.getMinutes())) + ":" +
	            (numToString(d.getSeconds()));
	    function numToString(num) {
	        return num > 9 ? num : ('0' + num)
	    }

	    return date;
	}

