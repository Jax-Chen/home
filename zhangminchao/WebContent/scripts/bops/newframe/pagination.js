;(function(){
var Pagination = function(inUrl, options,inFun, pageObj){
		this.url = inUrl;
	    this.fun = inFun;
	    this.page = pageObj;
	    this.opt = {
	    		'totalPage':'',
	    		'firstPage':'',
	    		'lastPage':'',
	    		'nextPage':'',
	    		'prePage':'',
	    		'beginPage':'',
	    		'endPage':'',
	    		'totalCount':'',
	    	    'pageNo':''
	    };
	    this.dft = {
	    	"pageNo":1
	    };
	    this.search = $.extend({}, this.dft, options);
};   

Pagination.prototype = {
			createView:function(){
				$("#ppage-"+this.page.attr("id")).remove();
		    	if(this.opt.totalCount > 0){
		    		$(this.page).append("<div class='row' id='ppage-"+this.page.attr("id")+"'><div class='col-md-12'>" +
		    				"<div class='col-md-6' style='margin:20px 0;'>页数： [  <font color='red'>"+ this.opt.pageNo +"</font> / "+ this.opt.totalPage +" ]  总记录数："+ this.opt.totalCount +"</div>" +
		    				"<div class='col-md-6'><div style='float: right; margin: 20px 0 20px 10px; line-height: 26px;'>共"+this.opt.totalPage+"页 "+"到第 <input id='turnto' style='width:30px;height:25px;' value='' />页&nbsp;&nbsp<button id='goButton' class='btn btn-default btn-xs' style='height:29px;width:29px;'>GO</button></div><ul class='pagination' id='pagin' style='float:right;'></ul></div>" +
		    				"</div><input type='hidden' id='totalPageHide' value='"+this.opt.totalPage+"'/></div>");
		    		
		    		$pa = $(this.page).find("#pagin");
		    		$pa.append("<li><a id='pre_page' href='javascript:void(0);' data-code='"+ 1 +"'>&laquo;</a>");
		    		if(this.opt.firstPage){
		    			$pa.append("<li><a id='none_pre_page' href='javascript:void(0);' disabled>&lt;</a></li>");//
		    		}else{
		    			$pa.append("<li><a id='pre_page' href='javascript:void(0);' data-code='"+ this.opt.prePage +"'>&lt;</a>");
		    		}
		    		for(var i=this.opt.beginPage; i<=this.opt.endPage; i++){
		    			if(i == this.opt.pageNo){
		    				$pa.append("<li class='active'><a href='javascript:void(0);'>"+ i +"</a></li>");
		    			}else{
		    				$pa.append("<li><a class='page_no' href='javascript:void(0);' data-code='"+ i +"'>"+ i +"</a></li>");
		    			}
		    		}
		    		
		    		if(this.opt.lastPage){
		    			$pa.append("<li><a id='none_next_page' href='javascript:void(0);'>&gt;</a>");
		    		}else{
		    			$pa.append("<li><a id='next_page' href='javascript:void(0);' data-code='"+ this.opt.nextPage +"'>&gt;</a>");
		    		}
		    		$pa.append("<li><a id='next_page' href='javascript:void(0);' data-code='"+ this.opt.totalPage +"'>&raquo;</a>");
		        }else{
		        	$(this.page).append("<div class='row' id='ppage-"+this.page.attr("id")+"'><div class='col-md-12'>" +
		    				"<div class='col-md-12' style='margin:50px 0;'>没有结果</div>" +
		    				"</div></div>");
		        }
		    	
		    },
		    
		    //初始分页数据
			_initData:function(info){
				this.opt.totalPage = info.totalPage;
				this.opt.firstPage = info.firstPage;
				this.opt.lastPage = info.lastPage;
				this.opt.nextPage = info.nextPage;
				this.opt.prePage = info.prePage;
				this.opt.beginPage = info.beginPage;
				this.opt.endPage = info.endPage;
				this.opt.totalCount = info.totalCount;
				this.opt.pageNo = info.pageNo;
			},
		    _init:function(){
		    	var o = this;
		    	$.ajax({
		    		url:appServer + this.url + ".htm",
		    		type:"POST",
		    		data:o.search,
		    		success:function(res){
		    			if(res.meta.success){
		    				o._initData(res.retObj);
		    				o.createView();
		    				o.fun(res.retObj.data, o);//回调视图构建
		    			}else{
		    				layer.msg("查询失败");
		    			}
		    		},
		    		error:function(){
		    			layer.msg("网络错误");
		    		}
		    	});
		    },
		    query:function(no){
		    	this.pageN = no;
		    	this.search.pageNo = this.pageN;
		    	this._init();
		    },
		    //刷新页面
		    refresh:function() {
		    	this._init();
		    }
}; 

var pgList = [];//同一页有两个分页

$.fn.page = function(url, options, retFunction){
	pg = new Pagination(url, options, retFunction, this);
	if(pgList.length==0){
		$(document).on("click", "#pre_page", function(){
			$t = $(this).parents(".pgnt");
			var dataCode = $(this).attr("data-code");
			for(var i=0;i<pgList.length;i++){
				if(pgList[i].page.attr("id")==$t.attr("id")){
					pgList[i].query(dataCode);
				}
			}
		});
		
		$(document).on("click", ".page_no", function(){
			$t = $(this).parents(".pgnt");
			var dataCode = $(this).attr("data-code");
			for(var i=0;i<pgList.length;i++){
				if(pgList[i].page.attr("id")==$t.attr("id")){
					pgList[i].query(dataCode);
				}
			}
		});
		
		$(document).on("click", "#next_page", function(){
			$t = $(this).parents(".pgnt");
			var dataCode = $(this).attr("data-code");
			for(var i=0;i<pgList.length;i++){
				if(pgList[i].page.attr("id")==$t.attr("id")){
					pgList[i].query(dataCode);
				}
			}
		});
		
		$(document).on("click","#goButton",function(){
			$t = $(this).parents(".pgnt");
			for(var i=0;i<pgList.length;i++){
				var pageNum = $t.find("#turnto").val();
				var totalPageHide = $t.find("#totalPageHide").val();
				if(pageNum == ""){
					alert("输入的页码不能为空");
					return;
				}else if(!/^[0-9]*$/.test(pageNum)){
					alert("请输入数字");
					$("#turnto").val('');
					return;
				}else if(parseInt(pageNum) > parseInt(totalPageHide)){
					alert("最大可输入页码是"+totalPageHide);
					$("#turnto").val('');
					return ;
				}else{
					if(pgList[i].page.attr("id") == $t.attr("id")){
						pgList[i].query(pageNum);
					}
				}
			}
		});
		
		pgList.push(pg);
	}else{
		var flag = 0;
		for(var i=0;i<pgList.length;i++){//tab都存在分页的时候
			if(pgList[i].page.attr("id") == pg.page.attr("id")){
				flag = 1;
				pgList.remove(i);
				pgList.push(pg);
			}
		}
		if(flag == 0){
			pgList.push(pg);
		}
	}
	
	pg._init();
	
	
	return this;
};

$.fn.page.refresh = function() {
	for(var i=0; i<pgList.length; i++){
		pgList[i].refresh();
	}
}
	
})(jQuery);
