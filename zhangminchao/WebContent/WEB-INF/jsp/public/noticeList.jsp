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
    <div class="wrapper wrapper-content  animated fadeInRight blog">
    	<form id="searchForm" action="<%=base %>/public/noticeList.do" method="post">
			<button style="display:none;width: 39%;min-width: 60px;margin-left: 7%;" type="submit" url="<%=base %>${page.url }" class="btn-left btn btn-w-m btn-success" id="od-search-new"><i class="fa fa-search"></i> 搜索</button>
		</form>
		<c:if test="${sessionScope.systemUser!=null }">
			 <div class="ibox-title">
				<div>
					<button style="float:right;margin-right:40px;margin-top:-17px;" type="button" class="btn btn-shadow btn-primary add">添加公告</button>
				</div>
	          </div>
          </c:if>
        <div class="row">
            <div class="col-lg-4">
	           		 <c:forEach items="${page.data}" var="notice" varStatus="status">
	           		 		<c:if test="${status.index%3==0}">
	           		 			<div class="ibox">
			                    <div class="ibox-content">
			                        <a href="<%=base %>/public/notice/detail.do?noticeId=${notice.id}" class="btn-link">
			                            <h2>${notice.title }</h2>
			                        </a>
			                        <div class="small m-b-xs">
			                            <strong><i class="fa fa-user"> </i>作者：${notice.author }</strong> <span class="text-muted">&nbsp;&nbsp;&nbsp;发表时间：<i class="fa fa-clock-o"></i>&nbsp;<f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${notice.createTime}'/></span>
			                        </div>
			                        <p>
			                            ${notice.content }
			                        </p>
			                        <div class="row">
			                            <div class="col-md-6">
			                            	<c:if test="${notice.tag1!=null ||  notice.tag2!=null || notice.tag3!=null}">
				                                <h5>标签：</h5>
				                                <c:if test="${notice.tag1!=null }">
				                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag1 }</button>
				                                </c:if>
				                                <c:if test="${notice.tag2!=null }">
				                                	<button class="btn btn-white btn-xs" type="button">${notice.tag2 }</button>
				                                </c:if>
				                                <c:if test="${notice.tag3!=null }">
				                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag3 }</button>
				                                </c:if>
				                                
				                                
			                                </c:if>
			                            </div>
			                            <div class="col-md-6">
			                                <div class="small text-right">
			                                    <h5>状态：</h5>
			                                    <div><i class="fa fa-eye"> </i> ${notice.browse } 浏览</div>
			                                    <c:if test="${sessionScope.systemUser!=null }">
				                                    <button class="btn btn-danger btn-xs delete" type="button">删除</button>
				                                    <input type="hidden" class="noticeId" value="${notice.id }">
			                                    </c:if>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </div>
		               		</c:if>
		             </c:forEach>
            </div>
            <div class="col-lg-4">
            	<c:forEach items="${page.data}" var="notice" varStatus="status">
          		 		<c:if test="${status.index%3==1}">
          		 			<div class="ibox">
	                    <div class="ibox-content">
	                        <a href="<%=base %>/public/notice/detail.do?noticeId=${notice.id}" class="btn-link">
	                            <h2>${notice.title }</h2>
	                        </a>
	                        <div class="small m-b-xs">
	                            <strong><i class="fa fa-user"> </i>作者：${notice.author }</strong> <span class="text-muted">&nbsp;&nbsp;&nbsp;发表时间：<i class="fa fa-clock-o"></i>&nbsp;<f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${notice.createTime}'/></span>
	                        </div>
	                        <p>
	                            ${notice.content }
	                        </p>
	                        <div class="row">
	                            <div class="col-md-6">
	                            	<c:if test="${notice.tag1!=null ||  notice.tag2!=null || notice.tag3!=null}">
		                                <h5>标签：</h5>
		                                <c:if test="${notice.tag1!=null }">
		                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag1 }</button>
		                                </c:if>
		                                <c:if test="${notice.tag2!=null }">
		                                	<button class="btn btn-white btn-xs" type="button">${notice.tag2 }</button>
		                                </c:if>
		                                <c:if test="${notice.tag3!=null }">
		                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag3 }</button>
		                                </c:if>
		                                
		                                
	                                </c:if>
	                            </div>
	                            <div class="col-md-6">
	                                <div class="small text-right">
	                                   <h5>状态：</h5>
	                                    <div><i class="fa fa-eye"> </i> ${notice.browse } 浏览</div>
	                                    <c:if test="${sessionScope.systemUser!=null }">
		                                    <button class="btn btn-danger btn-xs delete" type="button">删除</button>
		                                    <input type="hidden" class="noticeId" value="${notice.id }">
	                                    </c:if>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
               		</c:if>
             </c:forEach>
            </div>
            <div class="col-lg-4">
            	<c:forEach items="${page.data}" var="notice" varStatus="status">
          		 		<c:if test="${status.index%3==2}">
          		 			<div class="ibox">
	                    <div class="ibox-content">
	                        <a href="<%=base %>/public/notice/detail.do?noticeId=${notice.id}" class="btn-link">
	                            <h2>${notice.title }</h2>
	                        </a>
	                        <div class="small m-b-xs">
	                            <strong><i class="fa fa-user"> </i>作者：${notice.author }</strong> <span class="text-muted">&nbsp;&nbsp;&nbsp;发表时间：<i class="fa fa-clock-o"></i>&nbsp;<f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${notice.createTime}'/></span>
	                        </div>
	                        <p>
	                            ${notice.content }
	                        </p>
	                        <div class="row">
	                            <div class="col-md-6">
	                            	<c:if test="${notice.tag1!=null ||  notice.tag2!=null || notice.tag3!=null}">
		                                <h5>标签：</h5>
		                                <c:if test="${notice.tag1!=null }">
		                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag1 }</button>
		                                </c:if>
		                                <c:if test="${notice.tag2!=null }">
		                                	<button class="btn btn-white btn-xs" type="button">${notice.tag2 }</button>
		                                </c:if>
		                                <c:if test="${notice.tag3!=null }">
		                                	<button class="btn btn-primary btn-xs" type="button">${notice.tag3 }</button>
		                                </c:if>
		                                
		                                
	                                </c:if>
	                            </div>
	                            <div class="col-md-6">
	                                <div class="small text-right">
	                                    <h5>状态：</h5>
	                                    <div><i class="fa fa-eye"> </i> ${notice.browse } 浏览</div>
	                                    <c:if test="${sessionScope.systemUser!=null }">
		                                    <button class="btn btn-danger btn-xs delete" type="button">删除</button>
		                                    <input type="hidden" class="noticeId" value="${notice.id }">
	                                    </c:if>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
               		</c:if>
             </c:forEach>
            </div>
        </div>
    </div>

    <!-- 自定义js -->
   <script src="<%=base %>/hadmin/js/content.js?v=1.0.0"></script>


    
    
<script src="<%=base %>/src/scripts/bops/noticeList.js"></script>
</body>
</html>