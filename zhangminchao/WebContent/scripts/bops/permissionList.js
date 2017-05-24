var easyTree;
var ODPViewTree_treeMgr = jQuery.hr.TreeMgr;
//初始化单选树
function initTree(frameDivId) {
	// 解析配置信息属性
	var treeOptions = {
		description : "互推网后台管理系统",
		ajaxModel : false,
		isMulti : false,
		customerAjaxFun : null,
		showContextMenu : true,
		contextMenuInfo : [ {
			text : "新增",
			eventName : "orgTreeAddNewNode",
			className : "buttonAdd"
		}, {
			text : "修改",
			eventName : "myDefineModifyFun",
			className : "buttonModify"
		}, {
			text : "删除",
			eventName : "orgTreeDelNewNode",
			className : "buttonDel"
		} ],
		treeCodeObj : this.buildDemoTreeCodes()
	};
	easyTree = ODPViewTree_treeMgr.createTree(frameDivId, treeOptions);
}

initTree("treeTemplateDiv");

 

function buildDemoTreeCodes() {
	var map = {};
    var rootCode = new jQuery.hr.TreeCode("权限功能点管理", "0");
	rootCode.setHasChild(true);
	map[0] = rootCode;
	for(var i=0;i<arr.length;i++){
		if(arr[i].FID==0){
			var treeCode = new jQuery.hr.TreeCode(arr[i].Name,arr[i].ID);
			treeCode.addOtherFieldValue("Url", arr[i].Url);
			treeCode.addOtherFieldValue("Description", arr[i].Description);
			rootCode.addChild(treeCode);
			if (arr[i].Url) { // 叶子节点
				treeCode.setHasChild(false);
			} else { // 目录节点
				treeCode.setHasChild(true);
			}
			map[arr[i].ID] = treeCode;
		}
	}
    	
    for(var i=0;i<arr.length;i++){
    	if(arr[i].FID!=0){
    		var treeCode = new jQuery.hr.TreeCode(arr[i].Name,arr[i].ID);
			treeCode.addOtherFieldValue("Url", arr[i].Url);
			treeCode.addOtherFieldValue("Description", arr[i].Description);
			map[arr[i].FID].addChild(treeCode);
			map[arr[i].ID] = treeCode;
			if (arr[i].Url) { // 叶子节点
				treeCode.setHasChild(false);
			} else { // 目录节点
				treeCode.setHasChild(true);
			}
    	}
    }
   	return rootCode;
}

// 新增节点
function orgTreeAddNewNode(selectedNode){
	$("#editForm").hide();
	$("#Name").val("");
	$("#url").val("");
	$("#Description").val("");
	$("#addForm").show();		
	$("#Parent").text(selectedNode.name);
	$("#Fid").val(selectedNode.id);
}

// 删除节点
function orgTreeDelNewNode(selectedNode) {
	if (window.confirm("你确定该功能？(其子功能一并删除！)")) {
		var allNodes = selectedNode.getAllChildNodes();
		var nodesid = [];
		for(var i=0;i<allNodes.length;i++){
			nodesid.push(allNodes[i].id);
		}jQuery.ajax({
	    	type:'POST',
	    	traditional: true,
	    	url:appServer +'/bops/systempermission/delete.htm',
	    	dataType:'json',
	    	data:{'prids[]':nodesid},
	    	success:function(data){
	    		if(data.errorNO==0){		    			
	    			selectedNode.remove();
	    			jQuery("#addForm").hide();
	    			jQuery("#editForm").hide();	
	    			alert("成功删除！");
	    		}else{
	    			alert("貌似服务器君睡着了，待会再来吧！");
	    		}
	    	},
	    	error:function(){
	    		alert("呀！出了点问题...");
	    	}
	    });
            
	}
}

