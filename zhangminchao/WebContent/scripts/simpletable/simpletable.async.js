/**
 * author: badqiu
 * depend on JQuery
 */
var SimpleTable = function(formId,pageNumber,pageSize,sortColumns,pageNumberKey,pageSizeKey,sortColumnsKey) {
	this.form = formId;
	this.pageNumber = pageNumber;
	this.pageSize = pageSize;
	this.sortColumns = sortColumns;
	this.pageNumberKey = pageNumberKey || 'pageNumber';
	this.pageSizeKey = pageSizeKey || 'pageSize';
	this.sortColumnsKey = sortColumnsKey || 'sortColumns';
	 
	//handle sort
	_this = this;
	$(".gridBody th[sortColumn]").click(function() {
		//handle click sort header
		var column = $(this).attr('sortColumn');
		$(".gridBody th[sortColumn]").removeClass();
		
		if(SimpleTableUtils.getSortDirection(_this.sortColumns,column) == 'asc') {
			_this.sortColumns = SimpleTableUtils.getSortColumns(_this.sortColumns,column);
			_this.toggleSort(_this.sortColumns);
			$(this).addClass("sort desc");
		}else if(SimpleTableUtils.getSortDirection(_this.sortColumns,column) == 'desc') {
			_this.sortColumns = SimpleTableUtils.getSortColumns(_this.sortColumns,column);
			_this.toggleSort(_this.sortColumns);
			$(this).addClass("sort asc");
		}else {
			_this.sortColumns = column + " desc";
			_this.toggleSort(column + " desc");
			$(this).addClass("sort desc");
		}
	}).mouseover(function() {
		$(this).toggleClass('tableHeaderSortHover',true);
	}).mouseout(function() {
		$(this).toggleClass('tableHeaderSortHover',false);
	});
	
	// add 'desc' or 'asc' class to sorted tableHeader
	var sortInfos = SimpleTableUtils.getSortInfos(sortColumns);
	
	for(var i = 0; i < sortInfos.length; i++) {
		var info = sortInfos[i];
		var selector ='.gridBody th[sortColumn="'+info.column+'"]';
		var order = info.order ? info.order : 'asc';
		$(selector).addClass("sort " + order.toLowerCase());
	}
};
SimpleTable.prototype = {
	doJump : function(pageNumber,pageSize,sortColumns) {
		var data = {
				'pageNumber' : this.pageNumber,
				'pageSize': this.pageSize,
				'queryString' : $('#queryString').val(),
				'filterString' : $('#filterString').val(),
				'app' : $('#app').val(),
				'contentType' : $('#contentType').val(),
				'docType' : $('#docType').val(),
				'timeIndexType' : $('#timeIndexType').val(),
				'sortColumns' : this.sortColumns
			};
		SimpleTableUtils.async(data);
		SimpleTableUtils.setSortClass(this.form,sortColumns);
	},
	togglePage : function(pageNumber) {
		this.pageNumber = pageNumber;
		this.doJump(pageNumber,null,null);
	},
	togglePageSize : function(pageSize) {
		this.pageSize = pageSize;
		this.doJump(null,pageSize,null);
	},
	toggleSort : function(sortColumns) {
		this.sortColumns = sortColumns;
		this.doJump(null,null,sortColumns);
	}
};

