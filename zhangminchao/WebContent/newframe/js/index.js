$(function(){
	
	loadTag();
	
    //菜单点击
    //J_iframe
    $("#side-menu").on("click",".J_menuItem", function(e) {
    	if ($(e.target).hasClass('deleteTag')) {
    		deleteTag($(e.target).attr("data-id"));
    	} else if($(e.target).hasClass('editTag')){
    		editTag($(e.target).attr("data-id"),$(e.target).siblings(".nav-label").text());
    		
    	}else {
    		//添加样式
        	var ajax_class = randomClass();
        	$("#ajax_div").addClass(ajax_class);
        	
        	$(".sk-spinner").show();
        	//ajax跳转
            var url = $(this).attr('url');
            $("#currentUrl").text($(this).children(".nav-label").text());
            
            $("#ajax_div").load(url, function(responseText, textStatus, XMLHttpRequest) {
            	$(".sk-spinner").hide();
    	    });
            
    	}
    	
        return false;
    });
    
    /**
     * 删除标签
     */
    function deleteTag(tagId){
    	layer.confirm('确定删除这个标签吗？', {icon: 3, title:'提示'}, function(cindex){
            $.ajax({
                url: appServer+'/bops/user/deleteTagById.htm',
                type: "POST",
                data:{"tagId":tagId},
                beforeSend:function(){
                    loadIndex = layer.load(1);
                },
                success:function(res){
                    layer.close(loadIndex);
                    if(res.meta.success){
                        layer.msg("删除成功！");
                        setTimeout("location.reload()", 1000);
                    }else{
                        layer.alert(res.meta.errorInfo, {icon:2});
                    }
                },
                error:function(){
                    layer.close(laodIndex);
                    layer.msg('网络错误！');
                }
                
            });
        }); 
    }
    
    /**
     * 修改标签
     */
    function editTag(tagId,tagName){
    	var ctt = "<div style='width: 60%;margin: 20px auto;' class='fadeIn'>" +
		"<div>" +
		"<span>标签名：</span>"+
		"<input type='text' name='tagName' value='" + tagName + "' id='tagName'><br><br>"+
		"</div>"+
		"</div>";
    	layer.open({
            type:1,
            id:"layer-editTag",
            title:'修改标签',
            btn:['确定', '取消'],
            area:['375px','200px'],
            content:ctt,
            yes:function(index){
                var v = $("#tagName").val();
                if(v == ""){
                	layer.msg('请输入标签名称');
                	$("#tagName").focus();
                	return;
                }else{
                	if(v.length>8){
                		layer.msg("标签名称不得超过8个字符~");
                		return false;
                	}
                	$.ajax({
                		url:appServer + "/bops/user/editTag.htm",
                		data:{"tagId":tagId, "tagName":v},
                		type:"POST",
                		success:function(res){
                			if(res.meta.success){
                				layer.msg("修改成功");
                				setTimeout("location.reload()", 1000);
                			}else{
                				layer.msg(res.meta.errorInfo);
                			}
                		},
                		error:function(){
                			layer.msg("网络错误");
                		}
                	});
                }
            }
        });   
    }
    
    //当前时间
    getCurDate();
    
    //重置
    $("body").on("click",".reset1",function(){ 
		
		var url = $(this).attr("url");
		goForAjaxNoParam(url);
		
	});
    
    //每页显示数量更换
    $("body").on("change","#select-pageSize",function(){
    	var url = $(this).attr('url');
    	var o = {};
    	goForAjaxHasParam(url,o);
    });
    
    //搜索
    $("body").on("click","#od-search-new",function(){
    	var url = $(this).attr('url');
    	var o = {};
    	o.pageNo = 1;
    	goForAjaxHasParam(url,o);
    });
    
    //分页输入跳转
    $("body").on("click","#goButton",function(){
    	var url = $(this).attr("url");
    	var o = {};
    	goForAjaxHasParam(url,o);
    	
	});
    
    //分页点击跳转
    $("body").on("click","._page_no",function(){
    	var page_no = $(this).attr("data-code");
    	var url = $(this).parent().parent().attr("url");
    	var o = {};
    	o.pageNo = page_no;
    	
    	goForAjaxHasParam(url,o);
    	
	});
    
});

function search_click(){
	$("#od-search-new").click();
}


/**
 * 异步加载标签按钮
 */