//编辑节点
function myDefineModifyFun(selectedNode){
	$("#addForm").hide();
	$("#editForm").show();	
	$("#eName").val(selectedNode.name);
	$("#eID").val(selectedNode.id);
	$("#eurl").val(selectedNode.dataObj.Url);
	$("#eDescription").val(selectedNode.dataObj.Description);
	
	$("input:radio[name='eleaf']").each(function(e){
		var curV = selectedNode.dataObj.Url? 1: 0;
		if (this.value == curV) {
			this.checked = true;
		}
	});
	
	if (selectedNode.dataObj.Url) {
		$("#eurlTr").show();
	} else {
		$("#eurlTr").hide();
	}
	var rootNode = easyTree.findOneNodeById(0);
	var nodes = rootNode.getAllChildNodes(rootNode);
	for(var i=1;i<nodes.length;i++){
		$("#eParent").append("<option value="+nodes[i].id+">"+nodes[i].name+"</option>");
	}
	
	$("#eParent").val(selectedNode.parent.id);
	
}

function expandAllNode(){
	  for(var i=0;i<arr.length;i++){
		  $("#xytreenormalid0imgjiahao"+i).click();
	  }
	  for(var i=2;i<arr.length;i++){
		  $("#xytreenormalid0imgjiahao"+i).click();
	  }
  }
  
expandAllNode();


$("input:radio[name='leaf']").click(function(){
	if (this.value == 1) { // 功能点
		$("#urlTr").show();
	} else { // 目录
		$("#urlTr").hide();
	}
})

$("input:radio[name='eleaf']").click(function(){
	if (this.value == 1) { // 功能点
		$("#eurlTr").show();
	} else { // 目录
		$("#eurlTr").hide();
	}
})

$("#editsub").click(function(){
	if (!$('#eName').val()) {
		alert("功能名称不能为空");
		return false;
	}
	var isDir = $("input:radio[name='eleaf']:checked").val();
	if (!isDir) {
		alert("请选择目录或者功能点");
		return false;
	}else if (isDir == 0) {
		$('#eurl').val("");
	} else {
		if (!$('#eurl').val()) {
			alert("url不能为空");
			return false;
		}
	}
		$.ajax({
			type:'POST',
			url: appServer + '/bops/systempermission/editpage.htm',
			dataType:'json',
			data:{'Name':$('#eName').val(),'url':$('#eurl').val(),'Description':$('#eDescription').val(),'Operator':$('#eOperator').val(),'FID':$('#eParent').val(),'ID':$('#eID').val()},
			success:function(data){
	    		if(data.errorNO==0){
	    			alert("更新成功！");
	    			window.location.href= appServer + "/bops/systempermission/list.htm"; 
	    		}else if(data.errorNO==1){
	    			alert("请填写完整表单！");
	    		}else if(data.errorNO==2){
	    			alert("貌似服务器君睡着了，待会再来吧！");
	    		}
	    	},
	    	error:function(){
	    		alert("阿贾克斯出了点问题...");
	    	}
		});
	
});

$("#addsub").click(function(){
	if (!$('#Name').val()) {
		alert("功能名称不能为空");
		return false;
	}
	var isDir = $("input:radio[name='leaf']:checked").val();
	if (!isDir) {
		alert("请选择目录或者功能点");
		return false;
	}else if (isDir == 0) {
		$('#url').val("");
	} else {
		if (!$('#url').val()) {
			alert("url不能为空");
			return false;
		}
	}
		$.ajax({
			type:'POST',
			url:appServer + '/bops/systempermission/add.htm',
			dataType:'json',
			data:{'Name':$('#Name').val(),'url':$('#url').val(),'Description':$('#Description').val(),'Operator':$('#Operator').val(),'FID':$('#Fid').val()},
			success:function(data){
	    		console.log(data.errorNO);
	    		if(data.errorNO==0){
	    			alert("添加成功！");
	    			window.location.href=appServer + "/bops/systempermission/list.htm"; 
	    		}else if(data.errorNO==1){
	    			alert("请填写完整表单！");
	    		}else if(data.errorNO==2){
	    			alert("貌似服务器君睡着了，待会再来吧！");
	    		}else{
	    			alert("已经存在该名称！");
	    		}
	    	},
	    	error:function(){
	    		alert("阿贾克斯出了点问题...");
	    	}
		});
	

});

$(".back").click(function(){
	$("#addForm").hide();
	$("#editForm").hide();
});
