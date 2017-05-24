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
<title>订单列表</title>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
        <div class="row">
            <div class="col-sm-4">
                <div class="ibox">
                    <div class="ibox-content">
                    
                    	<form id="searchForm" action="<%=base %>/front/orderList.do" method="post">
							<button style="display:none;width: 39%;min-width: 60px;margin-left: 7%;" type="submit" url="<%=base %>${page.url }" class="btn-left btn btn-w-m btn-success" id="od-search-new"><i class="fa fa-search"></i> 搜索</button>
						</form>
                    
                        <h3>所有订单列表</h3>
<!--                         <p class="small"><i class="fa fa-hand-o-up"></i> 所有订单列表</p> -->

                        <div class="input-group">
                            <input type="text" placeholder="添加新订单" style="width:60%;margin-right:15px;" id="mark" class="input input-sm form-control">
                            <div style="    margin-top: 4px;">
                            	<input type="radio" class="" name="type" checked value="1">医疗服务
                           		<input type="radio" class="" name="type" value="2">家政服务
                            </div>
                            <span class="input-group-btn">
                                	<button type="button" class="btn btn-sm btn-white add"> <i class="fa fa-plus"></i> 添加</button>
                            </span>
                        </div>

                        <ul class="sortable-list connectList agile-list">
                        	<c:forEach items="${page.data}" var="order" varStatus="status">
                        		<li 
                        			<c:choose>
									   <c:when test="${order.status==0}">
									  	 	class="warning-element"
									   </c:when>
									   <c:when test="${order.status==1}">
									  	 	class="success-element"
									   </c:when>
									   <c:when test="${order.status==2}">
									  	 	class="info-element"
									   </c:when>
									   <c:when test="${order.status==3}">
									  	 	class="danger-element"
									   </c:when>
									</c:choose>
                        		>
	                                	${order.mark }(
	                                		<c:choose>
											   <c:when test="${order.type==1}">
											   		医疗服务
											   </c:when>
											   <c:when test="${order.type==2}">
											   		家政服务
											   </c:when>
											</c:choose>
	                                	)
	                                	<span style="float:right;font-weight:bold;">
	                                		<c:choose>
											   <c:when test="${order.status==0}">
											  	 	新订单
											   </c:when>
											   <c:when test="${order.status==1}">
											  	 	进行中
											   </c:when>
											   <c:when test="${order.status==2}">
											   		已完成
											   </c:when>
											   <c:when test="${order.status==3}">
											   		已取消
											   </c:when>
											</c:choose>
	                                	</span>
	                                <div class="agile-detail" style="margin-top:10px;">
                                    	<i class="fa fa-user"></i> <span style="margin-right:85px;">${order.name }</span>
                                    	<i class="fa fa-mobile"></i> <span style="margin-right:85px;">${order.mobile }</span>
                                    	<i class="fa fa-clock-o"></i> <span style=""><f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${order.createTime}'/></span>
	                                </div>
	                                <div class="agile-detail" style="margin-top:10px;">
	                                	<input type="hidden" class="orderId" value="${order.id }">
	                               		 <a href="javascript:;" class="pull-right btn btn-xs btn-danger delete" style="margin-left: 10px;">删除</a>
	                                	<c:choose>
										   <c:when test="${order.status==0}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										   </c:when>
										   <c:when test="${order.status==1}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-primary complete">完成</a>
										   </c:when>
										</c:choose>
                                    	<i class="fa fa-home"></i> ${order.address }
	                                </div>
	                            </li>
                        	</c:forEach>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="ibox">
                    <div class="ibox-content">
                        <h3>进行中订单</h3>
