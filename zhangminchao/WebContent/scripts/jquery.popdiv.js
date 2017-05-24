/**
popdiv 弹出层 v1.1 永远居中的弹出层，改变窗口大小或拖动窗口滚动条时也会居中
2011-01-27 	sunjin
$.popdiv({
	popdivId : 'logindiv',			//弹出层的id
	openName : 'to_login_div',		//打开层的name
	closeName : 'close_login_div',	//关闭层的name
	hasbackdiv : true,				//true or false 是否显示半透明灰色背景层
	isTop: false					//是否在最顶层
});
**/
$.extend({popdiv:function(popParam){if(!this.zidx){this.zidx=new(function(){this.topindex=5000;this.bottomindex=5000;this.allindex={5000:true};});}
var zidxobj=this.zidx;var paramobj=new(function(){this.popdivId='pop_div_id';this.openName='open_pop_div';this.closeName='close_pop_div';this.hasbackdiv=true;this.isTop=false;});var popdivobj=new popMain();function popMain(){setParam(paramobj,popParam);var $popobj=$("#"+paramobj.popdivId);function setParam(obj,sourceobj){for(var name in obj){if(sourceobj.hasOwnProperty(name)){obj[name]=sourceobj[name];}}}
var zIndex=new(function(){if(paramobj.isTop===true){zidxobj.topindex+=1;this.popdivIndex=zidxobj.topindex;}else{zidxobj.bottomindex-=1;this.popdivIndex=zidxobj.bottomindex;}
zidxobj.allindex[this.popdivIndex]=true;this.backdivIndex=this.popdivIndex-1;});function createBackDiv(){var backdiv=$('<div style="display:none;width:100%;filter: Alpha(opacity=10); -moz-opacity:.1; opacity:0.1;height:100%;background-color:#000000;position:absolute;z-index:9998;top:0;left:0;"></div>');backdiv.css("height",$(document).height());backdiv.css("width",$(document).width());backdiv.css("z-index",zIndex.backdivIndex);return backdiv;}
function toCenterDiv(divobj){var ppdiv=$(divobj);if($.browser.msie&&$.browser.version=='6.0'){$("HTML").css("overflow","hidden");$(document.body).css("height","100%");$(document.body).css("overflow","auto");ppdiv.css("position","absolute");}else{ppdiv.css("position","fixed");}
ppdiv.css("z-index",zIndex.popdivIndex);ppdiv.css("background-color","#FFFFFF");var changeSize=function(){var divposition=parseXYPointer(ppdiv);ppdiv.css("top",divposition.getTop());ppdiv.css("left",divposition.getLeft());};changeSize();if(!($.browser.msie&&$.browser.version=='6.0')){$(window).resize(changeSize);}}
function parseXYPointer(divobj){var popdiv=$(divobj);var bodyheight=$(window).height();var bodywidth=$(document.body).width();var centerHeight=(bodyheight-popdiv.height())/2;var pdivWidth=(bodywidth-popdiv.width())/2;centerHeight=centerHeight<0?0:centerHeight;pdivWidth=pdivWidth<0?0:pdivWidth;var sizeobj=function(){var top=centerHeight+$(document.body).scrollTop();var left=pdivWidth;this.getTop=function(){return top;}
this.getLeft=function(){return left;}}
return new sizeobj();}
function popdivInit(){var backdiv;if(paramobj.hasbackdiv==true){backdiv=createBackDiv();$(document.body).append(backdiv);}
var ldiv=null;$("[name='"+paramobj.openName+"']").click(function(){if(!ldiv){ldiv=$popobj;toCenterDiv(ldiv);$("[name='"+paramobj.closeName+"']").click(function(){ldiv.hide();if(!!backdiv){backdiv.hide();}});}
if(!!backdiv){backdiv.show();}
ldiv.show();});}
popdivInit();}}});