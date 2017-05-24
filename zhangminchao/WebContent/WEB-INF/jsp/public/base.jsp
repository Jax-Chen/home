<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String base  = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() + request.getContextPath() ;
String url = request.getRequestURI();
%>  
	<script type="text/javascript">
		var appServer = "<%=base %>";
	</script>

		<script src="<%=base %>/scripts/jquery-1.8.3.min.js" type="text/javascript"></script>
		<script src="<%=base %>/scripts/bops/common.js" type="text/javascript"></script>
		<script src="<%=base %>/scripts/fckeditor/fckeditor.js" type="text/javascript"></script>
		<script src="<%=base %>/scripts/jquery.custom.js" type="text/javascript"></script>
        <script src="<%=base %>/scripts/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
		<script src="<%=base %>/scripts/bops/bopspop.js" type="text/javascript"></script>
		<script src="<%=base %>/scripts/bops/util.js" type="text/javascript"></script>

		<!-- 新增 -->
		<link href="<%=base %>/newframe/js/layer/skin/default/layer.css" rel="stylesheet">
        <link href="<%=base %>/newframe/js/layui/css/layui.css" rel="stylesheet">
		<link href="<%=base %>/newframe/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
        <link href="<%=base %>/newframe/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
        <link href="<%=base %>/newframe/css/animate.css" rel="stylesheet">
        <link href="<%=base %>/newframe/css/style.css?v=4.1.0" rel="stylesheet">
<%--         <link href="<%=base %>/newframe/css/styles.css?v=1.0.0" rel="stylesheet"> --%>
<%--         <link href="<%=base %>/newframe/css/styles_2.css?v=1.0.0" rel="stylesheet"> --%>
		
		<link rel="stylesheet" type="text/css" href="<%=base %>/newframe/css/plugins/select/css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="<%=base %>/newframe/css/plugins/select/css/cs-select.css" />
		<link rel="stylesheet" type="text/css" href="<%=base %>/newframe/css/plugins/select/css/cs-skin-border.css" />	
		<link rel="stylesheet" type="text/css" href="<%=base %>/newframe/css/plugins/select/css/cs-skin-slide.css" />	
			
		<script src="<%=base %>/newframe/css/plugins/select/js/classie.js"></script>
		<script src="<%=base %>/newframe/css/plugins/select/js/selectFx.js"></script>

		<script src="<%=base %>/newframe/js/jquery.min.js?v=2.1.4"></script>
	    <script src="<%=base %>/newframe/js/bootstrap.min.js?v=3.3.6"></script>
	    <script src="<%=base %>/newframe/js/plugins/metisMenu/jquery.metisMenu.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/layer/layer.min.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/layer/laydate/laydate.js"></script>
		<script src="<%=base %>/newframe/js/layer/layer.js"></script>
		<script src="<%=base %>/newframe/js/layui/layui.js"></script>
		
		 <!-- Flot -->
	    <script src="<%=base %>/newframe/js/plugins/flot/jquery.flot.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/flot/jquery.flot.resize.js"></script>
	    <script src="<%=base %>/newframe/js/plugins/flot/jquery.flot.pie.js"></script>
	    
	     <!-- 全局js -->
	    <script src="<%=base %>/hadmin/js/jquery.min.js?v=2.1.4"></script>
	    
	    <script src="<%=base %>/hadmin/js/bootstrap.min.js?v=3.3.6"></script>
	    <!-- iCheck -->
	    <script src="<%=base %>/hadmin/js/plugins/iCheck/icheck.min.js"></script>
	    
        <link href="<%=base %>/hadmin/css/plugins/iCheck/custom.css" rel="stylesheet">
	    
	    <script src="<%=base %>/src/scripts/base.js"></script>