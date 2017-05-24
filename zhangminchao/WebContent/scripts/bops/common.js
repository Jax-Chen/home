/*
 * ��ͨ�ű���
 * �ṩ���ϵͳ��ͨ�õĽű����룬����˽ű��ļ����ݲ���ԭʼ��JavaScript�����д�������jQuery�ȿ�ܱ�д��
 * 
 * author: zhengdd
 * date: 2010-3-23
 */

/*
 * ����JavaScriptԭ��String��replaceAll������
 * author: zhengdd
 * date: 2010-3-30
 */
String.prototype.replaceAll = function(stringToFind, stringToReplace) {
	var temp = this;
	var index = temp.indexOf(stringToFind);
	while (index != -1) {
		temp = temp.replace(stringToFind, stringToReplace);
		index = temp.indexOf(stringToFind);
	}
	return temp;
}

/*
 * ����JavaScriptԭ��String��trim������
 * author: zhengdd
 * date: 2010-3-30
 */
String.prototype.trim= function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}

/*
 * ����JavaScriptԭ��String��isBlank������
 * author: zhengdd
 * date: 2010-3-30
 */
String.prototype.isBlank = function() {
	if (this == null) {
		return true;
	}
	var temp = this.trim();
	if (temp == null || temp == "") {
		return true;
	}
	return false;
}

/*
 * ����JavaScriptԭ��String��isNotBlank������
 * author: zhengdd
 * date: 2010-3-30
 */
String.prototype.isNotBlank = function() {
	if (this == null) {
		return false;
	}
	var temp = this.trim();
	if (temp != null && temp != "") {
		return true;
	}
	return false;
}

/*
 * ����JavaScriptԭ��FormElement��reset������
 * author: pixiu
 * date: 2017年2月27日10:57:33
 */
$(document).on("click", ".but-62", function(){
	
	var elements = $("form input:text,input:file,select,radio,checkbox");
	elements.each(function(i,v){
//		console.log($(v));
		$(v).val("");
	});
	$("#searchForm").submit();
});

/*
 * ����JavaScriptԭ��FormElement��reset������
 * author: pixiu
 * date: 2017年2月27日11:14:47
 */
$(document).on("click", ".reset", function(){	
	var elements = $("form input:text,input:file,select,radio,checkbox");
	elements.each(function(i,v){
//		console.log($(v));
		$(v).val("");
		window.location.reload();
	});
});