function loadTag(){
	$.ajax({
        url:appServer+'/bops/user/loadTag.htm',
        type:"POST",
        data:{},
        success:function(res){
            if(res.meta.success){
            	var obj = res.retObj;
            	if(obj != null){
            		var str = "";
                    for(var i=0; i<obj.length; i++){
                        var nobj = obj[i];
                        
                        str += "<li>" +
		                        	"<a title='" + nobj.name + "' class='J_menuItem' href='javascript:;' id='" + nobj.id + "'  url='" + appServer  + "/bops/user/listNewPage.htm?userTagId=" + nobj.id + "'>" +
			                            "<i class='fa fa-tag'></i>" +
			                            "<span class='nav-label'>" + nobj.name + "</span><span style='float:right;margin-left:10px;' data-id='" + nobj.id + "' class='deleteTag glyphicon glyphicon-trash' aria-hidden='true'></span><span style='float:right;' data-id='" + nobj.id + "' class='editTag glyphicon glyphicon-pencil' aria-hidden='true'></span>" + 
		                        	"</a>" +
	                        	"</li>";
                    }
                    $('#side-menu').append(str);
                }
            }else{
                layer.alert(res.meta.errorInfo, {icon:2});
            }
        },
        error:function(){
            layer.msg('标签加载失败，请联系技术人员！');
        }
        
    });
	
}

/**
 * 有参数的ajax加载
 * @param url 加载的url地址
 * @param o javascript对象
 */
function goForAjaxHasParam(url,o){
	$(".sk-spinner").show();
	getParam(o);
	$("#ajax_div").load(appServer+url, o, function(responseText, textStatus, XMLHttpRequest) {
		$(".sk-spinner").hide();
    });
}

/**
 * 无参数的ajax加载
 * @param url 加载的url地址
 */
function goForAjaxNoParam(url){
	$(".sk-spinner").show();
	$("#ajax_div").load(appServer+url, function(responseText, textStatus, XMLHttpRequest) {
		$(".sk-spinner").hide();
    });
}

/**
 * 参数拼接
 * @param o
 * @returns
 */
function getParam(o){
	$(":input[type=text]").each(function(){
		if(null!=this.name && ""!=this.name && null!=this.value && ""!=this.value){
			if(this.name=="pageNo"){
				var total = $(this).attr("total");
				if(this.value%1!=0 || parseInt(this.value)>parseInt(total) || this.value<=0){
					layer.msg("提醒有才的动物们，别乱输入哦^_^");
				}else{
					o[this.name] = this.value;
				}
			}else{
				o[this.name] = this.value;
			}
			
		}
    });
	
	$(":input[type=hidden]").each(function(){
		if(null!=this.name && ""!=this.name && null!=this.value && ""!=this.value){
			o[this.name] = this.value;
		}
    });
	
	$("select").each(function(){
		var name = $(this).attr("name");
		var value = $(this).find("option:selected").val();
		if(null!=this.name && ""!=this.name && null!=this.value && ""!=this.value){
			o[name] = value;
		}
    });
	return o;
}

/**
 * 
 * 获取当前时间
 * author：pixiu
 * @returns {String}
 */
function getCurDate(){
    var d = new Date();
    var week;
    switch (d.getDay()){
    case 1: week="周一"; break;
    case 2: week="周二"; break;
    case 3: week="周三"; break;
    case 4: week="周四"; break;
    case 5: week="周五"; break;
    case 6: week="周六"; break;
    default: week="周天";
    }
    var years = d.getFullYear();
    var month = add_zero(d.getMonth()+1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds=add_zero(d.getSeconds());
    var ndate = years+"-"+month+"-"+days+" " +week;
    $("#current_time").html(ndate);
    return ndate;
}
function add_zero(temp){
    if(temp<10) return "0"+temp;
    else return temp;
}

/**
 * 获得随机的ajax加载的class样式
 * author：pixiu
 * @returns {String}
 */
function randomClass(){
//	var x = parseInt(Math.random()*17,10)+1;
//	
//	if(x==1){
//		return "bounce";
//	}else if(x==2){
//		return "flash";
//	}else if(x==3){
//		return "pulse";
//	}else if(x==4){
//		return "rubberBand";
//	}else if(x==5){
//		return "shake";
//	}else if(x==6){
//		return "swing";
//	}else if(x==7){
//		return "wobble";
//	}else if(x==8){
//		return "bounceIn";
//	}else if(x==9){
//		return "bounceInLeft";
//	}else if(x==10){
//		return "bounceInRight";
//	}else if(x==11){
//		return "rollIn";
//	}else if(x==12){
//		return "fadeIn";
//	}else if(x==13){
//		return "fadeInDown";
//	}else if(x==14){
//		return "fadeInDownBig";
//	}else if(x==15){
//		return "fadeInRightBig";
//	}else if(x==16){
//		return "flipInY";
//	}else if(x==17){
//		return "rotateInUpLeft";
//	}else{
//		return "rotateInUpLeft";
//	}
}

$("#DataTables_Table_0 tr").mouseover(function(){ 
	$(this).find("tr").addClass("tron"); 
}); 







