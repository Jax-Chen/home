<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/jsp/public/base.jsp" %>
	<link rel="shortcut icon" href="<%=base %>/hadmin/favicon.ico"> 
	<link href="<%=base %>/hadmin/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="<%=base %>/hadmin/css/font-awesome.css?v=4.4.0" rel="stylesheet">

    <link href="<%=base %>/hadmin/css/animate.css" rel="stylesheet">
    <link href="<%=base %>/hadmin/css/style.css?v=4.1.0" rel="stylesheet">
<title>Insert title here</title>
</head>
<body class="gray-bg">
    
    <div class="wrapper wrapper-content  animated fadeInRight article">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1">
                <div class="ibox">
                    <div class="ibox-content">
                        <div class="pull-right">
                              <c:if test="${notice.tag1!=null }">
                              	<button class="btn btn-white btn-xs" type="button">${notice.tag1 }</button>
                              </c:if>
                              <c:if test="${notice.tag2!=null }">
                              	<button class="btn btn-white btn-xs" type="button">${notice.tag2 }</button>
                              </c:if>
                              <c:if test="${notice.tag3!=null }">
                              	<button class="btn btn-white btn-xs" type="button">${notice.tag3 }</button>
                              </c:if>
                        </div>
                        <div class="text-center article-title">
                            <h1>${notice.title	 }</h1>
                        </div>
                        <p>
                        	${notice.content }
                        </p>
                        <hr>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    <!-- 自定义js -->
   <script src="<%=base %>/hadmin/js/content.js?v=1.0.0"></script>

</body>
</html>