<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<%@include file="/WEB-INF/jsp/public/base.jsp" %>
    
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>
<title>注册</title>
</head>
<body class="gray-bg">

    <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">mc</h1>

            </div>
            <h3>欢迎注册 MC</h3>
            <p>创建一个MC新账户</p>
            <form class="m-t" role="form" action="<%=base %>/bops/register.do" method="post">
                <div class="form-group">
                    <input type="text" name="uname" id="uname" class="form-control" placeholder="请输入用户名" required="">
                </div>
                <div class="form-group">
                    <input type="password" name="password" id="password" class="form-control" placeholder="请输入密码" required="">
                </div>
                <div class="form-group">
                    <input type="password" name="password2" id="password2" class="form-control" placeholder="请再次输入密码" required="">
                </div>
<!--                 <div class="form-group text-left"> -->
<!--                     <div class="checkbox i-checks"> -->
<!--                         <label class="no-padding"> -->
<!--                             <input type="checkbox"><i></i> 我同意注册协议</label> -->
<!--                     </div> -->
<!--                 </div> -->
                <button type="submit" class="register btn btn-primary block full-width m-b">注 册</button>

                <p class="text-muted text-center"><small>已经有账户了？</small><a href="<%=base %>/bops/login.do">点此登录</a>
                </p>

            </form>
        </div>
    </div>

   
    <script>
        $(document).ready(function () {
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        });
    </script>

    
    
	
</body>
<script src="<%=base %>/src/scripts/register.js"></script>
</html>