/**
 * 提交一个url请求后，在返回true后重新根据查询form id重载数据，否则提示失败
 * @param url
 * @param paras
 * @param formId
 * @return
 */
function post_form_query(url,paras,formId){
	jQuery.post(url,paras,
			function(data){
				if('true'==data || true==data){
					$('#'+formId+'').submit();
				}else if('false'==data || false==data){
					alert('操作失败！');
				}else{
					alert(data.errorInfo);
				}
			},'json');
}
/**
 * 提交一个url请求后，在返回true后根据requestUrl重载页面，否则提示失败
 * @param url
 * @param paras
 * @param requestUrl
 * @return
 */
function post_request(url,paras,requestUrl){
	jQuery.post(url,paras,
			function(data){
				if('true'==data || true==data){
					goUrl(requestUrl);
				}else if('false'==data || false==data){
					alert('操作失败！');
				}else{
					alert(data.errorInfo);
				}
			},'json');
}
/**
 * 提交一个url请求后，在返回true后根据requestUrl重载页面，并提示成功与否
 * @param url
 * @param paras
 * @param requestUrl
 * @return
 */
function post_request_notice(url,paras,requestUrl){
	jQuery.post(url,paras,
			function(data){
				if('true'==data || true==data){
					alert("操作成功");
					goUrl(requestUrl);
				}else if('false'==data || false==data){
					alert('操作失败！');
				}else{
					alert(data.errorInfo);
				}
			},'json');
}
/**
 * 提交一个url请求后，并提示消息
 * @param url
 * @param paras
 * @param requestUrl
 * @return
 */
function post(url,paras){
	jQuery.post(url,paras,
			function(data){
				if('true'==data || true==data){
					alert('操作成功！');
				}else if('false'==data || false==data){
					alert('操作失败！');
				}else{
					alert(data.errorInfo);
				}
			},'json');
}