// static methods
var SimpleTableUtils = {
	getSortInfos : function(sortColumns) {
		if(!sortColumns) return []; 
		var results = [];
		var sorts = sortColumns.split(",");
		for(var i = 0; i < sorts.length; i++) {
			var columnAndOrder = sorts[i].split(/\s+/);
			var column = columnAndOrder[0];
			var order = columnAndOrder.length > 1 ? columnAndOrder[1] : null;
			
			var sortInfo = new Object();
			sortInfo.column = $.trim(column);
			sortInfo.order = $.trim(order);
			
			results.push(sortInfo);
		}
		return results;
	},
	getSortDirection : function(defaultSortColumns,currentColumn) {
		var infos = SimpleTableUtils.getSortInfos(defaultSortColumns);
		for(var i = 0; i < infos.length; i++) {
			var info = infos[i];
			var order = info.order ? info.order : 'asc';
			if(info.column == currentColumn) {
				return order;
			}
		}
		return null;
	},
	getSortColumns : function (defaultSortColumns,currentColumn){
		var results = '';
		if(!defaultSortColumns) return result; 
		var sorts = defaultSortColumns.split(",");
		for(var i = 0; i < sorts.length; i++) {
			var columnAndOrder = sorts[i].split(/\s+/);
			var column = columnAndOrder[0];
			var order = columnAndOrder.length > 1 ? columnAndOrder[1] : null;
			
			if(column == currentColumn){
				order = (order == 'asc' ? 'desc' : 'asc');
				results += (column + ' ' + order);
			}else{
				results +=sorts[i];
			}
			if(i+1 != sorts.length){
				results +=',';
			}
		}
		return results;
	},
	setSortClass : function(formId,sortColumns){
		var sortInfos = SimpleTableUtils.getSortInfos(sortColumns);
		
		for(var i = 0; i < sortInfos.length; i++) {
			var info = sortInfos[i];
			var selector ='.gridBody th[sortColumn="'+info.column+'"]';
			var order = info.order ? info.order : 'asc';
			$(selector).attr('class','');
			$(selector).addClass("sort " + order.toLowerCase());
		}
	},

	async : function (data) {
		var url = $("#searchUrl").val();
		var userName = $("#loginUser").val();
		var fl = $.cookie(userName + ":fl") || 1;
		var ctx = $("#ctx").val();
		
		$.post(url, data, function(json) {
			$("#result").html("");
			$("#spellCheck").html("");
			
			if(json.page.result && json.page.result.length > 0){
				
				$.each(json.page.result, function(i, espResult) {
					var dom ="";
					
					var titleDiv = "<h1><a href='" + espResult.linkUrl + " 'target='_blank'>"+ espResult.appName + '&nbsp;' + espResult.title + "</a></h1>";
					var contentDiv = '';
					
					if(fl == 1 && !isEmpty(espResult.content)){
						contentDiv = "<div class='txt'>"+ espResult.content + "</div>";
						if("OA"==espResult.app){
							contentDiv = "<div class='txt2'>"+ espResult.content + "</div>";
						}
					}
					
					var link2 = '<div class="link2">'+ espResult.fmtUrl +"&nbsp;" +espResult.fmtTs +'<img src="' + ctx+'/images/sm1.gif" width="13" height="13" /><a href="javascript:void(0);" onclick="showCreateFav(\''+ ctx+'\',\''+ espResult.id+ '\');">在线收藏</a></div>';
					
					if("ARCHIVES"==espResult.app){//档案系统
						dom ="<div class='RBox1'>" + titleDiv + espResult.columnName + contentDiv + link2 + "</div>";
					}else if("ENTDOC"==espResult.app){//企业文库
						dom ="<div class='RBox1'>" + titleDiv + contentDiv + link2 + "</div>";
					}else if("INDUSTRY"==espResult.app){//行业网站
						dom ="<div class='RBox1'>" + titleDiv + contentDiv + link2 + "</div>";
					}else if("NPORTAL"==espResult.app){//门户
						var authorDiv = "<div class='d2'><a href='javascript:void(0);' onclick='doNewFilterSearch(2,this.name);' name='" + espResult.author +"'>投稿人:"+ espResult.author+ "</a></div>";
						dom ="<div class='RBox1'>" + titleDiv + contentDiv + authorDiv+link2 + "</div>";
					}else if("OA"==espResult.app){//协同办公(公文)
					    link2 = '<div class="link3">'+ espResult.fmtUrl +"&nbsp;" +espResult.fmtTs +'<img src="' + ctx+'/images/sm1.gif" width="13" height="13" /><a href="javascript:void(0);" onclick="showCreateFav(\''+ ctx+'\',\''+ espResult.id+ '\');">在线收藏</a></div>';
						var keywordsDiv = '';
						if(espResult.keywords && espResult.keywords.length > 0){
							keywordsDiv += "<div class='keywords'>关键词：";
							for(i in espResult.keywords){
								keywordsDiv += "<a href='javascript:void(0);' onclick='doNewFilterSearch(3,this.name);' name='" + espResult.keywords[i] +"'>" + espResult.keywords[i] + "</a> ";
							}
							keywordsDiv += "</div>";
						}
						
						var authorDiv = "<div class='d2'><a href='javascript:void(0);' onclick='doNewFilterSearch(2,this.name);' name='" + espResult.author +"'>拟稿:"+ espResult.author+ "</a></div>";
//						var readerDiv="<div class='d1'><a href='javascript:void(0);' onclick='doPreview(this.name)' name='" + espResult.id + "'>阅读器阅读<img src='"+ ctx+ "/images/02.gif' /></a></div>";
						
						var picDiv="<div class='newpic'><img src='"+ espResult.image +"' onerror='showerrimg("+ctx+"/,"+"this);'/></div>";
//						dom="<div class='RBox2'>" + picDiv + titleDiv + contentDiv + keywordsDiv+readerDiv + authorDiv +link2+"</div>";
						dom="<div class='RBox2'>" + picDiv + titleDiv + contentDiv + keywordsDiv + authorDiv +link2+"</div>";
					}else if("STANDARD"==espResult.app){//标准化
						if(espResult.status){
							var stat_pic="";
							if(espResult.status<16){//未生效
								stat_pic="zt2.jpg";
							}else if(espResult.status==16){//有效
								stat_pic="zt1.jpg";
							}else{//作废
								stat_pic="zt3.jpg";
							}
							var label = "<label><img src='" + ctx+"/images/" +stat_pic+ "' /></label>";
							titleDiv = "<h1><a href='" + espResult.linkUrl + " 'target='_blank'>"+espResult.appName + '&nbsp;' +espResult.title + "</a>" + label + "</h1>";
						}
						var keywordsDiv = '';
						if(espResult.keywords && espResult.keywords.length > 0){
							keywordsDiv += "<div class='keywords2'>关键词:";
							for(i in espResult.keywords){
								keywordsDiv += "<a href='javascript:void(0);' onclick='doNewFilterSearch(3,this.name);' name='" + espResult.keywords[i] +"'>" + espResult.keywords[i] + "</a>";
							}
							keywordsDiv += "</div>";
						}
						var authorDiv = "<div class='d2'><a href='javascript:void(0);' onclick='doNewFilterSearch(2,this.name);' name='" + espResult.author +"'>作者:"+ espResult.author+ "</a></div>";
						dom ="<div class='RBox1'>" + titleDiv  + contentDiv + keywordsDiv + authorDiv+link2+"</div>";
					}else if("CTTE"==espResult.app){//培训系统
						//TODO xuanxiu
						link2 = '<div class="link2">'+ espResult.fmtUrl +"&nbsp;" +espResult.fmtTs +'<img src="' + ctx+'/images/sm1.gif" width="13" height="13" /><a href="javascript:void(0);" onclick="showCreateFav(\''+ ctx+'\',\''+ espResult.id+ '\');">在线收藏</a><img src="' + ctx +'/images/sm2.gif" /><a href="javascript:void(0);">选课</a></div>';
						if(espResult.author){
							var authorDiv = "<div class='d2'><a href='javascript:void(0);' onclick='doNewFilterSearch(2,this.name);' name='" + espResult.author +"'>讲师:"+ espResult.author+ "</a></div>";
							dom ="<div class='RBox1'>" + titleDiv + contentDiv + authorDiv+link2 + "</div>";
						}else{
							dom ="<div class='RBox1'>" + titleDiv + contentDiv +link2 + "</div>";
						}
					}
					
					$("#result").append(dom);
				});
//				var spellCheckStr = "";
//				if(json.page.spellcheck && !isEmpty(json.page.spellcheck)){
//					spellCheckStr += "<a href='javascript:void(0);' onclick='doNewSearch(this.name);' name='" + json.page.spellcheck +"'>" + json.page.spellcheck + "</a> ";
//					$("#spellCheck").html("您要找的是不是: " + spellCheckStr);
//				}
//			}
			}else{
				var spellCheckUrl = $('#spellCheckUrl').val();
				var checkString = {
						'queryString' : $('#queryString').val()
					};
				$.post(spellCheckUrl, checkString, function(json) {
					var spellCheckStr = "";
					$.each(json.spellChecks, function(i, spellCheck) {
						if(spellCheck && spellCheck != 'null'){
							spellCheckStr += "<a href='javascript:void(0);' onclick='doNewSearch(this.name);' name='" + spellCheck +"'>" + spellCheck + "</a> ";
						}
					});
					if(spellCheckStr.length > 0){
						$("#spellCheck").html("<strong class='f14'>您要找的是不是: " + "<span class='sp'>" +spellCheckStr+"</span></strong>");
					}
				});
			}
			SimpleTableUtils.pageToolbar(json.page);
		}, "json");
	},
	
	pageToolbar : function(page){
		var pageInfo = '找到'+page.totalCount+'篇 共'+ page.lastPageNumber+'页';
		$("#count").html(pageInfo);
		var dom = "<em>"+pageInfo+"</em>";
		
		dom +="<span>";
		
		if(!page.firstPage){
			dom += "&nbsp;&nbsp;<a href='javascript:simpleTable.togglePage(1);'>首页</a>";
		}
		
		if(page.hasPreviousPage){
			dom += "<a href='javascript:simpleTable.togglePage(" + page.previousPageNumber + ");'>上一页</a>";
		}
		
		for(var i in page.linkPageNumbers){
			if(page.linkPageNumbers[i] == page.pageNumber){
				dom += "<a href='javascript:void(0)' class='PSelect'>" + page.linkPageNumbers[i] + "</a>";
			}else{
				dom += "<a href='javascript:simpleTable.togglePage(" + page.linkPageNumbers[i] +");'>" + page.linkPageNumbers[i] + "</a>";
			}
		}
		
		if(page.hasNextPage){
			dom += "<a href='javascript:simpleTable.togglePage(" + page.nextPageNumber+ ");'>下一页</a>";
		}
		
		if(!page.lastPage){
			dom += "<a href='javascript:simpleTable.togglePage(" + page.lastPageNumber + ");'>末页</a>";
		}
		dom +='</span>';
		$("#paginationControls").html(dom);
	}	
};