<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<%@include file="/WEB-INF/jsp/public/base.jsp" %>
		
		
		<!-- 登录页面插件 -->
		<link href="<%=base %>/newframe/css/plugins/login/style.css" rel="stylesheet">
		
		
		
	    <!-- 自定义js -->
<%-- 	    <script type="text/javascript" src="<%=base %>/newframe/js/index.js"></script> --%>

<title>前台  - 登录</title>
</head>
<body style="width: 100%; height: 100%; background-color: #ffffff;">
	<div style="position: absolute;left:42%;top:20%;min-width:250px;z-index:100;">
        <div>

            <h1 class="logo-name" style="font-size:140px;">zmc</h1>

        </div>

        <form class="m-t" role="form" action="<%=base %>/front/login.do" method="post">
            <div class="form-group">
                <input type="name" class="form-control" placeholder="用户名" name="uname" required="" id="uname">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="密码" name="password" required="" id="password">
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">登 录</button>


            <p class="text-muted text-center"> 
<!-- 	                <a href="login.html#"><small>忘记密码了？</small></a> |  -->
             <a href="javascript:;" class="user-add">注册一个新账号</a>
            </p>

        </form>
        <input type="hidden" id="result" value="${result}">
    </div>
	

	<script type="text/javascript">
		window.onload = function(){
			var config = {
				vx: 4,
				vy:  4,
				height: 2,
				width: 2,
				count: 100,
				color: "121, 162, 185",
				stroke: "100,200,180",
				dist: 6000,
				e_dist: 20000,
				max_conn: 10
			}
			CanvasParticle(config);
		}
	</script>
	<script type="text/javascript">
		if(jQuery("#result").val()!=""){
			layer.msg(jQuery("#result").val());
		}
		
		if(top.location!=self.location){  
	        top.location = appServer + "/front/login.do";  
	    } 
		
	</script>
	
	<script type="text/javascript" src="<%=base %>/src/scripts/front/canvas-particle.js"></script>
	<script src="<%=base %>/src/scripts/bops/userList.js"></script>
</body>
</html>