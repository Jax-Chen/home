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
<title>聊天列表</title>
</head>
<body class="gray-bg">

	
	<div class="wrapper wrapper-content  animated fadeInRight">

        <div class="row">
            <div class="col-sm-12">

                <div class="ibox chat-view">

                    <div class="ibox-title">
                        <small class="pull-right text-muted"></small> 聊天窗口
                    </div>


                    <div class="ibox-content">

                        <div class="row">

                            <div class="col-md-9 ">
                                <div class="chat-discussion">

									<c:forEach items="${page.data}" var="chat" varStatus="status">
	                                    <div class="chat-message">
	                                        <img class="message-avatar" src="<%=base %>/hadmin/img/a1.jpg" alt="">
	                                        <div class="message">
	                                            <a class="message-author" href="#"> ${chat.name }</a>
	                                            <span class="message-date"> <f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${chat.createTime}'/></span>
	                                            <span class="message-content">
													${chat.content }
	                                            </span>
	                                        </div>
	                                    </div>
									</c:forEach>
                                </div>	

                            </div>
                            <div class="col-md-3">
                                <div class="chat-users">

									<c:forEach items="${page.uList}" var="user" varStatus="status">
	                                    <div class="users-list">
	                                        <div class="chat-user">
	                                            <img class="chat-avatar" src="<%=base %>/hadmin/img/timg.jpg" alt="">
	                                            <div class="chat-user-name">
	                                                <a href="javascript:;" class="chat-show">${user.name }</a>
	                                            </div>
	                                        </div>
	
	                                    </div>
									</c:forEach>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="chat-message-form">

                                    <div class="form-group">

                                        <textarea class="form-control message-input" id="message" name="message" placeholder="输入消息内容，按回车键发送"></textarea>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </div>


    </div>
	

    <!-- 自定义js -->
    <script src="<%=base %>/hadmin/js/content.js?v=1.0.0"></script>

<script src="<%=base %>/src/scripts/chatList.js"></script>
</body>
</html>