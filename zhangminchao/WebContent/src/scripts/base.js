

$(function(){
	//分页跳转
	$("body").on("click","._page_no",function(){
		
    	var page_no = $(this).attr("data-code");
    	var url = $(this).parent().parent().attr("url");
    	
    	window.location.href=url + "?pageNo=" + page_no;
    	
	});
	
	//分页点击跳转
    $("body").on("click","#goButton",function(){
    	
    	var url = $(this).attr("url");
    	var page_no = $("#turnto").val();
    	if(page_no==null || page_no == ""){
    		page_no = 1;
    	}
    	
    	window.location.href=url + "?pageNo=" + page_no;
	});
	
});