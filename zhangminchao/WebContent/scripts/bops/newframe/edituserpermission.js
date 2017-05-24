function Returnaa() {
    var arrs = multiTree.getNodesAll();
    if(arrs.length==0){
    	var type =$("#type").val();
    	var userId = $("#systemuserId").val();
    	jQuery.ajax({
        	type:'POST',
        	traditional: true,
        	url:appServer + '/bops/systempermission/deletepermission.htm',
        	dataType:'json',
        	data:{'userId':userId,'OperatorID':OperatorID,'type':type},
        	success:function(data){
        		if(data.errorNO==0){
        			alert("保存成功！");
        			window.location.href=appServer + "/bops/systempermission/edituserpermission.htm?userId="+userId+"&type="+type; 
        		}else if(data.errorNO==1){
        			alert("请填写完整表单！");
        		}else{
        			alert("貌似服务器君睡着了，待会再来吧！");
        		}
        	},
        	error:function(){
        		alert("呀！出了点问题...");
        	}
        });
    	return;
    }
    var ids = [];
	for(var i=0;i<arrs.length;i++){
		ids.push(arrs[i].id);
	}
	var userId = $("#systemuserId").val();
	var OperatorID = $("#operatorID").val();
	var type =$("#type").val();
	jQuery.ajax({
    	type:'POST',
    	traditional: true,
    	url:appServer + '/bops/systempermission/edituserpermission.htm',
    	dataType:'json',
    	data:{'userId':userId,'OperatorID':OperatorID,'IDList[]':ids,'type':type},
    	success:function(data){
    		if(data.errorNO==0){
    			alert("保存成功！");
    			window.location.href=appServer + "/bops/systempermission/edituserpermission.htm?userId="+userId+"&type="+type; 
    		}else if(data.errorNO==1){
    			alert("请填写完整表单！");
    		}else{
    			alert("貌似服务器君睡着了，待会再来吧！");
    		}
    	},
    	error:function(){
    		alert("呀！出了点问题...");
    	}
    });
  }

function ReturnList(){
	var userId=$("#systemuserId").val();
	 window.location.href= appServer + "/bops/systemuser/systemuserdetail.htm?userid="+userId;
}
var map = {};
var multiTree;
var ODPViewTree_treeMgr = jQuery.hr.TreeMgr;
var select = [];

//初始化单选树
function initTree(frameDivId) {
  var treeOptions = {
    description : "互推网后台管理系统",
    ajaxModel : false,
    isMulti : true, // 多选树
    customerAjaxFun : null,
    showContextMenu : false,
    treeCodeObj : this.buildDemoTreeCodes()
  };
  multiTree = ODPViewTree_treeMgr.createTree(frameDivId, treeOptions);
  
}

initTree("multiTreeTmplateDiv");


// 封装节点数据 用于封装后台返回的节点数据

function buildDemoTreeCodes() {
	var map = {};
  var rootCode = new jQuery.hr.TreeCode("权限功能点管理", 0);
  rootCode.setHasChild(true);
  map[0] = rootCode;
	for(var i=0;i<arr.length;i++){
		if(arr[i].FID==0){
			var treeCode = new jQuery.hr.TreeCode(arr[i].Name,arr[i].ID);
			treeCode.addOtherFieldValue("Url", arr[i].Url);
			treeCode.addOtherFieldValue("Description", arr[i].Description);
			rootCode.addChild(treeCode);
			map[arr[i].ID] = treeCode;
			if (arr[i].Url) { // 叶子节点
				treeCode.setHasChild(false);
			} else { // 目录节点
				treeCode.setHasChild(true);
			}
		}
	}
  	
  for(var i=0; i<arr.length; i++){
  	if (arr[i].FID!=0) {
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

function expandAllNode(){
	  var root = multiTree.findOneNodeById("-1");
	  root.expandNodes();
	  
	  var nodes = root.getFirstLeveChildNodes();
	  for (var i in nodes) {
		  nodes[i].expandNodes();
		  var subNodes = nodes[i].getFirstLeveChildNodes();
		  for (var j in subNodes) {
			  subNodes[j].expandNodes();
			  var tdNodes = subNodes[j].getFirstLeveChildNodes();
			  
			  for(var k in tdNodes){
				  tdNodes[k].expandNodes();
			  }
		  }
	  }
}

expandAllNode();

function selectCheckedNode(){
	  for(var i=0;i<ckp.length;i++){
		  var node = multiTree.findOneNodeById(ckp[i]);
		  if(node && !node.hasChild){
			  multiTree.defaultClickNode(node);
		  }		  
	  }
}

function initDetail(){
	var ipt = $(".sysusrdtl-content-table").find(".param");
	for(var i = 0; i<ipt.length; i++){
		dtl[$(ipt[i]).attr("id").replace("su-","")] = ipt[i].value;
	}
	dtl.id = $("#detailid").val();
	dtl.leader = $("#leader").text();
	dtl.hr = $("#hr").text();
	
}
selectCheckedNode();
