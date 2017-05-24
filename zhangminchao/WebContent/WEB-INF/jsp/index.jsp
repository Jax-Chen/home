<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<%@include file="/WEB-INF/jsp/public/base.jsp" %>
    
    <link rel="shortcut icon" href="<%=base %>/hadmin/favicon.ico"> 
    <link href="<%=base %>/hadmin/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="<%=base %>/hadmin/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="<%=base %>/hadmin/css/animate.css" rel="stylesheet">
    <link href="<%=base %>/hadmin/css/style.css?v=4.1.0" rel="stylesheet">
    
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>
<title>首页</title>
</head>

<body class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="<%=base %>/hadmin/#">
                                <span class="clear">
                                    <span class="block m-t-xs" style="font-size:20px;">
                                        <i class="fa fa-area-chart"></i>
                                        <strong class="font-bold">admin</strong>
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div class="logo-element">admin
                        </div>
                    </li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">老人信息管理模块</span>
                    </li>
                    <li>
                        <a class="J_menuItem" href="<%=base %>/bops/userList.do">
                            <i class="fa fa-user"></i>
                            <span class="nav-label">用户信息</span>
                        </a>
                    </li>
<!--                     <li> -->
<%--                         <a href="<%=base %>/hadmin/#"> --%>
<!--                             <i class="fa fa fa-bar-chart-o"></i> -->
<!--                             <span class="nav-label">统计图表</span> -->
<!--                             <span class="fa arrow"></span> -->
<!--                         </a> -->
<!--                         <ul class="nav nav-second-level"> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_echarts.html">百度ECharts</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_flot.html">Flot</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_morris.html">Morris.js</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_rickshaw.html">Rickshaw</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_peity.html">Peity</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_sparkline.html">Sparkline</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a class="J_menuItem" href="<%=base %>/hadmin/graph_metrics.html">图表组合</a> --%>
<!--                             </li> -->
<!--                         </ul> -->
<!--                     </li> -->
                    <li class="line dk"></li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">社区信息管理模块 </span>
                    </li>
                    <li>
                        <a class="J_menuItem J_home" href="<%=base %>/bops/homeList.do">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">社区信息</span>
                        </a>
                    </li>
                    
                    <li class="line dk"></li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">社区服务管理模块</span>
                    </li>
                    <li>
                        <a class="J_menuItem J_home" href="<%=base %>/bops/orderList.do">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">订单信息</span>
                        </a>
                    </li>
                    
                    <li class="line dk"></li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">社区民生管理模块</span>
                    </li>
                    <li>
                        <a class="J_menuItem J_home" href="<%=base %>/public/noticeList.do">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">公告信息</span>
                        </a>
                    </li>
                    
                    <li class="line dk"></li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">紧急事件处理模块</span>
                    </li>
                    <li>
                        <a class="J_menuItem J_home" href="<%=base %>/public/chatList.do">
                            <i class="fa fa-home"></i>
                            <span class="nav-label">即时通讯</span>
                        </a>
                    </li>
<!--                     <li> -->
<%--                         <a href="<%=base %>/hadmin/#"><i class="fa fa-edit"></i> <span class="nav-label">表单</span><span class="fa arrow"></span></a> --%>
<!--                         <ul class="nav nav-second-level"> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/form_basic.html">基本表单</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/form_validate.html">表单验证</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/form_advanced.html">高级插件</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/form_wizard.html">表单向导</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">文件上传 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/form_webuploader.html">百度WebUploader</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/form_file_upload.html">DropzoneJS</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">编辑器 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/form_editors.html">富文本编辑器</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/form_simditor.html">simditor</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/form_markdown.html">MarkDown编辑器</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/code_editor.html">代码编辑器</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/layerdate.html">日期选择器layerDate</a> --%>
<!--                             </li> -->
<!--                         </ul> -->
<!--                     </li> -->
<!--                     <li> -->
<%--                         <a href="<%=base %>/hadmin/#"><i class="fa fa-desktop"></i> <span class="nav-label">页面</span><span class="fa arrow"></span></a> --%>
<!--                         <ul class="nav nav-second-level"> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/contacts.html">联系人</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/profile.html">个人资料</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">项目管理 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/projects.html">项目</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/project_detail.html">项目详情</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/teams_board.html">团队管理</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/social_feed.html">信息流</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/clients.html">客户管理</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/file_manager.html">文件管理器</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/calendar.html">日历</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">博客 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/blog.html">文章列表</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/article.html">文章详情</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/faq.html">FAQ</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">时间轴 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/timeline.html">时间轴</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/timeline_v2.html">时间轴v2</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/pin_board.html">标签墙</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">单据 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/invoice.html">单据</a> --%>
<!--                                     </li> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/invoice_print.html">单据打印</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/search_results.html">搜索结果</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/forum_main.html">论坛</a> --%>
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">即时通讯 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a class="J_menuItem" href="<%=base %>/hadmin/chat_view.html">聊天窗口</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<!--                             <li> -->
<%--                                 <a href="<%=base %>/hadmin/#">登录注册相关 <span class="fa arrow"></span></a> --%>
<!--                                 <ul class="nav nav-third-level"> -->
<%--                                     <li><a href="<%=base %>/hadmin/login.html" target="_blank">登录页面</a> --%>
<!--                                     </li> -->
<%--                                     <li><a href="<%=base %>/hadmin/login_v2.html" target="_blank">登录页面v2</a> --%>
<!--                                     </li> -->
<%--                                     <li><a href="<%=base %>/hadmin/register.html" target="_blank">注册页面</a> --%>
<!--                                     </li> -->
<%--                                     <li><a href="<%=base %>/hadmin/lockscreen.html" target="_blank">登录超时</a> --%>
<!--                                     </li> -->
<!--                                 </ul> -->
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/404.html">404页面</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/500.html">500页面</a> --%>
<!--                             </li> -->
<%--                             <li><a class="J_menuItem" href="<%=base %>/hadmin/empty_page.html">空白页</a> --%>
<!--                             </li> -->
<!--                         </ul> -->
<!--                     </li> -->
                    
                    <li class="line dk"></li>
                    <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span class="ng-scope">分类</span>
                    </li>
                    <li>
                        <a class="J_menuItem" href="<%=base %>/bops/logout.do"><i class="fa fa-logout"></i> <span class="nav-label">退出</span></a>
                    </li>

                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-info " href="#"><i class="fa fa-bars"></i> </a>
                        <form role="search" class="navbar-form-custom" method="post" action="#">
                            <div class="form-group">
