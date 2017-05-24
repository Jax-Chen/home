$(document).ready(function() {
	$("#test").on("click", function() {
    	var url = $(this).attr('url');
		$.ajax({
	        url: url,
	        global: false,
	        type: "POST",
	        data: ({
	            page:3
	        }),
	        dataType: "html",
	        async: false,
	        success: function(msg) {
	        	alert(msg);
	        	$('.main-right').html(msg);
	        }
	    });
	});

});