<!--                         <p class="small"><i class="fa fa-hand-o-up"></i> 在列表之间拖动任务面板</p> -->
                        <ul class="sortable-list connectList agile-list">
                        
                        	<c:forEach items="${page.data}" var="order" varStatus="status">
                        		<c:if test="${order.status==1 }">
                        			<li 
                        			<c:choose>
									   <c:when test="${order.status==0}">
									  	 	class="warning-element"
									   </c:when>
									   <c:when test="${order.status==1}">
									  	 	class="success-element"
									   </c:when>
									   <c:when test="${order.status==2}">
									  	 	class="info-element"
									   </c:when>
									   <c:when test="${order.status==3}">
									  	 	class="danger-element"
									   </c:when>
									</c:choose>
                        		>
	                                	${order.mark }(
	                                		<c:choose>
											   <c:when test="${order.type==1}">
											   		医疗服务
											   </c:when>
											   <c:when test="${order.type==2}">
											   		家政服务
											   </c:when>
											</c:choose>
	                                	)
	                                	<span style="float:right;font-weight:bold;">
	                                		<c:choose>
											   <c:when test="${order.status==0}">
											  	 	新订单
											   </c:when>
											   <c:when test="${order.status==1}">
											  	 	进行中
											   </c:when>
											   <c:when test="${order.status==2}">
											   		已完成
											   </c:when>
											   <c:when test="${order.status==3}">
											   		已取消
											   </c:when>
											</c:choose>
	                                	</span>
	                                <div class="agile-detail" style="margin-top:10px;">
                                    	<i class="fa fa-user"></i> <span style="margin-right:85px;">${order.name }</span>
                                    	<i class="fa fa-mobile"></i> <span style="margin-right:85px;">${order.mobile }</span>
                                    	<i class="fa fa-clock-o"></i> <span style=""><f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${order.createTime}'/></span>
	                                </div>
	                                <div class="agile-detail" style="margin-top:10px;">
	                                	<input type="hidden" class="orderId" value="${order.id }">
	                               		 <a href="javascript:;" class="pull-right btn btn-xs btn-danger delete" style="margin-left: 10px;">删除</a>
	                                	<c:choose>
										   <c:when test="${order.status==0}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										   </c:when>
										   <c:when test="${order.status==1}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-primary complete">完成</a>
										   </c:when>
										</c:choose>
                                    	<i class="fa fa-home"></i> ${order.address }
	                                </div>
	                            </li>
									
								</c:if>
                        	</c:forEach>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="ibox">
                    <div class="ibox-content">
                        <h3>已完成订单</h3>
<!--                         <p class="small"><i class="fa fa-hand-o-up"></i> 在列表之间拖动任务面板</p> -->
                        <ul class="sortable-list connectList agile-list">
                            <c:forEach items="${page.data}" var="order" varStatus="status">
                        		<c:if test="${order.status==2 }">
                        			<li 
                        			<c:choose>
									   <c:when test="${order.status==0}">
									  	 	class="warning-element"
									   </c:when>
									   <c:when test="${order.status==1}">
									  	 	class="success-element"
									   </c:when>
									   <c:when test="${order.status==2}">
									  	 	class="info-element"
									   </c:when>
									   <c:when test="${order.status==3}">
									  	 	class="danger-element"
									   </c:when>
									</c:choose>
                        		>
	                                	${order.mark }(
	                                		<c:choose>
											   <c:when test="${order.type==1}">
											   		医疗服务
											   </c:when>
											   <c:when test="${order.type==2}">
											   		家政服务
											   </c:when>
											</c:choose>
	                                	)
	                                	<span style="float:right;font-weight:bold;">
	                                		<c:choose>
											   <c:when test="${order.status==0}">
											  	 	新订单
											   </c:when>
											   <c:when test="${order.status==1}">
											  	 	进行中
											   </c:when>
											   <c:when test="${order.status==2}">
											   		已完成
											   </c:when>
											   <c:when test="${order.status==3}">
											   		已取消
											   </c:when>
											</c:choose>
	                                	</span>
	                                <div class="agile-detail" style="margin-top:10px;">
                                    	<i class="fa fa-user"></i> <span style="margin-right:85px;">${order.name }</span>
                                    	<i class="fa fa-mobile"></i> <span style="margin-right:85px;">${order.mobile }</span>
                                    	<i class="fa fa-clock-o"></i> <span style=""><f:formatDate pattern='yyyy-MM-dd HH:mm:ss' value='${order.createTime}'/></span>
	                                </div>
	                                <div class="agile-detail" style="margin-top:10px;">
	                                	<input type="hidden" class="orderId" value="${order.id }">
	                               		 <a href="javascript:;" class="pull-right btn btn-xs btn-danger delete" style="margin-left: 10px;">删除</a>
	                                	<c:choose>
										   <c:when test="${order.status==0}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										   </c:when>
										   <c:when test="${order.status==1}">
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-warning cancel" style="margin-left: 10px;">取消</a>
										  	 	<a href="javascript:;" class="pull-right btn btn-xs btn-primary complete">完成</a>
										   </c:when>
										</c:choose>
                                    	<i class="fa fa-home"></i> ${order.address }
	                                </div>
	                            </li>
									
								</c:if>
                        	</c:forEach>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


    </div>


    <!-- 自定义js -->
    <script src="<%=base %>/hadmin/js/content.js?v=1.0.0"></script>

    <script>
//         $(document).ready(function () {
//             $(".sortable-list").sortable({
//                 connectWith: ".connectList"
//             }).disableSelection();

//         });
    </script>

    
    
<script src="<%=base %>/src/scripts/front/orderList.js"></script>
</body>
</html>