<!--                                 <input type="text" placeholder="请输入您需要查找的内容 …" class="form-control" name="top-search" id="top-search"> -->
                                <label style="margin-top:16px;font-size:18px;margin-left:10px;">智慧社区养老系统后台</label>
                            </div>
                        </form>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="dropdown">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="<%=base %>/hadmin/#">
                                <i class="fa fa-envelope"></i> <span class="label label-warning">16</span>
                            </a>
                            <ul class="dropdown-menu dropdown-messages">
                                <li class="m-t-xs">
                                    <div class="dropdown-messages-box">
                                        <a href="<%=base %>/hadmin/profile.html" class="pull-left">
                                            <img alt="image" class="img-circle" src="img/a7.jpg">
                                        </a>
                                        <div class="media-body">
                                            <small class="pull-right">46小时前</small>
                                            <strong>小四</strong> 是不是只有我死了,你们才不骂爵迹
                                            <br>
                                            <small class="text-muted">3天前 2014.11.8</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="dropdown-messages-box">
                                        <a href="<%=base %>/hadmin/profile.html" class="pull-left">
                                            <img alt="image" class="img-circle" src="img/a4.jpg">
                                        </a>
                                        <div class="media-body ">
                                            <small class="pull-right text-navy">25小时前</small>
                                            <strong>二愣子</strong> 呵呵
                                            <br>
                                            <small class="text-muted">昨天</small>
                                        </div>
                                    </div>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="text-center link-block">
                                        <a class="J_menuItem" href="<%=base %>/hadmin/mailbox.html">
                                            <i class="fa fa-envelope"></i> <strong> 查看所有消息</strong>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle count-info" data-toggle="dropdown" href="<%=base %>/hadmin/#">
                                <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
                            </a>
                            <ul class="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="<%=base %>/hadmin/mailbox.html">
                                        <div>
                                            <i class="fa fa-envelope fa-fw"></i> 您有16条未读消息
                                            <span class="pull-right text-muted small">4分钟前</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="<%=base %>/hadmin/profile.html">
                                        <div>
                                            <i class="fa fa-qq fa-fw"></i> 3条新回复
                                            <span class="pull-right text-muted small">12分钟钱</span>
                                        </div>
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <div class="text-center link-block">
                                        <a class="J_menuItem" href="<%=base %>/hadmin/notifications.html">
                                            <strong>查看所有 </strong>
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="row J_mainContent" id="content-main">
	                <iframe id="J_iframe" width="100%" height="100%" src="<%=base %>/bops/userList.do" frameborder="0" data-id="<%=base %>/WEB-INF/jsp/user/userList.jsp?v=1.0" seamless></iframe>
            </div>
        </div>
        <!--右侧部分结束-->
    </div>

    <!-- 全局js -->
    <script src="<%=base %>/hadmin/js/jquery.min.js?v=2.1.4"></script>
    <script src="<%=base %>/hadmin/js/bootstrap.min.js?v=3.3.6"></script>
    <script src="<%=base %>/hadmin/js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="<%=base %>/hadmin/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="<%=base %>/hadmin/js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="<%=base %>/hadmin/js/hAdmin.js?v=4.1.0"></script>
    <script type="text/javascript" src="<%=base %>/hadmin/js/index.js"></script>

    <!-- 第三方插件 -->
    <script src="<%=base %>/hadmin/js/plugins/pace/pace.min.js"></script>
</body>

</html>