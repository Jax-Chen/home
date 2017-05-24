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
<title>个人资料</title>
</head>
<body class="gray-bg">
   
	<div class="wrapper wrapper-content animated fadeInRight">
		<form id="searchForm" action="<%=base %>/front/user/detailView.do" method="post">
			<button style="display:none;width: 39%;min-width: 60px;margin-left: 7%;" type="submit" url="<%=base %>${page.url }" class="btn-left btn btn-w-m btn-success" id="od-search-new"><i class="fa fa-search"></i> 搜索</button>
		</form>
        <div class="row">
            <div class="col-sm-4">
                <div class="">
                    
                </div>
            </div>
            
            
            <div class="col-sm-4">
                <div class="contact-box">
                    <a href="javascript:;" class="edit" data-id="${user.id }">
                        <div class="col-sm-4">
                            <div class="text-center">
                                <img alt="image" class="img-circle m-t-xs img-responsive" src="<%=base %>/hadmin/img/timg.jpg">
                                <div class="m-t-xs font-bold">${user.uname }</div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <h3><strong>${user.name }</strong></h3>
                            <p><i class="fa fa-map-marker"></i> ${user.address }</p>
                            <address>
                            <strong></strong><br>
                            ${user.email }<br><br>
                            mobile:<a href="">${user.mobile }</a><br><br>
                        </address>
                        </div>
                        <div class="clearfix"></div>
                    </a>
                </div>
            </div>
           	<div class="col-sm-4">
                <div class="">
                    
                </div>
            </div>
        </div>
    </div>

    <!-- 自定义js -->
    <script src="<%=base %>/hadmin/js/content.js?v=1.0.0"></script>

      <script>
        $(document).ready(function () {
            $('.contact-box').each(function () {
                animationHover(this, 'pulse');
            });
        });
    </script>
    
<script src="<%=base %>/src/scripts/front/userList.js"></script>
</body>
</html>